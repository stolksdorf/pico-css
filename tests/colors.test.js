const colors = require('../colors.js')

module.exports = {

	isHex : (t)=>{
		t.ok(colors.isHex('#aaa'))
		t.ok(colors.isHex('#FFFF00'))


		t.no(colors.isHex('#aaz'))
		t.no(colors.isHex('goop'))
	},

	getHex : (t)=>{
		t.is(colors.getHex('#aaa'), '#aaa')
		t.is(colors.getHex({r : 8, b : 64, g : 127}), '#087F40')
		t.is(colors.getHex('blue'), '#0000FF');

		t.no(colors.getHex('peanut_butter'));
	},

	hex2rgb : (t)=>{
		t.is(colors.hex2rgb('#101010'), {r:16,g:16,b:16});
		t.is(colors.hex2rgb('#FFFFFF'), {r:255,g:255,b:255});
		t.is(colors.hex2rgb('#aaa'), {r:10,g:10,b:10});
		t.is(colors.hex2rgb('#goop'), null);
	},

	lighten : (t)=>{

		t.is(colors.lighten('blue', 0), '#0000FF');
		t.is(colors.lighten('blue', 0.5), '#7F7FFF');
		t.is(colors.lighten('blue', 1), '#FFFFFF');
	},


	darken : (t)=>{
		t.is(colors.darken('blue', 0), '#0000FF');
		t.is(colors.darken('blue', 0.5), '#00007F');
		t.is(colors.darken('blue', 1), '#000000');
	},

	isDark : (t)=>{
		t.ok(colors.isDark('maroon'));
		t.ok(colors.isDark('red'));
		t.ok(colors.isDark('olive'));
		t.ok(colors.isDark('green'));
		t.ok(colors.isDark('purple'));
		t.ok(colors.isDark('fuchsia'));
		t.ok(colors.isDark('teal'));
		t.ok(colors.isDark('blue'));
		t.ok(colors.isDark('navy'));
		t.ok(colors.isDark('black'));

		t.no(colors.isDark('orange'));
		t.no(colors.isDark('yellow'));
		t.no(colors.isDark('lime'));
		t.no(colors.isDark('aqua'));
		t.no(colors.isDark('gray'));
		t.no(colors.isDark('silver'));
		t.no(colors.isDark('white'));
	},

	isBright : (t)=>{
		t.no(colors.isBright('maroon'));
		t.no(colors.isBright('red'));
		t.no(colors.isBright('olive'));
		t.no(colors.isBright('green'));
		t.no(colors.isBright('purple'));
		t.no(colors.isBright('fuchsia'));
		t.no(colors.isBright('teal'));
		t.no(colors.isBright('blue'));
		t.no(colors.isBright('navy'));
		t.no(colors.isBright('black'));

		t.ok(colors.isBright('orange'));
		t.ok(colors.isBright('yellow'));
		t.ok(colors.isBright('lime'));
		t.ok(colors.isBright('aqua'));
		t.ok(colors.isBright('gray'));
		t.ok(colors.isBright('silver'));
		t.ok(colors.isBright('white'));

	},
	contrastRatio : (t)=>{

		t.is(colors.contrastRatio('white', 'white'), 1);
		t.is(colors.contrastRatio('white', 'silver'), 1.82);
		t.is(colors.contrastRatio('white', 'blue'), 8.59);
		t.is(colors.contrastRatio('white', 'black'), 21);
	}

}