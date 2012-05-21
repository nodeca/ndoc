'use strict';


// stdlib
var fs    = require('fs');
var path  = require('path');


// 3rd-party
var FsTools   = require('fs-tools');
var Mincer    = require('mincer');
var UglifyJS  = require('uglify-js');
var Csso      = require('csso');
var Jade      = require('jade');
var md2html   = require('marked');
var Stylus    = require('stylus');


// internal
var extend = require('../common').extend;


////////////////////////////////////////////////////////////////////////////////


module.exports.name   = 'html';


module.exports.args   = [
  {
    keys: ['--html-skin'],
    opts: {
      help:         'Custom templates',
      dest:         'htmlSkin',
      metavar:      'PATH',
      nargs:        1,
      defaultValue: path.join(__dirname, 'html', 'skins', 'default')
    }
  }
];


function prepare_mincer(templatePath, callback) {
  var files, environment;

  environment = new Mincer.Environment(templatePath);
  files       = ['main.js', 'main.css', 'modernizr.js'];


  // function that mathces any non-js or non-css files
  files.push(function nonAsset(logicalPath) {
    var extname = path.extname(logicalPath);
    return (!/\.(js|css)$/.test(extname));
  });


  environment.appendPath('assets/javascripts');
  environment.appendPath('assets/stylesheets');
  environment.appendPath('assets/images');


  Mincer.StylusEngine.registerConfigurator(function (style) {
    style.define('url', Stylus.url());
  });


  if ('development' !== process.env.NODE_ENV) {
    // Register compressors
    environment.jsCompressor = function (data, callback) {
      try {
        var ast = UglifyJS.parser.parse(data);

        ast = UglifyJS.uglify.ast_mangle(ast);
        ast = UglifyJS.uglify.ast_squeeze(ast);

        callback(null, UglifyJS.uglify.gen_code(ast));
      } catch (err) {
        callback(err);
      }
    };

    environment.cssCompressor = function (data, callback) {
      try {
        callback(null, Csso.justDoIt(data));
      } catch (err) {
        callback(err);
      }
    };
  }


  // Configure logger
  // FIXME: Replace with NDoc's logger
  Mincer.logger.use(console);


  // Returns plain array of filenames matching `filters`
  function get_assets(filters) {
    var result = [];

    environment.eachLogicalPath(filters, function (logicalPath) {
      result.push(logicalPath);
    });

    return result;
  }


  // Precompile all assets
  environment.precompile(get_assets(files), function (err) {
    callback(err, environment);
  });
}


