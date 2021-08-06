const picocss = require('../pico-css.js');

const css = (input, ...vals)=>{
	return picocss.parse(picocss.tag(input, vals));
};

//TODO: Fix the ordering of media queries
// Look into oredring in gernal

module.exports = {
	nesting : (t)=>{
		const parsed = css`
			p{
				color : blue;
				background-color: purple;
				--main-color : var(--yellow);
				.test{
					display : block;
				}
			}
		`;

		t.is(parsed.length, 2);
		t.is(parsed[0], {
			sel: 'p',
			media: undefined,
			rules: {
				color: 'blue',
				'background-color': 'purple',
				'--main-color': 'var(--yellow)'
			}
		});

		t.is(parsed[1], { sel: 'p .test', media: undefined, rules: { display: 'block' }});

	},
	'& Symbols' : (t)=>{

		const parsed = css`
			p {
				color : blue;
				&.test{
					display : block;
					&:hover{
						color : red;
					}
				}
			}
		`;

		t.is(parsed.length, 3);


		t.is(parsed[0], { sel: 'p', media: undefined, rules: { color: 'blue' } });
		t.is(parsed[1], { sel: 'p.test', media: undefined, rules: { display: 'block' } });
		t.is(parsed[2], { sel: 'p.test:hover', media: undefined, rules: { color: 'red' } })
	},
	'> Symbols' : (t)=>{

		const parsed = css`
			p{
				color : blue;
				&>.test{
					display : block;
					&:hover{
						color : red;
					}
				}
			}
		`

		t.is(parsed.length, 3);

		t.is(parsed[0], { sel: 'p', media: undefined, rules: { color: 'blue' } });
		t.is(parsed[1], { sel: 'p>.test', media: undefined, rules: { display: 'block' } });
		t.is(parsed[2], { sel: 'p>.test:hover', media: undefined, rules: { color: 'red' } });
	},

	'# Symbols' : (t)=>{

		const parsed = css`
			#this-is-an-id{
				color : blue;
				&.test{
					color : red;
					#foo{
						color : purple;
					}
				}
			}

			#a_second_id{
				color:green;
			}
		`;

		t.is(parsed.length, 4);

		t.is(parsed[0], { sel: '#this-is-an-id', media: undefined, rules: { color: 'blue' } });
		t.is(parsed[1], {
			sel: '#this-is-an-id.test',
			media: undefined,
			rules: { color: 'red' }
		});
		t.is(parsed[2], {
			sel: '#this-is-an-id.test #foo',
			media: undefined,
			rules: { color: 'purple' }
		});
		t.is(parsed[3], { sel: '#a_second_id', media: undefined, rules: { color: 'green' } });

	},

	media_queries : {

		external : (t)=>{
			const parsed = css`
				@media only screen and (max-width: 300px){
					.test{
						color: blue;
					}
				}

				.test{
					color : red;
				}
			`;

			t.is(parsed.length,2);
			t.is(parsed[0], {
				sel: '.test',
				media: '@media only screen and (max-width: 300px)',
				rules: { color: 'blue' }
			});
			t.is(parsed[1], { sel: '.test', media: undefined, rules: { color: 'red' } });
		},

		internal : (t)=>{
			const parsed = css`
				.test{
					@media only screen and (max-width: 300px){
						color: blue;
					}
					color:red;
				}
			`;

			t.is(parsed.length,2);

			t.is(parsed[0], {
				sel: '.test',
				media: '@media only screen and (max-width: 300px)',
				rules: { color: 'blue' }
			});
			t.is(parsed[1], { sel: '.test', media: undefined, rules: { color: 'red' } });
		},
		parsing : (t)=>{
			const parsed = css`

				div.content{
					aside {
						color : red;
						background-color: red;

						@media only screen{
							background-color: blue;

						}
					}
				}

				@media only screen{
					aside {
						color : blue;
					}
				}

				div.content{
					aside {
						color : purple;
					}
				}
			`;


			//console.log(parsed);

			//console.log(picocss.obj2css(parsed))
		},

		no_hoisting : (t)=>{
			const parsed = css`

				@media only screen{
					img{
						display : none;
					}
				}

				.test{
					color : blue;

					@media only screen{
						color : red;
					}
				}
			`;

			t.is(parsed.length, 3);

			t.is(parsed[0].sel, 'img');
			t.is(parsed[0].media, '@media only screen');
			t.is(parsed[0].rules, { display: 'none' });

			t.is(parsed[1].sel, '.test');
			t.is(parsed[1].media, undefined);
			t.is(parsed[1].rules, { color: 'blue' });


			t.is(parsed[2].sel, '.test');
			t.is(parsed[2].media, '@media only screen');
			t.is(parsed[2].rules, { color: 'red' });
		},




	}


};