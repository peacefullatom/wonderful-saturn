import PropTypes from 'prop-types';
import React from 'react';

import { TLayout } from '../types/types';
import htmlToReact from '../utils/htmlToReact';
import Link from '../utils/link';

const Footer: React.FC<TLayout> = ({ pageContext }) => (
  <footer id="colophon" className="site-footer">
    <p className="site-info">
      {htmlToReact(pageContext?.site?.siteMetadata?.footer?.content ?? '')}
      &nbsp;
      {(pageContext?.site?.siteMetadata?.footer?.links ?? []).map(
        (link, linkIdx) => (
          <React.Fragment key={linkIdx}>
            <Link
              key={linkIdx}
              to={link?.url || ''}
              {...(link?.new_window
                ? { target: '_blank', rel: 'noopener' }
                : null)}
            >
              {link?.text}
            </Link>
            .
          </React.Fragment>
        )
      )}
    </p>
    <Link id="to-top" className="to-top" to="#page">
      <span className="icon-arrow-up" aria-hidden="true" />
      <span className="screen-reader-text">Back to top</span>
    </Link>
  </footer>
);

Footer.propTypes = {
  pageContext: PropTypes.object,
};

export default Footer;
