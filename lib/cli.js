'use strict';

// stdlib
var Fs = require('fs');
var Path = require('path');
var exec = require('child_process').exec;

// 3rd-party
var FsTools = require('fs-tools');

// internal
var NDoc = require('./index');


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
var opts = require('nomnom')
  .option('path', {
    position: 0,
    list: true,
    required: true,
    help: 'Source files location',
    metavar: 'PATH',
  })
  .option('extension', {
    abbr: 'e',
    help: 'Source files extension [js]',
    metavar: 'STRING',
    default: 'js',
  })
  .option('output', {
    abbr: 'o',
    help: 'Resulting file(s) location [doc]',
    metavar: 'PATH',
    default: 'doc',
  })
  .option('format', {
    abbr: 'f',
    help: 'Documentation format [html]',
    choices: ['html', 'json', 'js'],
    metavar: 'FMT',
    default: 'html',
  })
  .option('index', {
    abbr: 'i',
    help: 'Index file [README.md]',
    metavar: 'FILE',
    default: 'README.md',
  })
  .option('title', {
    full: 'title',
    abbr: 't',
    help: 'Documentation title. If omitted, it will be guessed from manifest, if any',
    default: '{package.name} {package.version} API documentation',
    metavar: 'STRING',
  })
  .option('linkFormat', {
    abbr: 'l',
    full: 'link-format',
    help: 'Format for link to source file [{file}#L{line}]',
    //default: '../{file}#L{line}',
    metavar: 'FMT',
  })
  .option('skin', {
    help: 'Custom templates [' + __dirname + '/../skins/default' + ']',
    default: Path.join(__dirname, '..', 'skins', 'default'),
    metavar: 'PATH',
  })
  .option('viewSourceLabel', {
    full: 'view-source-label',
    help: 'Text for "View source" link',
    default: 'View source code',
    metavar: 'STRING',
  })
  .option('brokenLinks', {
    abbr: 'b',
    full: 'broken-links',
    help: 'What to do if broken link occured [hide]',
    choices: ['show', 'hide', 'throw'],
    metavar: 'ACTION',
  })
  .parse();

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
