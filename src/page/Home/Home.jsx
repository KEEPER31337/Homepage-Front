import React from 'react';
import Trends from './src/Trends';
import Latest from './src/Latest';

import Logo from 'assets/img/keeper_logo.png';

const Home = () => {
  return (
    <div className="home">
      <div class="fixed top-28 inset-x-0 pb-2 sm:pb-5">
        <div class="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="p-2 rounded-lg bg-mainYellow shadow-lg sm:p-3">
            <div class="flex items-center justify-between flex-wrap">
              <div class="w-0 flex-1 flex items-center">
                <span class="flex p-2 rounded-lg bg-mainYellow border-2 border-white">
                  {/* <!-- Heroicon name: outline/speakerphone --> */}
                  <svg
                    class="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </span>
                <p class="ml-3 font-medium text-white truncate">
                  <span class="md:hidden"> We announced a new product! </span>
                  <span class="hidden md:inline">
                    {' '}
                    Big news! We're excited to announce a brand new product.{' '}
                  </span>
                </p>
              </div>
              <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a
                  href="#"
                  class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-mainYellow bg-white hover:bg-indigo-50"
                >
                  {' '}
                  Learn more{' '}
                </a>
              </div>
              <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button
                  type="button"
                  class="-mr-1 flex p-2 rounded-md hover:bg-mainYellow focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span class="sr-only">Dismiss</span>
                  {/* <!-- Heroicon name: outline/x --> */}
                  <svg
                    class="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img className="m-auto pt-60" alt="keeper_logo" src={Logo}></img>
      <div className="text-xl tracking-tight font-extrabold text-gray-900 text-center my-20 mb-60">
        '지키다'라는 의미를 가진 단어 'KEEP'에서 착안하여, <br></br>
        정보보호에 관한 연구를 진행하고 그 성과를 공유하기 위해 만들어진
        동아리입니다.
      </div>
      {/* <section className="number_of_visitors">
        <div className="text-center pt-32">KEEPER의 어제, 오늘, 그리고 누적 방문자 수</div>
        TO DO : Back-End에서 방문자 수 받아와서 출력해야 함
        <div className="text-center">어제: 94, 오늘: 98, 전체: 167,621</div>
      </section> */}
      {Trends()}
      {Latest()}
    </div>
  );
};

export default Home;
