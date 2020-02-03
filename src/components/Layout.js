import _ from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';

import { safePrefix } from '../utils';
import Footer from './Footer';
import Header from './Header';

export default class Body extends React.Component {
  render() {
    const title = _.get(this.props, 'pageContext.frontmatter.title');
    const canonical_url = _.get(this.props, 'pageContext.frontmatter.canonical_url');
    const template = _.get(this.props, 'pageContext.frontmatter.template');
    const layout_style = _.get(this.props, 'pageContext.site.siteMetadata.layout_style');
    const palette = _.get(this.props, 'pageContext.site.siteMetadata.palette');
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {title && title + ' - '}
            {_.get(this.props, 'pageContext.site.siteMetadata.title')}
          </title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initialScale=1.0" />
          <meta name="google" content="notranslate" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
          <link rel="stylesheet" href={safePrefix('assets/css/main.css')} />
          {template === 'post' && canonical_url && <link rel="canonical" href={canonical_url} />}
        </Helmet>
        <div id="page" className={'site style-' + layout_style + ' palette-' + palette}>
          <Header {...this.props} />
          <div id="content" className="site-content">
            <div className="inner">
              <main id="main" className="site-main">
                {this.props.children}
              </main>
              <Footer {...this.props} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
