# pico-css
A micro css preprocessor written in JS for JS.

### why?
CSS preprocessors, like Less and Sass, are very powerful, but require you to basically learn a new sub-language and any business logic would need to be duplicated between rendering and styling.



## api

#### `.convert(styleObj)`
Converts a style object into a string of CSS. Uses `.parse()` and `.print()`.

#### `.parse(styleObj)`
Converts a style object into a flattened CSS-like object.

#### `.render(obj, [minify?])`
Takes a flattened CSS-like object and returns a string of CSS.


## Simple Example
Here's a basic example. Notice that you can either quote the rule if it has a dash in it, or you can just use camel casing.

```js
  var simpleCss = css({
    body: {
      marginTop: "20px",
      "margin-left": "20px",
      width: "100%"
    },
    header: {
      width: "100%"
    }
  });
```


## Nesting
One of the most useful parts of using CSS preprocessors is being able to nest rules together, giving a better flow to your file.

```js
  var nestingIsHandy = css({
    body: {
      marginTop: "20px",
      width: "100%",
      p: {
        color: "#BADA55"
      }
    }
  });
```

## Pseudo-classes
It also handles pseudo-classes!

```js
  var pseudoPseudoPseudo = css({
    body: {
      a: {
        color: "#FFF",
        ":hover": {
          textDecoration: "none"
        },
        ":after": {
          display: "block",
          content: '"---"'
        }
      }
    }
  });
```

## Functions
Since we're in Javascript let's leverage our ability to use some logic. CssJs automatically processes any functions it comes across. You can also declare variables and use those too. Plugins allow you to create your own custom CSS rules.

```js
  var themeColor = "#BADA55";
  var textStyles = function(size) {
    return {
      color      : themeColor,
      fontSize   : size + "px",
      lineHeight : size + "px"
    }
  }
  css.plugins.coolPadz = function(pad){
    return {
      paddingTop    : pad*0.6 + 'px',
      paddingBottom : pad*0.6 + 'px',
      paddingLeft   : pad + 'px',
      paddingRight  : pad + 'px',
    }
  }

  var suchPower = css({
    body: {
      color: themeColor,
      p: textStyles(16),
      '.title' : {
        color: "#000",
        coolPadz : 40
      }
    }
  })
```


## Color
Write up some awesomeness using this lib, https://github.com/harthur/color. Here we're automatically creating the coloring for a button.

```js
  css.plugins.buttonColor = function(btnColor){
    btnColor = Color(btnColor)
    return {
      backgroundColor : btnColor.hexString(),
      color : btnColor.luminosity() < 0.9 ? 'white' : 'black',
      border : "1px solid " + btnColor.darken(0.3).hexString(),
      cursor : 'pointer',
      ':hover' : {
        backgroundColor : btnColor.lighten(0.3).hexString()
      },
      '.pressed' : {
        backgroundColor : btnColor.darken(0.3).hexString()
      }
    }
  }

  var colorfulButton = css({
    '.loginBtn' : {
      marginRight : '10px',
      buttonColor: '#2ecc71'
    }
  })
```




# Customization
By default CssJs uses a tab to space out it's generated CSS, but by changing the `css.space` variable to can change it to whatever you like.

```js
  css.space = '  '; //just two spaces

  var customSpacing = css({
    body: {
      marginTop: "20px",
      "margin-left": "20px",
      width: "100%"
    },
    header: {
      width: "100%"
    }
  });
```

## Sheet Creation
A neat workflow using CssJs is to use the `css.render({...})` function while testing and developing to automatically generate you a style sheet and add it to your page. When you're happy with the results, simply use `css({...})` to generate the CSS string and save it to your own file for production. No need to preprocess all the time!

```js
  css.render({
    '#coolDiv' :{
      color : 'green'
    }
  });
```



  # Notes
  - Disable ability to cascade rules
  - Add function to add raw CSS to bundle
  - Adding dot prefix classes not filter by raw html elements
  -

  ### vitreum
  - Look into using require overrides