import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  PlusSmIcon,
  PaperClipIcon,
  CogIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid';

const API_URL = process.env.REACT_APP_API_URL;
const number = 1; //디자인 1안 2안
const SimpleCard = ({ study, setFlag }) => {
  return (
    <>
      {number == 1 ? (
        <div
          name="디폴트 카드"
          className="rounded-b-lg shadow-md flex flex-col w-full h-32 overflow-hidden dark:bg-mainBlack dark:text-mainWhite"
        >
          <div className="border flex-1 flex flex-col p-2 dark:border-gray-800">
            <p className="text-2xl font-bold text-pointYellow">{study.title}</p>
            <div className="flex-1 flex items-center px-5">
              <div className="w-full text-sm grid grid-cols-2">
                <div className="space-x-2">
                  <span className="inline-block rounded-lg w-[5em] text-center text-white font-bold bg-mainYellow">
                    스터디장
                  </span>
                  <span>{study.headMember.nickName}</span>
                </div>
                <div className="space-x-2">
                  <span className="inline-block rounded-lg w-[5em] text-center text-white font-bold bg-mainYellow">
                    현재 인원
                  </span>
                  <span>{study.memberNumber}명</span>
                </div>
              </div>
            </div>
          </div>
          <button
            className="border flex justify-center p-1 bg-slate-50 hover:bg-slate-100 focus:ring-none dark:border-gray-800 dark:bg-darkComponent"
            onClick={() => setFlag(true)}
          >
            {/*<ChevronDoubleDownIcon className="inline-block h-5 w-5 m-1 text-divisionGray dark:text-slate-500 " />*/}
            <ChevronDoubleDownIcon className="inline-block h-6 w-6" />
          </button>
        </div>
      ) : (
        <button
          name="디폴트 카드"
          className="relative border rounded-lg shadow-md flex w-full h-24 overflow-hidden focus:ring-none  dark:bg-mainBlack dark:text-mainWhite dark:border-gray-800 group"
          onClick={() => setFlag(true)}
        >
          <div
            name="hover 시 보이는 것"
            className="absolute top-0 left-0 rounded-lg hidden w-full h-full bg-slate-100 bg-opacity-70 text-gray-500 font-bold group-hover:flex justify-center items-center dark:bg-gray-700 dark:bg-opacity-70 dark:text-gray-200"
          >
            클릭하여 자세히 보기
          </div>
          <div className="flex flex-col w-full h-full p-2 text-left ">
            <p className="text-2xl font-bold text-pointYellow">{study.title}</p>
            <div className="flex-1 flex items-center px-5">
              <div className="w-full text-sm grid grid-cols-2">
                <div className="space-x-2">
                  <span className="inline-block rounded-lg w-[5em] text-center text-white font-bold bg-mainYellow">
                    스터디장
                  </span>
                  <span>{study.headMember.nickName}</span>
                </div>
                <div className="space-x-2">
                  <span className="inline-block rounded-lg w-[5em] text-center text-white font-bold bg-mainYellow">
                    현재 인원
                  </span>
                  <span>{study.memberNumber}명</span>
                </div>
              </div>
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default SimpleCard;
