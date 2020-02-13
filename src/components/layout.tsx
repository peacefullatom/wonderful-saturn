import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import { TLayout } from '../types/types';
import safePrefix from '../utils/safePrefix';
import Footer from './footer';
import Header from './header';

const Layout: React.FC<TLayout> = ({ children, pageContext }) => {
  const title = pageContext?.frontmatter?.title ?? '';
  const canonicalUrl = pageContext?.frontmatter?.canonical_url ?? '';
  const template = pageContext?.frontmatter?.template ?? '';
  const layoutStyle = pageContext?.site?.siteMetadata?.layout_style ?? '';
  const palette = pageContext?.site?.siteMetadata?.palette ?? '';

  return (
    <React.Fragment>
      <Helmet>
        <title>
          {title && title + ' - '}
          {pageContext?.site?.siteMetadata?.title ?? ''}
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initialScale=1.0" />
        <meta name="google" content="notranslate" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i"
          rel="stylesheet"
        />
        <link rel="stylesheet" href={safePrefix('assets/css/main.css')} />
        {template === 'post' && canonicalUrl && (
          <link rel="canonical" href={canonicalUrl} />
        )}
      </Helmet>
      <div
        id="page"
        className={'site style-' + layoutStyle + ' palette-' + palette}
      >
        <Header pageContext={pageContext} />
        <div id="content" className="site-content">
          <div className="inner">
            <main id="main" className="site-main">
              {children}
            </main>
            <Footer pageContext={pageContext} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  pageContext: PropTypes.object,
};

export default Layout;
