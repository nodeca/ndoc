/** internal, section: Plugins
 *  Parsers.ndoc(NDoc) -> Void
 *
 *  Registers NDoc parser as `ndoc`.
 *
 *
 *  ##### Example
 *
 *      NDoc.parse('ndoc', files, options, function (err, ast) {
 *        // ...
 *      });
 *
 *
 *  ##### Options
 *
 *  - **formatLink** (Function): Generates link to the source file.
 *    Called with `(file, line)` arguments.
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


var parser_func = function (file, options, callback) {
  var source, nodes, list = {}, tree, parted, sections, children;

  source = fs.readFileSync(file, 'utf8');

  // TODO: consider amending failing document inplace.
  // Say, if it doesn't parse, insert a fake '*' line at failing `line` and retry

  nodes = ndoc_parser.parse(source);

  // do pre-distribute early work
  _.each(nodes, function (node, id) {
    var clone;

    // assign hierarchy helpers
    node.aliases  = [];
    node.children = [];

    // set source fiel of the node
    node.file = file;

    if ('class' === node.type) {
      node.subclasses = [];
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


  callback(null, list);
};


////////////////////////////////////////////////////////////////////////////////


module.exports = function (NDoc) {
  NDoc.registerParser('.js', parser_func);
};
