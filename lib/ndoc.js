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
 *  new NDoc(files, options)
 *  - files (Array): array of source file paths
 *  - options (Hash): controlling options
 *
 *  Read source `files` and compose the documentation tree.
 *
 *
 *  ##### Options
 *
 *  - **formatLink** (Function): Generates link to the source file.
 *    Called with `(file, line)` arguments.
 **/
var NDoc = module.exports = function NDoc(files, options) {
  var list, tree, parted, sections;
  // TODO: cleanup NDoc constructor

  // options
  this.options = extend({}, options);

  // documentation tree consists of sections, which are populated with documents
  list = {
    '': {
      id: '',
      type: 'section',
      children: [],
      description: '',
      short_description: ''
    }
  };

  // parse specified source files
  files.forEach(function (file) {
    console.log('Compiling file', file);

    try {
      var text, nodes;

      text = Fs.readFileSync(file, 'utf8');

      // TODO: consider amending failing document inplace.
      // Say, if it doesn't parse, insert a fake '*' line at failing `line` and retry

      nodes = parser.parse(text);

      // do pre-distribute early work
      _.each(nodes, function (node, id) {
        var clone;

        // assign hierarchy helpers
        node.aliases  = [];
        node.children = [];

        if ('class' === node.type) {
          node.subclasses = [];
        }

        // compose links to source files
        if (options.formatLink) {
          node.href = options.formatLink(file, node.line);
        }

        // collect sections
        if ('section' === node.type) {
          list[node.id] = node;
          return;
        }

        // elements with undefined section get '' section,
        // and will be resolved later, when we'll have full
        // element list
        list[(node.section || '') + '.' + node.id] = node;

        // bound methods produce two methods with the same description but different signatures
        // E.g. Element.foo(@element, a, b) becomes
        // Element.foo(element, a, b) and Element#foo(a, b)
        if ('method' === node.type && node.bound) {
          clone = extend(node);
          clone.id = node.id.replace(/(.+)\.(.+)/, '$1#$2');

          // link to methods
          node.bound = clone.id;
          clone.bound = node.id;

          // insert bound method clone
          list[(node.section || '') + '.' + clone.id] = clone;
        }
      });
    } catch (err) {
      console.error('FATAL:', file, err.stack || err.message || err);
      process.exit(1);
    }
  });

  // TODO: section.related_to should mark related element as belonging to the section
  //_.each(list, function (node, id) {
  //  var ref_id = '.' + node.related_to, ref;
  //  if ('section' === node.type && node.related_to && list[ref_id]) {
  //    ref = list[ref_id];
  //    ref.id = node.id + '.' + node.related_to;
  //    delete list[ref_id];
  //    list[ref.id] = ref;
  //  }
  //});


  //
  // for each element with undefined section try to guess the section
  // E.g. for ".Ajax.Updater" we try to find "SECTION.Ajax" element.
  // If found, rename ".Ajax.Updater" to "SECTION.Ajax.Updater"
  //


  // prepare list of sections
  // N.B. starting with 1 we skip "" section
  parted = _.keys(list).sort().slice(1).map(function (id) {
    return {id: id, parted: id.split(/[.#@]/), node: list[id]};
  });

  _.each(parted, function (data) {
    var found;

    // leave only ids without defined section
    if ('' !== data.parted[0]) {
      return;
    }

    found = _.find(parted, function (other) {
      return !!other.parted[0] && other.parted[1] === data.parted[1];
    });

    if (found) {
      delete list[data.id];

      data.node.id    = found.parted[0] + data.id;
      data.parted[0]  = found.parted[0];

      list[data.node.id] = data.node;
    }
  });

  // sort elements in case-insensitive manner
  tree = {};

  sections = _.keys(list).sort(function (a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a === b ? 0 : a < b ? -1 : 1;
  });

  sections.forEach(function (id) {
    tree[id] = list[id];
  });

  // rebuild the tree from the end to beginning.
  // N.B. since the list we iterate over is sorted, we can determine precisely
  // the parent of any element.
  _.each(sections.slice(0).reverse(), function (id) {
    var idx, parent;

    // parent name is this element's name without portion after
    // the last '.' for class member, last '#' for instance member,
    // or first '@' for events
    // first check for event, because event name can contain '.', '#' and '@'
    idx = id.indexOf('@');

    if (idx === -1) {
      idx = Math.max(id.lastIndexOf('.'), id.lastIndexOf('#'));
    }

    // get parent element
    parent = tree[id.substring(0, idx)];

    // no '.' or '#' or '@' found or no parent? -- top level section. skip it
    if (-1 === idx || !parent) {
      return;
    }

    // parent element found. move this element to parent's children list,
    // maintaing order
    parent.children.unshift(tree[id]);
    delete tree[id];
  });

  // cleanup list, reassign right ids after we resolved
  // to which sections every element belongs
  _.each(list, function (node, id) {
    var idx = node.id.indexOf('@'); // get position of @event start

    delete list[id];

    // compose new id
    node.id   = id.replace(/^[^.]*\./, '');

    // First check for event, because event name can contain '.' and '#'
    // Otherwise get property/method delimiter position
    if (idx === -1) {
      idx = Math.max(node.id.lastIndexOf('.'), node.id.lastIndexOf('#'));
    }

    node.name = (-1 === idx) ? node.id : node.id.substring(idx + 1);

    // sections have lowercased ids, to not clash with other elements
    if ('section' === node.type) {
      node.id = node.id.toLowerCase();
    }

    // prototype members have different paths
    node.path = node.id.replace(/#/g, '.prototype.');

    // events have different paths as well, but only first '@' separates event name
    node.path = node.path.replace(/@/, '.event.');

    delete node.section;

    // prune sections from list
    if ('section' !== node.type) {
      list[node.id] = node;
    }
  });

  // assign aliases, subclasses, constructors
  // correct method types (class or entity)
  _.each(list, function (node, id) {
    // aliases
    if (node.alias_of && list[node.alias_of]) {
      list[node.alias_of].aliases.push(node.id);
    }

    // classes hierarchy
    if ('class' === node.type) {
      //if (d.superclass) console.log('SUPER', id, d.superclass)
      if (node.superclass && list[node.superclass]) {
        list[node.superclass].subclasses.push(node.id);
      }

      return;
    }

    if ('constructor' === node.type) {
      node.id = 'new ' + node.id.replace(/\.new$/, '');
      return;
    }

    // methods and properties
    if ('method' === node.type || 'prototype' === node.type) {
      // FIXME: shouldn't it be assigned by parser?

      if (node.id.match(/^\$/)) {
        node.type = 'utility';
        return;
      }

      // first check for event, because event name can contain '.' and '#'
      if (node.id.indexOf('@') >= 0) {
        node.type = 'event';
        return;
      }

      if (node.id.indexOf('#') >= 0) {
        node.type = 'instance ' + node.type;
        return;
      }

      if (node.id.indexOf('.') >= 0) {
        node.type = 'class ' + node.type;
        return;
      }
    }
  });

  // tree is hash of sections.
  // convert sections to uniform children array of tree top level
  var children = [];

  _.each(tree, function (node, id) {
    if (id === '') {
      children = children.concat(node.children);
    } else {
      children.push(node);
    }

    delete tree[id];
  });

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
