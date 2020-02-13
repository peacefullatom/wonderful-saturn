---
title: Prerequisites
date: '2019-12-06T11:38:43.690Z'
excerpt: >-
  In this article, I will provide a minimal list of required software.  As I
  already mentioned in the...
thumb_img_path: >-
  https://res.cloudinary.com/practicaldev/image/fetch/s--B4_x7MgR--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--9eFFfL_r--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/2991e4shzajir8wz2zx8.png
comments_count: 0
positive_reactions_count: 11
tags:
  - angular
canonical_url: 'https://scipios.netlify.com/posts/prerequisites-om5/'
template: post
---
<a href="https://www.buymeacoffee.com/peacefullatom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

In this article, I will provide a minimal list of required software.

As I already mentioned in the intro section, the base of the development process is the Node.js environment. So, let's start from here.

## [Node.js](https://nodejs.org/)

The Node.js is an open-source, cross-platform run-time environment for JavaScript (read as "run JavaScript outside of the browser").

Also, the Node.js allows creating JavaScript-powered back-end solutions!

Moreover, with the power of workers, you can build multi-threaded applications with the Node.js (yes, this can also be used in some modern browsers).

But in our case, the most important thing is that the NPM (node package manager) also will be installed into the system.

NPM is a tool that will install all the required packages.

## [Yarn](https://yarnpkg.com/)

Yarn is also a package manager, and it uses NPM as a base to operate.

So, why use Yarn?

First of all, Yarn is much faster than NPM.

Secondly, Yarn recreates exact dependencies on each developer station. Thus you will avoid situations when the application perfectly works only on your computer, while others are unable to build/compile/whatever because of the broken dependencies.

Lastly, Yarn evolves at its own pace. It is common that features at first appearing in Yarn and after they are adopted by NPM (.lock files, for example).

## IDE [Visual Studio Code](https://code.visualstudio.com/)

The acronym **IDE** stands for the _**I**ntegrated **D**evelopment **E**nvironment_.

The goal of using IDE is to boost the development process.

So, what're the core differences between a text editor and an IDE?

| IDE                                                                           | Text editor                   |
| ----------------------------------------------------------------------------- | ----------------------------- |
| Highlighting keywords, operators and syntax errors of the selected language.  | Autocorrect misspelled words. |
| Linting code                                                                  | Highlight syntax errors.      |
| Running tests.                                                                | Rich styling capabilities.    |
| Format code by best practices, user preferences, etc.                         |                               |
| Provide reference data for data from external files (so-called intelliSense). |                               |
| Run required scripts.                                                         |                               |
| Deploying your code.                                                          |                               |
| Working with version control systems.                                         |                               |
| Managing your files to organize a project.                                    |                               |
| Debugging your code.                                                          |                               |
| Working with package managers.                                                |                               |

Of course, no one can require you to work in a specific IDE, unless you're bound by some corporate rules.

Also, I know people who are writing enterprise-level code using VIM, and they can hold in their memory several hundreds of source files.

But the above statements are edge cases and, thus, you are free to choose what fits you most.

From a wide specter of solutions available on the market, I've chosen the Visual Studio Code (VSC) as my daily environment.

I'm performing a lot of tasks with the help of the VSC. For example, this post is written in this IDE.

The below table explains why I'm using VSC.

| Pros                                                                                                                                                   | Cons              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| It's an open-source solution.                                                                                                                          | I don't know yet. |
| It has a rich market of extensions.                                                                                                                    |                   |
| It doesn't require third-party software/packages/etc.                                                                                                  |                   |
| It is a cross-platform product.                                                                                                                        |                   |
| It's available online (e.g, https://codesandbox.io/).                                                                                                  |                   |
| It is a highly customizable IDE (customizations include themes, keymapping, automation scripts, scheduled scripts, icons for the file explorer, etc.). |                   |
| It has a built-in terminal.                                                                                                                            |                   |
| It has built-in support of git.                                                                                                                        |                   |
| It is translated into many languages.                                                                                                                  |                   |
| Microsoft team is the main developer and maintainer of the project.                                                                                    |                   |
| You can improve this IDE by contributing.                                                                                                              |                   |
| I'm in love with this IDE.                                                                                                                             |                   |

## [Git](https://git-scm.com/)

According to the git's homepage:

> Git is a free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

The version control is a very important aspect of the development process, even if your project is small and you are working alone.

Git is also a good fit for development by a team of any size, even if a team is distributed.

Work is performed in separate branches. These branches are usually created to perform a specific type of work: new feature, bug fix, refactoring, etc. Later on, these branches are merged together into a higher-level branch.

> [The git-flow cheatsheet will give you more details](https://danielkummer.github.io/git-flow-cheatsheet/).

## [Angular](https://angular.io/)

To start a new Angular project follow these steps.

First, install an Angular CLI via NPM.


```shell
npm install -g @angular/cli
```


Or using Yarn:


```shell
yarn add global @angular/cli
```


Second, create a new project:


```shell
ng new app
```


Before the creation, Angular will ask you about the basic features of the new project.

The first question is about enabling Angular routing in your project (default option is no).

The second question is about CSS handling (default option is pure CSS).

The output will look like this:


```shell
ng new app
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use?
  CSS
> SCSS   [ https://sass-lang.com/documentation/syntax# scss                ]
  Sass   [ https://sass-lang.com/documentation/syntax# the-indented-syntax ]
  Less   [ http://lesscss.org                                             ]
  Stylus [ http://stylus-lang.com                                         ]
```


After all of the required operations are done, go to the project folder.


```shell
cd app
```


Finally, run the project!


```shell
ng serve
```


Optionally you can provide _--open_ flag, which will open your default browser once the project is ready to start.


```shell
ng serve --open
```


To get a list of available commands run the following:


```shell
ng help
```


## [Bootstrap](https://getbootstrap.com/)

To build applications fast, one should use CSS component library.

My favorite is Bootstrap!

So, to add this component library to your project start CLI anywhere inside your project's folder and install it via NPM:


```shell
npm install bootstrap
```


Or via Yarn:


```shell
yarn add bootstrap
```


> As an alternative to the Bootstrap, you can use the [Tailwind CSS](https://tailwindcss.com/).

## [Font Awesome](https://fontawesome.com/)

One more thing you can to do is to install the Font Awesome, though this step is optional.

This toolkit will allow you to add awesome SVG icons into your project.

Which, in turn, will enrich the visual experience and will add a neat look to your project.

Anywhere inside your project's folder run:


```shell
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/angular-fontawesome
```


Or via Yarn:


```shell
yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/angular-fontawesome
```


Here goes short description for each package installed:

> _@fortawesome/fontawesome-svg-core_ - the toolkit itself.

> _@fortawesome/free-brands-svg-icons_ - the set of free branded icons, such as [Google](https://fontawesome.com/icons/google?style=brands), [Twitter](https://fontawesome.com/icons/twitter?style=brands), [Facebook](https://fontawesome.com/icons/facebook?style=brands), etc.

> _@fortawesome/free-regular-svg-icons_ - the set of free regular icons.

> _@fortawesome/free-solid-svg-icons_ - the set of free solid icons.

> _@fortawesome/angular-fontawesome_ - this is a wrapper [library](https://github.com/FortAwesome/angular-fontawesome) for use in Angular projects.

[You can browse the icons here](https://fontawesome.com/icons).


*[This post is also available on DEV.](https://dev.to/peacefullatom/prerequisites-om5)*


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
