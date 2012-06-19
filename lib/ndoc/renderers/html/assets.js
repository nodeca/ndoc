"use strict";


/*global nodeca, _*/


// stdlib
var fs   = require('fs');
var path = require('path');


// 3rd-party
var Mincer = require('mincer');
var stylus = require('stylus');


// internal
var compression = require('./assets/compression');


////////////////////////////////////////////////////////////////////////////////


// Returns plain array of filenames matching `filters`
function get_assets(env, filters) {
  var result = [];

  env.eachLogicalPath(filters, function (logicalPath) {
    result.push(logicalPath);
  });

  return result;
}


////////////////////////////////////////////////////////////////////////////////


module.exports.prepare = function prepare(templatePath, callback) {
  var files, environment;

  environment = new Mincer.Environment(templatePath);
  files       = ['main.js', 'main.css', 'modernizr.js'];

  // function that matches any non-js or non-css files
  files.push(function nonAsset(logicalPath) {
    var extname = path.extname(logicalPath);
    return (!/\.(js|css)$/.test(extname));
  });


  environment.appendPath('assets/javascripts');
  environment.appendPath('assets/stylesheets');
  environment.appendPath('assets/images');


  Mincer.StylusEngine.registerConfigurator(function (style) {
    style.define('url', stylus.url());
  });


  // set up compressors
  environment.jsCompressor  = compression.js;
  environment.cssCompressor = compression.css;


  // Configure logger
  // FIXME: Replace with NDoc's logger
  Mincer.logger.use(console);


  // Precompile all assets
  environment.precompile(get_assets(environment, files), function (err) {
    callback(err, environment);
  });
};
