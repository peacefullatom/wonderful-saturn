import { CommentCount } from 'gatsby-plugin-disqus';
import moment from 'moment-strftime';
import PropTypes from 'prop-types';
import React from 'react';

import { TLayout } from '../types/types';
import disqusConfig from '../utils/disqusConfig';
import getPages from '../utils/getPages';
import Link from '../utils/link';
import safePrefix from '../utils/safePrefix';

const PostsBlock: React.FC<TLayout> = ({ section, pageContext, location }) => {
  const actions = section?.actions;
  const displayPosts =
    pageContext && pageContext.pages ? getPages(pageContext.pages) : [];
  const recentPosts = displayPosts.slice(0, section?.num_posts_displayed);
  return (
    <section id={section?.section_id} className="block">
      <h2 className="block-title underline">{section?.title}</h2>
      <div className="post-feed">
        {recentPosts.map((post, postIdx) => {
          const thumbImgPath = post?.frontmatter?.thumb_img_path;
          const url = post?.url ?? ``;
          const title = post?.frontmatter?.title;
          const date = post?.frontmatter?.date;
          const disqus = disqusConfig(location, title);
          return (
            <article key={postIdx} className="post">
              <div className="post-inside">
                {thumbImgPath && (
                  <Link className="post-thumbnail" to={safePrefix(url)}>
                    <img
                      className="thumbnail"
                      src={safePrefix(thumbImgPath)}
                      alt={title}
                    />
                  </Link>
                )}
                <header className="post-header">
                  <h3 className="post-title">
                    <Link to={safePrefix(url)} rel="bookmark">
                      {title}
                    </Link>
                  </h3>
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
      {actions && (
        <p className="block-cta">
          {actions.map((action, actionIdx) => (
            <Link
              key={actionIdx}
              to={safePrefix(action?.url || ``)}
              className="button"
            >
              {action?.label}
            </Link>
          ))}
        </p>
      )}
    </section>
  );
};

PostsBlock.propTypes = {
  section: PropTypes.object,
  pageContext: PropTypes.object,
  location: PropTypes.object,
};

export default PostsBlock;
