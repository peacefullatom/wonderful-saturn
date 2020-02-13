---
title: CSS 3D
date: '2019-11-24T15:28:16.859Z'
excerpt: >-
  Thanks to the @rolandcsibrei  idea, I've updated this post.  As a frontend
  developer, I'm working a...
thumb_img_path: >-
  https://res.cloudinary.com/practicaldev/image/fetch/s--0ruSp1SU--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--aJBaUsEO--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/60mgf3749fxu95gig4vz.png
comments_count: 21
positive_reactions_count: 108
tags:
  - css
  - 3d
  - javascript
canonical_url: 'https://scipios.netlify.com/posts/peacefullatom/css-3d-43gg/'
template: post
---
<a href="https://www.buymeacoffee.com/peacefullatom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

Thanks to the @RolandCsibrei idea, I've updated this post.

As a frontend developer, I'm working a lot with CSS.

From time to time, I'm experimenting with CSS just for fun.

Recently I've found an article about [3D transforms](https://developer.mozilla.org/docs/Web/CSS/transform-function/rotate3d) in CSS, which gave me ideas for new experiments.

To be short, I've finished up with the idea to build an interactive [3D object](https://peacefullatom.github.io/dev/misc/css-3d).

The idea behind the rendering process is simple.

# Layout

## Plane

There is an object (I refer to it as a _plane_) that defines the height and width of the object. By default the plane is invisible.


```html
<div class="plane"></div>
```



```css
.plane {
  transform-style: preserve-3d;
  animation: rotate 6s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate3d(1, 1, 1, 0deg);
  }
  to {
    transform: rotate3d(1, 1, 1, 360deg);
  }
}
```


The only rotating object is the plane. All other parts are just following the plane.

## Face

Next, I'm creating other objects (I refer to them as _faces_). Each face is placed in the correspondent place with the respective angle.


```html
<div class="plane">
  <div class="face"></div>
  <div class="face"></div>
  <div class="face"></div>
  <div class="face"></div>
  <div class="face"></div>
  <div class="face"></div>
</div>
```



```css
.face {
  background: # ffffff11;
  border: 1px solid # ffffff22;
  box-shadow: inset 0 0 8px 8px # ffffff22;
  position: absolute;
  overflow: hidden;
}
```


# Code

The object is enclosed into the space described by three properties: width, height, and depth.

Within the described space I can place from one to N parts (I refer to them as _bars_). Each bar consists of six faces. Bars are placed from top to bottom along the plane.

Each face must be properly configured to form an object.

The configuration includes such settings as width, height, rotation, and translation.

## Constants

I've defined the order of faces as well as amount of them as constants to use them later:


```javascript
const faceFront = 0;
const faceBack = 1;
const faceRight = 2;
const faceLeft = 3;
const faceTop = 4;
const faceBottom = 5;

const faces = 6;
```


## Calculating face size

To correctly calculate the size of the face I'm using this simple helper function.


```javascript
/**
 * @param {number} order
 * @param {number} faceSteps
 * @param {number} width
 * @param {number} height
 * @param {number} depth
 * @return {[number, number]}
 */
function calcSize(order, faceSteps, width, height, depth) {
  switch (order) {
    case faceFront:
    case faceBack:
      return [width, height / faceSteps];
    case faceRight:
    case faceLeft:
      return [depth * 2, height / faceSteps];
    case faceTop:
    case faceBottom:
      return [width, depth * 2];
  }
}
```


This function returns the width and height as an array of numbers depending on the face order and the settings of the object.

## Calculating transforms

This function generates the transformation rule from given parameters.


```javascript
/**
 * @param {number} order
 * @param {number} nHeight
 * @param {number} nSizeY
 * @param {number} planeDepth
 * @param {number} planeWidth
 * @param {number} sizeX
 * @param {number} faceHeight
 * @return {string}
 */
function transform(
  order,
  nHeight,
  nSizeY,
  planeDepth,
  planeWidth,
  sizeX,
  faceHeight
) {
  switch (order) {
    case faceFront:
      return `
translate3d(0, ${nHeight}px, ${planeDepth}px)
`;
    case faceBack:
      return `
rotateY(180deg) translate3d(0, ${nHeight}px, ${planeDepth}px)
`;
    case faceRight:
      return `
rotateY(90deg) translate3d(0, ${nHeight}px, ${sizeX / -2}px)
`;
    case faceLeft:
      return `
rotateY(-90deg) translate3d(0, ${nHeight}px, ${sizeX / 2 -
        planeWidth}px)
