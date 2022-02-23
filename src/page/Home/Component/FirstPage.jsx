import React, { useState } from 'react';

import '../style/height.css';
import Notice from './Notice';
import TypedSlogan from './TypedSlogan';
import Logo from 'assets/img/keeper_logo.png';

import GrayUpArrow from 'assets/img/gray-up-arrow.png';

const FirstPage = ({ goToSecond }) => {
  return (
    <div id="main-first-page" className="grid content-around overflow-x-hidden">
      <Notice />
      <img
        className="m-auto w-3/4 lg:w-fit "
        alt="keeper_logo"
        src={Logo}
      ></img>
      <div className="font-semibold text-center tracking-wide dark:text-mainYellow text-lg sm:text-xl lg:text-xl">
        <TypedSlogan />
      </div>
      <a href="#">
        <img
          className="m-auto w-16 h-16"
          src={GrayUpArrow}
          onClick={() => {
            goToSecond();
          }}
        ></img>
      </a>
    </div>
  );
};

export default FirstPage;
