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
    var ndocs = parser.parse(Util.read(file));
    for (var id in ndocs) {
      ndocs[id].href = options.formatLink(file, ndocs[id].line);
      var d = tree[id] = ndocs[id];
      d.aliases = [];
      if (d.type === 'namespace' || d.type === 'class' || d.type === 'mixin') {
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
    if (d.alias_of) {
      tree[d.alias_of].aliases.push(d.id);
    }

    // classes hierarchy
    if (d.type === 'class') {
      if (d.superclass) {
        tree[d.superclass].subclasses.push(d);
      }
    }

    // members
    if (d.type === 'method' || d.type === 'property' || d.type === 'constant') {
      var register_in_parent_key = d.type === 'method' ? 'methods' : 'properties';
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
    sections: [],
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
    pretty: true
  });

  var tree = this.tree;
  for (var i in tree) {
    var obj = tree[i];
    // path should be HTML valid id
    obj.path = obj.path.replace(/\//g, '-');
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
    ///console.log(i);
    // TODO: remove
    obj.deprecated = obj.type === 'class' ? true : obj.type === 'instance method' ? {since: '123'} : {since: '246', off: '369'};
  }

  // convert markdown to HTML, with some sugar
  function markdown(text) {
    var r = md2html(text)//.toString('utf8')
      // honor [[method-id]] short links
      // TODO!
      //.replace(/\[\[(.+?)\]\]/g, function(all, id) { return link(id, true); });
    return r;
  }

  // given signature object, recompose its textual representation
  // TODO: move to templates
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
    /*if (sig.returns) {
      r += ' &rarr; ' + sig.returns.join(' | ');
    }*/
    return r;
  }

  var vars = {
    tree: this.tree,
    packageName: options.packageName,
    packageVersion: options.packageVersion,
    date: (new Date).toUTCString(),
    readme: options.index,
    sections: [],
    src_code_text: options.viewSourceLabel,
    src_code_href: options.linkFormat,
    markdown: markdown,
    signature: signature
  };

  var html = fn(vars);
  return html;
};
