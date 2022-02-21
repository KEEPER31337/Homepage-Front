import React, { useState } from 'react';
import { connect } from 'react-redux';

import './style/height.css';

import Notice from './Component/Notice'
import Trends from './Component/Trends';
import Latest from './Component/Latest';

import Logo from 'assets/img/keeper_logo.png';

import GrayUpArrow from 'assets/img/gray-up-arrow.png';
import GrayDownArrow from 'assets/img/gray-down-arrow.png';


const Home = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="bg-mainWhite dark:bg-mainBlack text-mainBlack dark:text-mainWhite overflow-x-hidden">
        {visible && FirstPage(visible, setVisible)}
        {SecondPage(visible, setVisible)}
    </div>
  )
}

function FirstPage(visible, setVisible) {
  return (
  <div id="main-first-page" className="grid content-around">
    {<Notice />}
    <img className="m-auto" alt="keeper_logo" src={Logo}></img>
    <div className="text-xl font-semibold text-center tracking-wide dark:text-mainYellow">
      '지키다'라는 의미를 가진 단어 'KEEP'에서 착안하여, <br></br> 
      정보보호에 관한 연구를 진행하고 그 성과를 공유하기 위해 만들어진 동아리입니다.
    </div>
    {Arrow(visible, setVisible)}
  </div>
  )
}

function SecondPage(visible, setVisible) {
  return (
    <div id="main-second-page" className="pt-16">
      {!visible && Arrow(visible, setVisible)}
      {Trends()} 
      {Latest()}
    </div>
  )
}

function Arrow(visible, setVisible) {
  return (
    <a href="#">
      <img className="m-auto w-16 h-16" src={visible ? GrayUpArrow : GrayDownArrow} onClick={
        () => {
          setVisible(!visible);
        }
      }></img>
    </a>
  )
}

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(Home);