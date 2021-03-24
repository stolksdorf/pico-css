const css = require('../css.js');
const colors = require('../colors.js');


module.exports = {
	basic : require('./basic.test.js'),
	colors : require('./colors.test.js'),

	literal : require('./string_literal.test.js'),




	complex_example : (t)=>{
		const buttonMixin = (color='blue')=>{
			return {
				cursor : 'pointer',
				backgroundColor : color,
				'&:hover' : {
					backgroundColor : colors.lighten(color, 0.2)
				}
			}
		}

		const str = css({
			body: {
				"margin-left": "20px",
				marginTop: "20px",
				width: "100%",
				button: {
					WebkitTransition: 'all 4s ease',
					...buttonMixin("#BADA55")
				}
			}
		}, '  ');

		t.is(str,
`body{
  margin-left: 20px;
  margin-top: 20px;
  width: 100%;
}
body button{
  -webkit-transition: all 4s ease;
  cursor: pointer;
  background-color: #BADA55;
}
body button:hover{
  background-color: #EDFF88;
}
`)},

}