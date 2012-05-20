'use strict';


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
