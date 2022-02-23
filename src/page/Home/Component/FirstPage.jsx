import React, { useState } from 'react';

import '../style/height.css';
import Notice from './Notice';
import Logo from 'assets/img/keeper_logo.png';

import GrayUpArrow from 'assets/img/gray-up-arrow.png';

const FirstPage = ({ goToSecond }) => {
  return (
    <div id="main-first-page" className="grid content-around">
      {<Notice />}
      <img
        className="m-auto w-3/4 lg:w-fit "
        alt="keeper_logo"
        src={Logo}
      ></img>
      <div className="font-semibold text-center tracking-wide dark:text-mainYellow text-lg sm:text-xl lg:text-xl">
        '지키다'라는 의미를 가진 단어 'KEEP'에서 착안하여, <br></br>
        정보보호에 관한 연구를 진행하고 그 성과를 공유하기 위해 만들어진
        동아리입니다.
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
