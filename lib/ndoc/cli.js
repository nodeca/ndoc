'use strict';


// 3rd-party
var _               = require('underscore');
var ArgumentParser  = require('argparse').ArgumentParser;


// internal
var renderers = require('./renderers');


////////////////////////////////////////////////////////////////////////////////


var cli = module.exports = new ArgumentParser({
  version:  require('./version'),
  addHelp:  true
});


cli.register('action', 'store+lazyChoices', require('./cli/lazy-choices'));
cli.register('action', 'store+readJSON',    require('./cli/read-json'));


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
  help: 'Format for link to source file. This can have "special" variables:\n' +
        '  - {file} - Current file\n' +
        '  - {line} - Current line\n' +
        'By default: `{file}#L{line}`',
  dest:         'linkFormat',
  metavar:      'FORMAT',
  defaultValue: '{file}#L{line}'
});


cli.addArgument(['-t', '--title'], {
  help:         'Documentation title template.',
  metavar:      'TEMPLATE',
  defaultValue: '{package.name} {package.version} API documentation'
});


cli.addArgument(['--all'], {
  help:         'By default `internal` methods/properties are not shown. This ' +
                'trigger makes ndoc show all methods/properties',
  dest:         'showInternals',
  action:       'storeTrue',
  defaultValue: false
});


cli.addArgument(['--package'], {
  help:         'Read specified package.json FILE. If specified you may use ' +
                '`@package.*` variables in the options which support them.',
  dest:         'package',
  action:       'store+readJSON',
  defaultValue: {}
});
