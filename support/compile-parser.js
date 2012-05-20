'use strict';


// stdlib
var Fs = require('fs');


// 3rd-party
var Jison           = require('jison');
var BNF             = require('jison/lib/jison/bnf');
var ArgumentParser  = require('argparse').ArgumentParser;


var cli = new ArgumentParser({addHelp:  true});


cli.addArgument(['path'], {
  help:     'Parser definition',
  metavar:  'PATH',
  nargs:    1
});


var grammar = Fs.readFileSync(Fs.realpathSync(cli.parseArgs().path.shift()), 'utf8');
var parser  = new Jison.Parser(BNF.parse(grammar));


process.stdout.write(parser.generate());
