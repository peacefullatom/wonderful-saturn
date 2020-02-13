---
title: Mini-map
date: '2019-12-30T22:33:51.824Z'
excerpt: >-
  I always wanted to build a  solution that looks like a mini-map.  So, I
  created such a solution to...
thumb_img_path: >-
  https://res.cloudinary.com/practicaldev/image/fetch/s--w7sDYtH8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--Ta2b5TjQ--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/v462c0h024zuydpo4m7m.png
comments_count: 0
positive_reactions_count: 7
tags:
  - css
canonical_url: 'https://scipios.netlify.com/posts/mini-map-29o9/'
template: post
---
<a href="https://www.buymeacoffee.com/peacefullatom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

I always wanted to build a  solution that looks like a [mini-map](https://en.wikipedia.org/wiki/Mini-map# Code_Minimap_in_Text_editors_and_IDEs).

So, I created such a solution to generate a cover image for this post:


<iframe class="liquidTag" src="https://dev.to/embed/post?args=peacefullatom%2Fwhy-use-typescript-4nej" style="border: 0; width: 100%;"></iframe>


The idea behind this approach is to show not an actual code, but something that resembles a code.

# Description

## Lines

The basic representation is a line. The number of lines is defined by CSS.

## Indents

A mini-map should have indents. I know only several languages that can avoid indents and yet maintain readability. As an example, I wish to mention [Assembler](https://en.wikipedia.org/wiki/Assembly_language).

## Blocks

Also, a mini-map should have several types of blocks: _comment_, _keyword_, _error_, _warning_, _function_, _expression_, _text_, _regexp_.

Each of the blocks must have a respective color, usage frequency, and random non-zero length.

The number of blocks and their lengths are defined by JavaScript because there is no way to generate random values in CSS.

# Solution

## HTML

The layout is simple. We only define a container for future mini-map.


```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Mini-map</title>
</head>

<body>
  <div id="container"></div>
</body>

</html>
```


## CSS

### Globals

First of all, let's define the anchor values: number of lines, width, height, and size.

> The _size_ variable is used to define the margin and maximum width of the line.

The width equals 90 percent of the minimum visible area.

The height is calculated from proportion 16:9 to the width.

> [You can read about the CSS measuring units here](https://developer.mozilla.org/docs/Web/CSS/length).

Lastly, the size variable is calculated from the number of lines and the height of the container.


```css
:root {
  --lines: 40;
  --width: 90vmin;
  --height: calc(var(--width) / 16 * 9);
  --size: calc(var(--height) / calc(var(--lines) * 2 - 1));
}
```

### Body

The body of the page is set to take all of the space available and to center contents.

### Container

The container is set to the calculated width and height. Also, it leverages a display flex CSS property to distribute lines evenly to the height of the container.


```css
# container {
  outline: 1px solid white;
  width: var(--width);
  height: var(--height);
  position: relative;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
}
```


### Line

The width is calculated by subtraction of the double size variable value. And its position is centered.


```css
.line {
  height: var(--size);
  width: calc(var(--width) - calc(var(--size) * 2));
  margin: 0 auto;
  display: flex;
}
```


### Word and indent

The height and the left margin of the word/indent block are set to the size variable value. The background defaults to transparent.


```css
.indent,
.word {
  height: var(--size);
  margin-left: var(--size);
  background: transparent;
}
```


### Respective blocks

Now it is time to define colors for the mentioned above list of blocks: comment, keyword, error, warning, function, expression, text, regexp.

Here is an example:


```css
.word.keyword {
  background: # c586c0;
}
```


### Palette

In this example, I used a ready palette from Visual Studio Code.

To generate the color theme from current settings press F1 and start to type: generate color theme...

As a result, you will have a file with all of the color settings you are using at the moment. I also took a background-color for this solution.


```css
html,
body {
  background: # 252526;
}
```


### Cover

If you want to add a label, there is a cover element as well.

The cover consists of two elements: div and pseudo-element before.

The div element is used to blur the contents of the container with the backdrop-filter CSS rule. And has an absolute position with the width and height of the parent.


```css
.cover {
  position: absolute;
  width: var(--width);
  height: var(--height);
  background-color: # 25252688;
  backdrop-filter: blur(1px);
}
```


The pseudo-element before contains a label and different settings: position, font size, color, etc.

Worth to notice the usage of the text-shadow CSS rule to create a volumetric effect.


```css
.cover:before {
  --font: calc(var(--height) / 5);
  position: absolute;
  content: "[DEV]";
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: var(--font);
  line-height: var(--font);
  margin-top: var(--font);
  margin-left: var(--font);
  color: # fff;
  text-shadow: 0px 1px 0px # 999, 0px 2px 0px # 888, 0px 3px 0px # 777,
    0px 4px 0px # 666, 0px 5px 0px # 555, 0px 6px 0px # 444, 0px 7px 0px # 333,
    0px 8px 7px # 001135;
  letter-spacing: 3px;
}
```


## JavaScript

### Globals

Let's define the set of types of blocks.

Blocks are divided by usage frequency. So, let's define the most common types: keyword, function, and expression.

Next, we will three times add this set to the less frequently used blocks: comment, regexp, error, warning, and text.

Lastly, we will randomly sort the final array to get more interesting results.


```js
// defining common types
const commonTypes = ["keyword", "function", "expression"];
// defining final types set
const types = ["comment", "regexp", "error", "warning", "text"]
  .concat(commonTypes, commonTypes, commonTypes)
  .sort(() => (Math.random() > 0.5 ? -1 : 1));
```


Now, let's define the maximum depth of indents.


```js
const maxIndent = 10;
```


### Helper function

To control the depth of the indent we are using a small helper function.

It takes a current indent value as input and tries to mutate it via random number generator.
Depending on the random value there are three options available:
- < 0.333 - increment the indent.
- \> 0.666 - decrement the indent.
- Don't mutate the indent value.


```js
/**
 * randomly mutate indent value
 * @param {number} indent current indent value
 * @returns {number}
 */
function updateIndent(indent) {
  var mutator = Math.random();
  if (mutator < 0.333) {
    indent++;
    if (indent > maxIndent) {
      indent = maxIndent;
    }
  } else if (mutator > 0.666) {
    indent--;
    if (indent < 0) {
      indent = 0;
    }
  }
  return indent;
}
```


### Generating lines

Ok. Let's extract the number of lines from the CSS and declare the initial indent.


```js
// getting the number of lines from CSS
const computedStyle = getComputedStyle(document.body);
const lines = parseInt(computedStyle.getPropertyValue("--lines")) || 10;
// setting initial indent
var indent = 0;
```


After all of the initial values are set, let's iterate with old-good for loop and create lines and fill them with words.

The number of words is a positive integer from 1 to 16. Also, let's declare storage for the previous word type to utilize it later.


```js
// getting the number of words in a line (from 1 to 16)
const wordsCount = Math.floor(Math.random() * 15 + 1);
// container for colorization logic
var lastType = "";
```


The next part is a bit tricky. Here we will leverage the chaining options of the array operations to generate numbers within the given range.

Firstly, we will create a new array with a length equal to the number of words.

Next, let's fill it with 0 values.

After, we will define the length of the word in percent. Also, on this step, we will mutate the indent and subtract it from the word's length to avoid overflow.

Lastly, we will sort the values.

Let's wrap it up:


```js
// creating an initial set of words
const wordsList = new Array(wordsCount)
  .fill(0)
  .map((value, index) => {
    // calculating the width of the string (from 5 to 85)
    var width = Math.floor(Math.random() * 85);
    // if this is the first entry of an array, then update indent
    if (!index) {
      // updating an indent
      indent = updateIndent(indent);
      // if indent is greater than zero, then appending indents
      if (indent) {
        for (var k = 0; k < indent; k++) {
          var placeholder = document.createElement("div");
          placeholder.className = "indent";
          line.appendChild(placeholder);
        }
      }
    }
    // subtracting indent from the line width
    return width - indent;
  })
  .sort((a, b) => a - b);
```


Now, a bit more effort!

We need to get rid of duplicates. Calculate the new type of block and save the resulting type for the next iteration. And to set the width of the word.

> [By creating an array from the Set we automatically removing all of the duplicates in the array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/).


```js
// removing duplicates and building words from the list
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[...new Set(wordsList)].forEach((value, index, array) => {
  const word = document.createElement("div");
  var type = "";
  // this demo supports only one line comments, so if the previous value was "comment" it will propagate till the end of the line :)
  if (lastType === "comment") {
    type = "comment"
  } else {
    type = types[Math.floor(Math.random() * types.length)];
  }
  // storing the last type value
  lastType = type;
  // generate a class name for the word
  word.className = ["word", type].join(" ");
  // applying width
  word.style.width = `
${index ? value - array[index - 1] : value}%
`;
  line.appendChild(word);
});
```


# Codepen

I have attached a Codepen to tinker with params and overview the code. Happy hacking!


<iframe class="liquidTag" src="https://dev.to/embed/codepen?args=https%3A%2F%2Fcodepen.io%2Fpeacefullatom%2Fpen%2FJjoyWNy" style="border: 0; width: 100%;"></iframe>


# Conclusion

With this simple solution, one can generate a wide set of mini-maps.

You can also play with indents, color palette, number of words per line, etc.

The only con of this solution is that it doesn't track changes in the CSS. Thus, you have to reload an entire page to see the effect of changing the number of lines in CSS.

*[This post is also available on DEV.](https://dev.to/peacefullatom/mini-map-29o9)*


<script>
const parent = document.getElementsByTagName('head')[0];
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.1.1/iframeResizer.min.js';
script.charset = 'utf-8';
script.onload = function() {
    window.iFrameResize({}, '.liquidTag');
};
parent.appendChild(script);
</script>    
