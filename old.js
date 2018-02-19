/*


- css.store(obj, [id]) - Adds the cssjs to an internal memory. Passes through object
- css.stored - gets all stored cssjs objs as an array

- css.toProp(obj) - Creates a string that could be passed as a `style` prop
- css.toCSS(obj) - Compiles obj down to CSS tag


----- Internal Methods ------

- Compile value for a style attriute
-

compile
 - If string/number, ya done
 - If function, execute and loop
 - if array, map over and merge
 -




css/fromLESS.js - takes a string formatted like less and returns a cssjs object
css/fromSASS.js -



body : {
	height           : 100%;
	margin           : 0;
	padding          : 0;
	backgroundColor : #ddd;
	fontFamily      : 'Open Sans', sansSerif;
	fontWeight      : 100;
	color            : #4b5055;
	textRendering   : optimizeLegibility;
}
.admin : {
	nav : {
		background-color : @red;
		'.navItem' : {
			background-color : @red;
		}
		.homebreweryLogo{
			font-family : CodeBold;
			font-size   : 12px;
			color       : white;
			div{
				margin-top    : 2px;
				margin-bottom : -2px;
			}
		}
	}

	*/


;(function(){
	var reduce = function(obj, fn, memo){
		for(var propName in obj){
			if(obj.hasOwnProperty(propName)){ memo = fn(memo, obj[propName], propName); }
		}
		return memo;
	};

	//Converts camel case into dashes. marginTop -> margin-top
	var dashCase = function(str){
		return str.replace(/([A-Z])/g, function (m, w) {
			return '-'+w.toLowerCase();
		});
	}
	//Clones the array, pushes to it, and returns it
	var clonePush = function(arr, val){
		var temp = arr.slice(0);
		temp.push(val);
		return temp;
	}
	var isArray = function(obj){return Object.prototype.toString.call(obj) === '[object Array]';};

	//Creates and injects a stylesheet with the given code
	var makeSheet = function(cssCode) {
		var el = document.createElement("style");
		el.type = "text/css";
		if(el.styleSheet){el.styleSheet.cssText = cssCode;}
		else{el.appendChild(document.createTextNode(cssCode));}
		document.getElementsByTagName("head")[0].appendChild(el);
		return el;
	};

	css = function(json){
		var rules = [];
		var processContents = function(scope, contents){
			return reduce(contents, function(result, val, rule){
				if(css.plugins[rule]){
					return result + processContents(scope, css.plugins[rule](val));
				}
				if(isArray(contents)){
					return result + processContents(scope, val);
				}
				if(typeof val === 'function'){val = val();}
				if(typeof val === 'object' || isArray(val)){
					addRule(clonePush(scope, rule), val);
				}
				if(typeof val === 'string'){
					return result + css.space + dashCase(rule) + ': ' + val + ';\n';
				}
				return result;
			}, '');
		};

		var addRule = function(scope, contents){
			rules.unshift(scope.join(' ')
				.replace(' :',':')
				.replace(' &','')
				+ '{\n' +
				processContents(scope, contents)
				 + '}\n');
		};

		for(var def in json){
			addRule([def], json[def]);
		}
		return rules.join('');
	};

	//Converts a string of css into a json object
	css.toJSON = function(cssString){
		var result = {};
		var convertCode = function(code){
			var r = {};
			code = code.split(';')
			for(var i in code){
				if(code[i].indexOf(':') !== -1){
					var parts = code[i].split(':');
					r[parts[0].trim()] = parts[1].trim();
				}
			}
			return r;
		};
		var rules = cssString.split('}');
		for(var i = 0; i< rules.length; i++){
			var parts = rules[i].split('{');
			if(parts[0].trim() !== ""){
				result[parts[0].trim()] = convertCode(parts[1]);
			}
		}
		return result;
	};

	css.space   = '\t';
	css.plugins = {};
	css.render = function(json){
		return makeSheet(css(json));
	};
})();

