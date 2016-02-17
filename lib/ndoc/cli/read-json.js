'use strict';


const fs = require('fs');
const Action = require('argparse').Action;


////////////////////////////////////////////////////////////////////////////////


function ReadJSON(options) {
  options = options || {};
  options.nargs = 1;

  Action.call(this, options);
}


require('util').inherits(ReadJSON, Action);


ReadJSON.prototype.call = function (parser, namespace, values) {
  let str = fs.readFileSync(values.shift(), 'utf8');
  namespace.set(this.dest, JSON.parse(str));
};


module.exports = ReadJSON;
