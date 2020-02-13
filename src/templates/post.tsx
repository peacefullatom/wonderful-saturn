import { CommentCount, Disqus } from 'gatsby-plugin-disqus';
import moment from 'moment-strftime';
import PropTypes from 'prop-types';
import React from 'react';

import { Layout } from '../components';
import SEO from '../components/seo';
import { TLayout } from '../types/types';
import htmlToReact from '../utils/htmlToReact';
import safePrefix from '../utils/safePrefix';

const Post: React.FC<TLayout> = ({ pageContext, location }) => {
  const url = 'https://scipios.netlify.com';
  const title = pageContext?.frontmatter?.title ?? ``;
  const image = pageContext?.frontmatter?.content_img_path ?? ``;
  const subtitle = pageContext?.frontmatter?.subtitle;
  const safeImage = safePrefix(image);
  const date = moment(pageContext?.frontmatter?.date);
  const pathname = location?.pathname ?? ``;
  const blogIdentity = pathname.split('/')[2];
  const disqusConfig = {
    url: `${url}${pathname}`,
    identifier: blogIdentity,
    title,
  };
  return (
    <Layout pageContext={pageContext}>
      <SEO
        title={title}
        image={safeImage}
        description={pageContext?.excerpt}
        pathname={pageContext?.canonical_url}
        article
      ></SEO>
      <article className="post post-full">
        <CommentCount config={disqusConfig} placeholder={'...'} />
        <header className="post-header">
          <h1 className="post-title underline">{title}</h1>
        </header>
        {subtitle && (
          <div className="post-subtitle">{htmlToReact(subtitle)}</div>
        )}
        {image && (
          <div className="post-thumbnail">
            <img src={safeImage} alt={title} />
          </div>
        )}
        <div className="post-content">{htmlToReact(pageContext?.html)}</div>
        <footer className="post-meta">
          <time
            className="published"
            dateTime={date.strftime('%Y-%m-%d %H:%M')}
          >
            {date.strftime('%A, %B %e, %Y')}
          </time>
        </footer>
      </article>
      <Disqus config={disqusConfig} />
    </Layout>
  );
};

Post.propTypes = {
  pageContext: PropTypes.object,
  location: PropTypes.object,
};

export default Post;
