/* Jison generated parser */
var parser = (function(){
undefined
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"*":8,"ndoc_and_includes_and_fires":9,"comment":10,"**/":11,"tag_list":12,"tag":13,",":14,"DEPRECATED":15,":":16,"NUMBER":17,"..":18,"READONLY":19,"INTERNAL":20,"CHAINABLE":21,"SECTION":22,"name":23,"ALIASOF":24,"RELATEDTO":25,"BELONGSTO":26,"ndoc":27,"INCLUDES":28,"names":29,"FIRES":30,"events":31,"TEXT":32,"section":33,"namespace":34,"class":35,"mixin":36,"property":37,"constant":38,"signatures":39,"argument_descriptions":40,"argument_description":41,"*-":42,"(":43,"names_alternation":44,")":45,"):":46,"event":47,"NAME":48,".":49,"#":50,"?":51,"|":52,"value":53,"STRING":54,"BOOLEAN":55,"REGEXP":56,"[":57,"value_list":58,"]":59,"...":60,"{":61,"key_value_list":62,"}":63,"key":64,"name_or_value":65,"==":66,"CLASS":67,"<":68,"MIXIN":69,"->":70,"returns":71,"=":72,"signature":73,"method":74,"NEW":75,"args":76,"@":77,"arg":78,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",8:"*",11:"**/",14:",",15:"DEPRECATED",16:":",17:"NUMBER",18:"..",19:"READONLY",20:"INTERNAL",21:"CHAINABLE",22:"SECTION",24:"ALIASOF",25:"RELATEDTO",26:"BELONGSTO",28:"INCLUDES",30:"FIRES",32:"TEXT",42:"*-",43:"(",45:")",46:"):",48:"NAME",49:".",50:"#",51:"?",52:"|",54:"STRING",55:"BOOLEAN",56:"REGEXP",57:"[",59:"]",60:"...",61:"{",63:"}",66:"==",67:"CLASS",68:"<",69:"MIXIN",70:"->",72:"=",75:"NEW",77:"@"},
productions_: [0,[3,2],[4,0],[4,7],[7,0],[7,1],[12,1],[12,3],[13,1],[13,3],[13,5],[13,1],[13,1],[13,1],[13,3],[13,3],[13,3],[13,3],[9,1],[9,3],[9,3],[10,0],[10,1],[27,1],[27,1],[27,1],[27,1],[27,1],[27,1],[27,1],[27,2],[40,1],[40,2],[41,5],[41,6],[31,1],[31,3],[47,1],[47,3],[23,1],[23,3],[23,3],[29,1],[29,3],[44,1],[44,1],[44,3],[53,1],[53,1],[53,1],[53,1],[53,1],[53,3],[53,4],[53,3],[58,0],[58,1],[58,3],[62,0],[62,3],[62,5],[64,1],[64,1],[65,1],[34,1],[33,3],[35,2],[35,4],[36,2],[37,3],[38,3],[39,1],[39,3],[73,1],[73,3],[73,2],[74,4],[74,5],[71,1],[71,1],[71,3],[76,0],[76,1],[76,3],[76,4],[76,5],[76,5],[78,1],[78,3],[78,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return this.$ 
break;
case 2: this.$ = {} 
break;
case 3:
    var x = $$[$0-2];
    for (var i in $$[$0-4]) x[i] = $$[$0-4][i];
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
case 78: this.$ = [] 
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
case 84: $$[$0-1].optional = true; this.$.push($$[$0-1]) 
break;
case 85:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 86:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 87: this.$ = {name: $$[$0]} 
break;
case 88: this.$.default_value = $$[$0] 
break;
case 89: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,8:[2,4],12:6,13:7,15:[1,8],19:[1,9],20:[1,10],21:[1,11],22:[1,12],24:[1,13],25:[1,14],26:[1,15]},{8:[1,16]},{8:[2,5],14:[1,17]},{8:[2,6],14:[2,6]},{8:[2,8],14:[2,8],16:[1,18]},{8:[2,11],14:[2,11]},{8:[2,12],14:[2,12]},{8:[2,13],14:[2,13]},{16:[1,19]},{16:[1,20]},{16:[1,21]},{16:[1,22]},{9:23,23:33,27:24,33:25,34:26,35:27,36:28,37:29,38:30,39:31,48:[1,37],66:[1,32],67:[1,34],69:[1,35],73:36,74:38,75:[1,39]},{13:40,15:[1,8],19:[1,9],20:[1,10],21:[1,11],22:[1,12],24:[1,13],25:[1,14],26:[1,15]},{17:[1,41]},{23:42,48:[1,37]},{23:43,48:[1,37]},{23:44,48:[1,37]},{23:45,48:[1,37]},{10:46,11:[2,21],32:[1,47]},{11:[2,18],28:[1,48],30:[1,49],32:[2,18]},{11:[2,23],28:[2,23],30:[2,23],32:[2,23]},{11:[2,24],28:[2,24],30:[2,24],32:[2,24]},{11:[2,25],28:[2,25],30:[2,25],32:[2,25]},{11:[2,26],28:[2,26],30:[2,26],32:[2,26]},{11:[2,27],28:[2,27],30:[2,27],32:[2,27]},{11:[2,28],28:[2,28],30:[2,28],32:[2,28]},{8:[1,51],11:[2,29],28:[2,29],30:[2,29],32:[2,29],40:50,41:52,42:[1,53]},{23:54,48:[1,37]},{11:[2,64],28:[2,64],30:[2,64],32:[2,64],43:[1,59],49:[1,57],50:[1,58],70:[1,55],72:[1,56]},{23:60,48:[1,37]},{23:61,48:[1,37]},{8:[2,71],11:[2,71],28:[2,71],30:[2,71],32:[2,71],42:[2,71]},{8:[2,39],11:[2,39],14:[2,39],28:[2,39],30:[2,39],32:[2,39],42:[2,39],43:[2,39],45:[2,39],46:[2,39],49:[2,39],50:[2,39],52:[2,39],57:[2,39],59:[2,39],60:[2,39],63:[2,39],66:[2,39],68:[2,39],70:[2,39],72:[2,39]},{8:[2,73],11:[2,73],28:[2,73],30:[2,73],32:[2,73],42:[2,73],70:[1,62]},{23:64,48:[1,37],74:63},{8:[2,7],14:[2,7]},{8:[2,9],14:[2,9],18:[1,65]},{8:[2,14],14:[2,14],49:[1,57],50:[1,58]},{8:[2,15],14:[2,15],49:[1,57],50:[1,58]},{8:[2,16],14:[2,16],49:[1,57],50:[1,58]},{8:[2,17],14:[2,17],49:[1,57],50:[1,58]},{11:[1,66]},{11:[2,22]},{23:68,29:67,48:[1,37]},{31:69,47:70,48:[1,71]},{11:[2,30],28:[2,30],30:[2,30],32:[2,30],41:72,42:[1,53]},{23:64,48:[1,37],73:73,74:38,75:[1,39]},{11:[2,31],28:[2,31],30:[2,31],32:[2,31],42:[2,31]},{23:74,48:[1,37]},{49:[1,57],50:[1,58],66:[1,75]},{17:[1,81],23:84,48:[1,37],51:[1,77],53:79,54:[1,80],55:[1,82],56:[1,83],57:[1,85],61:[1,86],65:78,71:76},{17:[1,81],23:84,48:[1,37],53:79,54:[1,80],55:[1,82],56:[1,83],57:[1,85],61:[1,86],65:87},{48:[1,88]},{48:[1,89]},{14:[2,81],45:[2,81],48:[1,93],57:[2,81],76:90,77:[1,91],78:92},{11:[2,66],28:[2,66],30:[2,66],32:[2,66],49:[1,57],50:[1,58],68:[1,94]},{11:[2,68],28:[2,68],30:[2,68],32:[2,68],49:[1,57],50:[1,58]},{17:[1,81],23:84,48:[1,37],51:[1,77],53:79,54:[1,80],55:[1,82],56:[1,83],57:[1,85],61:[1,86],65:78,71:95},{8:[2,75],11:[2,75],28:[2,75],30:[2,75],32:[2,75],42:[2,75]},{43:[1,59],49:[1,57],50:[1,58]},{17:[1,96]},{5:[2,3],6:[2,3]},{11:[2,19],14:[1,97],32:[2,19]},{11:[2,42],14:[2,42],32:[2,42],49:[1,57],50:[1,58]},{11:[2,20],14:[1,98],32:[2,20]},{11:[2,35],14:[2,35],16:[1,99],32:[2,35]},{11:[2,37],14:[2,37],16:[2,37],32:[2,37]},{11:[2,32],28:[2,32],30:[2,32],32:[2,32],42:[2,32]},{8:[2,72],11:[2,72],28:[2,72],30:[2,72],32:[2,72],42:[2,72]},{43:[1,100],49:[1,57],50:[1,58]},{11:[2,65],28:[2,65],30:[2,65],32:[2,65]},{11:[2,69],28:[2,69],30:[2,69],32:[2,69],52:[1,101]},{8:[2,78],11:[2,78],28:[2,78],30:[2,78],32:[2,78],42:[2,78],52:[2,78]},{8:[2,79],11:[2,79],28:[2,79],30:[2,79],32:[2,79],42:[2,79],52:[2,79]},{8:[2,63],11:[2,63],14:[2,63],28:[2,63],30:[2,63],32:[2,63],42:[2,63],45:[2,63],52:[2,63],57:[2,63],59:[2,63],60:[2,63],72:[2,63]},{8:[2,47],11:[2,47],14:[2,47],28:[2,47],30:[2,47],32:[2,47],42:[2,47],45:[2,47],52:[2,47],57:[2,47],59:[2,47],60:[2,47],63:[2,47],72:[2,47]},{8:[2,48],11:[2,48],14:[2,48],28:[2,48],30:[2,48],32:[2,48],42:[2,48],45:[2,48],52:[2,48],57:[2,48],59:[2,48],60:[2,48],63:[2,48],72:[2,48]},{8:[2,49],11:[2,49],14:[2,49],28:[2,49],30:[2,49],32:[2,49],42:[2,49],45:[2,49],52:[2,49],57:[2,49],59:[2,49],60:[2,49],63:[2,49],72:[2,49]},{8:[2,50],11:[2,50],14:[2,50],28:[2,50],30:[2,50],32:[2,50],42:[2,50],45:[2,50],52:[2,50],57:[2,50],59:[2,50],60:[2,50],63:[2,50],72:[2,50]},{8:[2,51],11:[2,51],14:[2,51],28:[2,51],30:[2,51],32:[2,51],42:[2,51],45:[2,51],49:[1,57],50:[1,58],52:[2,51],57:[2,51],59:[2,51],60:[2,51],63:[2,51],72:[2,51]},{14:[2,55],17:[1,81],23:84,48:[1,37],53:103,54:[1,80],55:[1,82],56:[1,83],57:[1,85],58:102,59:[2,55],60:[2,55],61:[1,86]},{14:[2,58],48:[1,107],54:[1,106],62:104,63:[2,58],64:105},{11:[2,70],28:[2,70],30:[2,70],32:[2,70]},{8:[2,40],11:[2,40],14:[2,40],28:[2,40],30:[2,40],32:[2,40],42:[2,40],43:[2,40],45:[2,40],46:[2,40],49:[2,40],50:[2,40],52:[2,40],57:[2,40],59:[2,40],60:[2,40],63:[2,40],66:[2,40],68:[2,40],70:[2,40],72:[2,40]},{8:[2,41],11:[2,41],14:[2,41],28:[2,41],30:[2,41],32:[2,41],42:[2,41],43:[2,41],45:[2,41],46:[2,41],49:[2,41],50:[2,41],52:[2,41],57:[2,41],59:[2,41],60:[2,41],63:[2,41],66:[2,41],68:[2,41],70:[2,41],72:[2,41]},{14:[1,109],45:[1,108],57:[1,110]},{14:[2,81],45:[2,81],48:[1,93],57:[2,81],76:111,78:92},{14:[2,82],45:[2,82],57:[2,82],59:[2,82],60:[1,113],72:[1,112]},{14:[2,87],45:[2,87],57:[2,87],59:[2,87],60:[2,87],72:[2,87]},{23:114,48:[1,37]},{8:[2,74],11:[2,74],28:[2,74],30:[2,74],32:[2,74],42:[2,74],52:[1,101]},{8:[2,10],14:[2,10]},{23:115,48:[1,37]},{47:116,48:[1,71]},{48:[1,117]},{23:120,44:118,48:[1,37],51:[1,119]},{17:[1,81],23:84,48:[1,37],53:79,54:[1,80],55:[1,82],56:[1,83],57:[1,85],61:[1,86],65:121},{14:[1,124],59:[1,122],60:[1,123]},{14:[2,56],59:[2,56],60:[2,56]},{14:[1,126],63:[1,125]},{16:[1,127]},{16:[2,61]},{16:[2,62]},{8:[2,76],11:[2,76],28:[2,76],30:[2,76],32:[2,76],42:[2,76],70:[2,76]},{48:[1,93],57:[1,129],78:128},{14:[1,131],48:[1,93],78:130},{14:[1,109],45:[1,132],57:[1,110]},{17:[1,81],23:84,48:[1,37],53:79,54:[1,80],55:[1,82],56:[1,83],57:[1,85],61:[1,86],65:133},{14:[2,89],45:[2,89],57:[2,89],59:[2,89],60:[2,89],72:[2,89]},{11:[2,67],28:[2,67],30:[2,67],32:[2,67],49:[1,57],50:[1,58]},{11:[2,43],14:[2,43],32:[2,43],49:[1,57],50:[1,58]},{11:[2,36],14:[2,36],16:[1,99],32:[2,36]},{11:[2,38],14:[2,38],16:[2,38],32:[2,38]},{45:[1,134],46:[1,135],52:[1,136]},{45:[2,44],46:[2,44],52:[2,44]},{45:[2,45],46:[2,45],49:[1,57],50:[1,58],52:[2,45]},{8:[2,80],11:[2,80],28:[2,80],30:[2,80],32:[2,80],42:[2,80],52:[2,80]},{8:[2,52],11:[2,52],14:[2,52],28:[2,52],30:[2,52],32:[2,52],42:[2,52],45:[2,52],52:[2,52],57:[2,52],59:[2,52],60:[2,52],63:[2,52],72:[2,52]},{59:[1,137]},{17:[1,81],23:84,48:[1,37],53:138,54:[1,80],55:[1,82],56:[1,83],57:[1,85],61:[1,86]},{8:[2,54],11:[2,54],14:[2,54],28:[2,54],30:[2,54],32:[2,54],42:[2,54],45:[2,54],52:[2,54],57:[2,54],59:[2,54],60:[2,54],63:[2,54],72:[2,54]},{48:[1,107],54:[1,106],64:139},{17:[1,81],23:84,48:[1,37],53:140,54:[1,80],55:[1,82],56:[1,83],57:[1,85],61:[1,86]},{14:[2,83],45:[2,83],57:[2,83],59:[2,83],60:[1,113],72:[1,112]},{14:[2,81],48:[1,93],57:[2,81],59:[2,81],76:141,78:92},{59:[1,142],60:[1,113],72:[1,112]},{14:[2,81],48:[1,93],57:[2,81],59:[2,81],76:143,78:92},{8:[2,77],11:[2,77],28:[2,77],30:[2,77],32:[2,77],42:[2,77],70:[2,77]},{14:[2,88],45:[2,88],57:[2,88],59:[2,88],60:[2,88],72:[2,88]},{11:[2,33],28:[2,33],30:[2,33],32:[2,33],42:[2,33]},{32:[1,144]},{23:145,48:[1,37]},{8:[2,53],11:[2,53],14:[2,53],28:[2,53],30:[2,53],32:[2,53],42:[2,53],45:[2,53],52:[2,53],57:[2,53],59:[2,53],60:[2,53],63:[2,53],72:[2,53]},{14:[2,57],59:[2,57],60:[2,57]},{16:[1,146]},{14:[2,59],63:[2,59]},{14:[1,109],57:[1,110],59:[1,147]},{14:[2,84],45:[2,84],57:[2,84],59:[2,84]},{14:[1,109],57:[1,110],59:[1,148]},{11:[2,34],28:[2,34],30:[2,34],32:[2,34],42:[2,34]},{45:[2,46],46:[2,46],49:[1,57],50:[1,58],52:[2,46]},{17:[1,81],23:84,48:[1,37],53:149,54:[1,80],55:[1,82],56:[1,83],57:[1,85],61:[1,86]},{14:[2,85],45:[2,85],57:[2,85],59:[2,85]},{14:[2,86],45:[2,86],57:[2,86],59:[2,86]},{14:[2,60],63:[2,60]}],
defaultActions: {3:[2,1],47:[2,22],106:[2,61],107:[2,62]},
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
case 4:this.popState(); return 11
break;
case 5:this.popState(); this.begin('def')
break;
case 6:return 14 /* list separator */
break;
case 7:return 16 /* key/value delimiter */
break;
case 8:return 18 /* range */
break;
case 9:return 50
break;
case 10:return 49
break;
case 11:/* skip whitespaces */
break;
case 12:return 17
break;
case 13:return 15
break;
case 14:return 19
break;
case 15:return 20
break;
case 16:return 21
break;
case 17:return 22
break;
case 18:return 24
break;
case 19:/* N.B. shouldn't it be ALIAS, and reversed sense */ return 24
break;
case 20:return 25
break;
case 21:return 26
break;
case 22:return 48
break;
case 23:this.popState(); return 11
break;
case 24:yy_.yytext = yy_.yytext.replace(/\s*\n\s*\*/g, '\n').replace(/(^\*\s*|\s*$)/g, ''); return 32
break;
case 25:return 'NL'
break;
case 26:/* skip whitespaces */
break;
case 27:this.begin('arg'); return 46
break;
case 28:return 42
break;
case 29:return 30
break;
case 30:return 28
break;
case 31:return 8
break;
case 32:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 54
break;
case 33:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 54
break;
case 34:return 17
break;
case 35:return 56
break;
case 36:return 55
break;
case 37:return 55
break;
case 38:return 50
break;
case 39:return 77
break;
case 40:return 51
break;
case 41:return 60
break;
case 42:return 49
break;
case 43:return 14
break;
case 44:return 70
break;
case 45:return 66
break;
case 46:return 72
break;
case 47:return 68
break;
case 48:return 16
break;
case 49:return 43
break;
case 50:return 45
break;
case 51:return 57
break;
case 52:return 59
break;
case 53:return 61
break;
case 54:return 63
break;
case 55:return 52
break;
case 56:return 67
break;
case 57:return 69
break;
case 58:return 75
break;
case 59:return 48
break;
case 60:this.popState(); return 32
break;
case 61:yy_.yytext = yy_.yytext.replace(/\s*\n\s*\*/g, '\n').replace(/(^\*\s*|\s*$)/g, ''); return 32
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