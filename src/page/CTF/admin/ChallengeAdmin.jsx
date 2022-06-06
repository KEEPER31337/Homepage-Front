import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import ctfAPI from 'API/v1/ctf';
import moment from 'moment';
import 'moment/locale/ko';
// local
import authAPI from 'API/v1/auth';
import actionMember from 'redux/action/member';
import NavigationLayout from '../Components/NavigationLayout';
import Table from '../Components/Table';

const ChallengeAdmin = ({ member, memberSignIn }) => {
  const [rankList, setRankList] = useState([]);
  const [page, setPage] = useState(0);
  const [canGoNext, setCanGoNext] = useState(false);
  const [canGoPrev, setCanGoPrev] = useState(false);

  useEffect(() => {
    ctfAPI
      .getAdminProbList({
        ctfId: 2,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          console.log(data.list[0].isSolvable);

          setRankList(data.list);
        }
      });
  }, []);

  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}

          <div className="md:flex p-1 mt-2">
            <div className="w-full m-2 ">
              <div className="p-1 bg-white">
                <div className="flex justify-between m-1">
                  <div className="font-extrabold text-4xl m-1">
                    문제관리페이지
                  </div>

                  <div className="flex m-1">
                    <div className="mr-1 flex rounded p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                      <div className=" text-md ">
                        <button className="hover:bg-amber-500  m-1 hover:text-mainWhite rounded font-bold">
                          <Link to="/ctf/admin/challengeWrite">문제추가</Link>
                        </button>
                      </div>
                    </div>
                    <div className="flex rounded p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                      <div className=" text-md ">
                        <button className="hover:bg-amber-500  m-1 hover:text-mainWhite rounded font-bold">
                          문제 관리
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/*구분선*/}
              </div>
              <div className="p-[2px] mb-2 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>

              <div className="w-full h-1/12 flex rounded overflow-auto">
                <table className="text-center h-full w-full bg-white dark:text-white dark:bg-darkPoint">
                  <thead>
                    <tr className=" h-10 w-full bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400  text-lg text-white font-extrabold text-center ">
                      <th className="w-1/12">번호</th>
                      <th className="w-2/12">문제</th>
                      <th className="w-2/12">카테고리</th>
                      <th className="w-3/12">플래그</th>

                      <th className="w-1/12">출제자</th>
                      <th className="w-1/12">점수</th>
                      <th className="w-1/12">상태</th>
                      <th className="w-1/12"></th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {rankList.map((info) => (
                      <tr key={info.id} className="h-10 w-full  ">
                        {/* shadow shadow-purple-300 */}
                        <td>1</td>
                        <td>제목이 긴 문제당</td>
                        {/* <td>{info.title}</td> */}
                        <td>{info.category.name}</td>
                        <td>{info.flag}</td>
                        <td>{info.creatorName}</td>
                        <td>{info.score}</td>

                        <td className="dark:text-black">
                          {info.isSolvable === true ? (
                            <div className="bg-green-300 rounded-md mx-1 hover:bg-green-400">
                              공개
                            </div>
                          ) : (
                            <div className="bg-amber-300 rounded-md mx-1 hover:bg-amber-400">
                              비공개
                            </div>
                          )}{' '}
                        </td>
                        <td>
                          {' '}
                          <input
                            class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            checked
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/*네비게이션*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ChallengeAdmin);
