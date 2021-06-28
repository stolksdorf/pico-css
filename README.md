# 🎨 pico-css
A micro css preprocessor written in JS for JS. Under 100 lines. Supports nesting, mixins, parent selectors, and injectable values.


### install

```bash
npm install pico-css
```

```js
const css = require('pico-css');
const {lighten} = require('pico-css/chroma.js');

const btn = (color)=>{
  return css`
    cursor : pointer;
    background-color: ${color};
    &:hover{
      background-color: ${lighten(color, 0.2)};
    }
  `
}

css`
  body{
    margin-top : 20px;
    button{
      font-size : 2em;
      ${btn('#dabb1e')}
    }
  }
`;

// Converts to
`body{
  margin-top: 20px;
}
body button{
  font-size: 2em;
  cursor: pointer;
  background-color: #dabb1e;
}
body button:hover{
  background-color: #e1c84b;
}
`
```


## why?
CSS preprocessors, like Less and Sass, are very powerful, but require you to learn a new sub-language and any business logic would need to be duplicated between rendering and styling.

They also provide _way more features_ then is typically needed, and can lead to weird footguns. `pico-css` is just a simple lib for convert nested css into valid css while leveraging JS for variables and logic.



## features
`pico-css` comes with most of the useful features of css pre-processor with none of the bloat.

#### nesting
You can nest rules within rules

```js
css({
  body : {
    p: { color : 'black' }
  }
})

`body p {
  color : black;
}`

```

#### parent selectors
The `&` operator represents the parent selectors of a nested rule and is most commonly used when applying a modifying class or pseudo-class to an existing selector.

```js
css({
  p : {
    '&:hover': { color : 'blue' },
    '&.selected' : { color : 'red'}
  }
})

`p:hover{
  color : blue;
}
p.selected{
  color : red;
}`
```

#### mixins (aka no-root selector)

You can pass just rules to the parser and it will process them. This allows you to build `mixins` which can be used to copy repeated css, or create functions that return chunks of css.


```js

const btn = (color)=>{
  return css`
    cursor : pointer;
    background-color: ${color};
    &:hover{
      background-color: ${lighten(color, 0.2)};
    }
  `
}

css`
  body{
    margin-top : 20px;
    button{
      font-size : 2em;
      ${btn('#dabb1e')}
    }
  }
`;
```





#### variables & functions & mixins
Since this is just javascript, you get variables, functions, and mixins for free without learning a new syntax.

```js
const css = require('pico-css');
const chroma = require('pico-css/chroma');


const coloredButton = (color='red')=>{
  return {
    border : 'none',
    backgroundColor : color,
    '&:hover':{
      backgroundColor : chroma.lighten(color, 0.2)
    }
  }
}

css({
  button : {
    ...coloredButton('#C0FF33'),
    color : 'white'
  }
})

`button{
  border : none;
  background-color: #C0FF33;
  color : white;
}
button:hover{
  background-color: ;
}`
```



## api

#### `css(styleObj, [indent='\t']) -> CSS String`
Converts a style object into a string of CSS. Uses `css.parse()` and `css.render()`.

```js
const css = require('pico-css');

css({
  body: {
    "margin-left": "20px",
    marginTop: "20px",
    p: {
      color: "#BADA55",
      '&:hover' : {
        color: "#C0FF33",
      }
    }
  }
});

`"body{
  margin-left: 20px;
  margin-top: 20px;
}
body p{
  color: #BADA55;
}
body p:hover{
  color: #C0FF33;
}"`
```


#### `css.parse(styleObj) -> CSS Object`
Converts a style object into a flattened CSS-like object with formatted values and key names.

```js
const css = require('pico-css');

css.parse({
  body: {
    "margin-left": "20px",
    marginTop: "20px",
    p: {
      color: "#BADA55",
      '&:hover' : {
        color: "#C0FF33",
      }
    }
  }
});

{
  'body' : {
    'margin-left': '20px',
    'margin-top': '20px',
    'width': '100%'
  },
  'body p': {
    'color': '#BADA55'
  },
  'body p:hover': {
    'color': '#C0FF33'
  }
}
```

#### `css.render(cssObj, [indent='\t']) -> CSS String`
Takes a flattened CSS-like object and returns a string of CSS.

```js
const css = require('pico-css');

css.render({
  'body' : {
    'margin-left': '20px',
    'margin-top': '20px',
    'width': '100%'
  },
  'body p': {
    'color': '#BADA55'
  },
  'body p:hover': {
    'color': '#C0FF33'
  }
});

`"body{
  margin-left: 20px;
  margin-top: 20px;
}
body p{
  color: #BADA55;
}
body p:hover{
  color: #C0FF33;
}"`
```


#### `css.inject(styleObj, [elementId])`
Converts the `styleObj` into a css string and injects it into a `<style>` tag and appends it to the document head. If a `elementId` is provided, it will attempt to update a single `<style>` with new changes on multiple calls.

## Color Utils
`pico-css` also ships with a simple set of color utilities that most CSS pre-processors have. Since `pico-css` is just JSON, these are utils are just javascript functions that can be easily used within your style objects.

If you need a bit more features check out [`color`](https://github.com/Qix-/color) for more features.



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
