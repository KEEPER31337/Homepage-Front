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
    <div id="main-first-page" className="grid items-center overflow-x-hidden mt-[28px] h-[calc(100vh-120px)]">
      {/* <FadeIn>
        <div id="main-notice">
          <Notice id="main-notice" />
        </div>
      </FadeIn> */}
      <img
        id="main-keeper-logo"
        className="m-auto sm:max-w-[60%] sm:max-h-[60%] xs:min-w-[300px] xs:min-h-[150px] max-w-[70%]"
        alt="keeper_logo"
        src={Logo}
      ></img>
      <div className="font-semibold text-center tracking-wide dark:text-mainYellow text-lg lg:text-xl">
        <TypedSlogan />
      </div>
      <a href={isDownArrow ? '#' : '#main-second-page'}>
        <img
          className="m-auto max-w-[60px]"
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
