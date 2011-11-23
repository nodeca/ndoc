'use strict';

/**
 * Util
 *
 **/
var Fs = require('fs');
var Tools = require('fs-tools');
var Path = require('path');

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

module.exports = {
  normalize: Path.normalize,
  join: Path.join,
  read: read,
  write: write,
  walk: Tools.walk,
  rm_rf: Tools.rm_rf,
  cp: Tools.cp,
  cp_a: Tools.cp_a,
};
