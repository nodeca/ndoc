/**
 * class NDoc
 *
 * Handles documentation tree.
 **/


'use strict';


// stdlib
var Fs    = require('fs');
var Path  = require('path');


// 3rd-party
var _ = require('underscore');


// internal
var extend    = require('./ndoc/common').extend;
var parser    = require('./ndoc/parsers/javascript');
var renderers = require('./ndoc/renderers');


////////////////////////////////////////////////////////////////////////////////


/**
 * new NDoc(files, options)
 * - files (Array): array of source file paths
 * - options (Hash): controlling options
 *
 * Read source `files` and compose the documentation tree.
 *
 *
 * ##### Options
 *
 * - **formatLink** (Function): Generates link to the source file.
 *   Called with `(file, line)` arguments.
 **/
var NDoc = module.exports = function NDoc(files, options) {
  // TODO: cleanup NDoc constructor

  // options
  this.options = extend({}, options);

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
      text = Fs.readFileSync(file, 'utf8');
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
    return id.split(/[.#@]/);
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
    // parent name is this element's name without portion after
    // the last '.' for class member, '#' for instance member,
    // or '@' for events
    idx = Math.max(id.lastIndexOf('.'), id.lastIndexOf('#'), id.lastIndexOf('@'));
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
      d.name = d.id.replace(/^.*[.#@]/, '');
      // sections have lowercased ids, to not clash with other elements
      if (d.type === 'section') {
        d.id = d.id.toLowerCase();
      }
      // prototype members have different paths
      // events have different paths as well
      d.path = d.id.replace(/#/g, '.prototype.').replace(/@/g, '.event.');
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
        } else if (d.id.indexOf('@') >= 0) {
          // FIXME: shouldn't it be assigned by parser?
          d.type = 'event';
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
};


/**
 *  NDoc#render(name, options, callback) -> Void
 *  - name (String): Renderer name
 *  - options (Object): Renderer options
 *  - callback (Function): Notifies rendering is finished with `callback(err)`
 *
 *  Execute `name` renderer with given options.
 **/
NDoc.prototype.render = function (name, options, callback) {
  if (!renderers[name]) {
    callback("Unknown renderer: " + name);
    return;
  }

  renderers[name](this, options, callback);
};


/**
 *  NDoc.cli -> ArgumentParser
 **/
NDoc.cli = require('./ndoc/cli');


/**
 *  NDoc.VERSION -> String
 *
 *  NDoc version.
 **/
NDoc.VERSION = require('./ndoc/version');


/**
 *  NDoc.use(plugin) -> Void
 *  - plugin (Function): Infection `plugin(NDocClass)`
 *
 *  Runs given `plugin` against NDoc base class.
 *
 *
 *  ##### Examples
 *
 *      NDoc.use(require('my-renderer'));
 **/
NDoc.use = function use(plugin) {
  plugin(this);
};


/**
 *  NDoc.registerRenderer(name, func) -> Void
 *  - name (String): Name of the renderer, e.g. `'html'`
 *  - func (Function): Renderer function `func(ndocInstance, options, callback)`
 *
 *  Registers given function as `name` renderer.
 **/
NDoc.registerRenderer = function (name, func) {
  renderers[name] = func;
};


//
// require base plugins
//


NDoc.use(require(__dirname + '/ndoc/plugins/renderers/html'));
NDoc.use(require(__dirname + '/ndoc/plugins/renderers/json'));
