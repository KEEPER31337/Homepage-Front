import React, {useState} from 'react';
import Notice from './src/Notice'
import Trends from './src/Trends';
import Latest from './src/Latest';
import './style/height.css';
import Logo from 'assets/img/keeper_logo.png';
import UpArrow from 'assets/img/up_arrow.png';
import DownArrow from 'assets/img/down_arrow.png';


const Home = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="home">
        {visible && FirstPage(visible, setVisible)}
        {SecondPage(visible, setVisible)}
    </div>
  );
};

function FirstPage(visible, setVisible) {
  return (
  <div id="main-first-page" className="grid content-around">
    {Notice()}
    <img className="m-auto" alt="keeper_logo" src={Logo}></img>
    <div className="text-xl font-semibold text-gray-900 text-center">
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
      <img className="m-auto w-16 h-16" src={visible ? UpArrow : DownArrow} onClick={
        () => {
          setVisible(!visible);
        }
      }></img>
    </a>
  )
}


export default Home;
