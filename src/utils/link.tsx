import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

export interface Link {
  children: React.ReactNode;
  to: string;
  activeClassName?: string;
  partiallyActive?: boolean;
  id?: string;
  className?: string;
  target?: string;
  rel?: string;
}

const Link: React.FC<Link> = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  ...other
}) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    );
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
  activeClassName: PropTypes.string,
  partiallyActive: PropTypes.bool,
};

export default Link;
