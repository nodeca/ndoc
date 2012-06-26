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


cli.addArgument(['--exclude'], {
  help:     'Pathnames to exclude. Pathnames might be absolute or relative ' +
            'and might have wildcards:\n' +
            '  - `*`  Matches single directory or file:\n' +
            '         /foo/* matches /foo/bar but not /foo/bar/baz\n' +
            '  - `**` Matches files and directries recursively:\n' +
            '         /foo** matches /foo/bar, /foo/bar/baz, etc.\n' +
            '  - `?`  Matches exactly one non-slash character',
  dest:     'exclude',
  metavar:  'PATTERN',
  action:   'append',
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


cli.addArgument(['--link-format'], {
  help: 'Format for link to source file. This can have "special" variables:\n' +
        '  - {file} - Current file\n' +
        '  - {line} - Current line',
  dest:         'linkFormat',
  metavar:      'FORMAT',
  defaultValue: '{file}#L{line}'
});


cli.addArgument(['-t', '--title'], {
  help:         'Documentation title template. You can use any of ' +
                '@package.* variables for interpolation, e.g.: ' +
                '`My App {@package.version}`',
  metavar:      'TEMPLATE',
  defaultValue: '{@package.name} {@package.version} API documentation'
});


cli.addArgument(['--show-all'], {
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
  defaultValue: (function () {
    var file = process.cwd() + '/package.json';
    return require('fs').existsSync(file) ? require(file) : {};
  }())
});


cli.addArgument(['--index'], {
  help:         'Index file in MarkDown',
  metavar:      'FILE',
  defaultValue: 'README.md'
});


cli.addArgument(['--broken-links'], {
  dest:         'brokenLinks',
  help:         'What to do if broken link occurred',
  choices:      ['show', 'hide', 'throw'],
  metavar:      'ACTION',
  defaultValue: 'show'
});
