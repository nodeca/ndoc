%lex

esc     "\\"
int     "-"?(?:[0-9]|[1-9][0-9]+)
exp     (?:[eE][-+]?[0-9]+)
frac    (?:\.[0-9]+)
name    (?:[$_a-zA-Z][$_a-zA-Z0-9]*)
notdef  (?!"class"|"mixin"|"new"|"=="|[$_a-zA-Z][$_a-zA-Z0-9.#]*\s*(?:$|[(=]|"->"))

%x INITIAL tags def arg

%%

<*><<EOF>>                  return 'EOF'

<INITIAL>\s+                /* skip whitespaces */
<INITIAL>"/**"              this.begin('tags'); return '/**'
<INITIAL>.*                 /* skip vanilla code */

<tags>"**/"                 this.popState(); return '**/'
<tags>\s*[\n]               this.popState(); this.begin('def')
<tags>", "                  return ',' /* list separator */
<tags>": "                  return ':' /* key/value delimiter */
<tags>".."                  return '..' /* range */
<tags>"#"                   return '#'
<tags>"."                   return '.'
<tags>\s+                   /* skip whitespaces */
<tags>{int}{frac}?{exp}?\b  return 'NUMBER'
<tags>"deprecated"          return 'DEPRECATED'
<tags>"read-only"           return 'READONLY'
<tags>"internal"            return 'INTERNAL'
<tags>"chainable"           return 'CHAINABLE'
<tags>"section"             return 'SECTION'
<tags>"alias of"            return 'ALIASOF'
<tags>"alias"               /* N.B. shouldn't it be ALIAS, and reversed sense */ return 'ALIASOF'
<tags>"related to"          return 'RELATEDTO'
<tags>"belongs to"          return 'BELONGSTO'
<tags>{name}                return 'NAME'

<def>"**/"                  this.popState(); return '**/'
<def>"*"\s*[\n][\s\S]*?/"**/" yytext = yytext.replace(/\s*\n\s*\*/g, '\n').replace(/(^\*\s*|\s*$)/g, ''); return 'TEXT'
<def>"*"\s*[\n]"123123123"             return 'NL'
<def>\s+                    /* skip whitespaces */
<def>")"\s*":"              this.begin('arg'); return '):'
<def>"*"\s*"-"              return '*-'
<def>"*"\s*"fires"          return 'FIRES'
<def>"*"\s*"includes"       return 'INCLUDES'
<def>"*"                    return '*'
<def>\"(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^"{esc}])*\"  yytext = yytext.substr(1,yyleng-2); return 'STRING'
<def>\'(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^'{esc}])*\'  yytext = yytext.substr(1,yyleng-2); return 'STRING'
<def>{int}{frac}?{exp}?\b   return 'NUMBER'
<def>\/(?:[^\/]|"\\/")*\/   return 'REGEXP'
<def>"true"                 return 'BOOLEAN'
<def>"false"                return 'BOOLEAN'
<def>"#"                    return '#'
<def>"@"                    return '@'
<def>"?"                    return '?'
<def>"..."                  return '...'
<def>"."                    return '.'
<def>","                    return ','
<def>"->"                   return '->'
<def>"=="                   return '=='
<def>"="                    return '='
<def>"<"                    return '<'
<def>":"                    return ':'
<def>"("                    return '('
<def>")"                    return ')'
<def>"["                    return '['
<def>"]"                    return ']'
<def>"{"                    return '{'
<def>"}"                    return '}'
<def>"|"                    return '|'
<def>"class"                return 'CLASS'
<def>"mixin"                return 'MIXIN'
<def>"new"                  return 'NEW'
<def>{name}                 return 'NAME'

<arg>[\s\S]*?/("*"\s*[-\n]) this.popState(); return 'TEXT'

/lex

%start file

%%


file

  /*: world EOF { console.log(require('util').inspect($$, false, 4)); return $$ }*/
/*  : world EOF { console.log(JSON.stringify($$)); return $$ } */
  : world EOF { return $$ }
  ;


world

  : /* empty */ { $$ = {} }

  | world '/**' tags '*' ndoc_and_includes_and_fires comment '**/' %{
    var x = $5;
    for (var i in $3) x[i] = $3[i];
    x.description = $6.text;
    x.short_description = x.description.replace(/\n\n[\s\S]*$/, '\n');
    x.line = ($6.line + 1);
    // register
    $$[x.id] = x;
  }%
  ;


tags

  : /* empty */ { $$ = {} }
  | tag_list
  ;


tag_list

  : tag { $$ = {}; for (var i in $1) $$[i] = $1[i] }
  | tag_list ',' tag { for (var i in $3) $$[i] = $3[i] }
  ;


tag

  : DEPRECATED { $$ = {deprecated: true} }
  | DEPRECATED ':' NUMBER { $$ = {deprecated: {from: $3}} }
  | DEPRECATED ':' NUMBER '..' NUMBER { $$ = {deprecated: {from: $3, off: $5}} }
  | READONLY { $$ = {read_only: true} }
  | INTERNAL { $$ = {internal: true} }
  | CHAINABLE { $$ = {chainable: true} }
  | SECTION ':' name { $$ = {section: $3} }
  | ALIASOF ':' name { $$ = {alias_of: $3} }
  | RELATEDTO ':' name { $$ = {related_to: $3} }
  | BELONGSTO ':' name { $$ = {belongs_to: $3} }
  ;


