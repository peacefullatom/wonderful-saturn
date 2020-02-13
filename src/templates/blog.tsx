import { CommentCount } from 'gatsby-plugin-disqus';
import moment from 'moment-strftime';
import PropTypes from 'prop-types';
import React from 'react';

import { Layout } from '../components';
import { TLayout } from '../types/types';
import disqusConfig from '../utils/disqusConfig';
import getPages from '../utils/getPages';
import Link from '../utils/link';
import safePrefix from '../utils/safePrefix';

const Blog: React.FC<TLayout> = ({ pageContext, location }) => {
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
          const disqus = disqusConfig(location, title);
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
                  <p>{post.frontmatter.excerpt}</p>
                </div>
                <footer className="post-meta">
                  <time
                    className="published"
                    dateTime={moment(date).strftime('%Y-%m-%d %H:%M')}
                  >
                    {moment(date).strftime('%B %d, %Y')}
                  </time>
                  <div>
                    <CommentCount config={disqus} placeholder={'...'} />
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
  location: PropTypes.object,
};

export default Blog;
