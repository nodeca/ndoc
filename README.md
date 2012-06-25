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

    ndoc [options] <path>...

    path PATH                   Source files location

    Options:

      -h, --help                Output usage information
      -o, --output PATH         Resulting file(s) location [doc]
      -e, --extension STRING    Source files extension [js]
      -p, --parser <ndoc>       Documentation parser [ndoc]
      -r, --render <html|json>  Documentation rendering format [html]
      -i, --index PATH          Index file [README.md]
      -t, --title TITLE         Documentation title
                                Supports interpolation. See notes for --link-format.
      -l, --link-format         FMT String format for link to source file [{file}#L{line}]
                                {url} is substituted with the URL of repository read from manifest file
                                {file} is substituted with the name of the source file
                                {line} is substituted with the line number within the source file
                                E.g. http://github.com/nodeca/ndoc/{file}#L{line}
                                {package.XXX} is substituted with XXX key of package.json, if any
      --view-source-label TXT   Text for "View source" link
      --skin PATH               Custom templates
      -b, --broken-links ACTION What to do if broken link occured. Can be one of 'show', 'hide', 'throw'.
                                Default is 'hide'

NDoc uses data from `package.json` in current folder, if found one. This helps to minimize number of options when building documentation for node.js projects. For example, you can just run:

    ndoc ./lib


## API

``` javascript
NDoc.parse('ndoc', ['lib/my-module.js'], {}, function (err, ast) {
  // ...
  NDoc.render('html', ast, {}, function (err) {
    // ...
  });
});
```


## Syntax

[NDoc Syntax](https://github.com/nodeca/ndoc/blob/master/syntax.md).
It is similar to [PDoc](https://github.com/tobie/pdoc) one, with some extentions (see start of this doc for details).


## For developers

If you like to make patches or develop skins - install NDoc in developer mode:

    git clone [your_fork_url]
    cd ndoc
    npm install --dev

After installation is done you can generate prototype documentation for test:

    make test

Then open `./tests/prototype-doc/index.html`. Here is [hosted doc example](http://nodeca.github.com/ndoc/tests/prototype/). There are also some shortcuts in [Makefile](https://github.com/nodeca/ndoc/blob/master/Makefile),
if you make skin changes and need to constantly rebuild samples.


## License

This project is distributed under [MIT](https://github.com/nodeca/ndoc/blob/master/LICENSE) license.
