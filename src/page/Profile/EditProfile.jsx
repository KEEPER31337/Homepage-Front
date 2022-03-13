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
import Group from './Components/Group';

const googy =
  'https://avatars.githubusercontent.com/u/81643702?s=400&u=d3a721a495754454d238b4159bb7a2d150338424&v=4';

const EditProfile = ({ token, memberInfo, signOut, updateInfo }) => {
  const navigate = useNavigate();

  const [followCnt, setFollowCnt] = useState(null);

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

  useEffect(() => {
    memberAPI.getUsersFollowCnt({ token }).then((res) => {
      if (res.success) {
        setFollowCnt(res.data);
      }
    });
  }, []);

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
                <div className="css-font text-5xl m-1">
                  {memberInfo?.nickName}
                </div>
                {/*회원 뱃지*/}
                <div className="flex">
                  {memberInfo.rank && (
                    <div className="mr-2">
                      <Group groupName={memberInfo.rank} />
                    </div>
                  )}
                  {memberInfo.type && (
                    <div className="mr-2">
                      <Group groupName={memberInfo.type} />
                    </div>
                  )}
                  {memberInfo.jobs &&
                    memberInfo.jobs.map((job, index) => (
                      <div key={index} className="mr-2">
                        <Group groupName={job} />
                      </div>
                    ))}
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
                    <div className="p-2 mr-2 flex flex-row">
                      <div className="text-gray-500 mr-1">팔로워</div>
                      <div className="font-semibold">
                        {followCnt && followCnt.followerNumber}
                      </div>
                    </div>

                    <div className="p-2 flex flex-row">
                      <div className=" text-gray-500 mr-1">팔로우</div>
                      <div className="font-semibold">
                        {followCnt && followCnt.followeeNumber}
                      </div>
                    </div>
                  </div>
                  {/* 2-2-2 포인트 */}
                  <div className="flex w-full justify-between border-3 border-blue-500 bg-blue-300 rounded-md p-1 ">
                    <div className="css-font text-shadow  text-white sm:text-2xl md:text-xl lg:text-2xl text-xl  m-1 ">
                      Point
                    </div>
                    <div className="css-digit-font sm:text-4xl md:text-3xl lg:text-4xl text-3xl text-blue-900 pr-2 text-right">
                      {memberInfo?.point}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3.  프로필(이름, 아이디, 가입일, 생일) + 프로필 수정버튼 */}
              <div className="items-center text-left border-2 shadow p-3 m-1  rounded-md">
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5 text-gray-500">기수</div>
                  <div className="p-2 w-3/5 font-bold">{`Keeper ${memberInfo?.generation}기`}</div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5  text-gray-500">이메일</div>
                  <div className="p-2 w-3/5 font-bold">
                    {memberInfo?.emailAddress}
                  </div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5 text-gray-500">가입일</div>
                  <div className="p-2 w-3/5 font-bold">
                    {formatDate({
                      origin: memberInfo?.registerDate,
                      separator: '.',
                    })}
                  </div>
                </div>
                <div className="flex py-1 ">
                  <div className="p-2  w-2/5  text-gray-500">생일</div>
                  <div className="p-2 w-3/5 font-bold">
                    {formatDate({
                      origin: memberInfo?.birthday,
                      separator: '/',
                    })}
                  </div>
                </div>
                {/* 3-1 프로필 수정 + 탈퇴버튼 */}
                <div className="py-1 text-right">
                  <button
                    className=" border hover:bg-backGray p-2 rounded  text-md font-bold"
                    onClick={() => navigate(-1)}
                  >
                    돌아가기
                  </button>
                  <button className="m-2 border hover:bg-backGray p-2 rounded  text-md font-bold">
                    탈퇴
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* 2. 프로필 수정 컴포넌트  */}
          <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-7/12 m-2">
            <div className=" flex rounded p-1 bg-blue-300 border-2 border-blue-400 shadow-[inset_0_2px_0_1px_#ffffff]">
              <div className=" text-md ">
                <div className="m-1 p-1  rounded font-bold">
                  프로필 수정하기
                </div>
              </div>
            </div>
            <div className="mt-2 bg-white p-3 shadow-sm rounded-sm ">
              <div>
                <div className="flex sm:flex-row md:flex-col lg:flex-row flex-col w-full m-1">
                  {/* 1. [이름, 닉네임, 학번, 썸네일 수정] */}
                  <div className="w-full items-center text-left border-2 shadow p-3 m-1  rounded-md">
                    {/* 1-1. 썸네일 컴포넌트 */}
                    <div className="pb-2">
                      {/* 1-1-1 버튼 */}

                      <div className="flex relative w-1/4">
                        <button className="hover:shadow-md rounded">
                          <img
                            src={googy}
                            alt="profile"
                            className=" rounded object-center object-cover"
                          />
                          <div className="absolute bottom-0 right-0 bg-backGray rounded p-1">
                            <PencilAltIcon className="h-7 w-7 rounded" />
                          </div>
                        </button>
                      </div>
                    </div>
                    {/* 1-2. 이름, 닉네임 학번 컴포넌트 */}
                    <div>
                      {/* 1-1 이름 */}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="realName"
                          className="p-2 w-4/12 text-gray-500"
                        >
                          이름
                        </label>
                        <input
                          id="realName"
                          type="text"
                          className="w-8/12 p-2 border rounded-lg border-divisionGray focus:border-blue-400 focus:ring-blue-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9]"
                        />
                      </div>
                      {/* 1-2 닉네임 */}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="nickName"
                          className="p-2 w-4/12 text-gray-500"
                        >
                          닉네임
                        </label>
                        <input
                          id="nickName"
                          type="text"
                          className="w-8/12 p-2 border rounded-lg border-divisionGray focus:border-blue-400 focus:ring-blue-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9]"
                        />
                      </div>
                      {/* 1-3 학번 */}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="studentId"
                          className="p-2  w-4/12  text-gray-500"
                        >
                          학번
                        </label>
                        <input
                          id="studentId"
                          type="text"
                          className="w-8/12 p-2 border rounded-lg border-divisionGray
                      focus:border-blue-400 focus:ring-blue-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9]"
                        />
                      </div>

                      <div className="py-1 text-right">
                        <button className=" border bg-backGray hover:bg-gray-200 p-2 rounded  text-md font-bold">
                          저장
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* 2. [이메일, 비밀번호 수정] */}
                  <div className="w-full items-center text-left border-2 shadow p-3 m-1  rounded-md">
                    {/* 2-1. 이메일 컴포넌트 */}
                    <div className="pb-6">
                      {/* 2-1-1 이메일 입력*/}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="emailAddress"
                          className="p-2 w-4/12 text-gray-500"
                        >
                          이메일
                        </label>
                        <div className="w-8/12 flex">
                          <input
                            id="emailAddress"
                            type="email"
                            className="w-full p-2 border rounded-l-lg border-divisionGray focus:border-blue-400 focus:ring-blue-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9]"
                          />
                          <MailIcon className="bg-backGray hover:bg-gray-200 border border-divisionGray h-full w-10 rounded-r-lg text-blue-300 hover:text-blue-400" />
                        </div>
                      </div>
                      {/* 2-1-2 인증 코드 */}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="authCode"
                          className="p-2 w-6/12 text-gray-500"
                        >
                          인증코드
                        </label>
                        <div className="flex justify-end w-full">
                          <input
                            id="authCode"
                            type="text"
                            className="w-4/12 p-2 border rounded-lg border-divisionGray focus:border-blue-400 focus:ring-blue-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9]"
                          />
                        </div>
                      </div>

                      <div className="py-1 text-right">
                        <button className=" border bg-backGray hover:bg-gray-200 p-2 rounded  text-md font-bold">
                          저장
                        </button>
                      </div>
                    </div>
                    {/* 2-2. 비밀번호 컴포넌트 */}
                    <div>
                      {/* 2-2-1. 새로운 비밀번호*/}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="password"
                          className="p-2 w-5/12 text-gray-500"
                        >
                          새로운 비밀번호
                        </label>
                        <input
                          id="password"
                          type="email"
                          className="p-2 w-7/12  border rounded-lg border-divisionGray focus:border-blue-400 focus:ring-blue-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9]"
                        />
                      </div>
                      {/* 2-2-2 비밀번호 재입력 */}
                      <div className="flex py-1 ">
                        <label
                          htmlFor="confirmPassword"
                          className="p-2 w-5/12 text-gray-500"
                        >
                          비밀번호 재입력
                        </label>
                        <input
                          id="confirmPassword"
                          type="text"
                          className="w-7/12 p-2 border rounded-lg border-divisionGray focus:border-blue-400 focus:ring-blue-200 focus:ring-2 shadow-[inset_0_2px_0_1px_#f1f5f9]"
                        />
                      </div>

                      <div className="py-1 text-right">
                        <button className=" border bg-backGray hover:bg-gray-200 p-2 rounded  text-md font-bold">
                          저장
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal창 */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.member.token,
    memberInfo: state.member.memberInfo,
  };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ memberInfo }) => {
      dispatch(actionMember.updateInfo({ memberInfo }));
    },
    signOut: () => {
      dispatch(actionMember.signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
