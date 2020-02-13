---
title: The 3D keyboard made with CSS and JavaScript
date: '2019-12-18T10:45:40.451Z'
excerpt: >-
  In this post, I'll share an example of creating the keyboard.  During creating
  the keyboard, we wil...
thumb_img_path: >-
  https://res.cloudinary.com/practicaldev/image/fetch/s--VXmtnlC9--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--dl6-tx-m--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/s859nno9iknxuvytxvna.png
comments_count: 5
positive_reactions_count: 104
tags:
  - css
  - 3D
  - javascript
canonical_url: >-
  https://scipios.netlify.com/posts/the-3d-keyboard-made-with-css-and-javascript-280/
template: post
---
<a href="https://www.buymeacoffee.com/peacefullatom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

In this post, I'll share an example of creating the keyboard.

During creating the keyboard, we will take a closer look at CSS variables, JSDoc notation, and a bit of JavaScript.

The CSS variables allow defining, modifying, and using values within the layout definition.

During the past several years, I'm using TypeScript daily, and it is hard for me to develop the code without the safety of the static types. But JSDoc can be used as a substitute. Though it is NOT a TYPE but rather a HINT, it is worth to try it in pure JavaScript projects.

Well and JavaScript is a JavaScript! So, let's start!

> [Demo files are available in this gist](https://gist.github.com/peacefullatom/19982c4637f778af9571b13f106a3e39).

# HTML

The layout is as simple as possible.

First of all, let's include CSS definitions (an excerpt):


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" type="text/css" href="keyboard.css" />
  </head>
</html>
```


Next, let's define the container and include the script (an excerpt):


```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="container"></div>
    <script src="keyboard.js"></script>
  </body>
</html>
```


In the end, it will look like this:


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Keyboard</title>
    <link rel="stylesheet" type="text/css" href="keyboard.css" />
  </head>
  <body>
    <div id="container"></div>
    <script src="keyboard.js"></script>
  </body>
</html>
```


# CSS

## Core settings

Basic settings to describe a keyboard are defined like this:


```css
:root {
  /* keyboard width */
  --width: 1000px;
  /* keyboard height */
  --height: 420px;
  /* border radius */
  --radius: 5px;
  /* defines how high the button is raised */
  --depth: 5px;
  /* letter color */
  --color: yellow;
}
```


It is helpful because by tinkering any of these parameters, you can configure the entire keyboard.

For example, by redefining the *--color* variable you will set the color of letters and also the accent color of the glowing button.

## Perspective

The respective rule must be applied to the container:


```css
# container {
  /* the perspective is equal to the initial keyboard width */
  perspective: var(--width);
}
```


> Note that we have already started using the CSS variables.

## Keyboard

The keyboard is a 3D rotated plane whose goal is to distribute sections which will be defined by data in JavaScript and by CSS styles.


```css
.keyboard {
  /* spreading sections evenly */
  display: flex;
  justify-content: space-between;
  /* setting the size */
  width: var(--width);
  height: var(--height);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  /* adding a gradient background */
  background-image: linear-gradient(to bottom, hsl(192 11% 53%) 0%, hsl(192 26% 43%) 100%);
  /* setting the border radius */
  border-radius: var(--radius);
  /* calculating paddings */
  padding: calc(var(--radius) * 2);
  box-sizing: border-box;
  /* enabling the 3d mode */
  transform-style: preserve-3d;
  /* applying the transform rule */
  transform: rotateX(0.13turn) rotateY(0turn) rotateZ(0turn);
}
```


Width and height in this class are the global variables as well as the border-radius. But the padding is computed, and it depends on the *--radius* variable:


```css
calc(var(--radius) * 2)
```


It is also a good place to define some CSS rules for underlying elements, for example, font-family and global margin.

## Overlay

To make a look of a keyboard a bit fancier, let's add an overlay.


```css
.overlay {
  /* setting the size */
  width: var(--width);
  height: var(--height);
  /* centering the overlay */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) translateZ(10px);
  /* adding a gradient background */
  background-image: linear-gradient(to bottom, # ffffff33 0%, transparent 100%);
  /* adding a noisy effect */
  filter: blur(25px);
}
```


The overlay will add a glowing effect at the top of the keyboard. These CSS rules are creating the effect:


```css
/* adding a gradient background */
background-image: linear-gradient(to bottom, # ffffff33 0%, transparent 100%);
/* adding a noisy effect */
filter: blur(25px);
```


## Section

The main objective of the section element is to spread evenly rows, which will be later created by JavaScript.


```css
.section {
  /* spreading rows evenly */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```


> This element is the weak point of the proposed solution, though you can adjust the width of the section by fiddle with CSS rules for the button. Another way is to change the number of buttons in each row.

## Row

The row is designed to distribute the buttons evenly.


```css
.row {
  /* spreading buttons evenly */
  display: flex;
  justify-content: space-between;
}
```


Also, the row element can be used to adjust buttons rules:


```css
.row.functions .button {
  /* calculating the height of the function button */
  height: calc(var(--height) / 10);
}
```


## Button

Finally, the button.

Most of the magic happens in the button. Take a look at the set of rules below:


```css
.button {
  /* setting the default dimensions of the button */
  --size: calc(var(--width) / 20);
  height: calc(var(--height) / 7);
  width: var(--size);
  /* setting the border radius */
  border-radius: var(--radius);
  /* centering the content of the button */
  display: flex;
  justify-content: center;
  align-items: center;
  /* additional settings */
  box-sizing: border-box;
  background: # 000000;
  /* applying the global color */
  color: var(--color);
  /* adding the default margin */
  margin-left: calc(var(--width) / 200);
  /* raising the button above the keyboard */
  transform: translate3d(0px, 0px, var(--depth));
  /* enabling the 3d mode */
  transform-style: preserve-3d;
  /* calculating the perspective from the width */
  perspective: calc(var(--size) * 3);
}
```


Note that here we're reusing the CSS variables. At first, we're computing the *--size* variable (it will be set as the width of the button). Next, we're calculating the perspective, which, in turn, depends on the *--size* variable!

Here is the excerpt:


```css
.button {
  /* setting the default dimensions of the button */
  --size: calc(var(--width) / 20);
  /* calculating the perspective from the width */
  perspective: calc(var(--size) * 3);
}
```


Later on, the *--size* variable will be altered in definitions of the button's special classes. Like this:


```css
.button.space {
  --size: calc(var(--width) / 2.3);
}
```


By default, all of the buttons have the left margin:


```css
.button {
  /* adding the default margin */
  margin-left: calc(var(--width) / 200);
}
```


So, to keep the keyboard look nice, we have to disable the margin for the first button in the row.


```css
.button:first-child {
  /* reset margin for the leftmost button */
  margin-left: 0;
}
```


To make the buttons the volumetric look, let's add a shadow.

The trick is that the button element is raised over the keyboard pane.


```css
.button {
  /* raising the button above the keyboard */
  transform: translate3d(0px, 0px, var(--depth));
}
```


So, the shadow must be placed directly on the pane. Here is the definition:


```css
.button .shadow {
  /* centering the shadow */
  position: absolute;
  left: 50%;
  top: 50%;
  /* applying the transform */
  transform: translate3d(-50%, -50%, calc(var(--depth) * -1));
  background: # 00000088;
}
```


Thus, the keyboard will look like a 3D object.

> Though this approach has drawbacks - from certain angles, it will be perfectly visible, that the buttons are just floating above the keyboard.

## Glowing button

As you may notice, I've added a personal glowing logo instead of Mac/Windows logo.

The glowing effect is created by the text-shadow rule. Take a look at the implementation:


```css
/* settings for the special button */
.button.dev {
  /* defining the accent color */
  --accent: # ffffff;
  color: var(--accent);
  /* adjusting letter spacing for the better readability */
  letter-spacing: 0.5px;
  /* adding the glow effect */
  text-shadow:
    0 0 5px var(--accent),
    0 0 10px var(--accent),
    0 0 15px var(--accent),
    0 0 20px var(--color),
    0 0 30px var(--color),
    0 0 40px var(--color),
    0 0 50px var(--color),
    0 0 75px var(--color);
}
```


The color is defined in global variables section (an excerpt):


```css
:root {
  /* letter color */
  --color: yellow;
}
```


So, by altering the global color variable, you can alter the entire keyboard look!

> You can play with the color in the developer tools.

# JSDoc

Before I've got familiar with TypeScript, I've used [JSDoc](https://jsdoc.app/) notation heavily.

> JSDoc can't be used instead of TypeScript because it only hints about type of expected data.

In this project, I've used some features of JSDoc: defined several types, set types for functions arguments, and return types.

## Syntax

Little introduction into the syntax.

All of the JSDoc definitions must be wrapped into the standard multi-line comment with an additional asterisk.


```js
/**
 */
```


The JSDoc operates with tags. Some tags are single, while others can receive a list of parameters.

Let's explain it by example. The *@typedef* tag defines an object type named *myType*.


```js
/**
 * @typedef {Object} myType
 */
```


Some of JSDoc tags can be treated as a part of another tag. In our case tags named *@property* are the part of the *@typedef* tag.


```js
/**
 * @typedef {Object} myType
 * @property {string} value the value
 */
```


Another cool thing about JSDoc is that we can define fields as optional. It can be achieved by wrapping the name by square brackets:


```js
/**
 * @typedef {Object} myType
 * @property {Object} [data] an optional data
 */
```


Another level of flexibility is achieved by using mixed types. If the parameter can be of the several types the syntax will look like follows:


```js
/**
 * @typedef {Object} myType
 * @property {string | string[]} list the list of items
 */
```


Now, let's take a look at the types that I've used.

## Types

First of all, we can define a custom type describe a button value. It will look like this:


```js
/**
 * @typedef {Object} key
 * @property {string} [extra] extra class name
 * @property {string | string[]} value button label(s)
 */
```


The next fact is that user-defined types can be used as a part of other type' definitions.


```js
/**
 * @typedef {Object} section
 * @property {string} [extra] extra class name
 * @property {key[]} keys set of keys in the row
 */
```


So, in this example, we have defined the *key* type. And later on, we set the *key[]* type to the parameter *keys* of the type *section*.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/835n0ugovr4t807dv5sq.png 'The hint of the type of the object defined by JSDoc')

As you can see from the above screenshot, the keys parameter keeps its type, as well as a description.

## Return types

JSDoc can also define the type of the returned value. Here is an example:


```js
/**
 * create new div element
 * @returns {HTMLDivElement}
 */
function div() {
  return document.createElement('div');
}
```


And the IDE will treat variables by the type returned by the function:

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/0ujmuav1je85jlvpp9zp.png 'The type returned by the function will be applied to the variable')

