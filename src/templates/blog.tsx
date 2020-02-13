import { CommentCount } from 'gatsby-plugin-disqus';
import _ from 'lodash';
import moment from 'moment-strftime';
import PropTypes from 'prop-types';
import React from 'react';

import { Layout } from '../components';
import { TLayout } from '../types/types';
import getPages from '../utils/getPages';
import Link from '../utils/link';
import safePrefix from '../utils/safePrefix';

const Blog: React.FC<TLayout> = ({ pageContext }) => {
  const displayPosts =
    pageContext && pageContext.pages ? getPages(pageContext.pages) : [];
  return (
    <Layout pageContext={pageContext}>
      <div className="post-feed">
        {displayPosts.map((post, postIdx) => {
          const thumbImgPath = post?.frontmatter?.thumb_img_path;
          const url = post?.url;
          const title = post?.frontmatter?.title;
          const date = post?.frontmatter?.date;
          const pathname = document.location.pathname;
          const blogIdentity = pathname.split('/')[2];
          const disqusConfig = {
            url: `https://scipios.netlify.com${pathname}`,
            identifier: blogIdentity,
            title,
          };
          return (
            <article key={postIdx} className="post">
              <div className="post-inside">
                {thumbImgPath && (
                  <Link className="post-thumbnail" to={safePrefix(url || ``)}>
                    <img
                      className="thumbnail"
                      src={safePrefix(thumbImgPath)}
                      alt={title}
                    />
                  </Link>
                )}
                <header className="post-header">
                  <h2 className="post-title">
                    <Link to={safePrefix(url || ``)} rel="bookmark">
                      {title}
                    </Link>
                  </h2>
                </header>
                <div className="post-content">
                  <p>{_.get(post, 'frontmatter.excerpt')}</p>
                </div>
                <footer className="post-meta">
                  <time
                    className="published"
                    dateTime={moment(date).strftime('%Y-%m-%d %H:%M')}
                  >
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
};

Blog.propTypes = {
  pageContext: PropTypes.object,
};

export default Blog;
