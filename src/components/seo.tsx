import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

export type TSeoQGL = {
  site: {
    siteMetadata: {
      defaultTitle?: string;
      titleTemplate?: string;
      defaultDescription?: string;
      siteUrl: string;
      defaultImage?: string;
      twitterUserName?: string;
    };
  };
};

export type TSeo = {
  description?: string;
  lang?: string;
  image?: string;
  title: string;
  pathname?: string;
  article?: boolean;
};

const SEO: React.FC<TSeo> = ({
  title,
  description,
  image,
  pathname,
  article,
  lang,
}) => {
  const { site } = useStaticQuery<TSeoQGL>(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            titleTemplate
            defaultDescription: description
            siteUrl: url
            defaultImage: image
            twitterUserName
          }
        }
      }
    `
  );
  const { siteUrl } = site.siteMetadata;
  const seo = {
    title: site.siteMetadata.defaultTitle || title,
    description: site.siteMetadata.defaultDescription || description,
    image: `${siteUrl}${site.siteMetadata.defaultImage || image}`,
    url: `${siteUrl}${pathname || '/'}`,
    twitterUsername: site.siteMetadata.twitterUserName || ``,
  };
  return (
    <Helmet
      title={seo.title}
      titleTemplate={site.siteMetadata.titleTemplate}
      htmlAttributes={{ lang }}
    >
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.twitterUsername && (
        <meta name="twitter:creator" content={seo.twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: `en`,
  description: ``,
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
  lang: PropTypes.string,
};

export default SEO;
