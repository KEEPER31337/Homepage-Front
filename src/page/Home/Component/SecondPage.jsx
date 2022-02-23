import React, { useState } from 'react';

import '../style/height.css';
import Trends from './Trends';
import Latest from './Latest';

import GrayUpArrow from 'assets/img/gray-up-arrow.png';
import GrayDownArrow from 'assets/img/gray-down-arrow.png';

const SecondPage = ({ goToFirst, visibleArrow }) => {
  return (
    <div id="main-second-page" className="pt-16">
      {!visibleArrow && (
        <a href="#">
          <img
            className="m-auto w-16 h-16"
            src={GrayDownArrow}
            onClick={() => {
              goToFirst();
            }}
          ></img>
        </a>
      )}
      <Trends />
      <Latest />
    </div>
  );
};

export default SecondPage;
