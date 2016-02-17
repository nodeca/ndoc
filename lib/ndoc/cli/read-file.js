'use strict';


const fs = require('fs');
const Action = require('argparse').Action;


////////////////////////////////////////////////////////////////////////////////


function ReadFile(options) {
  options = options || {};
  options.nargs = 1;

  Action.call(this, options);
}


require('util').inherits(ReadFile, Action);


ReadFile.prototype.call = function (parser, namespace, values) {
  namespace.set(this.dest, fs.readFileSync(values.shift(), 'utf8'));
};


module.exports = ReadFile;
