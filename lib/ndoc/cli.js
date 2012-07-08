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
 *      cli.addArgument(['--foobar', {
 *        // ...
 *        choices: function () { return ['a', 'b', 'c']; }
 *      });
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


// stdlib
var fs   = require('fs');
var path = require('path');


// 3rd-party
var _               = require('underscore');
var FsTools         = require('fs-tools');
var argparse        = require('argparse');
var minimatch       = require('minimatch');
var ArgumentParser  = argparse.ArgumentParser;


// internal
var renderers = require('./renderers');


////////////////////////////////////////////////////////////////////////////////


var cli = module.exports = new ArgumentParser({
  version:  require('./version'),
  addHelp:  true,
  formatterClass: function(options) {
    options['maxHelpPosition'] = 40;
    return new argparse.HelpFormatter(options);
  }
});


cli.register('action', 'store+lazyChoices',   require('./cli/lazy-choices'));
cli.register('action', 'store+readJSON',      require('./cli/read-json'));
cli.register('action', 'store+readFile',      require('./cli/read-file'));


////////////////////////////////////////////////////////////////////////////////


cli.addArgument(['paths'], {
  help:         'Source files location',
  metavar:      'PATH',
  action:       'append',
  nargs:        '+'
});


cli.addArgument(['--exclude'], {
  help:         'Glob patterns of filenames to exclude ' +
                '(you can use wildcards: ?, *, **).',
  dest:         'exclude',
  metavar:      'PATTERN',
  action:       'append',
  defaultValue: []
});


cli.addArgument(['-o', '--output'], {
  help:         'Resulting file(s) location.',
  metavar:      'PATH',
  defaultValue: 'doc'
});


cli.addArgument(['--use'], {
  help:         'Load custom plugin.',
  metavar:      'PLUGIN',
  action:       'append',
  defaultValue: []
});


cli.addArgument(['-r', '--render'], {
  dest:         'renderer',
  help:         'Documentation renderer (html, json). More can be added by ' +
                'custom plugins.',
  choices:      function () { return _.keys(renderers).join(','); },
  metavar:      'RENDERER',
  action:       'store+lazyChoices',
  defaultValue: 'html'
});


cli.addArgument(['--link-format'], {
  help:         'View sources link (no links by default) format. You can use ' +
                '`{file}` and `{line}` and any of `{package.*}` variables ' +
                'for interpolation.',
  dest:         'linkFormat',
  metavar:      'FORMAT',
  defaultValue: null
});


cli.addArgument(['-t', '--title'], {
  help:         'Documentation title template. You can use any of ' +
                '`{package.*}` variables for interpolation. ' +
                'DEFAULT: `{package.name} {package.version} API documentation`',
  metavar:      'TEMPLATE',
  defaultValue: '{package.name} {package.version} API documentation'
});


cli.addArgument(['--show-all'], {
  help:         'By default `internal` methods/properties are not shown. This ' +
                'trigger makes ndoc show all methods/properties',
  dest:         'showInternals',
  action:       'storeTrue',
  defaultValue: false
});


cli.addArgument(['--package'], {
  help:         'Read specified package.json FILE. When not specified, read ' +
                './package.json if such file exists.',
  dest:         'package',
  action:       'store+readJSON',
  defaultValue: (function () {
    var file = process.cwd() + '/package.json';
    return require('fs').existsSync(file) ? require(file) : {};
  }())
});


cli.addArgument(['--index'], {
  help:         'Index file (with introduction text), e.g. README.md file.',
  metavar:      'FILE',
  action:       'store+readFile',
  defaultValue: ''
});


////////////////////////////////////////////////////////////////////////////////


/**
 *  cli.findFiles(paths, excludes, callback(err, files)) -> Void
 *  - paths (Array): List of directories/files
 *  - excludes (Array): List of glob patterns. See minimatch for pattern syntax.
 *  - callback (Function)
 *
 *  Finds all files within given `paths` excluding patterns provided as
 *  `excludes`.
 *
 *
 *  ##### See Also
 *
 *  - [minimatch](https://github.com/isaacs/minimatch)
 **/
cli.findFiles = function findFiles(paths, excludes, callback) {
  var entries = [];

  if (_.isFunction(excludes)) {
    callback = excludes;
    excludes = [];
  }

  // prepare glob matchers
  excludes = _.map(excludes || [], function (p) {
    return minimatch.makeRe(p);
  });

  // make a copy consisting valueble paths only
  paths = _.filter(paths, function (p) { return !!p; });

  function done(err) {
    if (err) {
      callback(err);
      return;
    }

    if (excludes.length) {
      entries = _.filter(entries, function (filename) {
        var js = '.js' === path.extname(filename),
            ok = !_.any(excludes, function (re) { return re.test(filename); });

        return js && ok;
      });
    }

    callback(null, entries.sort());
  }

  function walk(err) {
    var pathname;

    // get next path
    pathname = paths.shift();

    // skip empty path or report real error
    if (err || !pathname) {
      done(err);
      return;
    }

    if (!fs.statSync(pathname).isDirectory()) {
      // add non-directories directly
      entries.push(pathname);
      walk();
      return;
    }

    FsTools.walk(pathname, function (filename, stats, next) {
      entries.push(filename);
      next();
    }, walk);
  }

  walk();
};


////////////////////////////////////////////////////////////////////////////////


// parse string in a BASH style
// inspired by Shellwords module of Ruby
var SHELLWORDS_PATTERN = /\s*(?:([^\s\\\'\"]+)|'((?:[^\'\\]|\\.)*)'|"((?:[^\"\\]|\\.)*)")/;
function shellwords(line) {
  var words = [], match, field;

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
  var str = fs.readFileSync(file, 'utf8').replace(/^#.*/gm, '');
  [].splice.apply(process.argv, [2, 0].concat(shellwords(str)));
};
