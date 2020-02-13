import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { TLayout } from '../types/types';
import safePrefix from '../utils/safePrefix';
import Social from './social';

const Header: React.FC<TLayout> = ({ pageContext }) => {
  const profileImg = pageContext?.site?.siteMetadata?.header?.profile_img;
  const template = pageContext?.frontmatter?.template;
  const title = pageContext?.site?.siteMetadata?.header?.title;
  const tagline = pageContext?.site?.siteMetadata?.header?.tagline;
  const main = pageContext?.menus?.main;
  const hasNav = pageContext?.site?.siteMetadata?.header?.has_nav;
  return (
    <header
      id="masthead"
      className={'site-header ' + pageContext?.site?.siteMetadata?.header?.bg}
    >
      <div className="site-header-wrap">
        <div className="site-header-inside">
          <div className="site-branding">
            {profileImg && (
              <p className="profile">
                <Link to={safePrefix('/')}>
                  <img
                    src={safePrefix(profileImg)}
                    className="avatar"
                    alt="Author Avatar"
                  />
                </Link>
              </p>
            )}
            <div className="site-identity">
              {template === 'home' || template === 'blog' ? (
                <h1 className="site-title">
                  <Link to={safePrefix('/')}>{title}</Link>
                </h1>
              ) : (
                <p className="site-title">
                  <Link to={safePrefix('/')}>{title}</Link>
                </p>
              )}
              {tagline && <p className="site-description">{tagline}</p>}
            </div>
            {main && hasNav && (
              <button id="menu-toggle" className="menu-toggle">
                <span className="screen-reader-text">Menu</span>
                <span className="icon-menu" aria-hidden="true" />
              </button>
            )}
          </div>
          {main && hasNav && (
            <nav
              id="main-navigation"
              className="site-navigation"
              aria-label="Main Navigation"
            >
              <div className="site-nav-wrap">
                <div className="site-nav-inside">
                  <ul className="menu">
                    {main.map((item, itemIdx) => {
                      const itemUrl = item?.url || '';
                      return (
                        <li
                          key={itemIdx}
                          className={
                            'menu-item ' +
                            (pageContext?.url === itemUrl
                              ? ' current-menu-item'
                              : '')
                          }
                        >
                          <Link to={safePrefix(itemUrl)}>{item?.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                  {pageContext?.site?.siteMetadata?.header?.has_social && (
                    <Social pageContext={pageContext} />
                  )}
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  pageContext: PropTypes.object,
};

export default Header;
