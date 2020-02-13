import PropTypes from 'prop-types';
import React from 'react';

import { Layout } from '../components';
import { TLayout } from '../types/types';
import htmlToReact from '../utils/htmlToReact';
import safePrefix from '../utils/safePrefix';

const Page: React.FC<TLayout> = ({ pageContext }) => {
  const title = pageContext?.frontmatter?.title;
  const subtitle = pageContext?.frontmatter?.subtitle;
  const imgPath = pageContext?.frontmatter?.img_path;
  return (
    <Layout pageContext={pageContext}>
      <article className="post page post-full">
        <header className="post-header">
          <h1 className="post-title underline">{title}</h1>
        </header>
        {subtitle && (
          <div className="post-subtitle">{htmlToReact(subtitle)}</div>
        )}
        {imgPath && (
          <div className="post-thumbnail">
            <img src={safePrefix(imgPath)} alt={title} />
          </div>
        )}
        <div className="post-content">{htmlToReact(pageContext?.html)}</div>
      </article>
    </Layout>
  );
};

Page.propTypes = {
  pageContext: PropTypes.object,
};

export default Page;
