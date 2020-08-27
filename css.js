const kebobCase = (string)=>string.replace(/([A-Z])/g, '-$1').toLowerCase();
const map = (obj, fn)=>Object.keys(obj).map((key)=>fn(obj[key], key));
const processKey = (key, prefix)=>`${prefix} ${key}`.trim().replace(' &', '').replace(' :', ':');

const css = {
	parse   : (styleObj)=>{
		let result = {};
		const subParse = (field, nextKey='', prefix='')=>{
			if(typeof field == 'object'){
				return map(field, (val, key)=>subParse(val, key, processKey(nextKey, prefix)));
			}
			result[prefix] = result[prefix] || {};
			return result[prefix][kebobCase(nextKey)] = field;
		};
		subParse(styleObj);
		return result;
	},
	render : (cssObj, indent='\t')=>{
		return map(cssObj, (rules, selector)=>{
			const renderedRules = map(rules, (rule, name)=>`${indent}${name}: ${rule};\n`).join('');
			return `${selector}{\n${renderedRules}}\n`;
		}).join('');
	}
};

let cache = [];
const utils = {
	inject : (styleObj, styleId=false)=>{
		if(styleId && document.getElementById(styleId)){
			return document.getElementById(styleId).innerHTML = css.convert(styleObj);
		}
		const style = document.createElement('style');
		if(styleId) style.setAttribute('id', styleId);
		style.innerHTML = css.convert(styleObj);
		document.head.appendChild(style);
	},
	add : (styleObj)=>{
		const res = css.parse(styleObj);
		cache.push(res);
		return res;
	},
	compile : ()=>{
		const res = cache.map(css.render).join('\n');
		cache = [];
		return res;
	},
};

module.exports = Object.assign(
	(styleObj, indent)=>css.render(css.parse(styleObj), indent),
	css, utils
)