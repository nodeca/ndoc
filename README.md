
# JavaScript PDoc parser

An attempt to parse [PDoc](http://pdoc.org/syntax.html) with [node.js](http://nodejs.org)

## How to Install

   npm install ndoc

## Quick start

Go to your project's root directory and run

    ndoc lib
    open file://./doc/index.html

## Usage

    ndoc [options] <path>...

    path PATH                 Source files location

    Options:

      -h, --help                Output usage information
      -o, --output PATH         Resulting file(s) location [doc]
      -e, --extension STRING    Source files extension [js]
      -f, --format <html|js>    Documentation format [html]
      -i, --index PATH          Index file [README.md]
      -l FMT, --link-format FMT String format for link to source file [{file}#L{line}]
                                {url} is substituted with the URL of repository read from manifest file
                                {file} is substituted with the name of the source file
                                {line} is substituted with the line number within the source file
                                E.g. http://github.com/nodeca/ndoc/{file}#L{line}
      --package-json PATH       Package manifest [package.json]
      --package-name NAME       Package name
      --package-version VER     Project version
      --package-title TITLE     Package title
      --view-source-label TXT   Text for "View source" link
      --skin PATH               Custom templates

## Syntax

[Syntax](ndoc/blob/master/syntax.md) is authored after [pdoc](https://github.com/tobie/pdoc), with some additional tags.

## License

[MIT](https://github.com/nodeca/ndoc/blob/master/LICENSE)
