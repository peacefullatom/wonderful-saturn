import PropTypes from 'prop-types';
import React from 'react';

import { Layout } from '../components';
import { TLayout } from '../types/types';
import htmlToReact from '../utils/htmlToReact';
import safePrefix from '../utils/safePrefix';

const Contact: React.FC<TLayout> = ({ pageContext }) => {
  const title = pageContext?.frontmatter?.title;
  const subtitle = pageContext?.frontmatter?.subtitle;
  const imgPath = pageContext?.frontmatter?.img_path;
  return (
    <Layout pageContext={pageContext}>
      <article className="post page post-full">
        <header className="post-header">
          <h1 className="post-title underline">{title}</h1>
        </header>
        {subtitle && (
          <div className="post-subtitle">{htmlToReact(subtitle)}</div>
        )}
        {imgPath && (
          <div className="post-thumbnail">
            <img src={safePrefix(imgPath)} alt={title} />
          </div>
        )}
        <div className="post-content">
          {htmlToReact(pageContext?.html)}
          <form
            name="contactForm"
            method="POST"
            netlifyHoneypot="bot-field"
            data-netlify="true"
            id="contact-form"
            className="contact-form"
          >
            <p className="screen-reader-text">
              <label>
                Don&apos;t fill this out if you&apos;re human:{' '}
                <input name="bot-field" />
              </label>
            </p>
            <p className="form-row">
              <label className="form-label">Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Your name..."
                className="form-input"
              />
            </p>
            <p className="form-row">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Your email address..."
                className="form-input"
              />
            </p>
            <p className="form-row">
              <label className="form-label">Message *</label>
              <textarea
                name="message"
                placeholder="Your message..."
                className="form-textarea"
                rows={7}
              />
            </p>
            <input type="hidden" name="form-name" value="contactForm" />
            <p className="form-row">
              <button type="submit" className="button">
                Send Message
              </button>
            </p>
          </form>
        </div>
      </article>
    </Layout>
  );
};

Contact.propTypes = {
  pageContext: PropTypes.object,
};

export default Contact;
