/* Jison generated parser */
var parser = (function(){
undefined
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"ndoc_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"CHAINABLE":20,"SECTION":21,"name":22,"ALIASOF":23,"RELATEDTO":24,"BELONGSTO":25,"ndoc":26,"INCLUDES":27,"names":28,"TEXT":29,"section":30,"namespace":31,"class":32,"mixin":33,"signatures":34,"argument_descriptions":35,"argument_description":36,"*-":37,"(":38,"names_alternation":39,")":40,"):":41,"events":42,"event":43,"NAME":44,".":45,"#":46,"@":47,"?":48,"|":49,"value":50,"STRING":51,"BOOLEAN":52,"REGEXP":53,"[":54,"value_list":55,"]":56,"...":57,"{":58,"key_value_list":59,"}":60,"key":61,"name_or_value":62,"==":63,"CLASS":64,"<":65,"MIXIN":66,"property":67,"->":68,"returns":69,"constant":70,"=":71,"signature":72,"method":73,"NEW":74,"args":75,"arg":76,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"CHAINABLE",21:"SECTION",23:"ALIASOF",24:"RELATEDTO",25:"BELONGSTO",27:"INCLUDES",29:"TEXT",37:"*-",38:"(",40:")",41:"):",44:"NAME",45:".",46:"#",47:"@",48:"?",49:"|",51:"STRING",52:"BOOLEAN",53:"REGEXP",54:"[",56:"]",57:"...",58:"{",60:"}",63:"==",64:"CLASS",65:"<",66:"MIXIN",68:"->",71:"=",74:"NEW"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[8,1],[8,3],[9,0],[9,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,2],[35,1],[35,2],[36,5],[36,6],[42,1],[42,3],[43,1],[43,3],[22,1],[22,3],[22,3],[22,3],[28,1],[28,3],[39,1],[39,1],[39,3],[50,1],[50,1],[50,1],[50,1],[50,1],[50,3],[50,4],[50,3],[55,0],[55,1],[55,3],[59,0],[59,3],[59,5],[61,1],[61,1],[62,1],[30,3],[31,1],[32,2],[32,4],[33,2],[67,3],[70,3],[34,1],[34,2],[72,1],[72,3],[72,1],[72,1],[72,2],[73,4],[73,5],[69,1],[69,1],[69,3],[75,0],[75,1],[75,3],[75,5],[75,4],[76,1],[76,4],[76,3],[76,2]],
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
    // amend description
    var desq = $$[$0-1].text;
    // strip leading *
    desq = desq.replace(/\s*\n\s*\*/g, '\n').replace(/^\*\n*/, ''); 
    // trim leading spaces from description
    var lead = desq.match(/^\s+/);
    if (lead) {
      var re = new RegExp('\n' + lead[0], 'g');
      desq = desq.substring(lead[0].length).replace(re, '\n');
    }
    x.description = desq.trim();
    // short description lasts until the first empty line
    x.short_description = x.description.replace(/\n\n[\s\S]*$/, '\n');
    x.line = ($$[$0-1].line + 1);
    // register
    if (this.$[x.id]) {
      console.error('name clash: ' + x.id);
    }
    this.$[x.id] = x;
    // FIXME: remove once tree is build ok
    /*this.$[x.id] = {
      id: x.id,
      type: x.type,
      section: x.section
    };*/
  
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
case 20: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 21: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 27: this.$.arguments = $$[$0] 
break;
case 28: this.$ = [$$[$0]] 
break;
case 29: this.$.push($$[$0]) 
break;
case 30: this.$ = {name: $$[$0-3], types: $$[$0-1]} 
break;
case 31:
    this.$ = {
      name: $$[$0-4],
      types: $$[$0-2],
      description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
    };
  
break;
case 32: this.$ = [$$[$0]] 
break;
case 33: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 35: this.$ += $$[$0-1] + $$[$0] 
break;
case 37: this.$ += $$[$0-1] + $$[$0] 
break;
case 38: this.$ += $$[$0-1] + $$[$0] 
break;
case 39: this.$ += $$[$0-1] + $$[$0] 
break;
case 40: this.$ = [$$[$0]] 
break;
case 41: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 42: this.$ = [] 
break;
case 43: this.$ = [$$[$0]] 
break;
case 44: this.$.push($$[$0]) 
break;
case 45: this.$ = String($$[$0]) 
break;
case 46: this.$ = Number($$[$0]) 
break;
case 47: this.$ = Boolean($$[$0]) 
break;
case 48: this.$ = new RegExp($$[$0]) 
break;
case 50: this.$ = $$[$0-1]; this.$.array = true 
break;
case 51: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 52: this.$ = $$[$0-1] 
break;
case 53: this.$ = [] 
break;
case 54: this.$ = [$$[$0]] 
break;
case 55: this.$.push($$[$0]) 
break;
case 56: this.$ = {} 
break;
case 57: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 58: this.$[$$[$0-2]] = $$[$0] 
break;
case 62: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 63: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 64: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 65: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 66: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 67: this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
break;
case 68: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 69:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 70:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 72: this.$.returns = $$[$0] 
break;
case 75: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 76: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 77: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 78: this.$ = [{type: '?'}] 
break;
case 79:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 80:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
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
case 87: this.$ = {name: $$[$0-3], args: $$[$0-1]} 
break;
case 88: this.$.default_value = $$[$0] 
break;
case 89: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15],44:[2,4],63:[2,4],64:[2,4],66:[2,4],74:[2,4]},{8:16,22:24,26:17,30:18,31:19,32:20,33:21,34:22,44:[1,28],63:[1,23],64:[1,25],66:[1,26],67:30,70:31,72:27,73:29,74:[1,32]},{13:[1,33],44:[2,5],63:[2,5],64:[2,5],66:[2,5],74:[2,5]},{13:[2,6],44:[2,6],63:[2,6],64:[2,6],66:[2,6],74:[2,6]},{13:[2,8],15:[1,34],44:[2,8],63:[2,8],64:[2,8],66:[2,8],74:[2,8]},{13:[2,11],44:[2,11],63:[2,11],64:[2,11],66:[2,11],74:[2,11]},{13:[2,12],44:[2,12],63:[2,12],64:[2,12],66:[2,12],74:[2,12]},{13:[2,13],44:[2,13],63:[2,13],64:[2,13],66:[2,13],74:[2,13]},{15:[1,35]},{15:[1,36]},{15:[1,37]},{15:[1,38]},{9:39,10:[2,20],29:[1,40]},{10:[2,18],27:[1,41],29:[2,18]},{10:[2,22],27:[2,22],29:[2,22]},{10:[2,23],27:[2,23],29:[2,23]},{10:[2,24],27:[2,24],29:[2,24]},{10:[2,25],27:[2,25],29:[2,25]},{10:[2,26],22:46,27:[2,26],29:[2,26],35:42,36:44,37:[1,45],44:[1,28],67:30,70:31,72:43,73:29,74:[1,32]},{22:47,44:[1,28]},{10:[2,63],27:[2,63],29:[2,63],38:[1,51],45:[1,48],46:[1,49],47:[1,50],68:[1,52],71:[1,53]},{22:54,44:[1,28]},{22:55,44:[1,28]},{10:[2,69],27:[2,69],29:[2,69],37:[2,69],44:[2,69],74:[2,69]},{10:[2,36],13:[2,36],27:[2,36],29:[2,36],37:[2,36],38:[2,36],40:[2,36],41:[2,36],44:[2,36],45:[2,36],46:[2,36],47:[2,36],49:[2,36],54:[2,36],56:[2,36],57:[2,36],60:[2,36],63:[2,36],64:[2,36],65:[2,36],66:[2,36],68:[2,36],71:[2,36],74:[2,36]},{10:[2,71],27:[2,71],29:[2,71],37:[2,71],44:[2,71],68:[1,56],74:[2,71]},{10:[2,73],27:[2,73],29:[2,73],37:[2,73],44:[2,73],74:[2,73]},{10:[2,74],27:[2,74],29:[2,74],37:[2,74],44:[2,74],74:[2,74]},{22:58,44:[1,28],73:57},{12:59,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15]},{16:[1,60]},{22:61,44:[1,28]},{22:62,44:[1,28]},{22:63,44:[1,28]},{22:64,44:[1,28]},{10:[1,65]},{10:[2,21]},{22:67,28:66,44:[1,28]},{10:[2,27],27:[2,27],29:[2,27],36:68,37:[1,45]},{10:[2,70],27:[2,70],29:[2,70],37:[2,70],44:[2,70],74:[2,70]},{10:[2,28],27:[2,28],29:[2,28],37:[2,28]},{22:69,44:[1,28]},{38:[1,51],45:[1,48],46:[1,49],47:[1,50],68:[1,52],71:[1,53]},{45:[1,48],46:[1,49],47:[1,50],63:[1,70]},{44:[1,71]},{44:[1,72]},{44:[1,73]},{13:[2,81],40:[2,81],44:[1,77],47:[1,75],54:[2,81],75:74,76:76},{16:[1,83],22:86,44:[1,28],48:[1,79],50:81,51:[1,82],52:[1,84],53:[1,85],54:[1,87],58:[1,88],62:80,69:78},{16:[1,83],22:86,44:[1,28],48:[1,79],50:81,51:[1,82],52:[1,84],53:[1,85],54:[1,87],58:[1,88],62:80,69:89},{10:[2,64],27:[2,64],29:[2,64],45:[1,48],46:[1,49],47:[1,50],65:[1,90]},{10:[2,66],27:[2,66],29:[2,66],45:[1,48],46:[1,49],47:[1,50]},{16:[1,83],22:86,44:[1,28],48:[1,79],50:81,51:[1,82],52:[1,84],53:[1,85],54:[1,87],58:[1,88],62:80,69:91},{10:[2,75],27:[2,75],29:[2,75],37:[2,75],44:[2,75],74:[2,75]},{38:[1,51],45:[1,48],46:[1,49],47:[1,50]},{13:[2,7],44:[2,7],63:[2,7],64:[2,7],66:[2,7],74:[2,7]},{13:[2,9],17:[1,92],44:[2,9],63:[2,9],64:[2,9],66:[2,9],74:[2,9]},{13:[2,14],44:[2,14],45:[1,48],46:[1,49],47:[1,50],63:[2,14],64:[2,14],66:[2,14],74:[2,14]},{13:[2,15],44:[2,15],45:[1,48],46:[1,49],47:[1,50],63:[2,15],64:[2,15],66:[2,15],74:[2,15]},{13:[2,16],44:[2,16],45:[1,48],46:[1,49],47:[1,50],63:[2,16],64:[2,16],66:[2,16],74:[2,16]},{13:[2,17],44:[2,17],45:[1,48],46:[1,49],47:[1,50],63:[2,17],64:[2,17],66:[2,17],74:[2,17]},{5:[2,3],6:[2,3]},{10:[2,19],13:[1,93],29:[2,19]},{10:[2,40],13:[2,40],29:[2,40],45:[1,48],46:[1,49],47:[1,50]},{10:[2,29],27:[2,29],29:[2,29],37:[2,29]},{38:[1,94],45:[1,48],46:[1,49],47:[1,50]},{10:[2,62],27:[2,62],29:[2,62]},{10:[2,37],13:[2,37],27:[2,37],29:[2,37],37:[2,37],38:[2,37],40:[2,37],41:[2,37],44:[2,37],45:[2,37],46:[2,37],47:[2,37],49:[2,37],54:[2,37],56:[2,37],57:[2,37],60:[2,37],63:[2,37],64:[2,37],65:[2,37],66:[2,37],68:[2,37],71:[2,37],74:[2,37]},{10:[2,38],13:[2,38],27:[2,38],29:[2,38],37:[2,38],38:[2,38],40:[2,38],41:[2,38],44:[2,38],45:[2,38],46:[2,38],47:[2,38],49:[2,38],54:[2,38],56:[2,38],57:[2,38],60:[2,38],63:[2,38],64:[2,38],65:[2,38],66:[2,38],68:[2,38],71:[2,38],74:[2,38]},{10:[2,39],13:[2,39],27:[2,39],29:[2,39],37:[2,39],38:[2,39],40:[2,39],41:[2,39],44:[2,39],45:[2,39],46:[2,39],47:[2,39],49:[2,39],54:[2,39],56:[2,39],57:[2,39],60:[2,39],63:[2,39],64:[2,39],65:[2,39],66:[2,39],68:[2,39],71:[2,39],74:[2,39]},{13:[1,96],40:[1,95],54:[1,97]},{13:[2,81],40:[2,81],44:[1,77],54:[2,81],75:98,76:76},{13:[2,82],40:[2,82],54:[2,82],56:[2,82],57:[1,100],71:[1,99]},{13:[2,86],38:[1,101],40:[2,86],54:[2,86],56:[2,86],57:[2,86],71:[2,86]},{10:[2,67],27:[2,67],29:[2,67],37:[2,67],44:[2,67],49:[1,102],74:[2,67]},{10:[2,78],27:[2,78],29:[2,78],37:[2,78],44:[2,78],49:[2,78],74:[2,78]},{10:[2,79],27:[2,79],29:[2,79],37:[2,79],44:[2,79],49:[2,79],74:[2,79]},{10:[2,61],13:[2,61],27:[2,61],29:[2,61],37:[2,61],40:[2,61],44:[2,61],49:[2,61],54:[2,61],56:[2,61],57:[2,61],71:[2,61],74:[2,61]},{10:[2,45],13:[2,45],27:[2,45],29:[2,45],37:[2,45],40:[2,45],44:[2,45],49:[2,45],54:[2,45],56:[2,45],57:[2,45],60:[2,45],71:[2,45],74:[2,45]},{10:[2,46],13:[2,46],27:[2,46],29:[2,46],37:[2,46],40:[2,46],44:[2,46],49:[2,46],54:[2,46],56:[2,46],57:[2,46],60:[2,46],71:[2,46],74:[2,46]},{10:[2,47],13:[2,47],27:[2,47],29:[2,47],37:[2,47],40:[2,47],44:[2,47],49:[2,47],54:[2,47],56:[2,47],57:[2,47],60:[2,47],71:[2,47],74:[2,47]},{10:[2,48],13:[2,48],27:[2,48],29:[2,48],37:[2,48],40:[2,48],44:[2,48],49:[2,48],54:[2,48],56:[2,48],57:[2,48],60:[2,48],71:[2,48],74:[2,48]},{10:[2,49],13:[2,49],27:[2,49],29:[2,49],37:[2,49],40:[2,49],44:[2,49],45:[1,48],46:[1,49],47:[1,50],49:[2,49],54:[2,49],56:[2,49],57:[2,49],60:[2,49],71:[2,49],74:[2,49]},{13:[2,53],16:[1,83],22:86,44:[1,28],50:104,51:[1,82],52:[1,84],53:[1,85],54:[1,87],55:103,56:[2,53],57:[2,53],58:[1,88]},{13:[2,56],44:[1,108],51:[1,107],59:105,60:[2,56],61:106},{10:[2,68],27:[2,68],29:[2,68],37:[2,68],44:[2,68],49:[1,102],74:[2,68]},{22:109,44:[1,28]},{10:[2,72],27:[2,72],29:[2,72],37:[2,72],44:[2,72],49:[1,102],74:[2,72]},{16:[1,110]},{22:111,44:[1,28]},{22:114,39:112,44:[1,28],48:[1,113]},{10:[2,76],27:[2,76],29:[2,76],37:[2,76],44:[2,76],68:[2,76],74:[2,76]},{44:[1,77],54:[1,116],76:115},{13:[2,81],44:[1,77],54:[2,81],56:[2,81],75:117,76:76},{13:[1,96],40:[1,118],54:[1,97]},{16:[1,83],22:86,44:[1,28],50:81,51:[1,82],52:[1,84],53:[1,85],54:[1,87],58:[1,88],62:119},{13:[2,89],40:[2,89],54:[2,89],56:[2,89],57:[2,89],71:[2,89]},{13:[2,81],40:[2,81],44:[1,77],54:[2,81],75:120,76:76},{16:[1,83],22:86,44:[1,28],50:81,51:[1,82],52:[1,84],53:[1,85],54:[1,87],58:[1,88],62:121},{13:[1,124],56:[1,122],57:[1,123]},{13:[2,54],56:[2,54],57:[2,54]},{13:[1,126],60:[1,125]},{15:[1,127]},{15:[2,59]},{15:[2,60]},{10:[2,65],27:[2,65],29:[2,65],45:[1,48],46:[1,49],47:[1,50]},{13:[2,10],44:[2,10],63:[2,10],64:[2,10],66:[2,10],74:[2,10]},{10:[2,41],13:[2,41],29:[2,41],45:[1,48],46:[1,49],47:[1,50]},{40:[1,128],41:[1,129],49:[1,130]},{40:[2,42],41:[2,42],49:[2,42]},{40:[2,43],41:[2,43],45:[1,48],46:[1,49],47:[1,50],49:[2,43]},{13:[2,83],40:[2,83],54:[2,83],56:[2,83],57:[1,100],71:[1,99]},{13:[2,81],44:[1,77],54:[2,81],56:[2,81],75:131,76:76},{13:[1,96],54:[1,97],56:[1,132]},{10:[2,77],27:[2,77],29:[2,77],37:[2,77],44:[2,77],68:[2,77],74:[2,77]},{13:[2,88],40:[2,88],54:[2,88],56:[2,88],57:[2,88],71:[2,88]},{13:[1,96],40:[1,133],54:[1,97]},{10:[2,80],27:[2,80],29:[2,80],37:[2,80],44:[2,80],49:[2,80],74:[2,80]},{10:[2,50],13:[2,50],27:[2,50],29:[2,50],37:[2,50],40:[2,50],44:[2,50],49:[2,50],54:[2,50],56:[2,50],57:[2,50],60:[2,50],71:[2,50],74:[2,50]},{56:[1,134]},{16:[1,83],22:86,44:[1,28],50:135,51:[1,82],52:[1,84],53:[1,85],54:[1,87],58:[1,88]},{10:[2,52],13:[2,52],27:[2,52],29:[2,52],37:[2,52],40:[2,52],44:[2,52],49:[2,52],54:[2,52],56:[2,52],57:[2,52],60:[2,52],71:[2,52],74:[2,52]},{44:[1,108],51:[1,107],61:136},{16:[1,83],22:86,44:[1,28],50:137,51:[1,82],52:[1,84],53:[1,85],54:[1,87],58:[1,88]},{10:[2,30],27:[2,30],29:[2,30],37:[2,30]},{29:[1,138]},{22:139,44:[1,28]},{13:[1,96],54:[1,97],56:[1,140]},{13:[2,85],40:[2,85],54:[2,85],56:[2,85]},{13:[2,87],40:[2,87],54:[2,87],56:[2,87],57:[2,87],71:[2,87]},{10:[2,51],13:[2,51],27:[2,51],29:[2,51],37:[2,51],40:[2,51],44:[2,51],49:[2,51],54:[2,51],56:[2,51],57:[2,51],60:[2,51],71:[2,51],74:[2,51]},{13:[2,55],56:[2,55],57:[2,55]},{15:[1,141]},{13:[2,57],60:[2,57]},{10:[2,31],27:[2,31],29:[2,31],37:[2,31]},{40:[2,44],41:[2,44],45:[1,48],46:[1,49],47:[1,50],49:[2,44]},{13:[2,84],40:[2,84],54:[2,84],56:[2,84]},{16:[1,83],22:86,44:[1,28],50:142,51:[1,82],52:[1,84],53:[1,85],54:[1,87],58:[1,88]},{13:[2,58],60:[2,58]}],
defaultActions: {3:[2,1],40:[2,21],107:[2,59],108:[2,60]},
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
    }

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
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
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
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
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
case 9:return 46
break;
case 10:return 45
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
case 22:return 44
break;
case 23:this.popState(); return 10
break;
case 24:return 29
break;
case 25:/* skip whitespaces */
break;
case 26:this.begin('arg'); return 41
break;
case 27:return 37
break;
case 28:return 'FIRES'
break;
case 29:return 27
break;
case 30:/*return '*'*/
break;
case 31:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 51
break;
case 32:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 51
break;
case 33:return 16
break;
case 34:return 53
break;
case 35:return 52
break;
case 36:return 52
break;
case 37:return 46
break;
case 38:return 47
break;
case 39:return 48
break;
case 40:return 57
break;
case 41:return 45
break;
case 42:return 13
break;
case 43:return 68
break;
case 44:return 63
break;
case 45:return 71
break;
case 46:return 65
break;
case 47:return 15
break;
case 48:return 38
break;
case 49:return 40
break;
case 50:return 54
break;
case 51:return 56
break;
case 52:return 58
break;
case 53:return 60
break;
case 54:return 49
break;
case 55:return 64
break;
case 56:return 66
break;
case 57:return 74
break;
case 58:return 44
break;
case 59:this.popState(); return 29
break;
case 60:this.popState(); console.log('LEFTCOMM'); return 29
break;
}
};
lexer.rules = [/^$/,/^\s+/,/^\/\*\*(?=([^/]))/,/^.*/,/^\*\*\//,/^\s*[\n]/,/^, /,/^: /,/^\.\./,/^#/,/^\./,/^\s+/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^deprecated\b/,/^read-only\b/,/^internal\b/,/^chainable\b/,/^section\b/,/^alias of\b/,/^alias\b/,/^related to\b/,/^belongs to\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^\*\*\//,/^\*\s*?[\n][\s\S]*?(?=\*\*\/)/,/^\s+/,/^\)\s*:/,/^\*\s*-/,/^\*\s*fires\b/,/^\*\s*includes\b/,/^\*/,/^"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,/^'(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*'/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^\/(?:[^\/]|\\\/)*\//,/^true\b/,/^false\b/,/^#/,/^@/,/^\?/,/^\.\.\./,/^\./,/^,/,/^->/,/^==/,/^=/,/^</,/^:/,/^\(/,/^\)/,/^\[/,/^\]/,/^\{/,/^\}/,/^\|/,/^class\b/,/^mixin\b/,/^new\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^[\s\S]*?(?=(\*\s*[-\n]))/,/^[\s\S]*?(?=\*\*\/)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],"inclusive":false},"def":{"rules":[0,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58],"inclusive":false},"arg":{"rules":[0,59],"inclusive":false},"comment":{"rules":[0,60],"inclusive":false}};return lexer;})()
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