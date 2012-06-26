#!/usr/bin/env node


'use strict';


// stdlib
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;


// 3rd-party
var _               = require('underscore');
var FsTools         = require('fs-tools');
var ArgumentParser  = require('argparse').ArgumentParser;


// internal
var NDoc = require('..');


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

    stats = fs.statSync(path);

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


NDoc.cli.addArgument(['--noenv'], {
  help:   'Ignore .ndocrc',
  action: 'storeTrue'
});


if (-1 === process.argv.indexOf('--noenv')) {
  if (fs.existsSync('./.ndocrc')) {
    var rcflags = shellwords(fs.readFileSync('./.ndocrc', 'utf8'));
    process.argv = process.argv.concat(rcflags);
  }
}


//
// preprocess plugins
//


NDoc.cli.parseKnownArgs().shift().use.forEach(function (pathname) {
  if (/^\./.test(pathname)) {
    pathname = path.resolve(process.cwd(), pathname);
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
// collect sources
//
var files = [];
var exts  = _.keys(require('../lib/ndoc/parsers')).map(function (ext) { return ext.substring(1); });

walk_many(opts.paths, new RegExp('[.](?:' + exts.join('|') + ')$'), function (filename, stat, cb) {
  var realpath = path.resolve(filename),
      include = _.all(opts.exclude, function (pattern) {
        if (/^\.\.?\//.test(pattern)) {
          pattern = path.resolve(process.cwd(), pattern);
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
  var parser_options;

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
