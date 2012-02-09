'use strict';


// stdlib
var Fs = require('fs');


// 3rd-party
var Jison   = require('jison');
var BNF     = require('jison/lib/jison/bnf');
var NomNom  = require('nomnom');


NomNom.option('path', {
  position: 0,
  list:     false,
  required: true,
  help:     'Parser definition',
  metavar:  'PATH'
});


var grammar = Fs.readFileSync(Fs.realpathSync(NomNom.parse().path), 'utf8');
var parser  = new Jison.Parser(BNF.parse(grammar));


process.stdout.write(parser.generate());
