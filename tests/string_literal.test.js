const {css} = require('../pico-css.js');


module.exports = {


	basic : (t)=>{

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
	},

	complex : (t)=>{
		const res = css`
		*, *:before, *:after {
			box-sizing : inherit;
		}
		body, h1, h2, h3, h4, h5, h6, p, ol, ul {
			margin      : 0;
			padding     : 0;
			font-weight : normal;
			p{
				color : green;
			}
			&:hover{
				color : purple;
			}
		}


		`

		console.log('----------')
		console.log(res)

	}
}