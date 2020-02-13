import PropTypes from 'prop-types';
import React from 'react';

import { TLayout } from '../types/types';
import Link from '../utils/link';

const Social: React.FC<TLayout> = ({ pageContext }) => {
  return (
    <div className="social-links">
      {pageContext?.site?.data?.social?.links.map(
        (link, linkIdx) =>
          link && (
            <Link
              key={linkIdx}
              to={link?.url ?? ''}
              target="_blank"
              rel="noopener"
            >
              <span className={'fab ' + link?.icon} aria-hidden="true" />
              <span className="screen-reader-text">{link?.title}</span>
            </Link>
          )
      )}
    </div>
  );
};

Social.propTypes = {
  pageContext: PropTypes.object,
};

export default Social;
