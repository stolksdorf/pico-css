const css = require('../pico-css.js');
const chroma = require('../chroma.js');


module.exports = {
	basic : require('./basic.test.js'),
	literal : require('./string_literal.test.js'),
	chroma : require('./chroma.test.js'),
	//$errors : require('./errors.test.js'),

	// $temp : (t)=>{
	// 	chroma.fade('#f00', 0.5) // #ff00007f
	// 	chroma.lighten('#C0FFEE', 0.1) // #c6ffef
	// 	chroma.lighten('#C0FFEE', 0.4) // #d9fff4
	// 	chroma.darken('#C0FFEE', 0.1) // #ace5d6
	// 	chroma.darken('#C0FFEE', 0.4) // #73998e
	// 	chroma.luminance({r: 34, g: 120, b: 200}) // 0.40
	// 	chroma.luminance('#16a085') // 0.45
	// 	chroma.isBright('purple') // false
	// 	chroma.isBright('#bdc3c7') // true
	// 	chroma.isDark('maroon') // true
	// 	chroma.isDark('#f1c40f') // false
	// }
}