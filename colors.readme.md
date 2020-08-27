

# Color Utils
`pico-css` also ships with a simple set of color utilities that most CSS pre-processors have. Since `pico-css` is just JSON, these are utils are just javascript functions that can be easily used within your style objects.

If you need a bit more features check out [`color`](https://github.com/Qix-/color) for more features.



#### `colors.isHex(value)`

Returns is the `value` is a valid hex color


#### `colors.getHex(value)`
Attempts to convert `value` into a valid hex color code from various types; rgb-object, a valid HTML color name, or an existing hex code. Will return `undefined` if it can not convert the `value`.


#### `colors.hex2rgb(hexCode)`
Converts a hex color code into a rgb-object.


#### `colors.rgb2hex(rgbObj)`
Converts a rgb-oject to a hex color code.

#### `lighten(value, amount)`
Lightens the given `value` by an amount from 0-1 (0 being no affect, 1 resulting in `#FFFFFF`). Uses `getHex` internally so you can pass various types as `value`

```js
t.is(colors.lighten('blue', 0), '#0000FF');
t.is(colors.lighten('blue', 0.5), '#7F7FFF');
t.is(colors.lighten('blue', 1), '#FFFFFF');
```


#### `darken(value, amount)`
Darkens the given `value` by an amount from 0-1 (0 being no affect, 1 resulting in `#000000`). Uses `getHex` internally so you can pass various types as `value`

```js
t.is(colors.darken('blue', 0), '#0000FF');
t.is(colors.darken('blue', 0.5), '#00007F');
t.is(colors.darken('blue', 1), '#000000');
```


#### `colors.isDark(color)/colors.isBright(color)`

Converts the `color` to [YIQ](https://www.wikiwand.com/en/YIQ) color space and returns if it's above or below `128` (dark vs. light)


#### `colors.luminace()`

```
isHex
getHex
hex2rgb
rgb2hex
lighten
darken
fade
isDark
isBright
luminanace
contrastRatio
```