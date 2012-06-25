/**
 * class NDoc
 *
 * Handles documentation tree.
 **/


'use strict';


// stdlib
var Fs    = require('fs');
var Path  = require('path');


// 3rd-party
var _ = require('underscore');


// internal
var extend    = require('./ndoc/common').extend;
var renderers = require('./ndoc/renderers');
var parsers   = require('./ndoc/parsers');


////////////////////////////////////////////////////////////////////////////////


/**
 *  new NDoc(files, options)
 *  - files (Array): array of source file paths
 *  - options (Hash): controlling options
 *
 *  Read source `files` and compose the documentation tree.
 *
 *
 *  ##### Options
 *
 *  - **formatLink** (Function): Generates link to the source file.
 *    Called with `(file, line)` arguments.
 **/
var NDoc = module.exports = function NDoc(files, options) {
  this.options  = extend({}, options);
  this.list     = {}; // flat representation of ast
  this.tree     = {}; // ast
  this.files    = files;

  parsers[options.parser](this, options);
};


/**
 *  NDoc.parse(name, files, options, callback) -> Void
 *  - name (String): Renderer name
 *  - files (Array): Files to be parsed
 *  - options (Object): Parser options
 *  - callback (Function): Notifies parsing is finished with `callback(err, ast)`
 *
 *  Execute `name` parser against `files` with given options.
 **/
NDoc.parse = function parse(name, files, options, callback) {
  if (!parsers[name]) {
    callback("Unknown parser: " + name);
    return;
  }

  parsers[name](files, options, callback);
};


/**
 *  NDoc.render(name, ast, options, callback) -> Void
 *  - name (String): Renderer name
 *  - ast (Object): Parsed AST (should consist of `list` and `tree`)
 *  - options (Object): Renderer options
 *  - callback (Function): Notifies rendering is finished with `callback(err)`
 *
 *  Execute `name` renderer for `ast` with given options.
 **/
NDoc.render = function render(name, ast, options, callback) {
  if (!renderers[name]) {
    callback("Unknown renderer: " + name);
    return;
  }

  renderers[name](ast, options, callback);
};


/**
 *  NDoc.cli -> ArgumentParser
 **/
NDoc.cli = require('./ndoc/cli');


/**
 *  NDoc.VERSION -> String
 *
 *  NDoc version.
 **/
NDoc.VERSION = require('./ndoc/version');


/**
 *  NDoc.use(plugin) -> Void
 *  - plugin (Function): Infection `plugin(NDocClass)`
 *
 *  Runs given `plugin` against NDoc base class.
 *
 *
 *  ##### Examples
 *
 *      NDoc.use(require('my-renderer'));
 **/
NDoc.use = function use(plugin) {
  plugin(this);
};


/**
 *  NDoc.registerRenderer(name, func) -> Void
 *  - name (String): Name of the renderer, e.g. `'html'`
 *  - func (Function): Renderer function `func(ast, options, callback)`
 *
 *  Registers given function as `name` renderer.
 **/
NDoc.registerRenderer = function (name, func) {
  renderers[name] = func;
};


/**
 *  NDoc.registerParser(name, func) -> Void
 *  - name (String): Name of the parser, e.g. `'ndoc'`
 *  - func (Function): Parser function `func(files, options, callback)`
 *
 *  Registers given function as `name` renderer.
 **/
NDoc.registerParser = function (name, func) {
  parsers[name] = func;
};


//
// require base plugins
//


NDoc.use(require(__dirname + '/ndoc/plugins/parsers/ndoc'));
NDoc.use(require(__dirname + '/ndoc/plugins/renderers/html'));
NDoc.use(require(__dirname + '/ndoc/plugins/renderers/json'));
