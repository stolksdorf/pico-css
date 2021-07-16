const css = require('../pico-css.js');

module.exports = {
	nesting : (t)=>{
		const parsed = css.flatten(css.parse(`
			p{
				color : blue;
				.test{
					display : block;
				}
			}
		`));

		console.log(parsed)

		t.is(parsed.p.color, 'blue');
		t.is(parsed['p .test'].display, 'block');
	},
	'& Symbols' : (t)=>{

		const parsed = css.flatten(css.parse(`
			p {
				color : blue;
				&.test{
					display : block;
					&:hover{
						color : red;
					}
				}
			}
		`))

		t.is(parsed.p.color, 'blue');
		t.is(parsed['p.test'].display, 'block');
		t.is(parsed['p.test:hover'].color, 'red');
	},
	'> Symbols' : (t)=>{

		const parsed = css.flatten(css.parse(`
			p{
				color : blue;
				&>.test{
					display : block;
					&:hover{
						color : red;
					}
				}
			}
		`))

		t.is(parsed.p.color, 'blue');
		t.is(parsed['p>.test'].display, 'block');
		t.is(parsed['p>.test:hover'].color, 'red');
	},

	'kebob case' : (t)=>{
		const parsed = css.flatten(css.parse(`
			p{
				marginRight : 40px;
				doesNotExist : foo;
				WebkitTransition: all 4s ease;
				.TestClass{
					foo : bar;
				}
			}
		`));

		t.is(parsed.p['margin-right'], '40px');
		t.is(parsed.p['does-not-exist'], 'foo');
		t.is(parsed.p['-webkit-transition'], 'all 4s ease');

		//Does not kebob class names
		t.is(parsed['p .TestClass'].foo, 'bar');
	},


	mixins : (t)=>{
		const button = (color='green')=>{
			return css`
				display : block;
				cursor : pointer;
				&:hover{
					background-color : ${color};
				}
			`;
		}

		const parsed = css.flatten(css.parse(`
			p{
				display : relative;
				margin-right : 40px;
				${button('purple')};
			}
		`))

		t.is(parsed, {
			p: {
				display: 'block',
				'margin-right': '40px',
				cursor: 'pointer'
			},
			'p:hover': {
				'background-color': 'purple'
			}
		})
	}
};