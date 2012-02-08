'use strict';

/**
 * Util
 *
 **/
var Fs = require('fs');
var Path = require('path');
var FsTools = require('fs-tools');

/**
 * Util.read(filename)
 * - filename (String): file to read.
 *
 * Return the UTF-8 content of specified file.
 **/
function read(filename) {
  return Fs.readFileSync(filename, 'utf8');
}

/**
 * Util.write(filename, text)
 * - filename (String): file to write.
 * - text (String): text to write.
 *
 * Rewrite specified file with `text`.
 **/
function write(filename, text) {
  return Fs.writeFileSync(filename, text, 'utf8');
}

/**
 * Util.walk_many(paths, pattern, iterator, callback)
 * - paths (Array): array of paths to sequentially walk
 *
 * Other arguments correspond to those of [[FsTools.walk]]
 **/
function walk_many(paths, pattern, iterator, callback) {

  // don't touch original array
  paths = paths.slice();

  function next(err) {
    var path;

    // get next path
    while (paths.length) {
      path = paths.shift();
    }

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


function copy(src, dst, callback) {
  Path.exists(dst, function (exists) {
    if (exists) {
      callback(new Error("Output directory '" + dst + "' already exists"));
      return;
    }

    FsTools.copy(src, dst, callback);
  });
}

module.exports = {
  normalize: Path.normalize,
  join: Path.join,
  exists: Path.exists,
  read: read,
  write: write,
  copy: copy,
  walk_many: walk_many,
};