module.exports.render = function (ndoc, options, callback) {
  var file, str, fn, list, id, obj, vars, html;

  // prepare rendering function
  // TODO: store it for further reuse, and get rid of jade dependency?
  file = path.join(options.htmlSkin, 'templates', 'layout.jade');
  str = fs.readFileSync(file, 'utf8');
  fn = Jade.compile(str, {
    filename: file,
    pretty: false
  });

  // it's illegal to have slashes in HTML elements ids.
  // replace them with dashes
  list = ndoc.list;

  for (id in list) {
    if (list.hasOwnProperty(id)) {
      obj = list[id];
      // path should be HTML valid id
      obj.path = obj.path.replace(/\//g, '-');
    }
  }

  // render link
  // N.B. logic is way tricky to move to templates.
  // beside, this function is used as parameter in some Array#map() operations
  function link(obj, short, classes) {
    if (typeof obj === 'string') {
      obj = list[obj] || {id: obj};
    }
    // broken link. `options.brokenLinks` define action
    if (!obj.path) {
      return obj.id;
      /*if (options.brokenLinks === 'throw') {
        throw 'Link is broken: ' + obj.id;
      }
      return options.brokenLinks === 'show' ? '[[' + obj.id + ']]' : obj.id;*/
    }
    //
    var r = '<a href="#' + obj.path +
            '" class="' + (classes || []).join(' ') +
            '" title="' + obj.id + (obj.type ? ' (' + obj.type + ')' : '') +
            '" data-id="' + obj.id + '">';
    r += typeof short === 'string' ? short : short ? obj.name : obj.id;
    r += '</a>';
    return r;
  }

  // convert markdown to HTML
  function markdown(text, inline) {
    var r = text,
      codes;
    // render markdown
    r = md2html(r);
    /* fixed
    // restore &entities;
    r = r.replace(/&amp;(\w+);/g, function (all, entity) {
      return '&' + entity + ';';
    });
    */
    /* considered wrong
    // trim content in <pre><code> CONTENT </code></pre>
    r = r.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, function (all, content) {
      return '<pre><code>' + content.trim() + '</code></pre>';
    });
    */
    // FIXME: highlight code
    /*r = r.replace(/<code>([\s\S]*?)<\/code>/g, function (all, content) {
      return '<code>' + highlight(content) + '</code>';
    });*/
    // inline markdown means to strip enclosing tag. <p /> in this case
    if (inline) {
      r = r.slice(3, -4);
    }
    // desugar [[foo#bar]] tokens into local links
    // N.B. in order to not apply conversion in <code> blocks,
    // we first store replace code blocks with nonces
    codes = {};
    r = r.replace(/(<code>[\s\S]*?<\/code>)/g, function (all, def) {
      var nonce = Math.random().toString().substring(2);
      codes[nonce] = def;
      return '@-=@=-@' + nonce + '@-=@=-@';
    });
    // convert [[link]] to links
    r = r.replace(/\[\[([\s\S]+?)\]\]/g, function (all, def) {
      def = def.split(/\s+/);
      id = def.shift();
      // invalid references don't produce links
      if (!list[id]) {
        if (options.brokenLinks === 'throw') {
          throw 'Link is broken: ' + all + '\n' + r;
        }
        return options.brokenLinks === 'show' ? all : id;
      }
      //
      var obj = extend(list[id], {
        name: def.join(' ') || id
      });
      return link(obj, true, ['link-short']);
    });
    // restore code blocks, given previously stored nonces
    r = r.replace(/@-=@=-@(\d+)@-=@=-@/g, function (all, nonce) {
      return codes[nonce];
    });
    //
    return r;
  }

  // given signature object, recompose its textual representation
  function signature(obj, sig) {
    if (typeof obj === 'string') {
      obj = list[obj];
    }
    var r = obj.id;
    if (sig.args) {
      r += '(';
      sig.args.forEach(function (arg, idx, args) {
        var skip_first, a, value;
        // skip the first bound argument for prototype methods
        skip_first = obj.bound && obj.id.indexOf('#') >= 0;
        a = arg.name;
        // argument can be callback
        if (arg.args) {
          a = signature({id: a}, arg);
        }
        if (!idx && skip_first) {
          return; //a = '@' + a;
        }
        if (typeof arg.default_value !== 'undefined') {
          // apply custom stringifier
          value = JSON.stringify(arg.default_value, function (k, v) {
            if (v instanceof RegExp) {
              // FIXME: get rid of quotes, if possible
              v = v.source;
            } else if (v === 'null') {
              v = null;
            }
            return v;
          });
          a = a + ' = ' + value;
        }
        // compensate for possibly skipped first argument
        if (idx > (skip_first ? 1 : 0)) {
          a = ', ' + a;
        }
        if (arg.ellipsis) {
          a += '...';
        }
        if (arg.optional) {
          a = '[' + a + ']';
        }
        r += a;
      });
      r += ')';
    }
    return r;
  }

  prepare_mincer(options.htmlSkin, function (err, env) {
    var vars, html;

    if (err) {
      callback(err);
      return;
    }

    // collect context for rendering function
    vars = extend(options, {
      list: ndoc.list,
      tree: ndoc.tree,
      date: (new Date()).toUTCString(),
      //--
      link:       link,
      markdown:   markdown,
      signature:  signature,
      // mincer rocks
      inline_asset: function (pathname) {
        var asset = env.findAsset(pathname);
        return asset ? asset.toString() : "";
      }
    });

    // render HTML
    html = fn(vars);

    path.exists(options.output, function (exists) {
      if (exists) {
        callback("Output directory '" + options.output + "' already exists");
        return;
      }

      FsTools.mkdir(options.output, function (err) {
        if (err) {
          callback(err);
          return;
        }

        fs.writeFile(path.join(options.output, 'index.html'), html, callback);
      });
    });
  });
};
