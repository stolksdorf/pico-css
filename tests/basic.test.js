const test = require('pico-check');
const css = require('../css.js');

const pad = (num = 25)=>{
	return { padding : num };
};

// const res = css.add({
// 	color : 'green',
// 	test : {
// 		marginRight : 40,
// 		test2 : {
// 			padding : 30,
// 			display : 'flex',
// 			':hover' : {
// 				color : 'red',
// 				button : {
// 					padding : 40
// 				}
// 			}
// 		}
// 	},
// 	test3 : [{
// 		marginRight : 50,
// 		yes : {
// 			color : 'blue',
// 			':hover' : pad(999)
// 		}
// 	}, pad()],
// 	yo : {
// 		color : 'red'
// 	}
// });

// console.log(res);

// console.log(css.render(css.parse(res)));

console.log(css.parse({  body : {
	'margin-left' : '20px',
	marginTop     : '20px',
	width         : '100%',
	p             : {
		color     : '#BADA55',
		'&:hover' : {
			color : '#C0FF33',
		},
	},
} }));


module.exports = test;