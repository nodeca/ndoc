/* Jison generated parser */
var jsParser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"ndoc_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"VERSION":16,"..":17,"READONLY":18,"INTERNAL":19,"CHAINABLE":20,"SECTION":21,"name":22,"ALIASOF":23,"RELATEDTO":24,"BELONGSTO":25,"ndoc":26,"INCLUDES":27,"names":28,"TEXT":29,"section":30,"namespace":31,"class":32,"mixin":33,"signatures":34,"argument_descriptions":35,"argument_description":36,"*-":37,"NAME":38,"(":39,"names_alternation":40,")":41,"):":42,"events":43,"event":44,".":45,"@":46,"EVENTEND":47,"name_or_namespace":48,"#":49,"?":50,"|":51,"value":52,"STRING":53,"NUMBER":54,"BOOLEAN":55,"REGEXP":56,"[":57,"value_list":58,"]":59,"...":60,"{":61,"key_value_list":62,"}":63,"value2":64,"TRUE":65,"FALSE":66,"NULL":67,"key":68,"name_or_value":69,"==":70,"CLASS":71,"<":72,"MIXIN":73,"property":74,"->":75,"returns":76,"constant":77,"=":78,"signature":79,"method":80,"NEW":81,"args":82,"arg":83,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"VERSION",17:"..",18:"READONLY",19:"INTERNAL",20:"CHAINABLE",21:"SECTION",23:"ALIASOF",24:"RELATEDTO",25:"BELONGSTO",27:"INCLUDES",29:"TEXT",37:"*-",38:"NAME",39:"(",41:")",42:"):",45:".",46:"@",47:"EVENTEND",49:"#",50:"?",51:"|",53:"STRING",54:"NUMBER",55:"BOOLEAN",56:"REGEXP",57:"[",59:"]",60:"...",61:"{",63:"}",65:"TRUE",66:"FALSE",67:"NULL",70:"==",71:"CLASS",72:"<",73:"MIXIN",75:"->",78:"=",81:"NEW"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[8,1],[8,3],[9,0],[9,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,2],[35,1],[35,2],[36,5],[36,6],[36,4],[43,1],[43,3],[44,1],[44,3],[44,3],[44,3],[44,2],[48,1],[48,3],[22,1],[22,3],[22,3],[28,1],[28,3],[40,1],[40,1],[40,3],[52,1],[52,1],[52,1],[52,1],[52,1],[52,3],[52,4],[52,3],[64,1],[64,1],[64,1],[64,1],[64,1],[64,1],[64,1],[64,3],[64,4],[64,3],[58,0],[58,1],[58,3],[62,0],[62,3],[62,5],[68,1],[68,1],[69,1],[30,3],[31,1],[32,2],[32,4],[33,2],[74,3],[77,3],[34,1],[34,2],[79,1],[79,3],[79,1],[79,1],[79,2],[80,4],[80,5],[76,1],[76,1],[76,3],[82,0],[82,1],[82,3],[82,5],[82,4],[83,1],[83,4],[83,3],[83,2]],
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
      throw new Error('name clash: ' + x.id);
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
case 9: this.$ = {deprecated: {since: $$[$0]}} 
break;
case 10: this.$ = {deprecated: {since: $$[$0-2], off: $$[$0]}} 
break;
case 11: this.$ = {readonly: true} 
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
case 32:
    this.$ = {
      name: $$[$0-2],
      types: "mixed",
      description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
    };
  
