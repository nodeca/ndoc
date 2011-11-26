'use strict';

var Util = require('./util');

//
// export ndoc
//
module.exports = NDoc;

//
// create and load parser
//
try {
  var parser = require('./parser');
} catch(err) {
  (function(){
  var Jison = require('jison');
  var grammar = require('jison/lib/jison/bnf').parse(Util.read(Util.join(__dirname, 'parser.y')));
  Util.write(Util.join(__dirname, 'parser.js'), (new Jison.Parser(grammar)).generate());
  })();
  var parser = require('./parser');
}

//
// helpers
//
function extend(o, plus) {
  var r = {};
  for (var i in o) r[i] = o[i];
  if (plus) for (var i in plus) r[i] = plus[i];
  return r;
}

//
// read source files and compose the document tree
//
function NDoc(files, options) {

  // options
  this.options = extend({
  }, options)

  var tree = {};

  // parse
  files.forEach(function(file) {
    console.log('Compiling file', file);
    try {
      var text = Util.read(file);
      // TODO: consider amending failing document inplace.
      // Say, if it doesn't parse, insert a fake '*' line at failing `line` and retry
      if (false) try {
        var ndocs = parser.parse(text);
      } catch(err) {
        err.message.replace(/.*Parse error on line (\d+):.*/, function(all, line) {
          line = Number(line);
          console.error('Chpok at', line, text.split('\n')[line]);
        });
      }
      var ndocs = parser.parse(text);
    } catch(err) {
      console.error('FATAL:', file, err.message || err);
      process.exit(1);
    }
    for (var id in ndocs) {
      ndocs[id].href = options.formatLink(file, ndocs[id].line);
      var d = ndocs[id];
      // FIXME: reconcile id clashes. E.g. prototype has 'Ajax' section and 'Ajax' namespace
      if (tree[id]) {
        console.error('ID clash: id=%s, new type=%s, old type=%s', id, tree[id].type, d.type, d);
      }
      tree[id] = d;
      d.aliases = [];
      if (d.type === 'section' || d.type === 'namespace' || d.type === 'class' || d.type === 'mixin') {
        d.namespaces = [];
        d.classes = [];
        d.mixins = [];
        d.utilities = [];
        d.constants = [];
        d.class_methods = [];
        d.class_properties = [];
        d.instance_methods = [];
        d.instance_properties = [];
        if (d.type === 'class') {
          //d.superclass = null;
          d.subclasses = [];
        }
      } else {
      }
    }
  });

  // sort definitions, to help building hierarchy
  var ids = Object.keys(tree).sort();
  var nids = ids.length;
  var sorted = {};
  for (var i = 0; i < nids; ++i) sorted[ids[i]] = tree[ids[i]];
  tree = sorted; sorted = null;

  // build hierarchy
  // N.B. Foo#a is child of Foo
  // N.B. since we've sorted keys, Foo always comes before Foo#a
  for (var i = 0; i < nids; ++i) {
    var re = new RegExp('^' + ids[i] + '[#.]');
    var cons = 'new ' + ids[i];
    for (var j = i + 1; j < nids; ++j) {
      if (ids[j].match(re)) {
        tree[ids[j]].parent = ids[i];
      } else if (ids[j] === cons) {
        //tree[ids[j]].parent = ids[i];
        //tree[ids[i]].new = ids[j];
      }
    }
    if (tree[cons]) {
      tree[cons].parent = ids[i];
    }
  }

  // distribute methods and properties
  for (var id in tree) {
    var d = tree[id];

    // aliases
    if (d.alias_of && tree[d.alias_of]) {
      tree[d.alias_of].aliases.push(d.id);
    }

    // namespaces hierarchy
    if (d.type === 'namespace') {
      if (d.parent && tree[d.parent]) {
        tree[d.parent].namespaces.push(d.id);
      }
    }

    // classes hierarchy
    if (d.type === 'class') {
      if (d.superclass && tree[d.superclass]) {
        tree[d.superclass].subclasses.push(d.id);
      }
      if (d.parent && tree[d.parent]) {
        tree[d.parent].classes.push(d.id);
      }
    }

    // members
    if (d.type === 'method' || d.type === 'property' || d.type === 'constant') {
      var register_in_parent_key = d.type === 'method' ? 'methods' : 'properties';
      if (d.id[0] === '$') {
        d.type = 'utility';
        register_in_parent_key = 'utilities';
        if (d.section && tree[d.section]) {
          tree[d.section][register_in_parent_key].push(d.id);
        }
      } else {
        if ((~d.id.indexOf('#'))) {
          d.type = 'instance ' + d.type;
          if (d.parent) {
            tree[d.parent]['instance_' + register_in_parent_key].push(d.id);
            if (d.bound) {
              d.functionalized_self = d.parent;
            }
          }
        } else {
          d.type = 'class ' + d.type;
          if (d.parent) {
            tree[d.parent]['class_' + register_in_parent_key].push(d.id);
            if (d.bound) {
              d.methodized_self = d.id;
            }
          }
        }
      }
    }

    // short names and paths
    if (d.type === 'section' || d.type === 'namespace' || d.type === 'class' || d.type === 'mixin') {
      d.name = d.id.replace(/^.*[.]/, '');
      d.path = d.id;
    } else if (d.type === 'constructor') {
      d.name = 'new';
      d.path = d.parent + '/new';
    } else if (~d.type.indexOf('class ')) {
      d.name = d.id.replace(/^.*[.]/, '');
      d.path = d.parent + '/' + d.name;
    } else if (~d.type.indexOf('instance ')) {
      d.name = d.id.replace(/^.*[#]/, '');
      d.path = d.parent + '/prototype/' + d.name;
    } else if (d.type === 'utility') {
      d.name = d.id;
      d.path = d.name;
    } else {
      throw 'Unknown document type: ' + d.type;
    }

  }

  this.tree = tree;
}

NDoc.prototype.toJSON = function(options) {
  return JSON.stringify({
    tree: this.tree,
    packageName: options.packageName,
    packageVersion: options.packageVersion,
    date: (new Date).toUTCString(),
    readme: options.index,
    src_code_text: options.viewSourceLabel,
    src_code_href: options.linkFormat,
  });
};

NDoc.prototype.toHTML = function(options) {

  var Jade = require('jade');
  var md2html = require('marked');
  //var md2html = require('robotskirt').toHtmlSync;

  var path = Util.join(options.skin, 'templates', 'layout.jade');
  var str = Util.read(path);
  var fn = Jade.compile(str, {
    filename: path,
    pretty: false
  });

  var tree = this.tree;
  var sections = [];

  for (var i in tree) {
    var obj = tree[i];
    // path should be HTML valid id
    obj.path = obj.path.replace(/\//g, '-');
    // collect children
    obj.children = ['new ' + obj.id]
      .concat(obj.namespaces || [])
      .concat(obj.classes || [])
      .concat(obj.mixins || [])
      .concat(obj.utilities || [])
      .concat(obj.constants || [])
      .concat(obj.class_methods || [])
      .concat(obj.class_properties || [])
      .concat(obj.instance_methods || [])
      .concat(obj.instance_properties || [])
      .map(function(id) {
        return tree[id];
      })
      .filter(function(x) {
        return !!x;
      });
    // collect sections
    if (obj.type === 'section') {
      sections.push(obj.id);
    }
    ///console.log(i);
  }

  function link(obj, short, classes) {
    if (typeof obj === 'string') obj = tree[obj] || {id: obj, name: obj, path: obj, type: ''};
    var r = '<a href="#' + obj.path + '" class="' + (classes||[]).join(' ') + '" title="' + obj.id + ' (' + obj.type + ')" data-id="' + obj.id + '">';
    r += short ? obj.name : obj.id;
    r += '</a>';
    return r;
  }

  // convert markdown to HTML
  function markdown(text) {
    if (text == null) console.error('NULL');
    //return md2html(text)//.toString('utf8')
    var r = md2html(text)//.toString('utf8')
    return r;
  }

  // given signature object, recompose its textual representation
  // FIXME: move to templates?
  function signature(obj, sig) {
    if (typeof obj === 'string') obj = tree[obj];
    var r = obj.id;
    if (sig.args) {
      r += '(';
      sig.args.forEach(function(arg, idx, args) {
        var a = arg.name;
        if (obj.bound && !idx) a = '@' + a;
        if (arg.default_value) a = a + ' = ' + arg.default_value;
        if (idx) a = ', ' + a;
        if (arg.ellipsis) a += '...';
        if (arg.optional) a = '[' + a + ']';
        r += a;
      });
      r += ')';
    }
    return r;
  }

  var vars = {
    tree: this.tree,
    packageName: options.packageName,
    packageVersion: options.packageVersion,
    date: (new Date).toUTCString(),
    readme: options.index,
    sections: sections,
    src_code_text: options.viewSourceLabel,
    src_code_href: options.linkFormat,
    link: link,
    markdown: markdown,
    signature: signature
  };

  var html = fn(vars);
  return html;
};
