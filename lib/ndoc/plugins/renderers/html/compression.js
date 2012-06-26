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
var SALT      = JSON.stringify(require('../../../../../package.json'));


////////////////////////////////////////////////////////////////////////////////


function hash(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}


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


////////////////////////////////////////////////////////////////////////////////


module.exports.js   = cachable(uglify);
module.exports.css  = cachable(Csso.justDoIt);
