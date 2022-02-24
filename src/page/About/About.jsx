import React from 'react';

// local
import Intro from './Component/Intro';
import Activity from './Component/Activity';
import Excellence from './Component/Excellence';
import History from './Component/History';

// shared
// import PageContainer from 'shared/PageContainer';
// import LayoutContainer from 'shared/LayoutContainer';

const About = () => {
  return (
    <div className="dark:bg-darkPoint">
      <Intro />;
      <Activity />;
      <Excellence />;
      <History />
    </div>
  );
};

export default About;
