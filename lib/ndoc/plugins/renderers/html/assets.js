"use strict";


/*global nodeca, _*/


// stdlib
var fs   = require('fs');
var path = require('path');


// 3rd-party
var Mincer = require('mincer');
var nib    = require('nib');

// internal
var compression = require('./compression');


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


module.exports.prepare = function prepare(callback) {
  var files, environment;

  environment = new Mincer.Environment(__dirname);
  files       = ['main.js', 'main.css'];

  // function that matches any non-js or non-css files
  files.push(function nonAsset(logicalPath) {
    var extname = path.extname(logicalPath);
    return (!/\.(js|css)$/.test(extname));
  });


  // Add some funky stuff to Stylus
  Mincer.StylusEngine.registerConfigurator(function (style) {
    style.use(nib());
  });


  environment.appendPath('assets/javascripts');
  environment.appendPath('assets/stylesheets');
  environment.appendPath('assets/images');


  // append vendor paths
  fs.readdirSync(__dirname + '/vendors').forEach(function (vendor) {
    environment.appendPath('vendors/' + vendor);
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
