/**
 * class NDoc
 *
 * Handles documentation tree.
 **/


'use strict';


// Node < 0.8 shims
if (!require('fs').exists) {
  require('fs').exists = require('path').exists;
}
if (!require('fs').existsSync) {
  require('fs').existsSync = require('path').existsSync;
}


// stdlib
var path = require('path');


// internal
var extend    = require('./ndoc/common').extend;
var renderers = require('./ndoc/renderers');
var parsers   = require('./ndoc/parsers');


////////////////////////////////////////////////////////////////////////////////


var NDoc = module.exports = {};


////////////////////////////////////////////////////////////////////////////////


/**
 *  NDoc.parse(name, files, options, callback) -> Void
 *  - files (Array): Files to be parsed
 *  - options (Object): Parser options
 *  - callback (Function): Notifies parsing is finished with `callback(err, ast)`
 *
 *  Execute `name` parser against `files` with given options.
 **/
NDoc.parse = function parse(files, options, callback) {
  parsers['.js'](files, options, callback);
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
 *  NDoc.registerParser(extension, func) -> Void
 *  - extension (String): Extension suitable for the parser, e.g. `'.js'`
 *  - func (Function): Parser function `func(source, options, callback)`
 *
 *  Registers given function as `name` renderer.
 **/
NDoc.registerParser = function (extension, func) {
  parsers[path.extname('name.' + extension)] = func;
};


//
// require base plugins
//


NDoc.use(require(__dirname + '/ndoc/plugins/parsers/ndoc'));
NDoc.use(require(__dirname + '/ndoc/plugins/renderers/html'));
NDoc.use(require(__dirname + '/ndoc/plugins/renderers/json'));
