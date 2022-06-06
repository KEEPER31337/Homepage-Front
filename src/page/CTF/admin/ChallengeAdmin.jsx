import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/outline';
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

  //문제 닫기
  // const closeProb = (e) => {
  //   ctfAPI
  //     .openProb({
  //       pid: 2,
  //       token: member.token,
  //     })
  //     .then((data) => {
  //       // TODO cid 받아와서 넣기
  //       if (data.success) {
  //         console.log(data);
  //       }
  //     });
  // };

  useEffect(() => {
    // ctfAPI
    //   .deleteProb({
    //     pid: 3,
    //     token: member.token,
    //   })
    //   .then((data) => {
    //     // TODO cid 받아와서 넣기
    //     if (data.success) {
    //       console.log(data);
    //     }
    //   });
    ctfAPI
      .getAdminProbList({
        ctfId: 2,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          console.log(data.list[1].challengeId);
          console.log(data.list[1].creatorName);

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
                          <Link to="/ctf/admin/challengeWrite">추가</Link>
                        </button>
                      </div>
                    </div>
                    <div className="flex rounded p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                      <div className=" text-md ">
                        <button className="hover:bg-amber-500  m-1 hover:text-mainWhite rounded font-bold">
                          삭제
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
                      <th className="w-2/12">문제</th>
                      <th className="w-2/12">카테고리</th>
                      <th className="w-4/12">플래그</th>

                      <th className="w-1/12">출제자</th>
                      <th className="w-1/12">점수</th>
                      <th className="w-1/12">상태</th>
                      <th className="w-1/12"></th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {rankList.map((info) => (
                      <tr key={info.challengeId} className="h-10 w-full  ">
                        {/* shadow shadow-purple-300 */}
                        <td>{info.title}</td>
                        <td>{info.category.name}</td>
                        <td>{info.flag}</td>
                        <td>{info.creatorName}</td>
                        <td>{info.score}</td>

                        <td className="dark:text-black">
                          {info.isSolvable === true ? (
                            <button
                              // onClick={closeProb}
                              className="bg-green-300 w-full rounded-md mx-1 hover:bg-green-400"
                            >
                              공개
                            </button>
                          ) : (
                            <button className="bg-amber-300 w-full rounded-md mx-1 hover:bg-amber-400">
                              비공개
                            </button>
                          )}{' '}
                        </td>
                        <td>
                          <div>
                            <input
                              type="checkbox"
                              className="w-6 h-6 checked:bg-amber-300 duration-200 border border-gray-300  align-top bg-no-repeat bg-center bg-contain focus:outline-none transition appearance-none"
                              id="checkbox1"
                            />
                          </div>
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
