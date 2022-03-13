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

const googy =
  'https://avatars.githubusercontent.com/u/81643702?s=400&u=d3a721a495754454d238b4159bb7a2d150338424&v=4';

const add0 = (num, maxDigits) => {
  let digits = 10;
  let result = num.toString();
  for (let i = 1; i < maxDigits; i++) {
    if (parseInt(num / digits) == 0) result = '0' + result;
    digits *= 10;
  }
  return result;
};

const stringfyDate = (dateClass) => {
  return {
    year: add0(dateClass.getFullYear(), 4),
    month: add0(dateClass.getMonth() + 1, 2),
    date: add0(dateClass.getDate(), 2),
  };
};

const formatDate = ({ origin, separator }) => {
  if (!origin) return;
  const { year, month, date } = stringfyDate(new Date(origin));
  return [year, month, date].join(separator);
};

const heads = ['번호', '카테고리', '제목', '날짜', '조회수', '추천수'];
const mapper = (list) => {
  return list?.map((item, index) => ({
    num: index + 1,
    category: item.category,
    title: item.title,
    createdAt: formatDate({ origin: item.registerTime, separator: '.' }),
    visitCount: item.visitCount,
    likeCount: item.likeCount,
  }));
};

const OtherProfile = ({ token, memberInfo, userId }) => {
  const [items, setItems] = useState(new Array());
  const [page, setPage] = useState(0);
  const size = 10;

  const renderItemComponents = (item) => {
    const itemComponents = new Array();
    for (const key in item) {
      itemComponents.push(<td className="text-center">{item[key]}</td>);
    }
    return itemComponents.map((component) => component);
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
                <div className="m-1 p-1 rounded font-bold">작성글</div>
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
                    {items.map((item) => (
                      <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                        {renderItemComponents(item)}
                      </tr>
                    ))}
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
    </div>
  );
};

export default OtherProfile;
