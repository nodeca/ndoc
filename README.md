
# JavaScript PDoc parser

An attempt to parse [PDoc](http://pdoc.org/syntax.html) with [node.js](http://nodejs.org)

## How to Install

Clone and have fun

## Quick start

Go to your project's root directory and run

    ndoc
    open file://./docs/index.html

## Usage

    ndoc [options]

    Options:

      -h, --help              output usage information
      -V, --version           output the version number
      -s, --source PATH       Source files location [./lib]
      -o, --output PATH       Resulting file(s) location [./docs]
      -f, --format <html|js>  Documentation format [html]
      -i, --index PATH        Index file [./README.md]
      --package-json PATH     Package description file [./package.json]
      --package-name NAME     Package name
      --package-version VER   Project version
      --package-title TITLE   Package title
      --package-url URL       Package URL
      --view-source-label TXT Text for "View source" link
      --template PATH         Custom templates
      --skeleton PATH         Custom skeleton

## License

[MIT](https://github.com/nodeca/ndoc/blob/master/LICENSE)
