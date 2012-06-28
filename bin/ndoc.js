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


NDoc.cli.addArgument(['--noenv'], {
  help:   'Ignore .ndocrc',
  action: 'storeTrue'
});


if (-1 === process.argv.indexOf('--noenv')) {
  if (fs.existsSync('./.ndocrc')) {
    var rcflags = shellwords(fs.readFileSync('./.ndocrc', 'utf8'));
    [].splice.apply(process.argv, [2, 0].concat(rcflags));
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

//
// collect sources
//

NDoc.cli.findFiles(opts.paths, opts.exclude, function (err, files) {
  if (err) {
    console.error(err.message || err);
    process.exit(1);
  }

  NDoc.parse(files, opts, function (err, ast) {
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
