const picocss = require('../pico-css.js');

const css = (input, ...vals)=>{
	return picocss.parse(picocss.tag(input, vals))
};

module.exports = {

	_foo : ()=>{

		const res = css`h1.splotch-light, h2.splotch-light, h3.splotch-light, h1.splotch, h2.splotch, h3.splotch{
			position : relative;
			z-index : 100;
			background-repeat : no-repeat;
			background-size: contain;
			background-position: center;
			display: inline-block;

			@media only screen and (max-width: 600px) {
				background: none;

			}
		}`;

		console.log(picocss.toString(res))

	}

}