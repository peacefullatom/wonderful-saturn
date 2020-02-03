import _ from 'lodash';
import React from 'react';

import { Link, safePrefix } from '../utils';
import Social from './Social';

export default class Header extends React.Component {
  render() {
    const profile_img = _.get(this.props, 'pageContext.site.siteMetadata.header.profile_img');
    const template = _.get(this.props, 'pageContext.frontmatter.template');
    const title = _.get(this.props, 'pageContext.site.siteMetadata.header.title');
    const tagline = _.get(this.props, 'pageContext.site.siteMetadata.header.tagline');
    const main = _.get(this.props, 'pageContext.menus.main');
    const has_nav = _.get(this.props, 'pageContext.site.siteMetadata.header.has_nav');
    return (
      <header id="masthead" className={'site-header ' + _.get(this.props, 'pageContext.site.siteMetadata.header.bg')}>
        <div className="site-header-wrap">
          <div className="site-header-inside">
            <div className="site-branding">
              {profile_img && (
                <p className="profile">
                  <Link to={safePrefix('/')}>
                    <img src={safePrefix(profile_img)} className="avatar" alt="Author Avatar" />
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
              {main && has_nav && (
                <button id="menu-toggle" className="menu-toggle">
                  <span className="screen-reader-text">Menu</span>
                  <span className="icon-menu" aria-hidden="true" />
                </button>
              )}
            </div>
            {main && has_nav && (
              <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                <div className="site-nav-wrap">
                  <div className="site-nav-inside">
                    <ul className="menu">
                      {_.map(main, (item, item_idx) => (
                        <li
                          key={item_idx}
                          className={
                            'menu-item ' + (_.get(this.props, 'pageContext.url') === _.get(item, 'url') ? ' current-menu-item' : '')
                          }
                        >
                          <Link to={safePrefix(_.get(item, 'url'))}>{_.get(item, 'title')}</Link>
                        </li>
                      ))}
                    </ul>
                    {_.get(this.props, 'pageContext.site.siteMetadata.header.has_social') && <Social {...this.props} />}
                  </div>
                </div>
              </nav>
            )}
          </div>
        </div>
      </header>
    );
  }
}
