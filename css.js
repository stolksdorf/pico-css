const kebobCase = (string)=>string.replace(/([A-Z])/g, '-$1').toLowerCase();
const map = (obj, fn)=>Object.keys(obj).map((key)=>fn(obj[key], key));
const processKey = (key, prefix)=>`${prefix} ${key}`.trim().replace(' &', '').replace(' :', ':');

const css = {
	convert : (styleObj)=>css.render(css.parse(styleObj)),
	parse   : (styleObj)=>{
		const res = {};
		const subParse = (field, nextKey = '', prefix = '')=>{
			if(Array.isArray(field)){
				return field.map((subfield)=>subParse(subfield, nextKey, prefix));
			}
			if(typeof field == 'object'){
				return map(field, (val, key)=>subParse(val, key, processKey(nextKey, prefix)));
			}
			res[prefix] = res[prefix] || {};
			return res[prefix][kebobCase(nextKey)] = field;
		};
		subParse(styleObj);
		return res;
	},
	render : (cssObj)=>{
		return map(cssObj, (rules, selector)=>{
			const renderedRules = map(rules, (rule, name)=>`\t${name}: ${rule};\n`).join('');
			return `${selector}{\n${renderedRules}}\n`;
		}).join('');
	},
	inject : (styleId, styleObj)=>{
		if(typeof styleId !== 'string'){
			styleObj = styleId;
			styleId = false;
		}
		if(styleId && document.getElementById(styleId)){
			return document.getElementById(styleId).innerHTML = css.convert(styleObj);
		}
		const style = document.createElement('style');
		if(styleId) style.setAttribute('id', styleId);
		style.innerHTML = css.convert(styleObj);
		document.head.appendChild(style);
	},

	cache : [],
	add   : (styleObj)=>{
		const res = css.parse(styleObj);
		css.cache.push(res);
		return res;
	},
	compile : ()=>{
		const res = css.cache.map(css.render).join('\n');
		css.cache = [];
		return res;
	},
};

module.exports = css;