import React from 'react';
import Layout from './src/components/layout';

const safePrefix = require('./src/utils/safePrefix').default;

module.exports = {
  onRenderBody: ({ setHeadComponents, setPostBodyComponents }) => {
    setHeadComponents([]);

    setPostBodyComponents([
      <React.Fragment key={0}>
        <script src={safePrefix('assets/js/plugins.js')} />
        <script src={safePrefix('assets/js/main.js')} />
      </React.Fragment>,
    ]);
  },
  wrapPageElement: ({ element, props }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return <Layout {...props}>{element}</Layout>;
  },
};
