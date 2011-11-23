
# JavaScript PDoc parser

An attempt to parse [PDoc](http://pdoc.org/syntax.html) with [node.js](http://nodejs.org)

## How to Install

Clone and have fun

## Quick start

Go to your project's root directory and run

    ndoc lib
    open file://./doc/index.html

## Usage

    ndoc [options] <path>...

    path PATH                 Source files location

    Options:

      -h, --help              output usage information
      -o, --output PATH       Resulting file(s) location [doc]
      -e, --extension STRING  Source files extension [js]
      -f, --format <html|js>  Documentation format [html]
      -i, --index PATH        Index file [README.md]
      --package-json PATH     Package manifest [package.json]
      --package-name NAME     Package name
      --package-version VER   Project version
      --package-title TITLE   Package title
      --package-url URL       Package URL
      --view-source-label TXT Text for "View source" link
      --link-format FMT       Format for link to source file [{root}/{file}#L#{line}]
                              {root} is substituted with the value of --package-url option
                              {file} is substituted with the name of the source file
                              {line} is substituted with the line number within the source file
      --template PATH         Templates
      --skeleton PATH         Documentation skeleton

## License

[MIT](https://github.com/nodeca/ndoc/blob/master/LICENSE)
