const isObj = (obj)=>!!obj && (typeof obj == 'object' && obj.constructor == Object);
const undef = (obj)=>typeof obj === 'undefined';
const kebobCase = (string)=>string.replace(/([A-Z])/g, '-$1').toLowerCase();
const processKey = (key, prefix)=>{
	return prefix.split(',').map(pre=>`${pre.trim()} ${key}`.trim().replace(' &', '').replace(' :', ':')).join(', ');
};
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
	let remaining = text, result = [], skip=false, pos=0;
	while(remaining.length > 0){
		let match = rules.reduce((best, [rgx, fn])=>{
			let match = rgx.exec(remaining);
			if(!match) return best;
			if(!best || match.index < best.index){ match.func = fn; return match; }
			return best;
		}, false);
		if(!match) break;
		const [text, ...groups] = match;
		pos += match.index;
		const res = match.func(groups, {text, pos, pre:remaining.substring(0,match.index)})
		if(typeof res == 'boolean'){ skip = res; }
		else if(!skip && res){ result.push(res); }
		remaining = remaining.substring(match.index + text.length);
	}
	return result;
};
picoparse.loc = (text, pos)=>{
	const sel = text.substring(0,pos);
	return {
		line: sel.match('\n').length,
		col : sel.length - sel.lastIndexOf('\n')
	}
};

const flatten = (styleObj)=>{
	let result = {};
	const subFlatten = (field, nextKey='', prefix='')=>{
		if(nextKey.startsWith('@media')){
			return result[nextKey] = Object.assign(result[nextKey]||{}, flatten({[prefix]: field}));
		}
		if(typeof field == 'object'){
			return Object.entries(field).map(([key, val])=>subFlatten(val, key, processKey(nextKey, prefix)));
		}
		result[prefix] = result[prefix] || {};
		return result[prefix][kebobCase(nextKey)] = field;
	};
	subFlatten(styleObj)
	return result;
};

const obj2css = (styleObj, indent='')=>{
	return Object.entries(styleObj).map(([key, val])=>{
		if(isObj(val)){
			if(key==='') return obj2css(val, indent);
			return `${indent}${key}{\n${obj2css(val, indent+'\t')}\n${indent}}`;
		}else{
			return `${indent}${key}: ${val};`
		}
	}).join('\n');
};

const parse = (str)=>{
	let keys = [], styleObj = {};
	picoparse([
		[/\/\*/,                     ()=>true],
		[/\*\//,                     ()=>false],
		[/\/\/.*/,                   ()=>null],
		[/([\w@\.\(\):\-\s,&\*>]+){/,  ([selector])=>{keys.push(selector.trim())}],
		[/([\w+-]+)\s*:\s*([^;]+);/, ([key, val])=>{styleObj = put(styleObj, keys.concat(key), val)}],
		[/}/,                        ()=>{keys.pop()}],
	], str);
	return styleObj;
}

//Takes, object, string, or template tagged literal
const css = (input, ...vals)=>{
	if(Array.isArray(input)) input = weave(input, vals).join('');
	if(typeof input == 'string') input = parse(input);
	return obj2css(flatten(input));
}

css.parse = parse;
css.flatten = flatten;
css.obj2css = obj2css;
css.inject = (input, ...vals)=>document.head.insertAdjacentHTML('beforeend', `<style>${css(input, ...vals)}</style>`);

module.exports = css;