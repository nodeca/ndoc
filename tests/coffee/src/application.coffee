###*
 *  class Application
 *
 *
 *  ## Example
 *
 *      // file: index.js
 *      module.exports = new Application({
 *        name: 'my_app',
 *        root: __dirname,
 *        bootstrap: function bootstrap(callback) {
 *          // bootstrap application
 *          callback();
 *        }
 *      });
 *      // ...
 *      Application.addHook('schemas-loaded', function (callback) {
 *          // monkey-patch some schemas...
 *          // ...
 *          callback(Error("Something happened"));
 *          // ...
 *          callback(null);
 *      });
 *###

`
'use strict';


// stdlib
var path = require('path'),
    fs = require('fs');


// 3rd-party
var _ = require('underscore');


// internal
var $$ = require('./utilities'),
    HooksManager = require('./application/hooks_manager');


// hooks regstry. see [[Application#addHook]].  don't forget to update
// [[Application#addHook]]'s docs when changing this list
var hooks_registry = new HooksManager([
  'apps-loaded',
  'schemas-loaded',
  'models-loaded',
  'views-compiled',
  'controllers-loaded',
  'stores-loaded',
  'routes-loaded',
  'assets-compiled'
]);
`

###*
 *  new Application(options)
 *  - options (Object): Application basic configuration
 *
 *  Creates new nodeca application with given `options.root` as application
 *  root. If `options.bootstrapper` was given, it will be used upon
 *  [[Application#bootstrap]] and it's the only place where you may add hooks.
 *
 *
 *  ## Options
 *
 *  - `root` (required) - Application's root path (usually `__dirname`)
 *  - `name` (required) - Application name must be unique (usaually same as you
 *    provide in `package.json`
 *  - `bootstrap` (optional) - Application bootstrapper.
 *
 *
 *  ## Example
 *
 *      var app = new Application({
 *        name: 'my_app',
 *        root: __dirname,
 *        bootstrap: function bootstrap(callback) {
 *          // bootstrap application
 *          callback();
 *        }
 *      });
 *
 *
 *  ## See Also
 *
 *  - [[Application#addHook]]
 *###

`
var Application = module.exports = function Application(options) {
  if (!(this instanceof Application)) {
    return new Application(options);
  }

  var self = this, // self-reference
      name = options.name;


  if (!options.root) { throw Error("Application root is required"); }
  if (!options.name) { throw Error("Application name is required"); }
`

###* read-only
   *  Application#root -> String
   *
   *  Applications's root directory
*###

`
this.__defineGetter__('root', function get_root() {
    return options.root;
  });
`


###* read-only
   *  Application#name -> String
   *
   *  Applications's name.
   *###
`
  this.__defineGetter__('name', function get_name() {
    return name;
  });`


###* read-only
   *  Application#config -> Object
   *
   *  Applications's config.
   *
   *
   *  ## Throws Error
   *
   *  - When application was not yet bootstrapped
   *  - When failed read defaults config
   *###`
  this.__defineGetter__('config', function () {
    throw Error("Application was not bootstrapped yet.");
  });

`
###*
   *  Application#bootstrap(appConfig, callback) -> Void
   *  Application#bootstrap(callback) -> Void
   *
   *  Configures and bootstraps (if `options.bootstrap` was given
   *  in constructor) application.
   *###`
  this.bootstrap = function bootstrap(appConfig, callback) {
    if (undefined === callback) {
      callback = appConfig;
      appConfig = {};
    }

    this.readConfig('defaults', function (err, config) {
      // remove config getter stub
      delete self.config;

      if (err) {
        self.__defineGetter__('config', function () { throw err; });
        callback(err);
        return;
      }

      _.extend(config, appConfig);
      self.__defineGetter__('config', function () { return config; });

      if (options.bootstrap) {
        options.bootstrap(callback);
        return;
      }

      callback(null);
    });
  };
};
`

###*
 *  Application#env -> String
 *
 *  Application environment retreived from `NODE_ENV` environment variable.
 *  By default `development` if `NODE_ENV` was not set.
 *###`
Object.defineProperty(Application.prototype, 'env', {
  value: process.env['NODE_ENV'] || 'development'
});
`

###* 
 *  Application#init(appConfig, callback) -> Void
 *
 *  Initializes master application.
 *###`
Application.prototype.init = function init(appConfig, callback) {
  var initializer; // initializer function

  // allow call init with callback only
  if (undefined === callback) {
    callback = appConfig;
    appConfig = {};
  }

  // expose private objects through binding them to the initializer
  initializer = require('./application/initializer').bind({
    main: this,
    hooks: hooks_registry,
    shared: Application.prototype,
    appConfig: appConfig
  });
 
  // run initializer
  initializer(callback);
};
`

###*
 *  Application#getConfigFilename(name) -> String
 *
 *  Returns full path of `name` config.
 *
 *  ## Example
 *
 *  Assuming app is placed under /srv/red-hot-chili-peppers
 *
 *      app.getConfigFilename('database');
 *      // -> /srv/red-hot-chili-peppers/config/database.yml
 *###`
Application.prototype.getConfigFilename = function getConfigFilename(name) {
  return path.join(this.root, 'config', name + '.yml');
};

`
###*
 *  Application#readConfig(name, callback) -> Void
 *  Application#readConfig(name, env, callback) -> Void
 *  - name (String): filename to read (without extension), e.g.: `application`
 *  - env (String): get specific environment section of config (method does not
 *    checks if config has different sections or not)
 *  - callback (Function): fired once config was read or error met. Called with
 *    arguments as follows - `callback(err, config)`.
 *
 *  Reads and parses `config/<name>.yml` file of application. If `env` is
 *  given result is merged `general` and `env` sections of config.
 *
 *  ## Example
 *
 *  Assuming we have file `config/application.yml`:
 *
 *      ---
 *      general:
 *        foo: bar
 *
 *      production:
 *        baz: baz
 *
 *  We can grab whole config:
 *
 *      app.readConfig('application', function (err, config) {
 *        console.log(config);
 *        // -> {general: {foo: 'bar'}, production: {baz: 'baz'}}
 *      });
 *
 *  Or syntethic config for environment:
 *
 *      app.readConfig('application', 'production', function (err, config) {
 *        console.log(config);
 *        // -> {foo: 'bar', baz: 'baz'}
 *      });
 *
 *  ## See Also
 *
 *  - [[Application#getConfigFile]]
 *  - [[Utilities.readYaml]]
 *###`
Application.prototype.readConfig = function readConfig(name, env, callback) {
  var self = this,
      file = this.getConfigFilename(name);

  if (undefined === callback) {
    callback = env;
    env = null;
  }

  $$.readYaml(file, function (err, config) {
    if (err) {
      callback(err);
      return;
    }

    if (env) {
      config = _.defaults(config[env], config.general);
    }

    callback(null, config);
  });
};
`

###*
 *  Application#getModel(name) -> Object
 *
 *  Retuns model (proxy to mongoose.model right now).
 *###`
Application.prototype.getModel = function getModel(name) {
  // TODO replace with normal name normalizer
  return this.mongoose.model(_.camelize(_.capitalize(_.uncamelize(name))));
};

`
###*
 *  Application#settings -> Application.Settings
 *
 *  Global settings managre shared between all applications.
 *###`
Application.prototype.settings = new (require('./settings'))();

`
###*
 *  Application.addHook(name[, priority = 10], handler) -> Void
 *
 *  Registers given `handler` as `name` hook.
 *
 *
 *  ## Available Hooks
 *
 *  - apps-loaded
 *  - schemas-loaded
 *  - models-loaded
 *  - views-compiled
 *  - controllers-loaded
 *  - stores-loaded
 *  - routes-loaded
 *  - assets-compiled
 *
 *
 *  ## Example
 *
 *      Application.addHook('schemas-loaded', function (callback) {
 *          // monkey-patch some schemas...
 *          // ...
 *          callback(Error("Something happened"));
 *          // ...
 *          callback(null);
 *      });
 *
 *
 *  ## See Also
 *
 *  - [[Application]]
 *  - [[HooksManager#add]]
 *###`
Application.addHook = function addHook(name, priority, handler) {
  if (undefined === handler) {
    handler = priority;
    priority = 10;
  }

  hooks_registry.add(name, priority, handler);
};


////////////////////////////////////////////////////////////////////////////////
// vim:ts=2:sw=2
////////////////////////////////////////////////////////////////////////////////
`