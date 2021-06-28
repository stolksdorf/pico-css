const css = require('../pico-css.js');
const chroma = require('../chroma.js');


module.exports = {
	basic : require('./basic.test.js'),
	literal : require('./string_literal.test.js'),
	chroma : require('./chroma.test.js'),

	$temp : (t)=>{
		const btn = (color)=>{
		  return css`
		    cursor : pointer;
		    background-color: ${color};
		    &:hover{
		      background-color: ${chroma.lighten(color, 0.2)};
		    }
		  `
		}

		const btnColor = '#bada55';
		console.log(css`
		  body{
		    margin-top : 20px;
		    button{
		    	font-size : 2em;
		      ${btn('#dabb1e')}
		    }
		  }
		`)
	}
}