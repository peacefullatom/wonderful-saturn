import _ from 'lodash';
import React from 'react';

import { Link, markdownify, safePrefix } from '../utils';

export default class ContentBlock extends React.Component {
  render() {
    const title = _.get(this.props, 'section.title');
    const image = _.get(this.props, 'section.image');
    const actions = _.get(this.props, 'section.actions');
    return (
      <section id={_.get(this.props, 'section.section_id')} className="block">
        <h2 className="block-title underline">{title}</h2>
        {image && (
          <div className="block-thumbnail">
            <img src={safePrefix(image)} alt={title} />
          </div>
        )}
        <div className="block-content">
          {markdownify(_.get(this.props, 'section.content'))}
          {actions && (
            <p className="block-cta">
              {_.map(actions, (action, action_idx) => (
                <Link key={action_idx} to={safePrefix(_.get(action, 'url'))} className="button">
                  {_.get(action, 'label')}
                </Link>
              ))}
            </p>
          )}
        </div>
      </section>
    );
  }
}
