const {css} = require('../pico-css.js');


module.exports = {


	$basic : (t)=>{

		const res = css`
		.test{
			background-color : ${'red'}; //fooo
			margin-left : ${'30px'};

			.foo{ color : blue; }
		}

		//this is a test

/*
		button{
			color : red;
			&:hover{
				--web-kit-foo : "red";
			}
		}
*/
		`

		console.log(res)
	},

	direct : (t)=>{
		const res = css(`
			.test{
				background-color : ${'red'};
				margin-left : ${'30px'};
			}
		`)

		console.log(res)
	}
}