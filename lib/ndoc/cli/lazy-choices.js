'use strict';


const Action = require('argparse').Action;


////////////////////////////////////////////////////////////////////////////////


let LazyChoices = module.exports = function LazyChoices(options) {
  options = options || {};

  Action.call(this, options);

  delete this.choices;
  this.__defineGetter__('choices', options.choices);
};


require('util').inherits(LazyChoices, Action);


LazyChoices.prototype.call = function (parser, namespace, values) {
  namespace.set(this.dest, values);
};
