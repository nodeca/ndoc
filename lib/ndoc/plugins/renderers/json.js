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
 **/


'use strict';


// stdlib
var fs = require('fs');


////////////////////////////////////////////////////////////////////////////////


module.exports = function (NDoc) {
  NDoc.registerRenderer('json', function render_json(ast, options, callback) {
    fs.writeFile(options.output, JSON.stringify({
      list: ast.list,
      tree: ast.tree,
      date: (new Date()).toUTCString()
    }), callback);
  });
};
