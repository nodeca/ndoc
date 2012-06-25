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
    var path;

    // get next path
    path = paths.shift();

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


////////////////////////////////////////////////////////////////////////////////


//
// preprocess plugins
//


NDoc.cli.parseKnownArgs().shift().use.forEach(function (pathname) {
  try {
    var file = /^\./.test(pathname) ? Path.resolve(process.cwd(), pathname) : pathname;
    NDoc.use(require(file));
  } catch (err) {
    console.error('Failed add renderer: ' + pathname + '\n\n' + err.toString());
    process.exit(1);
  }
});


//
// parse options
//


var opts = NDoc.cli.parseArgs();


//
// read manifest from file
//


var manifest = require(process.cwd() + '/package.json');

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
  var ast;

  if (err) {
    console.error(err.message || err);
    process.exit(1);
  }

  // build tree
  try {
    ast = new NDoc(files, _.extend({
      // given package URL, file name and line in the file, format link to source file.
      // do so only if `packageUrl` is set or `linkFormat` is set
      formatLink: (opts.linkFormat || opts.package.url) && function (file, line) {
        // '\' -> '/' for windows
        return interpolate(opts.linkFormat, file.replace(/\\/g, '/'), line);
      }
    }, opts));
  } catch (err) {
    console.error('FATAL:', err.stack || err.message || err);
    process.exit(1);
  }

  // output tree
  NDoc.render(opts.renderer, ast, opts, function (err) {
    if (err) {
      console.error(err.message || err);
      process.exit(1);
    }
  });
});
