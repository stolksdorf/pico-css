const picocss = require('../pico-css.js');

const css = (input, ...vals)=>{
	return picocss.parse(picocss.tag(input, vals))
};

module.exports = {


}