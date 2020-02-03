import _ from 'lodash';
import React from 'react';

import { markdownify } from '../utils';

export default class HeroBlock extends React.Component {
  render() {
    const title = _.get(this.props, 'section.title');
    return (
      <section id={_.get(this.props, 'section.section_id')} className="hero">
        {title ? (
          <h2 className="hero-title">{title}</h2>
        ) : (
          <h2 className="hero-title">Hi, I'm {_.get(this.props, 'pageContext.site.data.author.name')}.</h2>
        )}
        <div className="hero-text">{markdownify(_.get(this.props, 'section.content'))}</div>
      </section>
    );
  }
}
