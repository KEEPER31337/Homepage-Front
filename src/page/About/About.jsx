import React from 'react';
import Intro from './Component/Intro';
import Activity from './Component/Activity';
import Excellence from './Component/Excellence';
import History from './Component/History';
// shared
// import PageContainer from 'shared/PageContainer';
// import LayoutContainer from 'shared/LayoutContainer';

const About = () => {
  return (
    <div>
      <Intro />;
      <Activity />;
      <Excellence />;
      <History />
    </div>
  );
};

export default About;
