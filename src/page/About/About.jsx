import React from 'react';
import Intro from './Intro';
import Activity from './Activity';
import Excellence from './Excellence';
import History from './History';
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
