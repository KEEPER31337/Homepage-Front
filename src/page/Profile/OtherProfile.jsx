import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileFrame from './Components/Frames/ProfileFrame';
import InfoBox from './Components/InfoBox';
import { connect } from 'react-redux';
import memberAPI from 'API/v1/member';
import actionMember from 'redux/action/member';

//NOTE 프로필 UI
import './fonts.css';
import {
  AcademicCapIcon,
  GiftIcon,
  SparklesIcon,
  MailIcon,
  PencilAltIcon,
} from '@heroicons/react/solid';
import MessageModal from 'shared/MessageModal';

const OtherProfile = () => {
  const googy =
    'https://avatars.githubusercontent.com/u/81643702?s=400&u=d3a721a495754454d238b4159bb7a2d150338424&v=4';
  // 'https://avatars.githubusercontent.com/u/23546441?s=400&u=db7abf2929e5518c12189034dc3fed9bda94f0a6&v=4';
  const color = 'blue';
  const alertFollowerModalRef = useRef({});
  const alertFollowingModalRef = useRef({});
  //팔로워 불러오는 api
  const showFollower = () => {
    alertFollowerModalRef.current.open();
  };
  //팔로잉 불러오는 api
  const showFollowing = () => {
    alertFollowingModalRef.current.open();
  };
  return (
    <div className="">
      <div className="sm:w-full md:w-full lg:w-10/12 xl:w-8/12 container mx-auto m-4 p-5 justify-center items-center">
        {/* 1. 커스텀 색상 팔레트 */}
        <div className="grid w-auto  place-items-end ">
          <div className="flex">
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-red-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-orange-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-amber-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-blue-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-green-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-violet-400 " />
            <SparklesIcon className=" m-1 bg-gray-100 h-9 w-9 rounded text-zinc-400 " />
          </div>
        </div>

        <div className="md:flex p-1 bg-backGray border-2 shadow-sm">
          {/* NOTE 프로필 */}
          <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-5/12 m-2 ">
            <div className="p-1 bg-white">
              {/* 1.  닉네임 + 회원 뱃지 */}
              <div className="flex justify-between m-1">
                {/*닉네임*/}
                <div className="css-font text-5xl m-1">GOOGY</div>
                {/*회원 뱃지*/}
                <div className="flex">
                  <AcademicCapIcon className=" m-1 bg-gray-100 h-10 w-10 rounded text-black " />
                  <GiftIcon className="h-10 w-10 m-1 bg-gray-100 rounded text-blue-400" />
                </div>
              </div>
              {/*구분선*/}
              <div className="p-[2px] mb-2 bg-gradient-to-r from-blue-300 via-blue-200 to-yellow-300  "></div>
              {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}
              <div className="flex ">
                {/* 2-1. 프로필 이미지 */}
                <div className="w-1/2 m-1">
                  <div className="p-1 bg-gradient-to-r from-blue-300 via-blue-200 to-yellow-300 rounded">
                    <img
                      src={googy}
                      alt="profile"
                      className="w-full h-full rounded object-center object-cover"
                    />
                  </div>
                </div>

                {/* 2-2(내 프로필). 팔로우 + 포인트 (== 썸네일 옆 프로필 정보) */}
                <div className="w-1/2 flex flex-col justify-between m-1">
                  {/* 2-2-1 팔로우, 팔로워 */}
                  <div className="flex w-full justify-end">
                    <button
                      onClick={showFollower}
                      className="p-2 mr-2 flex flex-row hover:bg-backGray"
                    >
                      <div className="text-gray-500 mr-1">팔로워</div>
                      <div className="font-semibold">4</div>
                    </button>

                    <button
                      onClick={showFollowing}
                      className="p-2 flex flex-row hover:bg-backGray"
                    >
                      <div className=" text-gray-500 mr-1">팔로우</div>
                      <div className="font-semibold">6</div>
                    </button>
                  </div>
                  {/* 2-2-2 포인트 */}
                  <div className="flex w-full justify-between border-3 border-blue-500 bg-blue-300 rounded-md p-1 ">
                    <div className="css-font text-shadow  text-white sm:text-2xl md:text-xl lg:text-2xl text-xl  m-1 ">
                      Point
                    </div>
                    <div className="css-digit-font sm:text-4xl md:text-3xl lg:text-4xl text-3xl text-blue-900 pr-2 text-right">
                      7,923,456
                    </div>
                  </div>
                </div>
                {/* 2-3(다른 회원 프로필). 팔로우 + 포인트선물 (== 썸네일 옆 프로필 정보) */}
                <div className="w-1/2 flex flex-col justify-between m-1">
                  <div className="w-full flex flex-col text-center ">
                    <span className="p-2 mb-2 bg-blue-300 hover:bg-blue-500 border-2 border-blue-300 rounded text-white font-bold">
                      팔로우
                    </span>
                    <span className="p-2 hover:bg-gray-100 border-2 rounded font-bold">
                      포인트 선물
                    </span>
                  </div>
                </div>
              </div>

              {/* 3.  프로필(이름, 아이디, 가입일, 생일) + 프로필 수정버튼 */}
              <div className="items-center text-left border-2 shadow p-3 m-1  rounded-md">
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5 text-gray-500">이름</div>
                  <div className="p-2 w-3/5 font-bold">장서윤</div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5  text-gray-500">아이디</div>
                  <div className="p-2 w-3/5 font-bold">yrt7998</div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5 text-gray-500">가입일</div>
                  <div className="p-2 w-3/5 font-bold">2021.03.14</div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5  text-gray-500">생일</div>
                  <div className="p-2 w-3/5 font-bold">2002/02/07</div>
                </div>
              </div>
            </div>
          </div>
          {/* NOTE 마이페이지 */}
          {/* 1. 마이페이지(작성글) 컴포넌트*/}
          <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-7/12 m-2">
            <div className=" flex rounded p-1 bg-blue-300 border-2 border-blue-400 shadow-[inset_0_2px_0_1px_#ffffff]">
              <div className=" text-md ">
                <button className="hover:bg-blue-500  m-1 p-1 hover:text-mainWhite rounded font-bold">
                  작성글
                </button>
                |
                <button className="hover:bg-blue-500  m-1 p-1 hover:text-mainWhite rounded font-bold">
                  임시저장글
                </button>
                |
                <button className="hover:bg-blue-500  m-1 p-1 hover:text-mainWhite rounded font-bold">
                  포인트내역
                </button>
              </div>
            </div>
            <div className="mt-2 bg-white p-3 shadow-sm rounded-sm ">
              <div className="w-full h-full inline-block rounded overflow-hidden text-center border">
                <table className="w-full border-2 shadow  rounded-md">
                  <thead>
                    <tr className="h-10 bg-gray-100  border-b-2">
                      <th>번호</th>
                      <th>게시판</th>
                      <th>제목</th>
                      <th>날짜</th>
                      <th>조회수</th>
                      <th>추천수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>0</td>
                      <td>공지사항</td>
                      <td>안냐새요</td>
                      <td>2022-03-08T14:22:46</td>
                      <td>4</td>
                      <td>0</td>
                    </tr>
                    <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>1</td>
                      <td>공지사항</td>
                      <td>안녕하세요2</td>
                      <td>2022-03-08T14:23:22</td>
                      <td>29</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button className="w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 hover:shadow-xs p-3 my-1">
                다음으로
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal창 */}
      <MessageModal ref={alertFollowerModalRef}>팔로워 목록창</MessageModal>
      <MessageModal ref={alertFollowingModalRef}>팔로잉 목록창</MessageModal>
    </div>
  );
};

export default OtherProfile;
