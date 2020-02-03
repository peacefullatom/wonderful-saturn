import _ from 'lodash';
import moment from 'moment-strftime';
import React from 'react';

import { getPages, Link, safePrefix } from '../utils';

export default class PostsBlock extends React.Component {
  render() {
    const actions = _.get(this.props, 'section.actions');
    let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
    let recent_posts = display_posts.slice(0, _.get(this.props, 'section.num_posts_displayed'));
    return (
      <section id={_.get(this.props, 'section.section_id')} className="block">
        <h2 className="block-title underline">{_.get(this.props, 'section.title')}</h2>
        <div className="post-feed">
          {_.map(recent_posts, (post, post_idx) => {
            const thumb_img_path = _.get(post, 'frontmatter.thumb_img_path');
            const url = _.get(post, 'url');
            const title = _.get(post, 'frontmatter.title');
            const date = _.get(post, 'frontmatter.date');
            return (
              <article key={post_idx} className="post">
                <div className="post-inside">
                  {thumb_img_path && (
                    <Link className="post-thumbnail" to={safePrefix(url)}>
                      <img className="thumbnail" src={safePrefix(thumb_img_path)} alt={title} />
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
                    <p>{_.get(post, 'frontmatter.excerpt')}</p>
                  </div>
                  <footer className="post-meta">
                    <time className="published" dateTime={moment(date).strftime('%Y-%m-%d %H:%M')}>
                      {moment(date).strftime('%B %d, %Y')}
                    </time>
                  </footer>
                </div>
              </article>
            );
          })}
        </div>
        {actions && (
          <p className="block-cta">
            {_.map(actions, (action, action_idx) => (
              <Link key={action_idx} to={safePrefix(_.get(action, 'url'))} className="button">
                {_.get(action, 'label')}
              </Link>
            ))}
          </p>
        )}
      </section>
    );
  }
}
