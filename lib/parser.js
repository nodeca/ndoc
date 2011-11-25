/* Jison generated parser */
var parser = (function(){
undefined
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"ndoc_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"CHAINABLE":20,"SECTION":21,"name":22,"ALIASOF":23,"RELATEDTO":24,"BELONGSTO":25,"ndoc":26,"INCLUDES":27,"names":28,"FIRES":29,"events":30,"TEXT":31,"section":32,"namespace":33,"class":34,"mixin":35,"property":36,"constant":37,"signatures":38,"argument_descriptions":39,"argument_description":40,"*-":41,"(":42,"names_alternation":43,")":44,"):":45,"event":46,"NAME":47,".":48,"#":49,"?":50,"|":51,"value":52,"STRING":53,"BOOLEAN":54,"REGEXP":55,"[":56,"value_list":57,"]":58,"...":59,"{":60,"key_value_list":61,"}":62,"key":63,"name_or_value":64,"==":65,"CLASS":66,"<":67,"MIXIN":68,"->":69,"returns":70,"=":71,"signature":72,"method":73,"NEW":74,"args":75,"@":76,"arg":77,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"CHAINABLE",21:"SECTION",23:"ALIASOF",24:"RELATEDTO",25:"BELONGSTO",27:"INCLUDES",29:"FIRES",31:"TEXT",41:"*-",42:"(",44:")",45:"):",47:"NAME",48:".",49:"#",50:"?",51:"|",53:"STRING",54:"BOOLEAN",55:"REGEXP",56:"[",58:"]",59:"...",60:"{",62:"}",65:"==",66:"CLASS",67:"<",68:"MIXIN",69:"->",71:"=",74:"NEW",76:"@"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[8,1],[8,3],[8,3],[9,0],[9,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,2],[39,1],[39,2],[40,5],[40,6],[30,1],[30,3],[46,1],[46,3],[22,1],[22,3],[22,3],[28,1],[28,3],[43,1],[43,1],[43,3],[52,1],[52,1],[52,1],[52,1],[52,1],[52,3],[52,4],[52,3],[57,0],[57,1],[57,3],[61,0],[61,3],[61,5],[63,1],[63,1],[64,1],[33,1],[32,3],[34,2],[34,4],[35,2],[36,3],[37,3],[38,1],[38,2],[72,1],[72,3],[72,2],[73,4],[73,5],[70,1],[70,1],[70,3],[75,0],[75,1],[75,3],[75,5],[75,4],[77,1],[77,3],[77,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return this.$ 
break;
case 2: this.$ = {} 
break;
case 3:
    var x = $$[$0-2];
    for (var i in $$[$0-3]) x[i] = $$[$0-3][i];
    x.description = $$[$0-1].text;
    x.short_description = x.description.replace(/\n\n[\s\S]*$/, '\n');
    x.line = ($$[$0-1].line + 1);
    // register
    this.$[x.id] = x;
  
break;
case 4: this.$ = {} 
break;
case 6: this.$ = {}; for (var i in $$[$0]) this.$[i] = $$[$0][i] 
break;
case 7: for (var i in $$[$0]) this.$[i] = $$[$0][i] 
break;
case 8: this.$ = {deprecated: true} 
break;
case 9: this.$ = {deprecated: {from: $$[$0]}} 
break;
case 10: this.$ = {deprecated: {from: $$[$0-2], off: $$[$0]}} 
break;
case 11: this.$ = {read_only: true} 
break;
case 12: this.$ = {internal: true} 
break;
case 13: this.$ = {chainable: true} 
break;
case 14: this.$ = {section: $$[$0]} 
break;
case 15: this.$ = {alias_of: $$[$0]} 
break;
case 16: this.$ = {related_to: $$[$0]} 
break;
case 17: this.$ = {belongs_to: $$[$0]} 
break;
case 19: this.$.included_mixins = $$[$0] 
break;
case 20: this.$.events = $$[$0] 
break;
case 21: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 22: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 23: yy.lexer.begin('comment') 
break;
case 30: this.$.arguments = $$[$0] 
break;
case 31: this.$ = [$$[$0]] 
break;
case 32: this.$.push($$[$0]) 
break;
case 33: this.$ = {name: $$[$0-3], types: $$[$0-1]} 
break;
case 34:
    this.$ = {
      name: $$[$0-4],
      types: $$[$0-2],
      description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
    };
  
break;
case 35: this.$ = [$$[$0]] 
break;
case 36: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 38: this.$ += $$[$0-1] + $$[$0] 
break;
case 40: this.$ += $$[$0-1] + $$[$0] 
break;
case 41: this.$ += $$[$0-1] + $$[$0] 
break;
case 42: this.$ = [$$[$0]] 
break;
case 43: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 44: this.$ = [] 
break;
case 45: this.$ = [$$[$0]] 
break;
case 46: this.$.push($$[$0]) 
break;
case 47: this.$ = String($$[$0]) 
break;
case 48: this.$ = Number($$[$0]) 
break;
case 49: this.$ = Boolean($$[$0]) 
break;
case 50: this.$ = new RegExp($$[$0]) 
break;
case 52: this.$ = $$[$0-1] 
break;
case 53: this.$ = $$[$0-2]; this.$.ellipsis = true 
break;
case 54: this.$ = $$[$0-1] 
break;
case 55: this.$ = [] 
break;
case 56: this.$ = [$$[$0]] 
break;
case 57: this.$.push($$[$0]) 
break;
case 58: this.$ = {} 
break;
case 59: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 60: this.$[$$[$0-2]] = $$[$0] 
break;
case 64: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 65: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 66: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 67: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 68: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 69: this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
break;
case 70: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 71:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 72:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 74: this.$.returns = $$[$0] 
break;
case 75: this.$ = $$[$0]; this.$.id = $$[$0-1] + ' ' + this.$.id; this.$.type = 'constructor' 
break;
case 76: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 77: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 78: this.$ = ['?'] 
break;
case 79: this.$ = [$$[$0]] 
break;
case 80: this.$.push($$[$0]) 
break;
case 81: this.$ = [] 
break;
case 82: this.$ = [$$[$0]] 
break;
case 83: this.$.push($$[$0]) 
break;
case 84:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 85:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 86: this.$ = {name: $$[$0]} 
break;
case 87: this.$.default_value = $$[$0] 
break;
case 88: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15],47:[2,4],65:[2,4],66:[2,4],68:[2,4],74:[2,4]},{8:16,22:26,26:17,32:18,33:19,34:20,35:21,36:22,37:23,38:24,47:[1,30],65:[1,25],66:[1,27],68:[1,28],72:29,73:31,74:[1,32]},{13:[1,33],47:[2,5],65:[2,5],66:[2,5],68:[2,5],74:[2,5]},{13:[2,6],47:[2,6],65:[2,6],66:[2,6],68:[2,6],74:[2,6]},{13:[2,8],15:[1,34],47:[2,8],65:[2,8],66:[2,8],68:[2,8],74:[2,8]},{13:[2,11],47:[2,11],65:[2,11],66:[2,11],68:[2,11],74:[2,11]},{13:[2,12],47:[2,12],65:[2,12],66:[2,12],68:[2,12],74:[2,12]},{13:[2,13],47:[2,13],65:[2,13],66:[2,13],68:[2,13],74:[2,13]},{15:[1,35]},{15:[1,36]},{15:[1,37]},{15:[1,38]},{9:39,10:[2,21],31:[1,40]},{10:[2,18],27:[1,41],29:[1,42],31:[2,18]},{10:[2,23],27:[2,23],29:[2,23],31:[2,23]},{10:[2,24],27:[2,24],29:[2,24],31:[2,24]},{10:[2,25],27:[2,25],29:[2,25],31:[2,25]},{10:[2,26],27:[2,26],29:[2,26],31:[2,26]},{10:[2,27],27:[2,27],29:[2,27],31:[2,27]},{10:[2,28],27:[2,28],29:[2,28],31:[2,28]},{10:[2,29],22:47,27:[2,29],29:[2,29],31:[2,29],39:43,40:45,41:[1,46],47:[1,30],72:44,73:31,74:[1,32]},{22:48,47:[1,30]},{10:[2,64],27:[2,64],29:[2,64],31:[2,64],42:[1,53],48:[1,51],49:[1,52],69:[1,49],71:[1,50]},{22:54,47:[1,30]},{22:55,47:[1,30]},{10:[2,71],27:[2,71],29:[2,71],31:[2,71],41:[2,71],47:[2,71],74:[2,71]},{10:[2,39],13:[2,39],27:[2,39],29:[2,39],31:[2,39],41:[2,39],42:[2,39],44:[2,39],45:[2,39],47:[2,39],48:[2,39],49:[2,39],51:[2,39],56:[2,39],58:[2,39],59:[2,39],62:[2,39],65:[2,39],66:[2,39],67:[2,39],68:[2,39],69:[2,39],71:[2,39],74:[2,39]},{10:[2,73],27:[2,73],29:[2,73],31:[2,73],41:[2,73],47:[2,73],69:[1,56],74:[2,73]},{22:47,47:[1,30],73:57},{12:58,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15]},{16:[1,59]},{22:60,47:[1,30]},{22:61,47:[1,30]},{22:62,47:[1,30]},{22:63,47:[1,30]},{10:[1,64]},{10:[2,22]},{22:66,28:65,47:[1,30]},{30:67,46:68,47:[1,69]},{10:[2,30],27:[2,30],29:[2,30],31:[2,30],40:70,41:[1,46]},{10:[2,72],27:[2,72],29:[2,72],31:[2,72],41:[2,72],47:[2,72],74:[2,72]},{10:[2,31],27:[2,31],29:[2,31],31:[2,31],41:[2,31]},{22:71,47:[1,30]},{42:[1,53],48:[1,51],49:[1,52]},{48:[1,51],49:[1,52],65:[1,72]},{16:[1,78],22:81,47:[1,30],50:[1,74],52:76,53:[1,77],54:[1,79],55:[1,80],56:[1,82],60:[1,83],64:75,70:73},{16:[1,78],22:81,47:[1,30],52:76,53:[1,77],54:[1,79],55:[1,80],56:[1,82],60:[1,83],64:84},{47:[1,85]},{47:[1,86]},{13:[2,81],44:[2,81],47:[1,90],56:[2,81],75:87,76:[1,88],77:89},{10:[2,66],27:[2,66],29:[2,66],31:[2,66],48:[1,51],49:[1,52],67:[1,91]},{10:[2,68],27:[2,68],29:[2,68],31:[2,68],48:[1,51],49:[1,52]},{16:[1,78],22:81,47:[1,30],50:[1,74],52:76,53:[1,77],54:[1,79],55:[1,80],56:[1,82],60:[1,83],64:75,70:92},{10:[2,75],27:[2,75],29:[2,75],31:[2,75],41:[2,75],47:[2,75],74:[2,75]},{13:[2,7],47:[2,7],65:[2,7],66:[2,7],68:[2,7],74:[2,7]},{13:[2,9],17:[1,93],47:[2,9],65:[2,9],66:[2,9],68:[2,9],74:[2,9]},{13:[2,14],47:[2,14],48:[1,51],49:[1,52],65:[2,14],66:[2,14],68:[2,14],74:[2,14]},{13:[2,15],47:[2,15],48:[1,51],49:[1,52],65:[2,15],66:[2,15],68:[2,15],74:[2,15]},{13:[2,16],47:[2,16],48:[1,51],49:[1,52],65:[2,16],66:[2,16],68:[2,16],74:[2,16]},{13:[2,17],47:[2,17],48:[1,51],49:[1,52],65:[2,17],66:[2,17],68:[2,17],74:[2,17]},{5:[2,3],6:[2,3]},{10:[2,19],13:[1,94],31:[2,19]},{10:[2,42],13:[2,42],31:[2,42],48:[1,51],49:[1,52]},{10:[2,20],13:[1,95],31:[2,20]},{10:[2,35],13:[2,35],15:[1,96],31:[2,35]},{10:[2,37],13:[2,37],15:[2,37],31:[2,37]},{10:[2,32],27:[2,32],29:[2,32],31:[2,32],41:[2,32]},{42:[1,97],48:[1,51],49:[1,52]},{10:[2,65],27:[2,65],29:[2,65],31:[2,65]},{10:[2,69],27:[2,69],29:[2,69],31:[2,69],51:[1,98]},{10:[2,78],27:[2,78],29:[2,78],31:[2,78],41:[2,78],47:[2,78],51:[2,78],74:[2,78]},{10:[2,79],27:[2,79],29:[2,79],31:[2,79],41:[2,79],47:[2,79],51:[2,79],74:[2,79]},{10:[2,63],13:[2,63],27:[2,63],29:[2,63],31:[2,63],41:[2,63],44:[2,63],47:[2,63],51:[2,63],56:[2,63],58:[2,63],59:[2,63],71:[2,63],74:[2,63]},{10:[2,47],13:[2,47],27:[2,47],29:[2,47],31:[2,47],41:[2,47],44:[2,47],47:[2,47],51:[2,47],56:[2,47],58:[2,47],59:[2,47],62:[2,47],71:[2,47],74:[2,47]},{10:[2,48],13:[2,48],27:[2,48],29:[2,48],31:[2,48],41:[2,48],44:[2,48],47:[2,48],51:[2,48],56:[2,48],58:[2,48],59:[2,48],62:[2,48],71:[2,48],74:[2,48]},{10:[2,49],13:[2,49],27:[2,49],29:[2,49],31:[2,49],41:[2,49],44:[2,49],47:[2,49],51:[2,49],56:[2,49],58:[2,49],59:[2,49],62:[2,49],71:[2,49],74:[2,49]},{10:[2,50],13:[2,50],27:[2,50],29:[2,50],31:[2,50],41:[2,50],44:[2,50],47:[2,50],51:[2,50],56:[2,50],58:[2,50],59:[2,50],62:[2,50],71:[2,50],74:[2,50]},{10:[2,51],13:[2,51],27:[2,51],29:[2,51],31:[2,51],41:[2,51],44:[2,51],47:[2,51],48:[1,51],49:[1,52],51:[2,51],56:[2,51],58:[2,51],59:[2,51],62:[2,51],71:[2,51],74:[2,51]},{13:[2,55],16:[1,78],22:81,47:[1,30],52:100,53:[1,77],54:[1,79],55:[1,80],56:[1,82],57:99,58:[2,55],59:[2,55],60:[1,83]},{13:[2,58],47:[1,104],53:[1,103],61:101,62:[2,58],63:102},{10:[2,70],27:[2,70],29:[2,70],31:[2,70]},{10:[2,40],13:[2,40],27:[2,40],29:[2,40],31:[2,40],41:[2,40],42:[2,40],44:[2,40],45:[2,40],47:[2,40],48:[2,40],49:[2,40],51:[2,40],56:[2,40],58:[2,40],59:[2,40],62:[2,40],65:[2,40],66:[2,40],67:[2,40],68:[2,40],69:[2,40],71:[2,40],74:[2,40]},{10:[2,41],13:[2,41],27:[2,41],29:[2,41],31:[2,41],41:[2,41],42:[2,41],44:[2,41],45:[2,41],47:[2,41],48:[2,41],49:[2,41],51:[2,41],56:[2,41],58:[2,41],59:[2,41],62:[2,41],65:[2,41],66:[2,41],67:[2,41],68:[2,41],69:[2,41],71:[2,41],74:[2,41]},{13:[1,106],44:[1,105],56:[1,107]},{13:[2,81],44:[2,81],47:[1,90],56:[2,81],75:108,77:89},{13:[2,82],44:[2,82],56:[2,82],58:[2,82],59:[1,110],71:[1,109]},{13:[2,86],44:[2,86],56:[2,86],58:[2,86],59:[2,86],71:[2,86]},{22:111,47:[1,30]},{10:[2,74],27:[2,74],29:[2,74],31:[2,74],41:[2,74],47:[2,74],51:[1,98],74:[2,74]},{16:[1,112]},{22:113,47:[1,30]},{46:114,47:[1,69]},{47:[1,115]},{22:118,43:116,47:[1,30],50:[1,117]},{16:[1,78],22:81,47:[1,30],52:76,53:[1,77],54:[1,79],55:[1,80],56:[1,82],60:[1,83],64:119},{13:[1,122],58:[1,120],59:[1,121]},{13:[2,56],58:[2,56],59:[2,56]},{13:[1,124],62:[1,123]},{15:[1,125]},{15:[2,61]},{15:[2,62]},{10:[2,76],27:[2,76],29:[2,76],31:[2,76],41:[2,76],47:[2,76],69:[2,76],74:[2,76]},{47:[1,90],56:[1,127],77:126},{13:[2,81],47:[1,90],56:[2,81],58:[2,81],75:128,77:89},{13:[1,106],44:[1,129],56:[1,107]},{16:[1,78],22:81,47:[1,30],52:76,53:[1,77],54:[1,79],55:[1,80],56:[1,82],60:[1,83],64:130},{13:[2,88],44:[2,88],56:[2,88],58:[2,88],59:[2,88],71:[2,88]},{10:[2,67],27:[2,67],29:[2,67],31:[2,67],48:[1,51],49:[1,52]},{13:[2,10],47:[2,10],65:[2,10],66:[2,10],68:[2,10],74:[2,10]},{10:[2,43],13:[2,43],31:[2,43],48:[1,51],49:[1,52]},{10:[2,36],13:[2,36],15:[1,96],31:[2,36]},{10:[2,38],13:[2,38],15:[2,38],31:[2,38]},{44:[1,131],45:[1,132],51:[1,133]},{44:[2,44],45:[2,44],51:[2,44]},{44:[2,45],45:[2,45],48:[1,51],49:[1,52],51:[2,45]},{10:[2,80],27:[2,80],29:[2,80],31:[2,80],41:[2,80],47:[2,80],51:[2,80],74:[2,80]},{10:[2,52],13:[2,52],27:[2,52],29:[2,52],31:[2,52],41:[2,52],44:[2,52],47:[2,52],51:[2,52],56:[2,52],58:[2,52],59:[2,52],62:[2,52],71:[2,52],74:[2,52]},{58:[1,134]},{16:[1,78],22:81,47:[1,30],52:135,53:[1,77],54:[1,79],55:[1,80],56:[1,82],60:[1,83]},{10:[2,54],13:[2,54],27:[2,54],29:[2,54],31:[2,54],41:[2,54],44:[2,54],47:[2,54],51:[2,54],56:[2,54],58:[2,54],59:[2,54],62:[2,54],71:[2,54],74:[2,54]},{47:[1,104],53:[1,103],63:136},{16:[1,78],22:81,47:[1,30],52:137,53:[1,77],54:[1,79],55:[1,80],56:[1,82],60:[1,83]},{13:[2,83],44:[2,83],56:[2,83],58:[2,83],59:[1,110],71:[1,109]},{13:[2,81],47:[1,90],56:[2,81],58:[2,81],75:138,77:89},{13:[1,106],56:[1,107],58:[1,139]},{10:[2,77],27:[2,77],29:[2,77],31:[2,77],41:[2,77],47:[2,77],69:[2,77],74:[2,77]},{13:[2,87],44:[2,87],56:[2,87],58:[2,87],59:[2,87],71:[2,87]},{10:[2,33],27:[2,33],29:[2,33],31:[2,33],41:[2,33]},{31:[1,140]},{22:141,47:[1,30]},{10:[2,53],13:[2,53],27:[2,53],29:[2,53],31:[2,53],41:[2,53],44:[2,53],47:[2,53],51:[2,53],56:[2,53],58:[2,53],59:[2,53],62:[2,53],71:[2,53],74:[2,53]},{13:[2,57],58:[2,57],59:[2,57]},{15:[1,142]},{13:[2,59],62:[2,59]},{13:[1,106],56:[1,107],58:[1,143]},{13:[2,85],44:[2,85],56:[2,85],58:[2,85]},{10:[2,34],27:[2,34],29:[2,34],31:[2,34],41:[2,34]},{44:[2,46],45:[2,46],48:[1,51],49:[1,52],51:[2,46]},{16:[1,78],22:81,47:[1,30],52:144,53:[1,77],54:[1,79],55:[1,80],56:[1,82],60:[1,83]},{13:[2,84],44:[2,84],56:[2,84],58:[2,84]},{13:[2,60],62:[2,60]}],
defaultActions: {3:[2,1],40:[2,22],103:[2,61],104:[2,62]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){

var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 5
break;
case 1:/* skip whitespaces */
break;
case 2:this.begin('tags'); return 6
break;
case 3:/* skip vanilla code */
break;
case 4:this.popState(); return 10
break;
case 5:this.popState(); this.begin('def')
break;
case 6:return 13 /* list separator */
break;
case 7:return 15 /* key/value delimiter */
break;
case 8:return 17 /* range */
break;
case 9:return 49
break;
case 10:return 48
break;
case 11:/* skip whitespaces */
break;
case 12:return 16
break;
case 13:return 14
break;
case 14:return 18
break;
case 15:return 19
break;
case 16:return 20
break;
case 17:return 21
break;
case 18:return 23
break;
case 19:/* N.B. shouldn't it be ALIAS, and reversed sense */ return 23
break;
case 20:return 24
break;
case 21:return 25
break;
case 22:return 47
break;
case 23:this.popState(); return 10
break;
case 24:yy_.yytext = yy_.yytext.replace(/\s*\n\s*\*/g, '\n').replace(/(^\*\s*|\s*$)/g, ''); return 31
break;
case 25:return 'NL'
break;
case 26:/* skip whitespaces */
break;
case 27:this.begin('arg'); return 45
break;
case 28:return 41
break;
case 29:return 29
break;
case 30:return 27
break;
case 31:/*return '*'*/
break;
case 32:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 53
break;
case 33:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 53
break;
case 34:return 16
break;
case 35:return 55
break;
case 36:return 54
break;
case 37:return 54
break;
case 38:return 49
break;
case 39:return 76
break;
case 40:return 50
break;
case 41:return 59
break;
case 42:return 48
break;
case 43:return 13
break;
case 44:return 69
break;
case 45:return 65
break;
case 46:return 71
break;
case 47:return 67
break;
case 48:return 15
break;
case 49:return 42
break;
case 50:return 44
break;
case 51:return 56
break;
case 52:return 58
break;
case 53:return 60
break;
case 54:return 62
break;
case 55:return 51
break;
case 56:return 66
break;
case 57:return 68
break;
case 58:return 74
break;
case 59:return 47
break;
case 60:this.popState(); return 31
break;
case 61:this.popState(); console.log('LEFTCOMM'); return 31
break;
}
};
lexer.rules = [/^$/,/^\s+/,/^\/\*\*(?=([^/]))/,/^.*/,/^\*\*\//,/^\s*[\n]/,/^, /,/^: /,/^\.\./,/^#/,/^\./,/^\s+/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^deprecated\b/,/^read-only\b/,/^internal\b/,/^chainable\b/,/^section\b/,/^alias of\b/,/^alias\b/,/^related to\b/,/^belongs to\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^\*\*\//,/^\*\s*?[\n][\s\S]*?(?=\*\*\/)/,/^\*\s*[\n]123123123\b/,/^\s+/,/^\)\s*:/,/^\*\s*-/,/^\*\s*fires\b/,/^\*\s*includes\b/,/^\*/,/^"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,/^'(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*'/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^\/(?:[^\/]|\\\/)*\//,/^true\b/,/^false\b/,/^#/,/^@/,/^\?/,/^\.\.\./,/^\./,/^,/,/^->/,/^==/,/^=/,/^</,/^:/,/^\(/,/^\)/,/^\[/,/^\]/,/^\{/,/^\}/,/^\|/,/^class\b/,/^mixin\b/,/^new\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^[\s\S]*?(?=(\*\s*[-\n]))/,/^[\s\S]*?(?=\*\*\/)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],"inclusive":false},"def":{"rules":[0,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],"inclusive":false},"arg":{"rules":[0,60],"inclusive":false},"comment":{"rules":[0,61],"inclusive":false}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}