`;
    case faceTop:
      return `
rotateX(90deg) translate3d(0, 0, ${nSizeY - nHeight}px)
`;
    case faceBottom:
      return `
rotateX(-90deg) translate3d(0, 0, ${nHeight +
        faceHeight -
        nSizeY}px)
`;
  }
}
```


These rules are used to place the faces into their respective positions and turning them to the required angle.

## Configuring the face

The configure function will apply calculated sizes to the plane as well as transformations.


```javascript
/**
 * @param {HTMLDivElement} face
 * @param {number} faceNumber
 * @param {number} faceHeight
 * @param {number} faceStep
 * @param {number} planeWidth
 * @param {number} planeHeight
 * @param {number} planeDepth
 */
function configure(
  face,
  faceNumber,
  faceHeight,
  faceStep,
  planeWidth,
  planeHeight,
  planeDepth
) {
  const order = faceNumber % faces;
  const nHeight = ((faceNumber - order) / 3) * faceHeight;
  const [sizeX, sizeY] = calcSize(
    order,
    faceStep,
    planeWidth,
    planeHeight,
    planeDepth
  );
  const nSizeY = sizeY / 2;

  face.className = "face";
  face.style.width = `
${sizeX}px
`;
  face.style.height = `
${sizeY}px
`;
  face.style.transform = transform(
    order,
    nHeight,
    nSizeY,
    planeDepth,
    planeWidth,
    sizeX,
    faceHeight
  );
}
```


Later on, the configured face will be appended to the respective plane to create a bar.

## Building the object

Let's wrap it up in the build function.


```javascript
/**
 * @param {HTMLDivElement} container
 * @param {number} bars
 * @param {number} width
 * @param {number} height
 * @param {number} depth
 */
function build(container, bars, width, height, depth) {
  if (!container) {
    return;
  }

  container.style.width = `
${width}px
`;
  container.style.height = `
${height}px
`;

  const planeWidth = width / 2;
  const planeHeight = height / 2;
  const planeDepth = depth / 2;
  const faceStep = bars * 2 - 1;
  const faceHeight = planeHeight / faceStep;

  const plane = document.createElement("div");

  plane.className = "plane";
  plane.style.width = `
${planeWidth}px
`;
  plane.style.height = `
${planeHeight}px
`;

  for (var i = 0; i < bars * faces; i++) {
    const face = document.createElement("div");

    configure(
      face,
      i,
      faceHeight,
      faceStep,
      planeWidth,
      planeHeight,
      planeDepth
    );

    plane.appendChild(face);
  }

  container.appendChild(plane);
}
```


The build function accepts initial settings of an object: parent container, number of bars, width, height, and depth of the object.

This function creates the plane and after that builds faces and appending them to the plane.

After all of the faces are built, the plane is appending to the provided container.

The source code of the working demo is available here [neon 3D bars demo](https://gist.github.com/peacefullatom/65686b1b2a1ca2907c8058fd6b9a3baf) (_updated_).

## Adding perspective (_update_)

As per my example, the 3D object is placed into the container.

To add the [perspective](https://developer.mozilla.org/ru/docs/Web/CSS/perspective), I'm applying the respective CSS rule to the container like follows:


```javascript
container.style.perspective = "500px";
```


Later on, the plane will be appended to this container, and the effect of the perspective will make the look of the object even fancier!


```javascript
const root = document.getElementById("root");
const container = document.createElement("div");
container.className = "container";
container.style.perspective = "500px";
build(container, 3, 500, 500, 250);
root.appendChild(container);
```


Worth to mention, that in the original example the perspective CSS rule was applied to the plane, but after a few experiments, I've decided to apply it to the container.

So, don't be afraid to experiment and apply this rule somewhere else, maybe even in several places!

# Details

If for some reason, your browser doesn't support the yet experimental CSS feature [transform-style](https://developer.mozilla.org/docs/Web/CSS/transform-style) there would be no 3D effect, but projections will still be visible.

Static parts reside in the CSS definitions. And the dynamic parts are calculated upon each parameter update.

# Conclusion

With this new feature, it is possible to enrich web pages with simple 3D objects.

I've got a couple of ideas about how it can be applied!

It can be a preloader to your web application.

It is possible to visualize some data.

Also, it is possible to implement some fancy 3D spinners/waiters/loading indicators!


*[This post is also available on DEV.](https://dev.to/peacefullatom/css-3d-43gg)*


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
