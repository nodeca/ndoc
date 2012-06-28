'use strict';


// 3rd-party
var _ = require('underscore');


////////////////////////////////////////////////////////////////////////////////


module.exports.template = function template(str, data, options) {
  return _.template(str, data, _.extend({interpolate: /\{(.+?)\}/g}, options));
};
