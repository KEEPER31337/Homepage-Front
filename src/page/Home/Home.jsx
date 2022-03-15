import React, { useState } from 'react';
import { connect } from 'react-redux';

import AOS from 'aos';
import 'aos/dist/aos.css'; 
import './style/scale.css';
import './style/drag.css';

import FirstPage from './Component/FirstPage';
import SecondPage from './Component/SecondPage';

const Home = () => {
  const [isDownArrow, setIsDownArrow] = useState(true);

  AOS.init();

  return (
    <div className="overflow-x-hidden drag-false bg-mainWhite dark:bg-mainBlack text-mainBlack dark:text-mainWhite">
      <FirstPage isDownArrow={isDownArrow} setIsDownArrow={setIsDownArrow}/>
      <SecondPage/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(Home);
