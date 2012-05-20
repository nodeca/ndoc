'use strict';


// stdlib
var fs = require('fs');


// internal
var extend = require('../common').extend;


////////////////////////////////////////////////////////////////////////////////


module.exports.name   = 'json';
module.exports.render = function (ndoc, options, callback) {
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

  fs.writeFile(options.output, JSON.stringify(extend(options, {
    list: ndoc.list,
    tree: ndoc.tree,
    date: (new Date()).toUTCString(),
  })), callback);
};
