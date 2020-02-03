import { CommentCount, Disqus } from 'gatsby-plugin-disqus';
import _ from 'lodash';
import moment from 'moment-strftime';
import React from 'react';

import { Layout } from '../components';
import SEO from '../components/SEO';
import { htmlToReact, safePrefix } from '../utils';

export default class Post extends React.Component {
  render() {
    const url = 'https://scipios.netlify.com';
    const title = _.get(this.props, 'pageContext.frontmatter.title');
    const image = _.get(this.props, 'pageContext.frontmatter.content_img_path');
    const subtitle = _.get(this.props, 'pageContext.frontmatter.subtitle');
    const safeImage = safePrefix(image);
    const date = moment(_.get(this.props, 'pageContext.frontmatter.date'));
    const pathname = this.props.location.pathname;
    const blogIdentity = pathname.split('/')[2];
    const disqusConfig = {
      url: `${url}${pathname}`,
      identifier: blogIdentity,
      title
    };
    return (
      <Layout {...this.props}>
        <SEO
          title={title}
          image={safeImage}
          description={_.get(this.props, 'pageContext.excerpt')}
          pathname={_.get(this.props, 'pageContext.canonical_url')}
          article
        ></SEO>
        <article className="post post-full">
          <CommentCount config={disqusConfig} placeholder={'...'} />
          <header className="post-header">
            <h1 className="post-title underline">{title}</h1>
          </header>
          {subtitle && <div className="post-subtitle">{htmlToReact(subtitle)}</div>}
          {image && (
            <div className="post-thumbnail">
              <img src={safeImage} alt={title} />
            </div>
          )}
          <div className="post-content">{htmlToReact(_.get(this.props, 'pageContext.html'))}</div>
          <footer className="post-meta">
            <time className="published" dateTime={date.strftime('%Y-%m-%d %H:%M')}>
              {date.strftime('%A, %B %e, %Y')}
            </time>
          </footer>
        </article>
        <Disqus config={disqusConfig} />
      </Layout>
    );
  }
}
