#!/usr/bin/env node


'use strict';


// stdlib
var Fs = require('fs');
var Path = require('path');
var exec = require('child_process').exec;


// 3rd-party
var _               = require('underscore');
var FsTools         = require('fs-tools');
var ArgumentParser  = require('argparse').ArgumentParser;


// internal
var NDoc = require('..');


////////////////////////////////////////////////////////////////////////////////


// walk_many(paths, pattern, iterator, callback)
// - paths (Array): array of paths to sequentially walk
//
// Other arguments correspond to those of [[FsTools.walk]]
function walk_many(paths, pattern, iterator, callback) {
  // don't touch original array
  paths = paths.slice();

  function next(err) {
    var path, stats;

    // get next path
    path = paths.shift();

    // skip empty path or report real error
    if (err || !path) {
      callback(err);
      return;
    }

    stats = Fs.statSync(path);

    if (stats.isDirectory()) {
      // do walk path
      FsTools.walk(path, pattern, iterator, next);
      return;
    }

    iterator(path, stats, next);
  }

  next();
}


////////////////////////////////////////////////////////////////////////////////


//
// preprocess plugins
//


NDoc.cli.parseKnownArgs().shift().use.forEach(function (pathname) {
  if (/^\./.test(pathname)) {
    pathname = Path.resolve(process.cwd(), pathname);
  }

  try {
    NDoc.use(require(pathname));
  } catch (err) {
    console.error('Failed add renderer: ' + pathname + '\n\n' + err.toString());
    process.exit(1);
  }
});


//
// parse options
//


var opts = NDoc.cli.parseArgs();


function interpolate(string, file, line) {
  return string.replace(/\{file\}/g, file).replace(/\{line\}/g, line);
}

//
// prepare extension pattern
//
opts.extensions.forEach(function (arg, idx) {
  opts.extensions[idx] = '\\.' + arg;
});
var extensionPattern = '(' + opts.extensions.join('|') + ')$';

//
// collect sources
//
var files = [];
walk_many(opts.paths, extensionPattern, function (filename, stat, cb) {
  var realpath = Path.resolve(filename),
      include = _.all(opts.exclude, function (pattern) {
        if (/^\.\.?\//.test(pattern)) {
          pattern = Path.resolve(process.cwd(), pattern);
        }

        pattern = pattern.toString().replace(/\*\*|\*|\?|\\.|\./g, function (m) {
          switch (m[0]) {
            case "*": return "**" === m ? ".+?" : "[^/]+?";
            case "?": return "[^/]?";
            case ".": return "\\.";
            // handle `\\.` part
            default:  return m;
          }
        });

        pattern = new RegExp('^' + pattern + '$');
        return !(new RegExp(pattern)).test(realpath);
      });

  if (include) {
    files.push(filename);
  }

  cb();
}, function (err) {
  var ast, parser_options;

  if (err) {
    console.error(err.message || err);
    process.exit(1);
  }

  parser_options = {
    // given package URL, file name and line in the file, format link to source file.
    // do so only if `packageUrl` is set or `linkFormat` is set
    formatLink: (opts.linkFormat || opts.package.url) && function (file, line) {
      // '\' -> '/' for windows
      return interpolate(opts.linkFormat, file.replace(/\\/g, '/'), line);
    }
  };

  NDoc.parse('ndoc', files, parser_options, function (err, ast) {
    if (err) {
      console.error(err.message || err);
      process.exit(1);
    }

    NDoc.render(opts.renderer, ast, opts, function (err) {
      if (err) {
        console.error(err.message || err);
        process.exit(1);
      }
    });
  });
});
