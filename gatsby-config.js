module.exports = {
  pathPrefix: '/',
  siteMetadata: require('./site-metadata.json'),
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-source-data`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-plugin-stackbit-static-sass`,
      options: {
        inputFile: `${__dirname}/src/sass/main.scss`,
        outputFile: `${__dirname}/public/assets/css/main.css`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-component`]
      }
    },
    {
      resolve: `gatsby-remark-page-creator`,
      options: {}
    },
    {
      resolve: `@stackbit/gatsby-plugin-menus`,
      options: {
        sourceUrlPath: `fields.url`,
        pageContextProperty: `menus`,
        menus: require('./src/data/menus.json')
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-156890926-1'
      }
    },
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: 'https://scipios.netlify.com/',
        sitemap: 'https://scipios.netlify.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `https-scipios-netlify-com`
      }
    },
    `gatsby-plugin-favicon`
  ]
};
