/**
 *  Renderers.Html
 *
 *  ##### Options
 *
 *  - **index** (String): Index file (intro text).
 *    Default: `'README.md'`
 *  - **title** (String): Page title template.
 *    Default: `'{package.name} {package.version} API documentation'`
 *  - **ribbon** (Boolean): Add "ribbon" to generated docs.
 *    Default: `false`
 *  - **ribbonLink** (String): Ribbon link URL.
 *    Default: `null`
 *  - **ribbonImage** (String): Ribbon image URL.
 *    Default: `null`
 *  - **ribbonTitle** (String): Ribbon link text.
 *    Default: `'Fork me on GitHub'`
 *  - **viewSourceLabel** (String): Text for "View source" link
 *    Default: `'View source code'`
 *  - **brokenLinks** (show|hide|throw): What to do if broken link occurred.
 *    Default: `'show'`
 **/


'use strict';


// stdlib
var fs          = require('fs');
var path        = require('path');

// backward compatibility for Node <= 0.6.x
var pathExists  = fs.exists || path.exists;


// 3rd-party
var FsTools   = require('fs-tools');
var Jade      = require('jade');
var md2html   = require('marked');


// internal
var interpolate = require('../common').interpolate;
var extend      = require('../common').extend;
var assets      = require('./html/assets');


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
  },
  {
    keys: ['-i', '--index'],
    opts: {
      help:         'Index file',
      metavar:      'FILE',
      defaultValue: 'README.md'
    }
  },
  {
    keys: ['-t', '--title'],
    opts: {
      help:         'Documentation title. If omitted, it will be guessed from manifest, if any',
      metavar:      'STRING',
      defaultValue: '{package.name} {package.version} API documentation'
    }
  },
  {
    keys: ['--ribbon'],
    opts: {
      help:         'Add "ribbon" to generated docs',
      dest:         'ribbon',
      nargs:        0,
      action:       'storeTrue',
      defaultValue: false
    }
  },
  {
    keys: ['--ribbon-link'],
    opts: {
      help:         'Ribbon link URL',
      dest:         'ribbonLink',
      metavar:      'URL',
      nargs:        1,
      defaultValue: null
    }
  },
  {
    keys: ['--ribbon-image'],
    opts: {
      help:         'Ribbon image URL',
      dest:         'ribbonImage',
      metavar:      'URL',
      nargs:        1,
      defaultValue: null
    }
  },
  {
    keys: ['--ribbon-title'],
    opts: {
      help:         'Ribbon link title',
      dest:         'ribbonTitle',
      metavar:      'TEXT',
      nargs:        1,
      defaultValue: 'Fork me on GitHub'
    }
  },
  {
    keys: ['--view-source-label'],
    opts: {
      dest:         'viewSourceLabel',
      help:         'Text for "View source" link',
      metavar:      'STRING',
      defaultValue: 'View source code'
    }
  },
  {
    keys: ['-b', '--broken-links'],
    opts: {
      dest:         'brokenLinks',
      help:         'What to do if broken link occurred',
      choices:      ['show', 'hide', 'throw'],
      metavar:      'ACTION',
      defaultValue: 'show'
    }
  }
];


module.exports.render = function (ndoc, options, callback) {
  var file, str, fn, packageJson, list, id, obj;

  // prepare rendering function
  // TODO: store it for further reuse, and get rid of jade dependency?
  file = path.join(__dirname, 'html', 'skins', 'default', 'templates', 'layout.jade');
  str = fs.readFileSync(file, 'utf8');
  fn = Jade.compile(str, {
    filename: file,
    pretty: false
  });

  if (options.index) {
    try {
      options.index = fs.readFileSync(options.index, 'utf8');
    } catch (err) {
      console.error(err);
      options.index = err.toString();
    }
  }

  if (!!options.title) {
    options.title = interpolate(options.title, options).trim();
  }

  // get GitHub ribbon options
  if (options.ribbon) {
    if (!options.ribbonLink) {
      try {
        packageJson = fs.readFileSync('./package.json', 'utf8');
        packageJson = JSON.parse(packageJson);
      } catch (e) {
        packageJson = {};
      }

      if (typeof packageJson.repository !== 'undefined') {
        options.ribbonLink = packageJson.repository.url;

        if (options.ribbonLink.match(/.*\.git$/)) {
          // https://github.com/nodeca/ndoc.git ?
          options.ribbonLink = options.ribbonLink.replace(/\.git$/, '');
        }
        if (options.ribbonLink.match(/^git:\/\/github\.com.*/)) {
          // git://github.com/Sannis/ndoc.git?
          options.ribbonLink = options.ribbonLink.replace(/^git:/, 'https:');
        }
        // TODO: More cases?
      } else if (typeof packageJson.homepage !== 'undefined') {
        options.ribbonLink = packageJson.homepage;

        if (options.ribbonLink.match(/^https?:\/\/github\.com\/.*?\/.*?\/?/)) {
          // git://github.com/Sannis/ndoc.git?
          options.ribbonLink = options.ribbonLink.replace(/^(https?:\/\/github\.com\/.+?\/.+?)(\/.*)?$/, '$1');
        }
        // TODO: More cases?
      }
      if (!options.ribbonLink.match(/^https?:\/\/.*/)) {
        callback('Cannot determine project repository URL using package.json. Use --ribbon-link option.');
        return;
      }
    }
    if (!options.ribbonImage) {
      options.ribbonImage = path.join(options.htmlSkin, 'assets', 'images', 'ribbon.png');
    }
  }

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
            '" data-id="' + obj.id.toLowerCase() + '">';
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

  assets.prepare(options.htmlSkin, function (err, env) {
    var vars, html;

    if (err) {
      if (err.originalError) {
        err = (err.message || err.toString()) + ':\n' +
              (err.originalError.message || err.originalError.message);
      }

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

    pathExists(options.output, function (exists) {
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