ndoc_and_includes_and_fires

  : ndoc
  | ndoc INCLUDES names { $$.included_mixins = $3 }
  | ndoc FIRES events { $$.events = $3 }
  ;


comment
  : /* empty */ { $$ = {text: '', line: yy.lexer.yylloc.last_line} }
  | TEXT { $$ = {text: $1, line: yy.lexer.yylloc.last_line} }
  ;


ndoc

  : section
  | namespace
  | class
  | mixin
  | property
  | constant
  | signatures
  | signatures argument_descriptions { $$.arguments = $2 }
  ;


argument_descriptions

  : argument_description { $$ = [$1] }
  | argument_descriptions argument_description { $$.push($2) }
  ;


argument_description

  : '*-' name '(' names_alternation ')' { $$ = {name: $2, types: $4} }
  | '*-' name '(' names_alternation '):' TEXT %{
    $$ = {
      name: $2,
      types: $4,
      description: $6.replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
    };
  }%
  ;


events

  : event { $$ = [$1] }
  | events ',' event { $$ = $1; $$.push($3) }
  ;


event

  : NAME
  | event ':' NAME { $$ += $2 + $3 }
  ;


name

  : NAME
  | name '.' NAME { $$ += $2 + $3 }
  | name '#' NAME { $$ += $2 + $3 }
  ;


names

  : name { $$ = [$1] }
  | names ',' name { $$ = $1; $$.push($3) }
  ;


names_alternation

  : '?' { $$ = [] }
  | name { $$ = [$1] }
  | names_alternation '|' name { $$.push($3) }
  ;


value

  : STRING { $$ = String($1) }
  | NUMBER { $$ = Number($1) }
  | BOOLEAN { $$ = Boolean($1) } 
  | REGEXP { $$ = new RegExp($1) }
  | name
  | '[' value_list ']' { $$ = $2 }
  | '[' value_list '...' ']' { $$ = $2; $$.ellipsis = true }
  | '{' key_value_list '}' { $$ = $2 }
  ;


value_list

  : /* empty */ { $$ = [] }
  | value { $$ = [$1] }
  | value_list ',' value { $$.push($3) }
  ;


key_value_list

  : /* empty */ { $$ = {} }
  | key ':' value { $$ = {}; $$[$1] = $3 }
  | key_value_list ',' key ':' value { $$[$3] = $5 }
  ;

key
  : STRING
  | NAME
  ;

name_or_value

  : value
  ;


namespace

  : name { $$ = {id: $1, type: 'namespace'}; }
  ;


section

  : '==' name '==' { $$ = {id: $2, type: 'section'}; }
  ;


class

  /* vanilla */
  : CLASS name { $$ = {id: $2, type: 'class'}; }

  /* inherited from another class */
  | CLASS name '<' name { $$ = {id: $2, type: 'class', superclass: $4}; }
  ;


mixin

  : MIXIN name { $$ = {id: $2, type: 'mixin'} }
  ;


property

  : name '->' returns { $$ = {id: $1, type: 'property', returns: $3} }
  ;


constant

  : name '=' name_or_value { $$ = {id: $1, type: 'constant', returns: $3} }
  ;


signatures
  : signature %{
    $$ = $1;
    $$.signatures = [{args: $1.args, returns: $1.returns}];
    delete $$.args;
    delete $$.returns;
  }%
  | signatures '*' signature %{
    $$.signatures.push({args: $3.args, returns: $3.returns});
    delete $$.args;
    delete $$.returns;
  }%
  ;

signature

  /* void method */
  : method

  /* method returning value */
  | method '->' returns { $$.returns = $3 }

  /* constructor */
  | NEW method { $$ = $2; $$.id = $1 + ' ' + $$.id; $$.type = 'constructor' }
  ;


method

  /* vanilla */
  : name '(' args ')' { $$ = {id: $1, type: 'method', args: $3} }

  /* with bound `this` */
  | name '(' '@' args ')' { $$ = {id: $1, type: 'method', args: $4, bound: true} }
  ;


returns

  /* anything */
  : '?' { $$ = [] }

  /* single */
  | name_or_value { $$ = [$1] }
/*  | name_or_value '...' { $$ = [$1]; $$.ellipsis = true } */

  /* alternation */
  | returns '|' name_or_value { $$.push($3) }
  ;


args

  : /* empty */ { $$ = [] }

  /* single argument */
  | arg { $$ = [$1] }

  /* comma-separated list of arguments */
  | args ',' arg { $$.push($3) }

  /* optional argument */
  | args '[' arg ']' { $3.optional = true; $$.push($3) }

  /* comma-separated list of optional arguments */
  | args '[' ',' arg ']' { $4.optional = true; $$.push($4) }

  /* comma-separated list of optional arguments */
  | args ',' '[' args ']' %{
    $4.forEach(function(a) {
      a.optional = true;
      $args1.push(a);
    });
  }%
  ;


arg

  /* vanilla */
  : NAME { $$ = {name: $1} }

  /* with default value */
  | arg '=' name_or_value { $$.default_value = $3 }

  /* with ellipsis */
  | arg '...' { $$.ellipsis = true }
  ;
