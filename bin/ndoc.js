#!/usr/bin/env node


'use strict';


// stdlib
const fs = require('fs');
const path = require('path');


// internal
const NDoc      = require('..');
const template  = require('../lib/ndoc/common').template;


////////////////////////////////////////////////////////////////////////////////


function exit(err) {
  if (err) {
    /* eslint-disable no-console */
    console.error(err.message || err);
    process.exit(1);
  }

  process.exit(0);
}


////////////////////////////////////////////////////////////////////////////////


NDoc.cli.addArgument([ '--noenv' ], {
  help:   'Ignore .ndocrc',
  action: 'storeTrue'
});


if (process.argv.indexOf('--noenv') === -1 && fs.existsSync('.ndocrc')) {
  NDoc.cli.readEnvFile('.ndocrc');
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
    exit(`Failed add renderer: ${pathname}\n\n${err.toString()}`);
  }
});


//
// parse options
//


let options = NDoc.cli.parseArgs();


//
// Process aliases
//

options.aliases.forEach(pair => { NDoc.extensionAlias.apply(null, pair.split(':')); });

//
// Post-process some of the options
//

options.title = template(options.title || '', { 'package': options.package });
options.index = options.index || '';

//
// collect sources, parse into ast, render
//
try {
  let files = NDoc.cli.findFiles(options.paths, options.exclude);
  let ast = NDoc.parse(files, options);
  NDoc.render(options.renderer, ast, options);
} catch (e) {
  exit (e);
}
