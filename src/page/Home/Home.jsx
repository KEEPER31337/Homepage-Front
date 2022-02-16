import React from 'react';
import Trends from './src/Trends';
import Latest from './src/Latest';
import './style/height.css';

const Home = () => {
  return (
    <div className="home">
      <div id="main-first-page" className="grid content-around">
        <div className="mt-0">
          <div className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="p-2 rounded-lg bg-mainYellow shadow-lg sm:p-3">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center">
                  <span className="flex p-2 rounded-lg bg-mainYellow border-2 border-white">
                    {/* <!-- Heroicon name: outline/speakerphone --> */}
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </span>
                  <p className="ml-3 font-medium text-white truncate">
                    <span className="md:hidden"> We announced a new product! </span>
                    <span className="hidden md:inline"> Big news! We're excited to announce a brand new product. </span>
                  </p>
                </div>
                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                  <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-mainYellow bg-white hover:bg-indigo-50"> Learn more </a>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button type="button" className="-mr-1 flex p-2 rounded-md hover:bg-mainYellow focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Dismiss</span>
                    {/* <!-- Heroicon name: outline/x --> */}
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="m-auto" alt="keeper_logo" src={require("../../assets/img/keeper_logo.png").default}></img>
        <div className="text-xl font-semibold text-gray-900 text-center">
          '지키다'라는 의미를 가진 단어 'KEEP'에서 착안하여, <br></br> 
          정보보호에 관한 연구를 진행하고 그 성과를 공유하기 위해 만들어진 동아리입니다.
        </div>
        <a href="#main-second-page">
          <img className="m-auto w-16 h-16" alt="down_arrow" src={require("../../assets/img/down_arrow.png").default}></img>
        </a>
      </div>
      <div id="main-second-page" className="pt-16">
        <a href="#main-first-page">
          <img className="m-auto w-16 h-16" alt="down_arrow" src={require("../../assets/img/up_arrow.png").default}></img>
        </a>
        {Trends()} 
        {Latest()}
      </div>
    </div>
  );
};

export default Home;
