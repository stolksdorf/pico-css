
// convert string hexcode into rbga
// can add a 4th set of hex codes for alpha channel

// const parse = (str)=>{
// 	const res = (str.length < 5
// 		? /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?/
// 		: /#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?/).exec(str)

// 	console.log(res)

// }

const per = (amt)=>amt>1?amt/100:amt;
const css_colors = {maroon:'#800000',red:'#FF0000',orange:'#FFA500',yellow:'#FFFF00',olive:'#808000',green:'#008000',purple:'#800080',fuchsia:'#FF00FF',lime:'#00FF00',teal:'#008080',aqua:'#00FFFF',blue:'#0000FF',navy:'#000080',black:'#000000',gray:'#808080',silver:'#C0C0C0',white:'#FFFFFF'};
const parse = (str)=>{
	if(typeof str == 'object') return str;
	if(css_colors[str]) return parse(css_colors[str]);
	if(str.length < 5) str = '#'+str[1]+str[1]+str[2]+str[2]+str[3]+str[3];
	const [r,g,b] = str.replace('#','').match(/..?/g).map(x=>parseInt(x,16));
	return {r,g,b,a:1};
};
const toHex =  ({r,g,b,a=1})=>{
	const con = (val)=>Math.floor(val).toString(16).padStart(2, '0').toLowerCase();
	return '#'+con(r)+con(g)+con(b)+(a!=1?con(a*255):'');
};
const lighten = (color,amt)=>{
	let {r,g,b,a} = parse(color);
	const l=(clr)=>clr+(255-clr)*(per(amt));
	return toHex({r:l(r),g:l(g),b:l(b),a});
};
const darken = (color,amt)=>{
	let {r,g,b,a} = parse(color);
	const d=(clr)=>clr-(clr)*(per(amt));
	return toHex({r:d(r),g:d(g),b:d(b),a});
};
const fade = (color, amt)=>{
	let temp = parse(color);
	temp.a=per(amt);
	return toHex(temp);
};



// console.log(toHex(parse('#3cdb84')));
// console.log(fade('#333', 99))

console.log(fade('yellow', 0.5))




// module.exports = {

// 	fade,
// 	darken,
// 	lighten,
// }