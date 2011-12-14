/* Jison generated parser */
var parser = (function(){
undefined
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"ndoc_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"CHAINABLE":20,"SECTION":21,"name":22,"ALIASOF":23,"RELATEDTO":24,"BELONGSTO":25,"ndoc":26,"INCLUDES":27,"names":28,"FIRES":29,"events":30,"TEXT":31,"section":32,"namespace":33,"class":34,"mixin":35,"signatures":36,"argument_descriptions":37,"argument_description":38,"*-":39,"(":40,"names_alternation":41,")":42,"):":43,"event":44,"NAME":45,".":46,"#":47,"@":48,"?":49,"|":50,"value":51,"STRING":52,"BOOLEAN":53,"REGEXP":54,"[":55,"value_list":56,"]":57,"...":58,"{":59,"key_value_list":60,"}":61,"key":62,"name_or_value":63,"==":64,"CLASS":65,"<":66,"MIXIN":67,"property":68,"->":69,"returns":70,"constant":71,"=":72,"signature":73,"method":74,"NEW":75,"args":76,"arg":77,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"CHAINABLE",21:"SECTION",23:"ALIASOF",24:"RELATEDTO",25:"BELONGSTO",27:"INCLUDES",29:"FIRES",31:"TEXT",39:"*-",40:"(",42:")",43:"):",45:"NAME",46:".",47:"#",48:"@",49:"?",50:"|",52:"STRING",53:"BOOLEAN",54:"REGEXP",55:"[",57:"]",58:"...",59:"{",61:"}",64:"==",65:"CLASS",66:"<",67:"MIXIN",69:"->",72:"=",75:"NEW"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[8,1],[8,3],[8,3],[9,0],[9,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,2],[37,1],[37,2],[38,5],[38,6],[30,1],[30,3],[44,1],[44,3],[22,1],[22,3],[22,3],[22,3],[28,1],[28,3],[41,1],[41,1],[41,3],[51,1],[51,1],[51,1],[51,1],[51,1],[51,3],[51,4],[51,3],[56,0],[56,1],[56,3],[60,0],[60,3],[60,5],[62,1],[62,1],[63,1],[32,3],[33,1],[34,2],[34,4],[35,2],[68,3],[71,3],[36,1],[36,2],[73,1],[73,3],[73,1],[73,1],[73,2],[74,4],[74,5],[70,1],[70,1],[70,3],[76,0],[76,1],[76,3],[76,5],[76,4],[77,1],[77,3],[77,2]],
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
case 20: this.$.events = $$[$0] 
break;
case 21: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 22: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 28: this.$.arguments = $$[$0] 
break;
case 29: this.$ = [$$[$0]] 
break;
case 30: this.$.push($$[$0]) 
break;
case 31: this.$ = {name: $$[$0-3], types: $$[$0-1]} 
break;
case 32:
    this.$ = {
      name: $$[$0-4],
      types: $$[$0-2],
      description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
    };
  
break;
case 33: this.$ = [$$[$0]] 
break;
case 34: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 36: this.$ += $$[$0-1] + $$[$0] 
break;
case 38: this.$ += $$[$0-1] + $$[$0] 
break;
case 39: this.$ += $$[$0-1] + $$[$0] 
break;
case 40: this.$ += $$[$0-1] + $$[$0] 
break;
case 41: this.$ = [$$[$0]] 
break;
case 42: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 43: this.$ = [] 
break;
case 44: this.$ = [$$[$0]] 
break;
case 45: this.$.push($$[$0]) 
break;
case 46: this.$ = String($$[$0]) 
break;
case 47: this.$ = Number($$[$0]) 
break;
case 48: this.$ = Boolean($$[$0]) 
break;
case 49: this.$ = new RegExp($$[$0]) 
break;
case 51: this.$ = $$[$0-1]; this.$.array = true 
break;
case 52: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 53: this.$ = $$[$0-1] 
break;
case 54: this.$ = [] 
break;
case 55: this.$ = [$$[$0]] 
break;
case 56: this.$.push($$[$0]) 
break;
case 57: this.$ = {} 
break;
case 58: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 59: this.$[$$[$0-2]] = $$[$0] 
break;
case 63: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 64: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 65: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 66: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 67: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 68: this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
break;
case 69: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 70:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 71:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 73: this.$.returns = $$[$0] 
break;
case 76: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 77: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 78: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 79: this.$ = [{type: '?'}] 
break;
case 80:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 81:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 82: this.$ = [] 
break;
case 83: this.$ = [$$[$0]] 
break;
case 84: this.$.push($$[$0]) 
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
      $$[$0-3].push(a);
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
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15],45:[2,4],64:[2,4],65:[2,4],67:[2,4],75:[2,4]},{8:16,22:24,26:17,32:18,33:19,34:20,35:21,36:22,45:[1,28],64:[1,23],65:[1,25],67:[1,26],68:30,71:31,73:27,74:29,75:[1,32]},{13:[1,33],45:[2,5],64:[2,5],65:[2,5],67:[2,5],75:[2,5]},{13:[2,6],45:[2,6],64:[2,6],65:[2,6],67:[2,6],75:[2,6]},{13:[2,8],15:[1,34],45:[2,8],64:[2,8],65:[2,8],67:[2,8],75:[2,8]},{13:[2,11],45:[2,11],64:[2,11],65:[2,11],67:[2,11],75:[2,11]},{13:[2,12],45:[2,12],64:[2,12],65:[2,12],67:[2,12],75:[2,12]},{13:[2,13],45:[2,13],64:[2,13],65:[2,13],67:[2,13],75:[2,13]},{15:[1,35]},{15:[1,36]},{15:[1,37]},{15:[1,38]},{9:39,10:[2,21],31:[1,40]},{10:[2,18],27:[1,41],29:[1,42],31:[2,18]},{10:[2,23],27:[2,23],29:[2,23],31:[2,23]},{10:[2,24],27:[2,24],29:[2,24],31:[2,24]},{10:[2,25],27:[2,25],29:[2,25],31:[2,25]},{10:[2,26],27:[2,26],29:[2,26],31:[2,26]},{10:[2,27],22:47,27:[2,27],29:[2,27],31:[2,27],37:43,38:45,39:[1,46],45:[1,28],68:30,71:31,73:44,74:29,75:[1,32]},{22:48,45:[1,28]},{10:[2,64],27:[2,64],29:[2,64],31:[2,64],40:[1,52],46:[1,49],47:[1,50],48:[1,51],69:[1,53],72:[1,54]},{22:55,45:[1,28]},{22:56,45:[1,28]},{10:[2,70],27:[2,70],29:[2,70],31:[2,70],39:[2,70],45:[2,70],75:[2,70]},{10:[2,37],13:[2,37],27:[2,37],29:[2,37],31:[2,37],39:[2,37],40:[2,37],42:[2,37],43:[2,37],45:[2,37],46:[2,37],47:[2,37],48:[2,37],50:[2,37],55:[2,37],57:[2,37],58:[2,37],61:[2,37],64:[2,37],65:[2,37],66:[2,37],67:[2,37],69:[2,37],72:[2,37],75:[2,37]},{10:[2,72],27:[2,72],29:[2,72],31:[2,72],39:[2,72],45:[2,72],69:[1,57],75:[2,72]},{10:[2,74],27:[2,74],29:[2,74],31:[2,74],39:[2,74],45:[2,74],75:[2,74]},{10:[2,75],27:[2,75],29:[2,75],31:[2,75],39:[2,75],45:[2,75],75:[2,75]},{22:59,45:[1,28],74:58},{12:60,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15]},{16:[1,61]},{22:62,45:[1,28]},{22:63,45:[1,28]},{22:64,45:[1,28]},{22:65,45:[1,28]},{10:[1,66]},{10:[2,22]},{22:68,28:67,45:[1,28]},{30:69,44:70,45:[1,71]},{10:[2,28],27:[2,28],29:[2,28],31:[2,28],38:72,39:[1,46]},{10:[2,71],27:[2,71],29:[2,71],31:[2,71],39:[2,71],45:[2,71],75:[2,71]},{10:[2,29],27:[2,29],29:[2,29],31:[2,29],39:[2,29]},{22:73,45:[1,28]},{40:[1,52],46:[1,49],47:[1,50],48:[1,51],69:[1,53],72:[1,54]},{46:[1,49],47:[1,50],48:[1,51],64:[1,74]},{45:[1,75]},{45:[1,76]},{45:[1,77]},{13:[2,82],42:[2,82],45:[1,81],48:[1,79],55:[2,82],76:78,77:80},{16:[1,87],22:90,45:[1,28],49:[1,83],51:85,52:[1,86],53:[1,88],54:[1,89],55:[1,91],59:[1,92],63:84,70:82},{16:[1,87],22:90,45:[1,28],49:[1,83],51:85,52:[1,86],53:[1,88],54:[1,89],55:[1,91],59:[1,92],63:84,70:93},{10:[2,65],27:[2,65],29:[2,65],31:[2,65],46:[1,49],47:[1,50],48:[1,51],66:[1,94]},{10:[2,67],27:[2,67],29:[2,67],31:[2,67],46:[1,49],47:[1,50],48:[1,51]},{16:[1,87],22:90,45:[1,28],49:[1,83],51:85,52:[1,86],53:[1,88],54:[1,89],55:[1,91],59:[1,92],63:84,70:95},{10:[2,76],27:[2,76],29:[2,76],31:[2,76],39:[2,76],45:[2,76],75:[2,76]},{40:[1,52],46:[1,49],47:[1,50],48:[1,51]},{13:[2,7],45:[2,7],64:[2,7],65:[2,7],67:[2,7],75:[2,7]},{13:[2,9],17:[1,96],45:[2,9],64:[2,9],65:[2,9],67:[2,9],75:[2,9]},{13:[2,14],45:[2,14],46:[1,49],47:[1,50],48:[1,51],64:[2,14],65:[2,14],67:[2,14],75:[2,14]},{13:[2,15],45:[2,15],46:[1,49],47:[1,50],48:[1,51],64:[2,15],65:[2,15],67:[2,15],75:[2,15]},{13:[2,16],45:[2,16],46:[1,49],47:[1,50],48:[1,51],64:[2,16],65:[2,16],67:[2,16],75:[2,16]},{13:[2,17],45:[2,17],46:[1,49],47:[1,50],48:[1,51],64:[2,17],65:[2,17],67:[2,17],75:[2,17]},{5:[2,3],6:[2,3]},{10:[2,19],13:[1,97],31:[2,19]},{10:[2,41],13:[2,41],31:[2,41],46:[1,49],47:[1,50],48:[1,51]},{10:[2,20],13:[1,98],31:[2,20]},{10:[2,33],13:[2,33],15:[1,99],31:[2,33]},{10:[2,35],13:[2,35],15:[2,35],31:[2,35]},{10:[2,30],27:[2,30],29:[2,30],31:[2,30],39:[2,30]},{40:[1,100],46:[1,49],47:[1,50],48:[1,51]},{10:[2,63],27:[2,63],29:[2,63],31:[2,63]},{10:[2,38],13:[2,38],27:[2,38],29:[2,38],31:[2,38],39:[2,38],40:[2,38],42:[2,38],43:[2,38],45:[2,38],46:[2,38],47:[2,38],48:[2,38],50:[2,38],55:[2,38],57:[2,38],58:[2,38],61:[2,38],64:[2,38],65:[2,38],66:[2,38],67:[2,38],69:[2,38],72:[2,38],75:[2,38]},{10:[2,39],13:[2,39],27:[2,39],29:[2,39],31:[2,39],39:[2,39],40:[2,39],42:[2,39],43:[2,39],45:[2,39],46:[2,39],47:[2,39],48:[2,39],50:[2,39],55:[2,39],57:[2,39],58:[2,39],61:[2,39],64:[2,39],65:[2,39],66:[2,39],67:[2,39],69:[2,39],72:[2,39],75:[2,39]},{10:[2,40],13:[2,40],27:[2,40],29:[2,40],31:[2,40],39:[2,40],40:[2,40],42:[2,40],43:[2,40],45:[2,40],46:[2,40],47:[2,40],48:[2,40],50:[2,40],55:[2,40],57:[2,40],58:[2,40],61:[2,40],64:[2,40],65:[2,40],66:[2,40],67:[2,40],69:[2,40],72:[2,40],75:[2,40]},{13:[1,102],42:[1,101],55:[1,103]},{13:[2,82],42:[2,82],45:[1,81],55:[2,82],76:104,77:80},{13:[2,83],42:[2,83],55:[2,83],57:[2,83],58:[1,106],72:[1,105]},{13:[2,87],42:[2,87],55:[2,87],57:[2,87],58:[2,87],72:[2,87]},{10:[2,68],27:[2,68],29:[2,68],31:[2,68],39:[2,68],45:[2,68],50:[1,107],75:[2,68]},{10:[2,79],27:[2,79],29:[2,79],31:[2,79],39:[2,79],45:[2,79],50:[2,79],75:[2,79]},{10:[2,80],27:[2,80],29:[2,80],31:[2,80],39:[2,80],45:[2,80],50:[2,80],75:[2,80]},{10:[2,62],13:[2,62],27:[2,62],29:[2,62],31:[2,62],39:[2,62],42:[2,62],45:[2,62],50:[2,62],55:[2,62],57:[2,62],58:[2,62],72:[2,62],75:[2,62]},{10:[2,46],13:[2,46],27:[2,46],29:[2,46],31:[2,46],39:[2,46],42:[2,46],45:[2,46],50:[2,46],55:[2,46],57:[2,46],58:[2,46],61:[2,46],72:[2,46],75:[2,46]},{10:[2,47],13:[2,47],27:[2,47],29:[2,47],31:[2,47],39:[2,47],42:[2,47],45:[2,47],50:[2,47],55:[2,47],57:[2,47],58:[2,47],61:[2,47],72:[2,47],75:[2,47]},{10:[2,48],13:[2,48],27:[2,48],29:[2,48],31:[2,48],39:[2,48],42:[2,48],45:[2,48],50:[2,48],55:[2,48],57:[2,48],58:[2,48],61:[2,48],72:[2,48],75:[2,48]},{10:[2,49],13:[2,49],27:[2,49],29:[2,49],31:[2,49],39:[2,49],42:[2,49],45:[2,49],50:[2,49],55:[2,49],57:[2,49],58:[2,49],61:[2,49],72:[2,49],75:[2,49]},{10:[2,50],13:[2,50],27:[2,50],29:[2,50],31:[2,50],39:[2,50],42:[2,50],45:[2,50],46:[1,49],47:[1,50],48:[1,51],50:[2,50],55:[2,50],57:[2,50],58:[2,50],61:[2,50],72:[2,50],75:[2,50]},{13:[2,54],16:[1,87],22:90,45:[1,28],51:109,52:[1,86],53:[1,88],54:[1,89],55:[1,91],56:108,57:[2,54],58:[2,54],59:[1,92]},{13:[2,57],45:[1,113],52:[1,112],60:110,61:[2,57],62:111},{10:[2,69],27:[2,69],29:[2,69],31:[2,69],39:[2,69],45:[2,69],50:[1,107],75:[2,69]},{22:114,45:[1,28]},{10:[2,73],27:[2,73],29:[2,73],31:[2,73],39:[2,73],45:[2,73],50:[1,107],75:[2,73]},{16:[1,115]},{22:116,45:[1,28]},{44:117,45:[1,71]},{45:[1,118]},{22:121,41:119,45:[1,28],49:[1,120]},{10:[2,77],27:[2,77],29:[2,77],31:[2,77],39:[2,77],45:[2,77],69:[2,77],75:[2,77]},{45:[1,81],55:[1,123],77:122},{13:[2,82],45:[1,81],55:[2,82],57:[2,82],76:124,77:80},{13:[1,102],42:[1,125],55:[1,103]},{16:[1,87],22:90,45:[1,28],51:85,52:[1,86],53:[1,88],54:[1,89],55:[1,91],59:[1,92],63:126},{13:[2,89],42:[2,89],55:[2,89],57:[2,89],58:[2,89],72:[2,89]},{16:[1,87],22:90,45:[1,28],51:85,52:[1,86],53:[1,88],54:[1,89],55:[1,91],59:[1,92],63:127},{13:[1,130],57:[1,128],58:[1,129]},{13:[2,55],57:[2,55],58:[2,55]},{13:[1,132],61:[1,131]},{15:[1,133]},{15:[2,60]},{15:[2,61]},{10:[2,66],27:[2,66],29:[2,66],31:[2,66],46:[1,49],47:[1,50],48:[1,51]},{13:[2,10],45:[2,10],64:[2,10],65:[2,10],67:[2,10],75:[2,10]},{10:[2,42],13:[2,42],31:[2,42],46:[1,49],47:[1,50],48:[1,51]},{10:[2,34],13:[2,34],15:[1,99],31:[2,34]},{10:[2,36],13:[2,36],15:[2,36],31:[2,36]},{42:[1,134],43:[1,135],50:[1,136]},{42:[2,43],43:[2,43],50:[2,43]},{42:[2,44],43:[2,44],46:[1,49],47:[1,50],48:[1,51],50:[2,44]},{13:[2,84],42:[2,84],55:[2,84],57:[2,84],58:[1,106],72:[1,105]},{13:[2,82],45:[1,81],55:[2,82],57:[2,82],76:137,77:80},{13:[1,102],55:[1,103],57:[1,138]},{10:[2,78],27:[2,78],29:[2,78],31:[2,78],39:[2,78],45:[2,78],69:[2,78],75:[2,78]},{13:[2,88],42:[2,88],55:[2,88],57:[2,88],58:[2,88],72:[2,88]},{10:[2,81],27:[2,81],29:[2,81],31:[2,81],39:[2,81],45:[2,81],50:[2,81],75:[2,81]},{10:[2,51],13:[2,51],27:[2,51],29:[2,51],31:[2,51],39:[2,51],42:[2,51],45:[2,51],50:[2,51],55:[2,51],57:[2,51],58:[2,51],61:[2,51],72:[2,51],75:[2,51]},{57:[1,139]},{16:[1,87],22:90,45:[1,28],51:140,52:[1,86],53:[1,88],54:[1,89],55:[1,91],59:[1,92]},{10:[2,53],13:[2,53],27:[2,53],29:[2,53],31:[2,53],39:[2,53],42:[2,53],45:[2,53],50:[2,53],55:[2,53],57:[2,53],58:[2,53],61:[2,53],72:[2,53],75:[2,53]},{45:[1,113],52:[1,112],62:141},{16:[1,87],22:90,45:[1,28],51:142,52:[1,86],53:[1,88],54:[1,89],55:[1,91],59:[1,92]},{10:[2,31],27:[2,31],29:[2,31],31:[2,31],39:[2,31]},{31:[1,143]},{22:144,45:[1,28]},{13:[1,102],55:[1,103],57:[1,145]},{13:[2,86],42:[2,86],55:[2,86],57:[2,86]},{10:[2,52],13:[2,52],27:[2,52],29:[2,52],31:[2,52],39:[2,52],42:[2,52],45:[2,52],50:[2,52],55:[2,52],57:[2,52],58:[2,52],61:[2,52],72:[2,52],75:[2,52]},{13:[2,56],57:[2,56],58:[2,56]},{15:[1,146]},{13:[2,58],61:[2,58]},{10:[2,32],27:[2,32],29:[2,32],31:[2,32],39:[2,32]},{42:[2,45],43:[2,45],46:[1,49],47:[1,50],48:[1,51],50:[2,45]},{13:[2,85],42:[2,85],55:[2,85],57:[2,85]},{16:[1,87],22:90,45:[1,28],51:147,52:[1,86],53:[1,88],54:[1,89],55:[1,91],59:[1,92]},{13:[2,59],61:[2,59]}],
defaultActions: {3:[2,1],40:[2,22],112:[2,60],113:[2,61]},
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
case 9:return 47
break;
case 10:return 46
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
case 22:return 45
break;
case 23:this.popState(); return 10
break;
case 24:return 31
break;
case 25:/* skip whitespaces */
break;
case 26:this.begin('arg'); return 43
break;
case 27:return 39
break;
case 28:return 29
break;
case 29:return 27
break;
case 30:/*return '*'*/
break;
case 31:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 52
break;
case 32:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 52
break;
case 33:return 16
break;
case 34:return 54
break;
case 35:return 53
break;
case 36:return 53
break;
case 37:return 47
break;
case 38:return 48
break;
case 39:return 49
break;
case 40:return 58
break;
case 41:return 46
break;
case 42:return 13
break;
case 43:return 69
break;
case 44:return 64
break;
case 45:return 72
break;
case 46:return 66
break;
case 47:return 15
break;
case 48:return 40
break;
case 49:return 42
break;
case 50:return 55
break;
case 51:return 57
break;
case 52:return 59
break;
case 53:return 61
break;
case 54:return 50
break;
case 55:return 65
break;
case 56:return 67
break;
case 57:return 75
break;
case 58:return 45
break;
case 59:this.popState(); return 31
break;
case 60:this.popState(); console.log('LEFTCOMM'); return 31
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