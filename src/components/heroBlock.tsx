import PropTypes from 'prop-types';
import React from 'react';

import { TLayout } from '../types/types';
import markdownify from '../utils/markdownify';

const HeroBlock: React.FC<TLayout> = ({ section, pageContext }) => {
  const title = section?.title;
  return (
    <section id={section?.section_id} className="hero">
      {title ? (
        <h2 className="hero-title">{title}</h2>
      ) : (
        <h2 className="hero-title">
          Hi, I&apos;m {pageContext?.site?.siteMetadata?.author}.
        </h2>
      )}
      <div className="hero-text">{markdownify(section?.content || ``)}</div>
    </section>
  );
};

HeroBlock.propTypes = {
  section: PropTypes.object,
  pageContext: PropTypes.object,
};

export default HeroBlock;
