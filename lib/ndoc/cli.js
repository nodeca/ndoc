/**
 *  cli
 *
 *  Instance of ArgumentParser with some small improvements and additional
 *  methods.
 *
 *
 *  #### Extra Actions
 *
 *  We provide some extra-actions for our instance of ArgumentParser.
 *
 *
 *  ###### store+lazyChoices
 *
 *  Allows you define actions with lambda-like choices
 *
 *  ```js
 *  cli.addArgument(['--foobar', {
 *    // ...
 *    choices: function () { return ['a', 'b', 'c']; }
 *  });
 *  ```
 *
 *
 *  ###### store+readJSON
 *
 *  Allows specify an action that set value as an object from the file specified
 *  in the argument.
 *
 *
 *  ###### store+readFile
 *
 *  Allows specify an action that will set value as a string read from the file
 *  specified in the argument.
 *
 *
 *  #### See Also
 *
 *  - [ArgumentParser](http://nodeca.github.com/argparse/)
 **/


'use strict';


const fs              = require('fs');
const path            = require('path');
const _               = require('lodash');
const glob            = require('glob').sync;
const argparse        = require('argparse');
const ArgumentParser  = argparse.ArgumentParser;


////////////////////////////////////////////////////////////////////////////////


let cli = new ArgumentParser({
  version:  require('./version'),
  addHelp:  true,
  /* eslint-disable object-shorthand */
  formatterClass: function (options) {
    options['maxHelpPosition'] = 40;
    return new argparse.HelpFormatter(options);
  }
});


cli.register('action', 'store+lazyChoices',   require('./cli/lazy-choices'));
cli.register('action', 'store+readJSON',      require('./cli/read-json'));
cli.register('action', 'store+readFile',      require('./cli/read-file'));


////////////////////////////////////////////////////////////////////////////////


cli.addArgument([ 'paths' ], {
  help:         'Source files location',
  metavar:      'PATH',
  nargs:        '+'
});


cli.addArgument([ '--exclude' ], {
  help:         'Glob patterns of filenames to exclude ' +
                '(you can use wildcards: ?, *, **).',
  dest:         'exclude',
  metavar:      'PATTERN',
  action:       'append',
  defaultValue: []
});


cli.addArgument([ '-o', '--output' ], {
  help:         'Resulting file(s) location.',
  metavar:      'PATH',
  defaultValue: 'doc'
});


cli.addArgument([ '--use' ], {
  help:         'Load custom plugin.',
  metavar:      'PLUGIN',
  action:       'append',
  defaultValue: []
});


cli.addArgument([ '--alias' ], {
  dest:         'aliases',
  help:         'Registers extensions alias. For example `cc:js` will ' +
                'register `cc` extension as an alias of `js`',
  metavar:      'MAPPING',
  action:       'append',
  defaultValue: []
});


cli.addArgument([ '-r', '--render' ], {
  dest:         'renderer',
  help:         'Documentation renderer (html, json). More can be added by ' +
                'custom plugins.',
  choices()     { return _.keys(cli.ndoc.renderers).join(','); },
  metavar:      'RENDERER',
  action:       'store+lazyChoices',
  defaultValue: 'html'
});


cli.addArgument([ '--link-format' ], {
  help:         'View sources link (no links by default) format. You can use ' +
                '`{file}` and `{line}` and any of `{package.*}` variables ' +
                'for interpolation.',
  dest:         'linkFormat',
  metavar:      'FORMAT',
  defaultValue: null
});


cli.addArgument([ '-t', '--title' ], {
  help:         'Documentation title template. You can use any of ' +
                '`{package.*}` variables for interpolation. ' +
                'DEFAULT: `{package.name} {package.version} API documentation`',
  metavar:      'TEMPLATE',
  defaultValue: '{package.name} {package.version} API documentation'
});


cli.addArgument([ '--show-all' ], {
  help:         'By default `internal` methods/properties are not shown. This ' +
                'trigger makes ndoc show all methods/properties',
  dest:         'showInternals',
  action:       'storeTrue',
  defaultValue: false
});


cli.addArgument([ '--package' ], {
  help:         'Read specified package.json FILE. When not specified, read ' +
                './package.json if such file exists.',
  dest:         'package',
  action:       'store+readJSON',
  defaultValue: (function () {
    let file = process.cwd() + '/package.json';
    return require('fs').existsSync(file) ? require(file) : {};
  }())
});


cli.addArgument([ '--index' ], {
  help:         'Index file (with introduction text), e.g. README.md file.',
  metavar:      'FILE',
  action:       'store+readFile',
  defaultValue: ''
});


////////////////////////////////////////////////////////////////////////////////


/**
 *  cli.findFiles(paths[, excludes]) -> Array
 *  - paths (Array): List of directories/files
 *  - excludes (Array): List of glob patterns.
 *
 *  Finds all files within given `paths` excluding patterns provided as
 *  `excludes`.
 *
 *
 *  ##### Excluding paths
 *
 *  Each element of `excludes` list might be either a `String` pattern with
 *  wildcards (`*`, `**`, `?`, etc., see minimatch module for pattern syntax).
 *
 *  ```js
 *  var excludes = [
 *    'lib/parser-*.js',
 *  ];
 *  ```
 *
 *  ##### See Also
 *
 *  - [minimatch](https://github.com/isaacs/minimatch)
 **/
cli.findFiles = function findFiles(paths, excludes) {
  let entries = [];

  paths = _.compact(paths);

  // Scan all root paths in deep
  paths.forEach(p => {

    if (fs.statSync(p).isFile()) {
      entries.push(p);
      return;
    }

    glob('**/*', {
      cwd: p,
      nodir: true,
      ignore: excludes || []
    })
    .forEach(filename => { entries.push(path.join(p, filename)); });
  });

  return entries.sort();
};


////////////////////////////////////////////////////////////////////////////////


// parse string in a BASH style
// inspired by Shellwords module of Ruby
const SHELLWORDS_PATTERN = /\s*(?:([^\s\\\'\"]+)|'((?:[^\'\\]|\\.)*)'|"((?:[^\"\\]|\\.)*)")/;

function shellwords(line) {
  let words = [], match, field;

  while (line) {
    match = SHELLWORDS_PATTERN.exec(line);

    if (!match || !match[0]) {
      line = false;
    } else {
      line  = line.substr(match[0].length);
      field = (match[1] || match[2] || match[3] || '').replace(/\\(.)/, '$1');

      words.push(field);
    }
  }

  return words;
}


////////////////////////////////////////////////////////////////////////////////


/**
 *  cli.readEnvFile(file) -> Void
 *  - file (String): File with CLI arguments
 *
 *  Inject CLI arguments from given `file` into aprocess.argv.
 *  Arguments can be listed on multi-lines.
 *  All lines starting with `#` will be treaten as comments.
 *
 *
 *  ##### Example
 *
 *      # file: .ndocrc
 *      --title "Foobar #123"
 *
 *      # We can have empty line, and comments
 *      # as much as we need.
 *
 *      lib
 *
 *  Above, equals to:
 *
 *      --title "Foobar #123" lib
 **/
cli.readEnvFile = function (file) {
  let str = fs.readFileSync(file, 'utf8').replace(/^#.*/gm, '');
  [].splice.apply(process.argv, [ 2, 0 ].concat(shellwords(str)));
};


module.exports = cli;
