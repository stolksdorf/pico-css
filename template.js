
const css = require('./css.js');

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



module.exports = (strs, ...vals)=>{
	let str = strs;
	if(Array.isArray(strs)) str = weave(strs, vals).join('');
	let keys = [];
	let result = {};

	parse([
		[/\/\*/,                     ()=>['comment_start']],
		[/\*\//,                     ()=>['comment_end']],
		[/\/\/.*/,                   ()=>['comment']],
		[/([\w:\.&-]+)\s*{/,         ([selector])=>keys.push(selector)],
		[/([\w+-]+)\s*:\s*([^;]+);/, ([key, val])=>{result = put(result, keys.concat(key), val)}],
		[/}/,                        ()=>keys.pop()],
	], str)

	return css(result);
};

const getCSSTokens = (cssString)=>{
	return parse([
		[/\/\*/, ()=>['comment_start']],
		[/\*\//, ()=>['comment_end']],
		[/\/\/.*/, ()=>['comment']],
		[/([\w:\.&-]+)\s*{/, ([selector])=>['sel_start', selector]],
		[/([\w+-]+)\s*:\s*([^;]+);/, ([key, val])=>['rule', key, val]],
		[/}/, ()=>['sel_end']],
	], cssString);
}