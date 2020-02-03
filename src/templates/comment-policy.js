import _ from 'lodash';
import React from 'react';

import { Layout } from '../components';
import { htmlToReact, safePrefix } from '../utils';

export default class CommentPolicy extends React.Component {
  render() {
    const title = _.get(this.props, 'pageContext.frontmatter.title');
    const subtitle = _.get(this.props, 'pageContext.frontmatter.subtitle');
    const img_path = _.get(this.props, 'pageContext.frontmatter.img_path');
    return (
      <Layout {...this.props}>
        <article className="post page post-full">
          <header className="post-header">
            <h1 className="post-title underline">{title}</h1>
          </header>
          {subtitle && <div className="post-subtitle">{htmlToReact(subtitle)}</div>}
          {img_path && (
            <div className="post-thumbnail">
              <img src={safePrefix(img_path)} alt={title} />
            </div>
          )}
          <div className="post-content">{htmlToReact(_.get(this.props, 'pageContext.html'))}</div>
        </article>
      </Layout>
    );
  }
}
