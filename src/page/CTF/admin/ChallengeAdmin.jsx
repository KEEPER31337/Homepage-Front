import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// local
import authAPI from 'API/v1/auth';
import actionMember from 'redux/action/member';
import NavigationLayout from '../Components/NavigationLayout';

const ChallengeAdmin = ({ member, memberSignIn }) => {
  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}

          <div className="h-full w-full mx-auto justify-center items-center">
            <div className="p-1 bg-white">
              <div className="flex justify-between m-1">
                <div className="font-extrabold text-4xl m-1">
                  Challenges-Admin
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
                        문제 삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/*구분선*/}
              <div className="p-[2px] mb-2 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>

              <table className="w-full h-full border-4 rounded  text-center">
                <thead>
                  <tr className="h-10 bg-gray-100  border-b-2">
                    <th>ID</th>
                    <th>title</th>
                    <th>category</th>
                    <th>score</th>
                    <th>writer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                    <td>1</td>
                    <td>어려운 문제</td>
                    <td>포렌식</td>
                    <td>100</td>
                    <td>김은지</td>
                  </tr>
                  <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                    <td>1</td>
                    <td>어려운 문제</td>
                    <td>포렌식</td>
                    <td>100</td>
                    <td>김은지</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* NOTE 마이페이지 */}
            {/* 1. 마이페이지(작성글) 컴포넌트*/}
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
