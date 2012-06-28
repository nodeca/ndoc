# NDoc - JavaScript documentation generator
[![Build Status](https://secure.travis-ci.org/nodeca/ndoc.png)](http://travis-ci.org/nodeca/ndoc)

NDoc is an inline comment parser and JavaScript documentation generator written in node.js.
This project is inspired by [PDoc](http://pdoc.org/syntax.html). It tries to keep compatibility,
but has some differences:

- NDoc is a CLI tool, not library. It doesn't require additional programming to execute.
- Clarified EBNF syntax. Definitions now **MUST** be separated with an empty line from the following comments.
- Added options for `deprecated` tag: you can set versions, when tag was deprecated and
  when it will be removed.
- Added new tags: `read-only`, `internal`, `chainable`
- Events support.


## How to Install

We suppose that you already have `node.js` and `npm` installed.
If not - try [nvm](https://github.com/creationix/nvm). Then install NDoc globally

    npm install -g ndoc


## Usage

    usage: ndoc [-h] [-v] [--exclude PATTERN] [-o PATH] [--use PLUGIN]
                [-r RENDERER] [--link-format FORMAT] [-t TEMPLATE] [--show-all]
                [--package PACKAGE] [--index FILE] [--gh-ribbon URL]
                [--broken-links ACTION] [--noenv]
                PATH[PATH ...]

    Positional arguments:
      PATH                            Source files location

    Optional arguments:
      -h, --help                      Show this help message and exit.
      -v, --version                   Show program's version number and exit.
      --exclude PATTERN               Pathnames to exclude. Pathnames might be 
                                      absolute or relative and might have 
                                      wildcards: - `*` Matches single directory 
                                      or file: /foo/* matches /foo/bar but not 
                                      /foo/bar/baz - `**` Matches files and 
                                      directries recursively: /foo** matches 
                                      /foo/bar, /foo/bar/baz, etc. - `?` Matches 
                                      exactly one non-slash character
      -o PATH, --output PATH          Resulting file(s) location
      --use PLUGIN                    Use custom plugin
      -r RENDERER, --render RENDERER  Documentation renderer
      --link-format FORMAT            Format for link to source file. This can 
                                      have variables: - {file} - Current file - 
                                      {line} - Current line - {package.*} - Any 
                                      package.json variable
      -t TEMPLATE, --title TEMPLATE   Documentation title template. You can use 
                                      any of `{package.*}` variables for 
                                      interpolation, e.g.: `My App {package.
                                      version}`
      --show-all                      By default `internal` methods/properties 
                                      are not shown. This trigger makes ndoc show 
                                      all methods/properties
      --package PACKAGE               Read specified package.json FILE.
      --index FILE                    Index file
      --gh-ribbon URL                 Add "Fork me on GitHub" ribbon with given 
                                      URL. You can use `{package.*}` variables 
                                      here.
      --broken-links ACTION           What to do if broken link occurred
      --noenv                         Ignore .ndocrc


## Syntax

[NDoc Syntax](https://github.com/nodeca/ndoc/blob/master/syntax.md).
It is similar to [PDoc](https://github.com/tobie/pdoc) one, with some extentions (see start of this doc for details).


## For developers

You can generate prototype documentation for test:

    make test

Then open `./tests/prototype-doc/index.html`. Here is [hosted doc example](http://nodeca.github.com/ndoc/tests/prototype/).


#### Custom parsers and renderers

You can create and use your own parser/renderer via `use` option. Get one of the
[parsers][parsers] or [renderers][renderers] as a base template, copy it into
separate folder, create package.json, modify it to fit your needs, and then
attach it with `--use my-module` argument.

[parsers]: https://github.com/nodeca/ndoc/blob/master/lib/ndoc/plugins/parsers
[renderers]: https://github.com/nodeca/ndoc/blob/master/lib/ndoc/plugins/renderers


#### Using NDoc as module

You can use NDoc as module, for example, to override default options processing.

``` javascript
var NDoc = require('ndoc');


var options = {
  linkFormat  : 'http://example.com/{file}#{line}',
  output:     : 'doc'
};


NDoc.parse(['lib/my-module.js'], options, function (err, ast) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  NDoc.render('html', ast, options, function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});
```


## License

This project is distributed under [MIT](https://github.com/nodeca/ndoc/blob/master/LICENSE) license.
