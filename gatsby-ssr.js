import React from 'react';

const safePrefix = require('./src/utils/safePrefix').default;

module.exports = {
  onRenderBody: function({ setHeadComponents, setPostBodyComponents }) {
    setHeadComponents([]);

    setPostBodyComponents([
      <React.Fragment key={0}>
        <script src={safePrefix('assets/js/plugins.js')} />
        <script src={safePrefix('assets/js/main.js')} />
      </React.Fragment>,
    ]);
  },
};
