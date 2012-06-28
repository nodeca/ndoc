#!/usr/bin/env node


'use strict';


// stdlib
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;


// 3rd-party
var _               = require('underscore');
var async           = require('async');
var FsTools         = require('fs-tools');
var ArgumentParser  = require('argparse').ArgumentParser;


// internal
var NDoc      = require('..');
var template  = require('../lib/ndoc/common').template;


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


function exit(err) {
    if (err) {
      console.error(err.message || err);
      process.exit(1);
    }

    process.exit(0);
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
    exit('Failed add renderer: ' + pathname + '\n\n' + err.toString());
  }
});


//
// parse options
//


var options = NDoc.cli.parseArgs();


//
// Post-process some of the options
//

options.title = template(options.title || '', {'package': options.package});

//
// collect sources, parse into ast, render
//

async.waterfall([
  function collect_files(next) {
    NDoc.cli.findFiles(options.paths, options.exclude, next);
  },
  function parse_files(files, next) {
    NDoc.parse(files, options, next);
  },
  function render_ast(ast, next) {
    NDoc.render(options.renderer, ast, options, next);
  }
], exit);