break;
case 33: this.$ = [$$[$0]] 
break;
case 34: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 36: this.$ += $$[$0-1] + $$[$0] 
break;
case 37: this.$ += $$[$0-1] + $$[$0] 
break;
case 38: this.$ += $$[$0-1] + $$[$0] 
break;
case 39: this.$ += $$[$0] 
break;
case 41: this.$ += $$[$0-1] + $$[$0] 
break;
case 43: this.$ += $$[$0-1] + $$[$0] 
break;
case 44: this.$ += $$[$0-1] + $$[$0] 
break;
case 45: this.$ = [$$[$0]] 
break;
case 46: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 47: this.$ = [] 
break;
case 48: this.$ = [$$[$0]] 
break;
case 49: this.$.push($$[$0]) 
break;
case 50: this.$ = String($$[$0]) 
break;
case 51: this.$ = Number($$[$0]) 
break;
case 52: this.$ = $$[$0] === 'true' ? true : false 
break;
case 53: this.$ = new RegExp($$[$0]) 
break;
case 55: this.$ = $$[$0-1]; this.$.array = true 
break;
case 56: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 57: this.$ = $$[$0-1] 
break;
case 58: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 59: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 60: this.$ = {value: true, type: 'boolean'} 
break;
case 61: this.$ = {value: false, type: 'boolean'} 
break;
case 62: this.$ = {value: null, type: 'null'} 
break;
case 63: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 64: this.$ = {value: $$[$0], type: 'name'} 
break;
case 65: this.$ = $$[$0-1]; this.$.array = true 
break;
case 66: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 67: this.$ = $$[$0-1] 
break;
case 68: this.$ = [] 
break;
case 69: this.$ = [$$[$0]] 
break;
case 70: this.$.push($$[$0]) 
break;
case 71: this.$ = {} 
break;
case 72: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 73: this.$[$$[$0-2]] = $$[$0] 
break;
case 77: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 78: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 79: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 80: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 81: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 82: this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
break;
case 83: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 84:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 85:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 87: this.$.returns = $$[$0] 
break;
case 90: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 91: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 92: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 93: this.$ = [{type: '?'}] 
break;
case 94:
    var x = $$[$0];
    var ret = {
      type: String(x)
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 95:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 96: this.$ = [] 
break;
case 97: this.$ = [$$[$0]] 
break;
case 98: this.$.push($$[$0]) 
break;
case 99:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 100:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 101: this.$ = {name: $$[$0]} 
break;
case 102: this.$ = {name: $$[$0-3], args: $$[$0-1]} 
break;
case 103: this.$.default_value = $$[$0] 
break;
case 104: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15],38:[2,4],70:[2,4],71:[2,4],73:[2,4],81:[2,4]},{8:16,22:24,26:17,30:18,31:19,32:20,33:21,34:22,38:[1,33],48:28,70:[1,23],71:[1,25],73:[1,26],74:30,77:31,79:27,80:29,81:[1,32]},{13:[1,34],38:[2,5],70:[2,5],71:[2,5],73:[2,5],81:[2,5]},{13:[2,6],38:[2,6],70:[2,6],71:[2,6],73:[2,6],81:[2,6]},{13:[2,8],15:[1,35],38:[2,8],70:[2,8],71:[2,8],73:[2,8],81:[2,8]},{13:[2,11],38:[2,11],70:[2,11],71:[2,11],73:[2,11],81:[2,11]},{13:[2,12],38:[2,12],70:[2,12],71:[2,12],73:[2,12],81:[2,12]},{13:[2,13],38:[2,13],70:[2,13],71:[2,13],73:[2,13],81:[2,13]},{15:[1,36]},{15:[1,37]},{15:[1,38]},{15:[1,39]},{9:40,10:[2,20],29:[1,41]},{10:[2,18],27:[1,42],29:[2,18]},{10:[2,22],27:[2,22],29:[2,22]},{10:[2,23],27:[2,23],29:[2,23]},{10:[2,24],27:[2,24],29:[2,24]},{10:[2,25],27:[2,25],29:[2,25]},{10:[2,26],22:47,27:[2,26],29:[2,26],35:43,36:45,37:[1,46],38:[1,33],48:28,74:30,77:31,79:44,80:29,81:[1,32]},{22:48,38:[1,33],48:28},{10:[2,78],27:[2,78],29:[2,78],39:[1,49],75:[1,50],78:[1,51]},{22:52,38:[1,33],48:28},{22:53,38:[1,33],48:28},{10:[2,84],27:[2,84],29:[2,84],37:[2,84],38:[2,84],81:[2,84]},{10:[2,42],13:[2,42],27:[2,42],29:[2,42],37:[2,42],38:[2,42],39:[2,42],41:[2,42],42:[2,42],45:[1,56],46:[1,55],49:[1,54],51:[2,42],57:[2,42],59:[2,42],60:[2,42],63:[2,42],70:[2,42],71:[2,42],72:[2,42],73:[2,42],75:[2,42],78:[2,42],81:[2,42]},{10:[2,86],27:[2,86],29:[2,86],37:[2,86],38:[2,86],75:[1,57],81:[2,86]},{10:[2,88],27:[2,88],29:[2,88],37:[2,88],38:[2,88],81:[2,88]},{10:[2,89],27:[2,89],29:[2,89],37:[2,89],38:[2,89],81:[2,89]},{22:59,38:[1,33],48:28,80:58},{10:[2,40],13:[2,40],27:[2,40],29:[2,40],37:[2,40],38:[2,40],39:[2,40],41:[2,40],42:[2,40],45:[2,40],46:[2,40],49:[2,40],51:[2,40],57:[2,40],59:[2,40],60:[2,40],63:[2,40],70:[2,40],71:[2,40],72:[2,40],73:[2,40],75:[2,40],78:[2,40],81:[2,40]},{12:60,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15]},{16:[1,61]},{22:62,38:[1,33],48:28},{22:63,38:[1,33],48:28},{22:64,38:[1,33],48:28},{22:65,38:[1,33],48:28},{10:[1,66]},{10:[2,21]},{22:68,28:67,38:[1,33],48:28},{10:[2,27],27:[2,27],29:[2,27],36:69,37:[1,46]},{10:[2,85],27:[2,85],29:[2,85],37:[2,85],38:[2,85],81:[2,85]},{10:[2,28],27:[2,28],29:[2,28],37:[2,28]},{38:[1,70]},{39:[1,49],75:[1,50],78:[1,51]},{70:[1,71]},{13:[2,96],38:[1,75],41:[2,96],46:[1,73],57:[2,96],82:72,83:74},{22:84,38:[1,33],48:28,50:[1,77],52:79,53:[1,80],54:[1,81],55:[1,82],56:[1,83],57:[1,85],61:[1,86],69:78,76:76},{22:84,38:[1,33],48:28,50:[1,77],52:79,53:[1,80],54:[1,81],55:[1,82],56:[1,83],57:[1,85],61:[1,86],69:78,76:87},{10:[2,79],27:[2,79],29:[2,79],72:[1,88]},{10:[2,81],27:[2,81],29:[2,81]},{38:[1,89]},{38:[1,91],44:90},{38:[1,92]},{22:84,38:[1,33],48:28,50:[1,77],52:79,53:[1,80],54:[1,81],55:[1,82],56:[1,83],57:[1,85],61:[1,86],69:78,76:93},{10:[2,90],27:[2,90],29:[2,90],37:[2,90],38:[2,90],81:[2,90]},{39:[1,49]},{13:[2,7],38:[2,7],70:[2,7],71:[2,7],73:[2,7],81:[2,7]},{13:[2,9],17:[1,94],38:[2,9],70:[2,9],71:[2,9],73:[2,9],81:[2,9]},{13:[2,14],38:[2,14],70:[2,14],71:[2,14],73:[2,14],81:[2,14]},{13:[2,15],38:[2,15],70:[2,15],71:[2,15],73:[2,15],81:[2,15]},{13:[2,16],38:[2,16],70:[2,16],71:[2,16],73:[2,16],81:[2,16]},{13:[2,17],38:[2,17],70:[2,17],71:[2,17],73:[2,17],81:[2,17]},{5:[2,3],6:[2,3]},{10:[2,19],13:[1,95],29:[2,19]},{10:[2,45],13:[2,45],29:[2,45]},{10:[2,29],27:[2,29],29:[2,29],37:[2,29]},{15:[1,97],39:[1,96]},{10:[2,77],27:[2,77],29:[2,77]},{13:[1,99],41:[1,98],57:[1,100]},{13:[2,96],38:[1,75],41:[2,96],57:[2,96],82:101,83:74},{13:[2,97],41:[2,97],57:[2,97],59:[2,97],60:[1,103],78:[1,102]},{13:[2,101],39:[1,104],41:[2,101],57:[2,101],59:[2,101],60:[2,101],78:[2,101]},{10:[2,82],27:[2,82],29:[2,82],37:[2,82],38:[2,82],51:[1,105],81:[2,82]},{10:[2,93],27:[2,93],29:[2,93],37:[2,93],38:[2,93],51:[2,93],81:[2,93]},{10:[2,94],27:[2,94],29:[2,94],37:[2,94],38:[2,94],51:[2,94],81:[2,94]},{10:[2,76],13:[2,76],27:[2,76],29:[2,76],37:[2,76],38:[2,76],41:[2,76],51:[2,76],57:[2,76],59:[2,76],60:[2,76],78:[2,76],81:[2,76]},{10:[2,50],13:[2,50],27:[2,50],29:[2,50],37:[2,50],38:[2,50],41:[2,50],51:[2,50],57:[2,50],59:[2,50],60:[2,50],63:[2,50],78:[2,50],81:[2,50]},{10:[2,51],13:[2,51],27:[2,51],29:[2,51],37:[2,51],38:[2,51],41:[2,51],51:[2,51],57:[2,51],59:[2,51],60:[2,51],63:[2,51],78:[2,51],81:[2,51]},{10:[2,52],13:[2,52],27:[2,52],29:[2,52],37:[2,52],38:[2,52],41:[2,52],51:[2,52],57:[2,52],59:[2,52],60:[2,52],63:[2,52],78:[2,52],81:[2,52]},{10:[2,53],13:[2,53],27:[2,53],29:[2,53],37:[2,53],38:[2,53],41:[2,53],51:[2,53],57:[2,53],59:[2,53],60:[2,53],63:[2,53],78:[2,53],81:[2,53]},{10:[2,54],13:[2,54],27:[2,54],29:[2,54],37:[2,54],38:[2,54],41:[2,54],51:[2,54],57:[2,54],59:[2,54],60:[2,54],63:[2,54],78:[2,54],81:[2,54]},{13:[2,68],22:84,38:[1,33],48:28,52:107,53:[1,80],54:[1,81],55:[1,82],56:[1,83],57:[1,85],58:106,59:[2,68],60:[2,68],61:[1,86]},{13:[2,71],38:[1,111],53:[1,110],62:108,63:[2,71],68:109},{10:[2,83],27:[2,83],29:[2,83],37:[2,83],38:[2,83],51:[1,105],81:[2,83]},{22:112,38:[1,33],48:28},{10:[2,43],13:[2,43],27:[2,43],29:[2,43],37:[2,43],38:[2,43],39:[2,43],41:[2,43],42:[2,43],51:[2,43],57:[2,43],59:[2,43],60:[2,43],63:[2,43],70:[2,43],71:[2,43],72:[2,43],73:[2,43],75:[2,43],78:[2,43],81:[2,43]},{10:[2,44],13:[2,44],15:[1,113],27:[2,44],29:[2,44],37:[2,44],38:[2,44],39:[2,44],41:[2,44],42:[2,44],45:[1,114],46:[1,115],47:[1,116],51:[2,44],57:[2,44],59:[2,44],60:[2,44],63:[2,44],70:[2,44],71:[2,44],72:[2,44],73:[2,44],75:[2,44],78:[2,44],81:[2,44]},{10:[2,35],13:[2,35],15:[2,35],27:[2,35],29:[2,35],37:[2,35],38:[2,35],39:[2,35],41:[2,35],42:[2,35],45:[2,35],46:[2,35],47:[2,35],51:[2,35],57:[2,35],59:[2,35],60:[2,35],63:[2,35],70:[2,35],71:[2,35],72:[2,35],73:[2,35],75:[2,35],78:[2,35],81:[2,35]},{10:[2,41],13:[2,41],27:[2,41],29:[2,41],37:[2,41],38:[2,41],39:[2,41],41:[2,41],42:[2,41],45:[2,41],46:[2,41],49:[2,41],51:[2,41],57:[2,41],59:[2,41],60:[2,41],63:[2,41],70:[2,41],71:[2,41],72:[2,41],73:[2,41],75:[2,41],78:[2,41],81:[2,41]},{10:[2,87],27:[2,87],29:[2,87],37:[2,87],38:[2,87],51:[1,105],81:[2,87]},{16:[1,117]},{22:118,38:[1,33],48:28},{22:121,38:[1,33],40:119,48:28,50:[1,120]},{29:[1,122]},{10:[2,91],27:[2,91],29:[2,91],37:[2,91],38:[2,91],75:[2,91],81:[2,91]},{38:[1,75],57:[1,124],83:123},{13:[2,96],38:[1,75],57:[2,96],59:[2,96],82:125,83:74},{13:[1,99],41:[1,126],57:[1,100]},{22:84,38:[1,33],48:28,52:79,53:[1,80],54:[1,81],55:[1,82],56:[1,83],57:[1,85],61:[1,86],69:127},{13:[2,104],41:[2,104],57:[2,104],59:[2,104],60:[2,104],78:[2,104]},{13:[2,96],38:[1,75],41:[2,96],57:[2,96],82:128,83:74},{22:84,38:[1,33],48:28,52:79,53:[1,80],54:[1,81],55:[1,82],56:[1,83],57:[1,85],61:[1,86],69:129},{13:[1,132],59:[1,130],60:[1,131]},{13:[2,69],59:[2,69],60:[2,69]},{13:[1,134],63:[1,133]},{15:[1,135]},{15:[2,74]},{15:[2,75]},{10:[2,80],27:[2,80],29:[2,80]},{38:[1,136]},{38:[1,137]},{38:[1,138]},{10:[2,39],13:[2,39],15:[2,39],27:[2,39],29:[2,39],37:[2,39],38:[2,39],39:[2,39],41:[2,39],42:[2,39],45:[2,39],46:[2,39],47:[2,39],51:[2,39],57:[2,39],59:[2,39],60:[2,39],63:[2,39],70:[2,39],71:[2,39],72:[2,39],73:[2,39],75:[2,39],78:[2,39],81:[2,39]},{13:[2,10],38:[2,10],70:[2,10],71:[2,10],73:[2,10],81:[2,10]},{10:[2,46],13:[2,46],29:[2,46]},{41:[1,139],42:[1,140],51:[1,141]},{41:[2,47],42:[2,47],51:[2,47]},{41:[2,48],42:[2,48],51:[2,48]},{10:[2,32],27:[2,32],29:[2,32],37:[2,32]},{13:[2,98],41:[2,98],57:[2,98],59:[2,98],60:[1,103],78:[1,102]},{13:[2,96],38:[1,75],57:[2,96],59:[2,96],82:142,83:74},{13:[1,99],57:[1,100],59:[1,143]},{10:[2,92],27:[2,92],29:[2,92],37:[2,92],38:[2,92],75:[2,92],81:[2,92]},{13:[2,103],41:[2,103],57:[2,103],59:[2,103],60:[2,103],78:[2,103]},{13:[1,99],41:[1,144],57:[1,100]},{10:[2,95],27:[2,95],29:[2,95],37:[2,95],38:[2,95],51:[2,95],81:[2,95]},{10:[2,55],13:[2,55],27:[2,55],29:[2,55],37:[2,55],38:[2,55],41:[2,55],51:[2,55],57:[2,55],59:[2,55],60:[2,55],63:[2,55],78:[2,55],81:[2,55]},{59:[1,145]},{22:84,38:[1,33],48:28,52:146,53:[1,80],54:[1,81],55:[1,82],56:[1,83],57:[1,85],61:[1,86]},{10:[2,57],13:[2,57],27:[2,57],29:[2,57],37:[2,57],38:[2,57],41:[2,57],51:[2,57],57:[2,57],59:[2,57],60:[2,57],63:[2,57],78:[2,57],81:[2,57]},{38:[1,111],53:[1,110],68:147},{22:84,38:[1,33],48:28,52:148,53:[1,80],54:[1,81],55:[1,82],56:[1,83],57:[1,85],61:[1,86]},{10:[2,36],13:[2,36],15:[2,36],27:[2,36],29:[2,36],37:[2,36],38:[2,36],39:[2,36],41:[2,36],42:[2,36],45:[2,36],46:[2,36],47:[2,36],51:[2,36],57:[2,36],59:[2,36],60:[2,36],63:[2,36],70:[2,36],71:[2,36],72:[2,36],73:[2,36],75:[2,36],78:[2,36],81:[2,36]},{10:[2,37],13:[2,37],15:[2,37],27:[2,37],29:[2,37],37:[2,37],38:[2,37],39:[2,37],41:[2,37],42:[2,37],45:[2,37],46:[2,37],47:[2,37],51:[2,37],57:[2,37],59:[2,37],60:[2,37],63:[2,37],70:[2,37],71:[2,37],72:[2,37],73:[2,37],75:[2,37],78:[2,37],81:[2,37]},{10:[2,38],13:[2,38],15:[2,38],27:[2,38],29:[2,38],37:[2,38],38:[2,38],39:[2,38],41:[2,38],42:[2,38],45:[2,38],46:[2,38],47:[2,38],51:[2,38],57:[2,38],59:[2,38],60:[2,38],63:[2,38],70:[2,38],71:[2,38],72:[2,38],73:[2,38],75:[2,38],78:[2,38],81:[2,38]},{10:[2,30],27:[2,30],29:[2,30],37:[2,30]},{29:[1,149]},{22:150,38:[1,33],48:28},{13:[1,99],57:[1,100],59:[1,151]},{13:[2,100],41:[2,100],57:[2,100],59:[2,100]},{13:[2,102],41:[2,102],57:[2,102],59:[2,102],60:[2,102],78:[2,102]},{10:[2,56],13:[2,56],27:[2,56],29:[2,56],37:[2,56],38:[2,56],41:[2,56],51:[2,56],57:[2,56],59:[2,56],60:[2,56],63:[2,56],78:[2,56],81:[2,56]},{13:[2,70],59:[2,70],60:[2,70]},{15:[1,152]},{13:[2,72],63:[2,72]},{10:[2,31],27:[2,31],29:[2,31],37:[2,31]},{41:[2,49],42:[2,49],51:[2,49]},{13:[2,99],41:[2,99],57:[2,99],59:[2,99]},{22:84,38:[1,33],48:28,52:153,53:[1,80],54:[1,81],55:[1,82],56:[1,83],57:[1,85],61:[1,86]},{13:[2,73],63:[2,73]}],
defaultActions: {3:[2,1],41:[2,21],110:[2,74],111:[2,75]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
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
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
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
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
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
lexer.options = {};
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
case 10:return 45
break;
case 11:/* skip whitespaces */
break;
case 12:return 16
break;
case 13:return 54
break;
case 14:return 14
break;
case 15:return 18
break;
case 16:return 19
break;
case 17:return 20
break;
case 18:return 21
break;
case 19:return 23
break;
case 20:/* N.B. shouldn't it be ALIAS, and reversed sense */ return 23
break;
case 21:return 24
break;
case 22:return 25
break;
case 23:return 38
break;
case 24:return 47
break;
case 25:this.popState(); return 10
break;
case 26:return 29
break;
case 27:/* skip whitespaces */
break;
case 28:this.begin('arg'); return 42
break;
case 29:return 37
break;
case 30:return 'FIRES'
break;
case 31:return 27
break;
case 32:/*return '*'*/
break;
case 33:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 53
break;
case 34:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 53
break;
case 35:return 54
break;
case 36:return 56
break;
case 37:return 55
break;
case 38:return 55
break;
case 39:return 49
break;
case 40:return 46
break;
case 41:return 50
break;
case 42:return 60
break;
case 43:return 45
break;
case 44:return 13
break;
case 45:return 75
break;
case 46:return 70
break;
case 47:return 78
break;
case 48:return 72
break;
case 49:return 15
break;
case 50:return 39
break;
case 51:return 41
break;
case 52:return 57
break;
case 53:return 59
break;
case 54:return 61
break;
case 55:return 63
break;
case 56:return 51
break;
case 57:return 71
break;
case 58:return 73
break;
case 59:return 81
break;
case 60:return 38
break;
case 61:return 47
break;
case 62:this.popState(); return 29
break;
case 63:this.popState(); console.log('LEFTCOMM'); return 29
break;
}
};
lexer.rules = [/^(?:$)/,/^(?:\s+)/,/^(?:\/\*\*(?=([^/])))/,/^(?:.*)/,/^(?:\*\*\/)/,/^(?:\s*[\n])/,/^(?:, )/,/^(?:: )/,/^(?:\.\.)/,/^(?:#)/,/^(?:\.)/,/^(?:\s+)/,/^(?:[0-9]+(?:\.[0-9]+)*\b)/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:deprecated\b)/,/^(?:read-only\b)/,/^(?:internal\b)/,/^(?:chainable\b)/,/^(?:section\b)/,/^(?:alias of\b)/,/^(?:alias\b)/,/^(?:related to\b)/,/^(?:belongs to\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[^@(\s]+)))/,/^(?:\*\*\/)/,/^(?:\*\s*?[\n][\s\S]*?(?=\*\*\/))/,/^(?:\s+)/,/^(?:\)\s*:)/,/^(?:\*\s*-)/,/^(?:\*\s*fires\b)/,/^(?:\*\s*includes\b)/,/^(?:\*)/,/^(?:"(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^"(\\)])*")/,/^(?:'(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^'(\\)])*')/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:\/(?:[^\/]|\\\/)*\/[gim]*)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:#)/,/^(?:@)/,/^(?:\?)/,/^(?:\.\.\.)/,/^(?:\.)/,/^(?:,)/,/^(?:->)/,/^(?:==)/,/^(?:=)/,/^(?:<)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\{)/,/^(?:\})/,/^(?:\|)/,/^(?:class\b)/,/^(?:mixin\b)/,/^(?:new\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[^@(\s]+)))/,/^(?:[\s\S]*?(?=(\*\s*[-\n])))/,/^(?:[\s\S]*?(?=\*\*\/))/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":false},"def":{"rules":[0,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61],"inclusive":false},"arg":{"rules":[0,62],"inclusive":false},"comment":{"rules":[0,63],"inclusive":false}};
return lexer;})()
parser.lexer = lexer;function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = jsParser;
exports.Parser = jsParser.Parser;
exports.parse = function () { return jsParser.parse.apply(jsParser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    var source, cwd;
    if (typeof process !== 'undefined') {
        source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
    } else {
        source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}