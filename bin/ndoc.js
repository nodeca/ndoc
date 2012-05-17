#!/usr/bin/env node


'use strict';


// stdlib
var Fs = require('fs');
var Path = require('path');
var exec = require('child_process').exec;


// 3rd-party
var FsTools         = require('fs-tools');
var ArgumentParser  = require('argparse').ArgumentParser;


// internal
var NDoc = require('..');


// walk_many(paths, pattern, iterator, callback)
// - paths (Array): array of paths to sequentially walk
//
// Other arguments correspond to those of [[FsTools.walk]]
function walk_many(paths, pattern, iterator, callback) {
  // don't touch original array
  paths = paths.slice();

  function next(err) {
    var path;

    // get next path
    while (paths.length) {
      path = paths.shift();
    }

    // skip empty path or report real error
    if (err || !path) {
      callback(err);
      return;
    }

    // do walk path
    FsTools.walk(path, pattern, iterator, next);
  }

  next();
}


//
// parse options
//


var cli = new ArgumentParser({
  prog:     'ndoc',
  version:  require('../package.json').version,
  addHelp:  true
});


cli.addArgument(['path'], {
  help:         'Source files location',
  metavar:      'PATH',
  action:       'append',
  nargs:        '+'
});

cli.addArgument(['-e', '--extension'], {
  help:         'Source files extension',
  metavar:      'STRING',
  defaultValue: 'js'
});

cli.addArgument(['-o', '--output'], {
  help:         'Resulting file(s) location',
  metavar:      'PATH',
  defaultValue: 'doc'
});

cli.addArgument(['-f', '--format'], {
  help:         'Documentation format',
  choices:      ['html', 'json', 'js'],
  metavar:      'FORMAT',
  defaultValue: 'html'
});

cli.addArgument(['-i', '--index'], {
  help:         'Index file',
  metavar:      'FILE',
  defaultValue: 'README.md'
});

cli.addArgument(['-t', '--title'], {
  help:         'Documentation title. If omitted, it will be guessed from manifest, if any',
  metavar:      'STRING',
  defaultValue: '{package.name} {package.version} API documentation'
});

cli.addArgument(['-l', '--link-format'], {
  dest:         'linkFormat',
  help:         'Format for link to source file',
  metavar:      'FORMAT',
  defaultValue: '{file}#L{line}'
});

cli.addArgument(['--skin'], {
  help:         'Custom templates',
  metavar:      'PATH',
  defaultValue: Path.join(__dirname, '..', 'skins', 'default')
});

cli.addArgument(['--view-source-label'], {
  dest:         'viewSourceLabel',
  help:         'Text for "View source" link',
  metavar:      'STRING',
  defaultValue: 'View source code'
});

cli.addArgument(['-b', '--broken-links'], {
  dest:         'brokenLinks',
  help:         'What to do if broken link occured',
  choices:      ['show', 'hide', 'throw'],
  metavar:      'ACTION',
  defaultValue: 'show'
});


var opts = cli.parseArgs();


//
// read manifest from file
//


var manifest = {};
try {
  // not using require for node < v0.4 caompatibility
  manifest = JSON.parse(Fs.readFileSync('package.json', 'utf8'));
} catch (err1) {
}

//
// flatten manifest structure, to allow easier access
//
(function () {
  var options = {};
  function flatten(o, path) {
    var i, p;
    for (i in o) {
      if (o.hasOwnProperty(i)) {
        p = path ? path + '.' + i : i;
        options[p] = o[i];
        if (o[i] && typeof o[i] === 'object') {
          flatten(o[i], p);
        }
      }
    }
  }
  flatten(manifest);
  manifest = options;
}());

function interpolate(string, file, line) {
  var r = string
    .replace(/\{url\}/g, opts.package.url || '')
    .replace(/\{file\}/g, file)
    .replace(/\{line\}/g, line)
    .replace(/\{package\.([^}]+)\}/g, function (all, path) { return opts.package[path]; });
  return r;
}

// try to collect critical variables
opts.package = manifest;
opts.package.name = opts.package.name || '';
opts.package.version = opts.package.version || '';
opts.package.url = opts.package['repository.url'] || opts.package.repository || '';
opts.package.url = opts.package.url.replace(/^git:\/\//, 'https://').replace(/\.git$/, '');
// FIXME: guesswork: valid package.json means github.com link format
if (!opts.linkFormat) {
  if (opts.package.url.match(/\/\/github\.com\//)) {
    opts.linkFormat = '{url}/blob/master/{file}#L{line}';
  }
}
// guess title?
if (!opts.title) {
  opts.title = (opts.package.name + ' ' + opts.package.version + ' API documentation').trim();
// or interpolate title
} else {
  opts.title = interpolate(opts.title);
}

//console.log(opts);

//
// read index file
//
try {
  opts.index = Fs.readFileSync(opts.index, 'utf8');
} catch (err2) {
  opts.index = '';
}

//console.error(opts); process.exit(0);

//
// collect sources
//
var files = [];
walk_many(opts.path, '\\.' + opts.extension + '$', function (filename, stat, cb) {
  //console.log('Processing', filename);
  files.push(filename);
  cb();
}, function (err) {
  var ndoc, output;
  if (err) {
    console.error(err.message || err);
    process.exit(1);
  }
  // build tree
  ndoc = new NDoc(files, {
    // given package URL, file name and line in the file, format link to source file.
    // do so only if `packageUrl` is set or `linkFormat` is set
    formatLink: (opts.linkFormat || opts.package.url) && function (file, line) {
      // '\' -> '/' for windows
      return interpolate(opts.linkFormat, file.replace(/\\/g, '/'), line);
    }
  });
  //console.log(ndoc.toJSON());

  // output tree
  output = opts.output;
  switch (opts.format) {

  case 'json':
    Fs.writeFileSync(output, ndoc.toJSON(opts));
    break;

  case 'js':
    Fs.writeFileSync(output, 'var ndoc = ' + ndoc.toJSON(opts) + ';');
    break;

  case 'html':
    Path.exists(output, function (exists) {
      if (exists) {
        console.error("Output directory '" + output + "' already exists");
        process.exit(1);
      }

      FsTools.copy(Path.join(opts.skin, 'skeleton'), output, function (err) {
        if (err) {
          console.error(err.message || err);
          process.exit(1);
        }
        var html = ndoc.toHTML(opts);
        Fs.writeFileSync(Path.join(output, 'index.html'), html);
      });
    });
    break;

  default:
    console.error(opts.format + ': not supported');
    process.exit(1);

  }
});
