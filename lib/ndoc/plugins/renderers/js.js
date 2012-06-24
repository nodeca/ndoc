'use strict';


// stdlib
var fs = require('fs');


// internal
var extend = require('../../common').extend;


////////////////////////////////////////////////////////////////////////////////


var renderer_func = function (ndoc, options, callback) {
  var list = {}, id, d, str;

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

  str = 'var ndoc = ' + JSON.stringify(extend(options, {
    list: ndoc.list,
    tree: ndoc.tree,
    date: (new Date()).toUTCString(),
  })) + ';';

  fs.writeFile(options.output, str, callback);
};


////////////////////////////////////////////////////////////////////////////////


module.exports = function (NDoc) {
  NDoc.registerRenderer('js', renderer_func);
};
