import PropTypes from 'prop-types';
import React from 'react';

import { TLayout } from '../types/types';
import Link from '../utils/link';
import markdownify from '../utils/markdownify';
import safePrefix from '../utils/safePrefix';

const ContentBlock: React.FC<TLayout> = ({ section }) => {
  const title = section?.title;
  const image = section?.image;
  const actions = section?.actions;
  return (
    <section id={section?.section_id} className="block">
      <h2 className="block-title underline">{title}</h2>
      {image && (
        <div className="block-thumbnail">
          <img src={safePrefix(image)} alt={title} />
        </div>
      )}
      <div className="block-content">
        {markdownify(section?.content || ``)}
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
      </div>
    </section>
  );
};

ContentBlock.propTypes = {
  section: PropTypes.object,
};

export default ContentBlock;
