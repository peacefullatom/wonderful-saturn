import PropTypes from 'prop-types';
import React from 'react';

import components, { Layout } from '../components';
import { TLayout } from '../types/types';

const Home: React.FC<TLayout> = ({ pageContext }) => {
  return (
    <Layout pageContext={pageContext}>
      {(pageContext?.frontmatter?.sections ?? []).map((section, sectionIdx) => {
        const component = section?.component;
        if (component) {
          const GetSectionComponent = components[component];
          return (
            <GetSectionComponent
              key={sectionIdx}
              pageContext={pageContext}
              section={section}
            />
          );
        }
      })}
    </Layout>
  );
};

Home.propTypes = {
  pageContext: PropTypes.object,
};

export default Home;
