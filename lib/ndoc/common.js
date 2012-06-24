'use strict';


// FIXME: really strange kind of extend
module.exports.extend = function extend(o, plus) {
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
};


// FIXME: stupid interpolator
module.exports.interpolate = function interpolate(string, options) {
  return string
    .replace(/\{url\}/g, options.package.url || '')
    .replace(/\{package\.([^}]+)\}/g, function (all, path) {
      return options.package[path];
    });
};
