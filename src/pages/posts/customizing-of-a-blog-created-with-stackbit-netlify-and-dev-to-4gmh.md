---
title: 'Customization of a blog created with Stackbit, Netlify, and dev.to'
date: '2020-01-29T07:40:01.441Z'
excerpt: >-
  Recently I created my blog using a feature provided by dev.to.  Here are
  several tweaks you can do to...
thumb_img_path: >-
  https://res.cloudinary.com/practicaldev/image/fetch/s--OYuV2VzI--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--uS-LHigl--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/cjqedqtnjfg12dw9hgt5.jpeg
comments_count: 0
positive_reactions_count: 20
tags:
  - blog
canonical_url: >-
  https://scipios.netlify.com/posts/customizing-of-a-blog-created-with-stackbit-netlify-and-dev-to-4gmh/
template: post
---
Recently I created my blog using [a feature provided by dev.to](https://scipios.netlify.com/posts/start-your-blog-in-10-minutes-3bjm/).

Here are several tweaks you can do to adjust the blog to your needs.

# Set up the domain name.

After Stackbit finishes creating your site, Netlify will assign a random domain name. In my case, it was:

https://wonderful-saturn-e6a47.netlify.com/

> The link above is no longer available.

To set the desired subdomain name open the [Site information](https://app.netlify.com/sites/scipios/settings/general# site-information) section:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/h42prg75six7xga2d61j.png)

And tap the _Change site name_ button.

Now type your desired subdomain name in the field _Site name_.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/33vym910fcbi2fg66egg.png)

Alternatively, if you have a personal domain name, you can set a [custom domain](https://app.netlify.com/sites/scipios/settings/domain# domains):

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/khlqt2idhzt3swgfpuyn.png)

Tap _Add custom domain_ and follow the instructions.

# Add Google Analytics

This tweak requires a bit of technical work.

First of all, clone your repository. To do so, go to your Github page and navigate to the repository created by Netlify. In my case, it looks like this:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/xx2kyn11vkijro481vcq.png)

Next, click _Clone or download_ button and tap the _copy-to-clipboard_ icon.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/i4ex82z7dlqwn4eu6sid.png)

After, open a terminal, type in "git clone" and paste the copied link. It will look like this:


```sh
git clone https://github.com/user/repository-name.git
```


> If you are new to the IT world, you can read my article [Prerequisites](https://scipios.netlify.com/posts/prerequisites-om5/). You need to install git, NodeJs, and an IDE.

Great! Now open a cloned repository in IDE of your choice.

> In the examples below, I'm using the [Visual Studio Code](https://code.visualstudio.com/).

After cloning a repository, you need to install dependencies. To add them to your local repo go to built-in terminal and key in this command:


```sh
npm install
```


> You can refer to the list of shortcuts for the Visual Studio Code in this post [Productivity boost with the keyboard in Visual Studio Code](https://scipios.netlify.com/posts/productivity-boost-with-the-keyboard-in-visual-studio-code-35of/).

Next, to add the Google Analytics functionality, you need to install a respective plugin. So, open built-in terminal and type:


```sh
npm install --save gatsby-plugin-google-analytics
```


After NPM finishes its work, you need to modify the _gatsby-config.js_ file. Press _Ctrl + P_ and start typing __gatsby-config__.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/hfalyj5u7wq6555qhzic.gif)

The configuration file will look like this (an excerpt):


```js
module.exports = {
  pathPrefix: '/',
  siteMetadata: require('./site-metadata.json'),
  plugins: [`
gatsby-plugin-react-helmet
`]
};
```


Now, let's update the plugins section:


```js
module.exports = {
  pathPrefix: '/',
  siteMetadata: require('./site-metadata.json'),
  plugins: [
    `
gatsby-plugin-react-helmet
`,
    {
      resolve: `
gatsby-plugin-google-analytics
`,
      options: {
        trackingId: 'UA-XXXXXXXXX-X'
      }
    }
  ]
};
```


Insert your Google Analytics id instead of _UA-XXXXXXXXX-X_ and save the file.

Lastly, return to the built-in terminal and instruct git to push your updates to the remote:


```sh
git add --all
git commit -m "added google analytics"
git push
```


Overview of commands:
- marks all of the altered files as ready to commit. 
- commit your changes to the local repository and add a commit message. 
- push your changes to the Github repository.

The Netlify will track any changes to the repository on Github and will compile and deploy your project right away!

> The original steps are available at the [GatsbyJs site](https://www.gatsbyjs.org/docs/adding-analytics/).

That's it! Now you can go to Google Analytics panel and track down your visitors.

Happy blogging!

<a href="https://www.buymeacoffee.com/peacefullatom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

*[This post is also available on DEV.](https://dev.to/peacefullatom/customizing-of-a-blog-created-with-stackbit-netlify-and-dev-to-4gmh)*


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
