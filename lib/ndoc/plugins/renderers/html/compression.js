"use strict";


/*global nodeca, _*/


// stdlib
var fs      = require('fs');
var path    = require('path');
var crypto  = require('crypto');


// 3rd-party
var Mincer      = require('mincer');
var uglify      = require('uglify-js');
var Csso        = require('csso');
var FsTools     = require('fs-tools');


////////////////////////////////////////////////////////////////////////////////


var CACHE_DIR = path.resolve(__dirname, '.cache');

var UGLIFY_CFG = {
  fromString: true,
  // Compress options
  // http://lisperator.net/uglifyjs/compress
  compress: {},
  mangle: true,
  // Output options
  // http://lisperator.net/uglifyjs/codegen
  output: {
    beautify: false,
    indent_level: 2
  }
};

var SALT      = JSON.stringify(require('../../../../../package.json'));


////////////////////////////////////////////////////////////////////////////////


function hash(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}


// returns digest and data for the given key
//
function get_cache(key) {
  var base    = CACHE_DIR + '/' + key,
      cached  = {};

  if (fs.existsSync(base + '.data')) {
    cached.data = fs.readFileSync(base + '.data', 'utf8');
  }

  if (fs.existsSync(base + '.digest')) {
    cached.digest = fs.readFileSync(base + '.digest', 'utf8');
  }

  return cached;
}


// sets digest and data for the given key
//
function set_cache(key, digest, data, callback) {
  var base = CACHE_DIR + '/' + key;

  FsTools.mkdir(CACHE_DIR, function (err) {
    if (err) {
      callback(err);
      return;
    }

    try {
      fs.writeFileSync(base + '.data', data, 'utf8');
      fs.writeFileSync(base + '.digest', digest, 'utf8');
    } catch (err) {
      callback(err);
      return;
    }

    callback();
  });
}


// returns function that runs `compressor(data)` only in case if data changed
// since it was last time cached
//
function cachable(compressor) {
  return function (context, data, callback) {
    var key     = hash(context.logicalPath + context.contentType),
        digest  = hash(data + SALT),
        cached  = get_cache(key),
        compressed;

    if (cached.digest === digest) {
      callback(null, cached.data);
      return;
    }

    try {
      compressed = compressor(data);
    } catch (err) {
      callback(err);
      return;
    }

    set_cache(key, digest, compressed, function (err) {
      callback(err, compressed);
    });
  };
}


// JavaScript compressor
function js_compressor(str) {
  var result = uglify.minify(str, UGLIFY_CFG );
  return result.code;
}


// CSS compressor
function css_compressor(str) {
  return Csso.justDoIt(str);
}


////////////////////////////////////////////////////////////////////////////////


module.exports.js   = cachable(js_compressor);
module.exports.css  = cachable(css_compressor);