## Typed parameters

Also, JSDoc allows defining the type of the parameters of the function. 


```js
/**
 * parse the array of strings and build a string from the values
 * @param {string[]} values values to be parsed
 * @returns {string}
 */
function toString(values) {
  return values.filter(value => !!value).join(' ');
}
```


Thus we can have a hint about the expected data:

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/m6why8a0gmeb6c334rgc.png 'Type of the expected data defined by JSDoc')

> Despite easiness and overall improvement of the code development process, I highly recommend using TypeScript for strict static type checks.

# JavaScript

Now, as we have created the layout, defined CSS rules for our elements, and declared types, it is time to add the data and some functions.

The keyboard has two sections: main and additional. Each set of data is tagged with the corresponding JSDoc tag:


```js
/**
 * the list of buttons of the additional section
 * @type {section[]}
 */
const additionalSection = [
  /* the data goes here */
];
```


> [You can review full declaration in the gist I've created](https://gist.github.com/peacefullatom/19982c4637f778af9571b13f106a3e39# file-keyboard-js).

Now, the functions.

The first function is used to filter an array of strings and join the rest of the values by space symbol.


```js
function toString(values) {
  return values.filter(value => !!value).join(' ');
}
```


The next function is a wrapper and is used to get the proper type:


```js
/**
 * create new div element
 * @returns {HTMLDivElement}
 */
function div() {
  return document.createElement('div');
}
```


The last function parses the initial data, builds all of the elements, and applies the CSS styles.

First of all, let's find the container.


```js
const container = document.getElementById('container');
```


If the container is present let's start building elements.

The process is simple - build element, append it to a parent element.

The code will look like this (an excerpt):


```js
/**
 * draw a section
 * @param {section[][]} sections list of sections to be drawn
 */
function draw(sections) {
  // obtaining the container
  const container = document.getElementById('container');

  if (container) {
    // creating keyboard
    const keyboard = div();
    keyboard.className = 'keyboard';

    /* the rest of the logic */

    // appending the keyboard to the container
    container.appendChild(keyboard);
  }
}
```


The above routine is nested with each level of creation of elements.

Here is the schematic representation:

<pre>
create keyboard
  create section
    create row
      create button
      append a button to the row
    append a row to the section
  append a section to the keyboard
append a keyboard to the container
</pre>

One more thing to be explained thoroughly is the rendering of buttons labels.

Do you remember that the parameter *value* of the type *key* has a mixed type?


```js
/**
 * @property {string | string[]} value button label(s)
 */
```


To skip the type checking during rendering we convert any value into an array:


```js
// turn any value into an array
const value = key.value instanceof Array ? key.value : [key.value];
// rendering labels
value.forEach(item => {
  const label = div();
  label.innerText = item || '';
  button.appendChild(label);
});
```


# Conclusion

The proposed solution is lightweight, simple, and flexible.

Though the design of this example has a set of drawbacks:

- The volumetric view of buttons is emulated, so, from certain angles, it will be perfectly visible, that the buttons are just floating above the keyboard.

- The width of the sections is defined by their contents. Thus, sections can overflow the keyboard container. So, you need to play with sizes and count of buttons for each row in every implementation.

- There is no ability to define a vertical button. Yes, the only option available is to set a different width.

Please, don't judge me too harsh for that - I've created this example within 20 minutes or so, cause I needed a cover image for this article.

<iframe class="liquidTag" src="https://dev.to/embed/post?args=peacefullatom%2Fproductivity-boost-with-the-keyboard-in-visual-studio-code-35of" style="border: 0; width: 100%;"></iframe>


# Update

After this comment 
<iframe class="liquidTag" src="https://dev.to/embed/devcomment?args=j58a" style="border: 0; width: 100%;"></iframe>


I've added a pen!


<iframe class="liquidTag" src="https://dev.to/embed/codepen?args=https%3A%2F%2Fcodepen.io%2Fpeacefullatom%2Fpen%2FjOEBOPg%20default-tab%3Dresult" style="border: 0; width: 100%;"></iframe>


I hope that this pen will help you to understand how things are working. 

Also, it would be easier to tinker with params. 

Happy hacking!

*[This post is also available on DEV.](https://dev.to/peacefullatom/the-3d-keyboard-made-with-css-and-javascript-280)*


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
