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
// read source files and compose the documentation tree
//
function NDoc(files, options) {

  // options
  this.options = extend({
  }, options)

  // documentation tree consists of sections, which are populated with documents
  var list = {
    '': {
      id: '',
      type: 'section',
      children: [],
      description: '',
      short_description: ''
    }
  };

  // parse specified source files
  files.forEach(function(file) {
    console.log('Compiling file', file);

    // parse file
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
      // do pre-distribute early work
      for (var id in ndocs) {
        var d = ndocs[id];
        // FIXME: reconcile id clashes. E.g. prototype has 'Ajax' section and 'Ajax' namespace
        /***if (sections[d.id]) {
          console.error('ID clash: id=%s, new type=%s, old type=%s', id);
        }***/
        // assign hierarchy helpers
        d.aliases = [];
        d.children = [];
        if (d.type === 'class') {
          //d.superclass = null;
          d.subclasses = [];
        }
        // collect sections
        if (d.type === 'section') {
          list[d.id] = d;
        // collect flat list
        } else {
          list[(d.section || '') + '.' + d.id] = d;
        }
        // compose links to source files
        d.href = options.formatLink(file, d.line);
      }
    } catch(err) {
      console.error('FATAL:', file, err.message || err);
      process.exit(1);
    }
  });

  // for each document with undefined section try to guess the section
  // E.g. for ".Ajax.Updater" we try to find "SECTION.Ajax" element.
  // If found, rename ".Ajax.Updater" to "SECTION.Ajax.Updater"
  var t = Object.keys(list).sort();
  var parted = t.map(function(id) {
    return id.split(/[.#]/);
  });
  var len = parted.length;
  // N.B. starting with 1 we skip "" section
  for (var idx = 1; idx < len; ++idx) {
    if (parted[idx][0] !== '') continue;
    for (var i = idx + 1; i < len; ++i) {
      if (parted[idx][1] === parted[i][1] && parted[i][0] !== '') {
        var p = t[idx];
        // prefix with guessed section
        t[idx] = parted[i][0] + t[idx];
        //if (!p) console.log('RENAME [%s] -> [%s]', p, t[idx], parted[idx], parted[i]);
        // update flat list element, since key and value's id has been changed
        var g = list[p];
        delete list[p];
        g.id = p = t[idx];
        list[p] = g;
        break;
      }
    }
  }

  var tree = {};
  // sort elements in case-insensitive manner
  t = t.sort(function(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a === b ? 0 : a < b ? -1 : 1;
  });
  t.forEach(function(id) {
    tree[id] = list[id];
  });


  // rebuild the tree from the end to beginning.
  // N.B. since the list we iterate over is sorted, we can determine precisely
  // the parent of any element.
  for (var i = t.length; --i >= 1; ) {
    var id = t[i];
    // parent name is this element's name without portion after the last '.' or '#'
    var idx = Math.max(id.lastIndexOf('.'), id.lastIndexOf('#'));
    // no '.' or '#' found? this is top level section. just skip it
    if (idx < 0) continue;
    // extract parent name
    var pid = id.substring(0, idx);
    // get parent element
    var p = tree[pid];
    // no parent element? skip this
    if (!p) continue;
    // parent element found. move this element to parent's children list, maintaing order
    p.children.unshift(tree[id]);
    //tree[id].parent = pid;
    delete tree[id];
  }

  // cleanup list
  for (var id in list) {
    var d = list[id];
    delete list[id];
    d.id = id.replace(/^[^.]*\./, '');
    d.name = d.id.replace(/^.*[.#]/, '');
    // sections have different ids, to not clash with other elements
    if (d.type === 'section') d.id = d.id.toLowerCase();
    d.path = d.id.replace(/#/g, '.prototype.');
    delete d.section;
    // we prune sections from list
    if (d.type === 'section') {
      continue;
    }
    //delete d.children;
    list[d.id] = d;
  }

  // distribute methods and properties
  for (var id in list) {
    var d = list[id];

    // aliases
    if (d.alias_of && list[d.alias_of]) {
      list[d.alias_of].aliases.push(d.id);
    }

    // classes hierarchy
    if (d.type === 'class') {
      //if (d.superclass) console.log('SUPER', id, d.superclass)
      if (d.superclass && list[d.superclass]) {
        list[d.superclass].subclasses.push(d.id);
      }
    }

    // methods and properties
    if (d.type === 'method' || d.type === 'property') {
      if (d.id.match(/^\$/)) {
        d.type = 'utility';
      }
      if ((~d.id.indexOf('#'))) {
        d.type = 'instance ' + d.type;
        if (d.parent && d.bound) {
          // FIXME: parent is not defined!
          d.functionalized_self = d.parent;
        }
      } else if ((~d.id.indexOf('.'))) {
        d.type = 'class ' + d.type;
        if (d.bound) {
          d.methodized_self = d.id;
        }
      }
    // constructor
    } else if (d.type === 'constructor') {
      d.id = 'new ' + d.id.replace(/\.new$/, '');
    }

  }

  // convert sections to children array of tree top level
  var children = [];
  for (var id in tree) {
    if (id === '') {
      children = children.concat(tree[id].children);
    } else {
      children.push(tree[id]);
    }
    delete tree[id];
  }
  tree.children = children;

  // store tree and flat list
  this.list = list;
  this.tree = tree;
}

NDoc.prototype.toJSON = function(options) {
  var list = {};
  for (var id in this.list) {
    var d = this.list[id];
    list[id] = {
      id: d.id,
      type: d.type,
      name: d.name,
      path: d.path,
      parent: d.parent,
      section: d.section,
    };
  }
  return JSON.stringify({
    list: this.list,
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

  var path = Util.join(options.skin, 'templates', 'layout.jade');
  var str = Util.read(path);
  var fn = Jade.compile(str, {
    filename: path,
    //pretty: false
  });

  var list = this.list;

  for (var i in list) {
    var obj = list[i];
    // path should be HTML valid id
    obj.path = obj.path.replace(/\//g, '-');
  }

  function link(obj, short, classes) {
    if (typeof obj === 'string') obj = list[obj] || {id: obj, name: obj, path: obj, type: ''};
    var id = obj.id;//.replace(/^[^.]+\./, '');
    var r = '<a href="#' + obj.path + '" class="' + (classes||[]).join(' ') + '" title="' + id + ' (' + obj.type + ')" data-id="' + obj.id + '">';
    r += short ? obj.name : id;
    r += '</a>';
    return r;
  }

  // convert markdown to HTML
  function markdown(text) {
    if (text == null) console.error('NULL');
    //if (!text) text = '@@@EMPTY@@@';
    //var r = ''+md2html(text);
    var r = md2html(text);
    return r;
  }

  // given signature object, recompose its textual representation
  // FIXME: move to templates?
  function signature(obj, sig) {
    if (typeof obj === 'string') obj = list[obj];
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
    list: this.list,
    tree: this.tree,
    packageName: options.packageName,
    packageVersion: options.packageVersion,
    date: (new Date).toUTCString(),
    readme: options.index,
    src_code_text: options.viewSourceLabel,
    src_code_href: options.linkFormat,
    link: link,
    markdown: markdown,
    signature: signature
  };

  var html = fn(vars);
  return html;
};
