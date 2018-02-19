const htmlTags = require('./html.tags.js');

const kebobCase = (string) => string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();


const shallowMerge = (...objs)=>{
	//Merge objects one layer deep
};

const processKey = (key, prefix)=>{
	if(key /* && opts.convertToClass */){
		//TODO: Look up the naming convention for selectors
		if(/[a-zA-Z0-9]/.test(key[0]) && !htmlTags.includes(key)) key = `.${key}`;
	}
	return `${prefix} ${key}`.trim().replace(' &', '').replace(' :', ':')
}

let cache = [];


const css = module.exports = {

	add : (obj)=>{
		//console.log(module.parent);
		cache.push(css.render(css.parse(obj)));
		return obj;
	},
	convert : (styleObj)=>css.render(css.parse(obj)),

	parse : (styleObj)=>{
		let res = {};
		const subParse = (field, nextKey='', prefix='')=>{
			if(Array.isArray(field)){
				return field.map((subfield)=>subParse(subfield, nextKey, prefix))
			}
			if(typeof field == 'object'){
				return Object.keys(field).map((key)=>subParse(field[key], key, processKey(nextKey, prefix)));
			}
			res[prefix] = res[prefix] || {};
			return res[prefix][kebobCase(nextKey)] = field;
		};
		subParse(styleObj);
		return res;
	},
	// Add opt to clear cache when printing from cache
	render : (obj, minify=false)=>{
		return Object.keys(obj).map((selector)=>{
			const rules = obj[selector];
			const renderedRules = Object.keys(rules).map((rule)=>{
				return minify
					? `${rule}:${rules[rule]};`
					: `\t${rule}: ${rules[rule]};\n`
			}).join('');
			return minify
				? `${selector}{${renderedRules}}`
				: `${selector}{\n${renderedRules}}\n`
		}).join('');
	}
};
