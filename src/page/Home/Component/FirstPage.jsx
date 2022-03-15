import React from 'react';
import FadeIn from 'react-fade-in';

import '../style/scale.css';
import Notice from './Notice';
import TypedSlogan from './TypedSlogan';

import Logo from 'assets/img/keeper_logo.png';
import GrayUpArrow from 'assets/img/gray-up-arrow.png';
import GrayDownArrow from 'assets/img/gray-down-arrow.png';

const FirstPage = ({ setIsDownArrow, isDownArrow }) => {
  return (
    <div id="main-first-page" className="grid overflow-x-hidden">
      {/* <FadeIn>
        <div id="main-notice">
          <Notice id="main-notice" />
        </div>
      </FadeIn> */}
      <img
        id="main-keeper-logo"
        className="m-auto h-auto w-auto"
        alt="keeper_logo"
        src={Logo}
      ></img>
      <div className="font-semibold text-center tracking-wide dark:text-mainYellow text-lg sm:text-xl lg:text-xl">
        <TypedSlogan />
      </div>
      <a href={isDownArrow ? '#' : '#main-second-page'}>
        <img
          className="m-auto w-16 h-16 mt-4 mb-4"
          src={isDownArrow ? GrayDownArrow : GrayUpArrow}
          onClick={() => {
            setIsDownArrow(!isDownArrow);
          }}
        />
      </a>
    </div>
  );
};

export default FirstPage;
