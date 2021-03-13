const kebobCase = (string)=>string.replace(/([A-Z])/g, '-$1').toLowerCase();
const processKey = (key, prefix)=>`${prefix} ${key}`.trim().replace(' &', '').replace(' :', ':');
const isObj = (obj)=>!!obj && (typeof obj == 'object' && obj.constructor == Object);
const undef = (obj)=>typeof obj === 'undefined';
const put = (obj, keys, val)=>{
	const key = keys.shift();
	if(!isObj(obj[key])) obj[key] = {};
	(keys.length == 0) ? obj[key] = val : put(obj[key], keys, val);
	return obj;
};
const weave = (...arrs)=>{
	return arrs[0].reduce((acc,_,idx)=>{ arrs.map(arr=>{ if(!undef(arr[idx])) acc.push(arr[idx]) }); return acc; }, []);
};
const picoparse = (rules, text)=>{
	let remaining = text, result = [];
	while(remaining.length > 0){
		let match = rules.reduce((best, [rgx, fn])=>{
			let match = rgx.exec(remaining);
			if(!match) return best;
			if(!best || match.index < best.index){ match.func = fn; return match; }
			return best;
		}, false);
		if(!match) break;
		const [matchedText, ...groups] = match;
		result.push(match.func(groups, matchedText, remaining.substring(0,match.index)));
		remaining = remaining.substring(match.index + matchedText.length);
	}
	return result;
};

const convert = (styleObj, indent='\t')=>{
	let result = {};
	const subParse = (field, nextKey='', prefix='')=>{
		if(typeof field == 'object'){
			return Object.entries(field).map(([key, val])=>subParse(val, key, processKey(nextKey, prefix)));
		}
		result[prefix] = result[prefix] || {};
		return result[prefix][kebobCase(nextKey)] = field;
	};
	subParse(styleObj);
	return Object.entries(result).map(([selector, rules])=>{
		const renderedRules = Object.entries(rules).map(([name, rule])=>`${indent}${name}: ${rule};\n`).join('');
		return `${selector}{\n${renderedRules}}\n`;
	}).join('');
};
const inject = (cssString, elementId=false)=>{
	if(elementId && document.getElementById(elementId)) return document.getElementById(elementId).innerHTML = cssString;
	const style = document.createElement('style');
	if(elementId) style.setAttribute('id', elementId);
	style.innerHTML = cssString;
	document.head.appendChild(style);
};
const css = (strs, ...vals)=>{
	let str = Array.isArray(strs) ? weave(strs, vals).join('') : strs;
	let keys = [], result = {}, inComment=false;
	picoparse([
		[/\/\*/,                     ()=>inComment=true],
		[/\*\//,                     ()=>inComment=false],
		[/\/\/.*/,                   ()=>null],
		[/([\w:\.&-]+)\s*{/,         ([selector])=>{if(!inComment){keys.push(selector)}}],
		[/([\w+-]+)\s*:\s*([^;]+);/, ([key, val])=>{if(!inComment){result = put(result, keys.concat(key), val)}}],
		[/}/,                        ()=>{if(!inComment){keys.pop()}}],
	], str)
	return convert(result);
};

module.exports = {
	convert,
	css,
	inject
}