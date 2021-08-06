const picocss = require('../pico-css.js');

const css = (input, ...vals)=>{
	return picocss.parse(picocss.tag(input, vals))
};


module.exports = {

	single : (t)=>{
		const parsed = css`
			.test{
				color : blue;
				//background-color : blue;

				//div{
				//	color : red;
				//}
			}

		`;

		t.is(parsed.length, 1);
		t.is(parsed[0].sel, '.test');
		t.is(parsed[0].rules, {color : 'blue'});

	},

	multi : (t)=>{
		const parsed = css`
			.test{
				color : blue;
				/*background-color : blue;*/

				/*div{
					color : red;
				}*/
			}

		`;
		t.is(parsed.length, 1);
		t.is(parsed[0].sel, '.test');
		t.is(parsed[0].rules, {color : 'blue'});
	}
}