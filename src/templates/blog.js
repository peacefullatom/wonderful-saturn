import { CommentCount } from 'gatsby-plugin-disqus';
import _ from 'lodash';
import moment from 'moment-strftime';
import React from 'react';

import { Layout } from '../components';
import { getPages, Link, safePrefix } from '../utils';

export default class Blog extends React.Component {
  render() {
    let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
    return (
      <Layout {...this.props}>
        <div className="post-feed">
          {_.map(display_posts, (post, post_idx) => {
            const thumb_img_path = _.get(post, 'frontmatter.thumb_img_path');
            const url = _.get(post, 'url');
            const title = _.get(post, 'frontmatter.title');
            const date = _.get(post, 'frontmatter.date');
            const pathname = this.props.location.pathname;
            const blogIdentity = pathname.split('/')[2];
            const disqusConfig = {
              url: `https://scipios.netlify.com${pathname}`,
              identifier: blogIdentity,
              title
            };
            return (
              <article key={post_idx} className="post">
                <div className="post-inside">
                  {thumb_img_path && (
                    <Link className="post-thumbnail" to={safePrefix(url)}>
                      <img className="thumbnail" src={safePrefix(thumb_img_path)} alt={title} />
                    </Link>
                  )}
                  <header className="post-header">
                    <h2 className="post-title">
                      <Link to={safePrefix(url)} rel="bookmark">
                        {title}
                      </Link>
                    </h2>
                  </header>
                  <div className="post-content">
                    <p>{_.get(post, 'frontmatter.excerpt')}</p>
                  </div>
                  <footer className="post-meta">
                    <time className="published" dateTime={moment(date).strftime('%Y-%m-%d %H:%M')}>
                      {moment(date).strftime('%B %d, %Y')}
                    </time>
                    <div>
                      <CommentCount config={disqusConfig} placeholder={'...'} />
                    </div>
                  </footer>
                </div>
              </article>
            );
          })}
        </div>
      </Layout>
    );
  }
}
