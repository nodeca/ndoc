/** internal, section: Plugins
 *  Renderers.json(NDoc) -> Void
 *
 *  Registers JSON renderer as `json`.
 *
 *
 *  ##### Example
 *
 *      NDoc.render('json', ast, options, function (err) {
 *        // ...
 *      });
 *
 *
 *  ##### Options
 *
 *  - **output** (String): File where to output rendered documentation.
 *  - **title** (String): Page title template.
 *    Default: `'{package.name} {package.version} API documentation'`
 **/


'use strict';


// stdlib
var fs = require('fs');


// 3rd-party
var _ = require('underscore');


////////////////////////////////////////////////////////////////////////////////


var renderer_func = function (ndoc, options, callback) {
  var list = {}, id, d;

  for (id in ndoc.list) {
    if (ndoc.list.hasOwnProperty(id)) {
      d = ndoc.list[id];
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

  fs.writeFile(options.output, JSON.stringify(_.extend({}, options, {
    list: ndoc.list,
    tree: ndoc.tree,
    date: (new Date()).toUTCString(),
  })), callback);
};


////////////////////////////////////////////////////////////////////////////////


module.exports = function (NDoc) {
  NDoc.registerRenderer('json', renderer_func);
};
