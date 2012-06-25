'use strict';


// internal
var renderers = require('./renderers');


// 3rd-party
var _               = require('underscore');
var ArgumentParser  = require('argparse').ArgumentParser;
var ArgparseAction  = require('argparse').Action;
var ArgparseConst   = require('argparse').Const;


////////////////////////////////////////////////////////////////////////////////


var LazyChoices = function LazyChoices(options) {
  options = options || {};
  options.nargs = 1;

  ArgparseAction.call(this, options);

  delete this.choices;
  this.__defineGetter__('choices', options.choices);
};


require('util').inherits(LazyChoices, ArgparseAction);


LazyChoices.prototype.call = function (parser, namespace, values, optionString) {
  namespace.set(this.dest, values);
};



////////////////////////////////////////////////////////////////////////////////


var cli = module.exports = new ArgumentParser({
  version:  require('./version'),
  addHelp:  true
});


cli.register('action', 'store+lazyChoices', LazyChoices);



////////////////////////////////////////////////////////////////////////////////


cli.addArgument(['paths'], {
  help:         'Source files location',
  metavar:      'PATH',
  action:       'append',
  nargs:        '+'
});


cli.addArgument(['-e', '--extension'], {
  dest:         'extensions',
  help:         'Source files extension',
  metavar:      'STRING',
  action:       'append',
  defaultValue: ['js']
});


cli.addArgument(['--exclude'], {
  dest:         'exclude',
  help:         'Pathname patterns to exclude',
  metavar:      'PATTERN',
  action:       'append',
  defaultValue: []
});


cli.addArgument(['-o', '--output'], {
  help:         'Resulting file(s) location',
  metavar:      'PATH',
  defaultValue: 'doc'
});


cli.addArgument(['--use'], {
  help:         'Use custom plugin',
  metavar:      'PLUGIN',
  action:       'append',
  defaultValue: []
});


cli.addArgument(['-r', '--render'], {
  dest:         'renderer',
  help:         'Documentation renderer',
  choices:      function () { return _.keys(renderers).join(','); },
  metavar:      'RENDERER',
  action:       'store+lazyChoices',
  defaultValue: 'html'
});


cli.addArgument(['-l', '--link-format'], {
  dest:         'linkFormat',
  help:         'Format for link to source file',
  metavar:      'FORMAT',
  defaultValue: '{file}#L{line}'
});


cli.addArgument(['-t', '--title'], {
  help:         'Documentation title template.',
  metavar:      'TEMPLATE',
  defaultValue: '{package.name} {package.version} API documentation'
});
