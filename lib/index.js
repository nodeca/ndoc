'use strict';

var Util = require('./util');

//
// create and load parser
//
var parser;
try {
  parser = require('./parser');
} catch (err) {
  (function () {
    var Jison = require('jison'),
      grammar = require('jison/lib/jison/bnf').parse(Util.read(Util.join(__dirname, 'parser.y')));
    Util.write(Util.join(__dirname, 'parser.js'), (new Jison.Parser(grammar)).generate());
  }());
  parser = require('./parser');
}

//
// helpers
//
function extend(o, plus) {
  var r = {}, i;
  for (i in o) {
    if (o.hasOwnProperty(i)) {
      r[i] = o[i];
    }
  }
  if (plus) {
    for (i in plus) {
      if (plus.hasOwnProperty(i)) {
        r[i] = plus[i];
      }
    }
  }
  return r;
}

/**
 * class NDoc
 *
 * Handles documentation tree.
 **/

/**
 * new NDoc(files, options)
 * - files (Array): array of source file paths
 * - options (Hash): controlling options
 *
 * Read source `files` and compose the documentation tree.
 **/
function NDoc(files, options) {

  // options
  this.options = extend({
  }, options);

  // documentation tree consists of sections, which are populated with documents
  var list = {
    '': {
      id: '',
      type: 'section',
      children: [],
      description: '',
      short_description: ''
    }
  }, t, parted, len, i, id, idx, p, pid, d, g, tree, children;

  // parse specified source files
  files.forEach(function (file) {
    console.log('Compiling file', file);

    // parse file
    var text, ndocs, id, d, d1;
    try {
      text = Util.read(file);
      // TODO: consider amending failing document inplace.
      // Say, if it doesn't parse, insert a fake '*' line at failing `line` and retry
      ndocs = parser.parse(text);
      // do pre-distribute early work
      for (id in ndocs) {
        if (ndocs.hasOwnProperty(id)) {
          d = ndocs[id];
          // assign hierarchy helpers
          d.aliases = [];
          d.children = [];
          if (d.type === 'class') {
            d.subclasses = [];
          }
          // collect sections
          if (d.type === 'section') {
            list[d.id] = d;
          // collect flat list
          } else {
            // elements with undefined section get '' section,
            // and will be resolved later, when we'll have full
            // element list
            list[(d.section || '') + '.' + d.id] = d;
            // bound methods produce two methods with the same description but different signatures
            // E.g. Element.foo(@element, a, b) becomes
            // Element.foo(element, a, b) and Element#foo(a, b)
            if (d.type === 'method' && d.bound) {
              d1 = extend(d);
              d1.id = d.id.replace(/(.+)\.(.+)/, '$1#$2');
              // link to methods
              d.bound = d1.id;
              d1.bound = d.id;
              // insert bound method clone
              list[(d.section || '') + '.' + d1.id] = d1;
            }
          }
          // compose links to source files
          if (options.formatLink) {
            d.href = options.formatLink(file, d.line);
          }
        }
      }
    } catch (err) {
      console.error('FATAL:', file, err.message || err);
      process.exit(1);
    }
  });

  // TODO: section.related_to should mark related element as belonging to the section
  /*for (id in list) {
    var d = list[id];
    if (d.type === 'section' && d.related_to && list['.' + d.related_to]) {
      var d1 = list['.' + d.related_to];
      d1.id = d.id + '.' + d.related_to;
      delete list['.' + d.related_to];
      list[d1.id] = d1;
    }
  }*/

  // for each element with undefined section try to guess the section
  // E.g. for ".Ajax.Updater" we try to find "SECTION.Ajax" element.
  // If found, rename ".Ajax.Updater" to "SECTION.Ajax.Updater"
  t = Object.keys(list).sort();
  parted = t.map(function (id) {
    return id.split(/[.#]/);
  });
  len = parted.length;
  // N.B. starting with 1 we skip "" section
  for (idx = 1; idx < len; idx += 1) {
    if (parted[idx][0] === '') {
      for (i = idx + 1; i < len; i += 1) {
        if (parted[idx][1] === parted[i][1] && parted[i][0] !== '') {
          p = t[idx];
          // prefix with guessed section
          t[idx] = parted[i][0] + t[idx];
          //if (!p) console.log('RENAME [%s] -> [%s]', p, t[idx], parted[idx], parted[i]);
          // update flat list element, since key and value's id has been changed
          g = list[p];
          delete list[p];
          g.id = p = t[idx];
          list[p] = g;
          break;
        }
      }
    }
  }

  // sort elements in case-insensitive manner
  tree = {};
  t = t.sort(function (a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a === b ? 0 : a < b ? -1 : 1;
  });
  t.forEach(function (id) {
    tree[id] = list[id];
  });


  // rebuild the tree from the end to beginning.
  // N.B. since the list we iterate over is sorted, we can determine precisely
  // the parent of any element.
  for (i = t.length - 1; i >= 1; i -= 1) {
    id = t[i];
    // parent name is this element's name without portion after the last '.' or '#'
    idx = Math.max(id.lastIndexOf('.'), id.lastIndexOf('#'));
    // no '.' or '#' found? this is top level section. just skip it
    if (idx >= 0) {
      // extract parent name
      pid = id.substring(0, idx);
      // get parent element
      p = tree[pid];
      // no parent element? skip this
      if (p) {
        // parent element found. move this element to parent's children list, maintaing order
        p.children.unshift(tree[id]);
        //tree[id].parent = pid;
        delete tree[id];
      }
    }
  }

  // cleanup list, reassign right ids after we resolved
  // to which sections every element belongs
  for (id in list) {
    if (list.hasOwnProperty(id)) {
      d = list[id];
      delete list[id];
      // compose new id
      d.id = id.replace(/^[^.]*\./, '');
      d.name = d.id.replace(/^.*[.#]/, '');
      // sections have lowercased ids, to not clash with other elements
      if (d.type === 'section') {
        d.id = d.id.toLowerCase();
      }
      // prototype members have different paths
      d.path = d.id.replace(/#/g, '.prototype.');
      delete d.section;
      // prune sections from list
      if (d.type !== 'section') {
        //delete d.children;
        list[d.id] = d;
      }
    }
  }

  // assign aliases, subclasses, constructors
  // correct method types (class or entity)
  for (id in list) {
    if (list.hasOwnProperty(id)) {
      d = list[id];

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
        if (d.id.indexOf('#') >= 0) {
          d.type = 'instance ' + d.type;
        } else if (d.id.indexOf('.') >= 0) {
          d.type = 'class ' + d.type;
        }
      // constructor
      } else if (d.type === 'constructor') {
        d.id = 'new ' + d.id.replace(/\.new$/, '');
      }
    }
  }

  // tree is hash of sections.
  // convert sections to uniform children array of tree top level
  children = [];
  for (id in tree) {
    if (tree.hasOwnProperty(id)) {
      if (id === '') {
        children = children.concat(tree[id].children);
      } else {
        children.push(tree[id]);
      }
      delete tree[id];
    }
  }
  tree.children = children;

  // store tree and flat list
  this.list = list;
  this.tree = tree;
}

/**
 * NDoc#toJSON(options) -> String
 *
 * Renders this documentation tree to JSON string.
 **/
NDoc.prototype.toJSON = function (options) {
  var list = {}, id, d;
  for (id in this.list) {
    if (this.list.hasOwnProperty(id)) {
      d = this.list[id];
      list[id] = {
        id: d.id,
        type: d.type,
        name: d.name,
        path: d.path,
        parent: d.parent,
        section: d.section,
      };
    }
  }
  return JSON.stringify(extend(options, {
    list: this.list,
    tree: this.tree,
    date: (new Date()).toUTCString(),
  }));
};

/**
 * NDoc#toHTML(options) -> String
 *
 * Renders this documentation tree to HTML string.
 **/
NDoc.prototype.toHTML = function (options) {

  var Jade = require('jade'),
    md2html = require('marked'),

  // prepare rendering function
  // TODO: store it for further reuse, and get rid of jade dependency?
    path = Util.join(options.skin, 'templates', 'layout.jade'),
    str = Util.read(path),
    fn = Jade.compile(str, {
      filename: path,
      pretty: false
    }),

  // it's illegal to have slashes in HTML elements ids.
  // replace them with dashes
    list = this.list,
    id,
    obj,
    vars,
    html;

  for (id in list) {
    if (list.hasOwnProperty(id)) {
      obj = list[id];
      // path should be HTML valid id
      obj.path = obj.path.replace(/\//g, '-');
    }
  }

  // render link
  // N.B. logic is way tricky to move to templates.
  // beside, this function is used as parameter in some Array#map() operations
  function link(obj, short, classes) {
    if (typeof obj === 'string') {
      obj = list[obj] || {id: obj};
    }
    // broken link. `options.brokenLinks` define action
    if (!obj.path) {
      return obj.id;
      /*if (options.brokenLinks === 'throw') {
        throw 'Link is broken: ' + obj.id;
      }
      return options.brokenLinks === 'show' ? '[[' + obj.id + ']]' : obj.id;*/
    }
    //
    var r = '<a href="#' + obj.path
      + '" class="' + (classes || []).join(' ')
      + '" title="' + obj.id + (obj.type ? ' (' + obj.type + ')' : '')
      + '" data-id="' + obj.id + '">';
    r += typeof short === 'string' ? short : short ? obj.name : obj.id;
    r += '</a>';
    return r;
  }

  // convert markdown to HTML
  function markdown(text, inline) {
    var r = text,
      codes;
    // render markdown
    r = md2html(r);
    /* fixed
    // restore &entities;
    r = r.replace(/&amp;(\w+);/g, function (all, entity) {
      return '&' + entity + ';';
    });
    */
    /* considered wrong
    // trim content in <pre><code> CONTENT </code></pre>
    r = r.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, function (all, content) {
      return '<pre><code>' + content.trim() + '</code></pre>';
    });
    */
    // FIXME: highlight code
    /*r = r.replace(/<code>([\s\S]*?)<\/code>/g, function (all, content) {
      return '<code>' + highlight(content) + '</code>';
    });*/
    // inline markdown means to strip enclosing tag. <p /> in this case
    if (inline) {
      r = r.slice(3, -4);
    }
    // desugar [[foo#bar]] tokens into local links
    // N.B. in order to not apply conversion in <code> blocks,
    // we first store replace code blocks with nonces
    codes = {};
    r = r.replace(/(<code>[\s\S]*?<\/code>)/g, function (all, def) {
      var nonce = Math.random().toString().substring(2);
      codes[nonce] = def;
      return '@-=@=-@' + nonce + '@-=@=-@';
    });
    // convert [[link]] to links
    r = r.replace(/\[\[([\s\S]+?)\]\]/g, function (all, def) {
      def = def.split(/\s+/);
      id = def.shift();
      // invalid references don't produce links
      if (!list[id]) {
        if (options.brokenLinks === 'throw') {
          throw 'Link is broken: ' + all + '\n' + r;
        }
        return options.brokenLinks === 'show' ? all : id;
      }
      //
      var obj = extend(list[id], {
        name: def.join(' ') || id
      });
      return link(obj, true, ['link-short']);
    });
    // restore code blocks, given previously stored nonces
    r = r.replace(/@-=@=-@(\d+)@-=@=-@/g, function (all, nonce) {
      return codes[nonce];
    });
    //
    return r;
  }

  // given signature object, recompose its textual representation
  function signature(obj, sig) {
    if (typeof obj === 'string') {
      obj = list[obj];
    }
    var r = obj.id;
    if (sig.args) {
      r += '(';
      sig.args.forEach(function (arg, idx, args) {
        var skip_first, a;
        // skip the first bound argument for prototype methods
        skip_first = obj.bound && obj.id.indexOf('#') >= 0;
        a = arg.name;
        // argument can be callback
        if (arg.args) {
          a = signature({id: a}, arg);
        }
        if (!idx && skip_first) {
          return; //a = '@' + a;
        }
        if (arg.default_value) {
          a = a + ' = ' + JSON.stringify(arg.default_value);
        }
        // compensate for possibly skipped first argument
        if (idx > (skip_first ? 1 : 0)) {
          a = ', ' + a;
        }
        if (arg.ellipsis) {
          a += '...';
        }
        if (arg.optional) {
          a = '[' + a + ']';
        }
        r += a;
      });
      r += ')';
    }
    return r;
  }

  // collect context for rendering function
  vars = extend(options, {
    list: this.list,
    tree: this.tree,
    date: (new Date()).toUTCString(),
    //--
    link: link,
    markdown: markdown,
    signature: signature
  });

  // render HTML
  html = fn(vars);
  return html;
};

//
// export ndoc
//
module.exports = NDoc;
