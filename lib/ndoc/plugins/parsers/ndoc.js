/** internal, section: Plugins
 *  Parsers.ndoc(NDoc) -> Void
 *
 *  Registers NDoc parser as `ndoc`.
 *
 *
 *  ##### Example
 *
 *      doc.parse('ndoc', options);
 **/


'use strict';


// stdlib
var fs = require('fs');


// 3rd-party
var _ = require('underscore');


// internal
var interpolate = require('../../common').interpolate;
var extend      = require('../../common').extend;
var ndoc_parser = require('./ndoc/parser');


////////////////////////////////////////////////////////////////////////////////


var parser_func = function (ndoc, options) {
  var list, tree, parted, sections, children;

  // documentation tree consists of sections, which are populated with documents
  list = {
    // root section node
    '': {
      id: '',
      type: 'section',
      children: [],
      description: '',
      short_description: ''
    }
  };

  // parse specified source files
  ndoc.files.forEach(function (file) {
    console.log('Compiling file', file);

    var text, nodes;

    text = fs.readFileSync(file, 'utf8');

    // TODO: consider amending failing document inplace.
    // Say, if it doesn't parse, insert a fake '*' line at failing `line` and retry

    nodes = ndoc_parser.parse(text);

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
    var // parent name is this element's name without portion after
        // the last '.' for class member, '#' for instance member,
        // or '@' for events
        idx = Math.max(id.lastIndexOf('.'), id.lastIndexOf('#'), id.lastIndexOf('@')),
        // get parent element
        parent = tree[id.substring(0, idx)];

    // no '.' or '#' found? this is top level section. just skip it
    // no parent? skip it as well
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
    delete list[id];

    // compose new id
    node.id   = id.replace(/^[^.]*\./, '');
    node.name = node.id.replace(/^.*[.#@]/, '');

    // sections have lowercased ids, to not clash with other elements
    if ('section' === node.type) {
      node.id = node.id.toLowerCase();
    }

    // prototype members have different paths
    // events have different paths as well
    node.path = node.id.replace(/#/g, '.prototype.').replace(/@/g, '.event.');
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

      if (node.id.indexOf('#') >= 0) {
        node.type = 'instance ' + node.type;
        return;
      }

      if (node.id.indexOf('.') >= 0) {
        node.type = 'class ' + node.type;
        return;
      }

      if (node.id.indexOf('@') >= 0) {
        node.type = 'event';
        return;
      }
    }
  });

  // tree is hash of sections.
  // convert sections to uniform children array of tree top level
  children = [];

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
  ndoc.list = list;
  ndoc.tree = tree;
};


////////////////////////////////////////////////////////////////////////////////


module.exports = function (NDoc) {
  NDoc.registerParser('ndoc', parser_func);
};
