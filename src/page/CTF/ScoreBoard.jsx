import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    GiftIcon,
    StarIcon
  } from '@heroicons/react/outline'
// local
import authAPI from 'API/v1/auth';
import actionMember from 'redux/action/member';


const ScoreBoard = ({ member, memberSignIn }) => {

  return (
    <div className="">
    <div className=" sm:w-full md:w-full lg:w-10/12 xl:w-8/12 container mx-auto m-4 p-5 justify-center items-center">
      {/* 1. 커스텀 색상 팔레트 */}
     

      <div className="md:flex p-1 bg-backGray border-2 shadow-sm">
        {/* NOTE 프로필 */}
        <div className="w-full m-2 ">
          <div className="p-1 bg-white">
            {/* 1.  닉네임 + 회원 뱃지 */}
            <div className="flex justify-between m-1">
              {/*닉네임*/}
              <div className="font-extrabold text-4xl m-1">SCOREBOARD</div>
              {/*회원 뱃지*/}

              
                
            </div>
            {/*구분선*/}
            <div className="p-[2px] mb-2 dark:from-purple-500 dark:via-purple-200 dark:to-amner-200 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>
            {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}

            
            <div className="w-full h-full inline-block rounded overflow-hidden text-center border">
              <table className=" dark:text-white w-full border-2 shadow  rounded-md dark:bg-darkPoint">
                <thead>
                  <tr className="h-10 bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400 rounded-md p-4 text-lg text-white font-extrabold text-center ">
                    <th>ID</th>
                    <th>name</th>
                
                    <th>score</th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr className="w-full  h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                    <td>1</td>
                    <td>기믄지</td>
                    <td><StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />100</td>
         
                  </tr>
                  <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                    <td>2</td>
                    <td>기믄지</td>
                    <td><StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />500</td>
                  
                  </tr>
                  <tr className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                    <td>3</td>
                    <td>기믄지</td>
                    <td><StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
                999</td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
      

          </div>
        </div>
        {/* NOTE 마이페이지 */}
        {/* 1. 마이페이지(작성글) 컴포넌트*/}
       
      </div>
    </div>

  </div>
);
};
 

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ScoreBoard);
