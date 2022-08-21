import React, { useEffect, useState, useRef } from 'react';
import AuthUser from 'shared/AuthUser';
import chairman from 'assets/img/profileImg/badge/profile_badge_role_chairman.gif';
import vice_chairman from 'assets/img/profileImg/badge/profile_badge_role_vice_chairman.gif';
import clerk from 'assets/img/profileImg/badge/profile_badge_role_clerk.gif';
import external_manager from 'assets/img/profileImg/badge/profile_badge_role_external_manager.gif';
import general_affairs from 'assets/img/profileImg/badge/profile_badge_role_general_affairs.gif';
import it_manager2 from 'assets/img/profileImg/badge/profile_badge_role_it_manager2.gif';
import study_manager from 'assets/img/profileImg/badge/profile_badge_role_study_manager.gif';
import librarian from 'assets/img/profileImg/badge/profile_badge_role_librarian.gif';

const Appointment = () => {
  const index = 0;
  const [voteList, setVoteList] = useState([
    {
      name: '장서윤',
      generation: '1',
    },
  ]);

  return (
    <AuthUser>
      <div className="font-basic flex flex-1 md:flex-row flex-col items-center justify-between p-2">
        <div className="bg-violet-50 p-2 md:w-3/12 w-11/12 h-full flex flex-col text-center ">
          {/* 하나 */}
          <div className="h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md ">
            <div className="flex items-center justify-start text-indigo-900 w-1/2">
              <img src={chairman} className="inline-block w-9 h-9  mr-2" />
              회장
            </div>
            <div className="flex items-center justify-center w-1/2 text-slate-600">
              이다은
            </div>
          </div>
          <div className="h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md ">
            <div className="flex items-center justify-start text-indigo-900 w-1/2">
              <img src={vice_chairman} className="inline-block w-9 h-9  mr-2" />
              부회장
            </div>
            <div className="flex items-center justify-center w-1/2 text-slate-600">
              이다은
            </div>
          </div>
          <div className="h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md ">
            <div className="flex items-center justify-start text-indigo-900 w-1/2">
              <img src={clerk} className="inline-block w-9 h-9  mr-2" />
              서기
            </div>
            <div className="flex items-center justify-center w-1/2 text-slate-600">
              이다은
            </div>
          </div>
          <div className="h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md ">
            <div className="flex items-center justify-start text-indigo-900 w-1/2">
              <img
                src={external_manager}
                className="inline-block w-9 h-9  mr-2"
              />
              대외부장
            </div>
            <div className="flex items-center justify-center w-1/2 text-slate-600">
              이다은
            </div>
          </div>
          <div className="h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md ">
            <div className="flex items-center justify-start text-indigo-900 w-1/2">
              <img
                src={general_affairs}
                className="inline-block w-9 h-9  mr-2"
              />
              총무
            </div>
            <div className="flex items-center justify-center w-1/2 text-slate-600">
              이다은
            </div>
          </div>
          <div className="h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md ">
            <div className="flex items-center justify-start text-indigo-900 w-1/2">
              <img src={it_manager2} className="inline-block w-9 h-9  mr-2" />
              전산관리자
            </div>
            <div className="flex items-center justify-center w-1/2 text-slate-600">
              이다은
            </div>
          </div>
          <div className="h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md ">
            <div className="flex items-center justify-start text-indigo-900 w-1/2">
              <img src={it_manager2} className="inline-block w-9 h-9  mr-2" />
              전산관리자
            </div>
            <div className="flex items-center justify-center w-1/2 text-slate-600">
              이다은
            </div>
          </div>
          <div className="h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md ">
            <div className="flex items-center justify-start text-indigo-900 w-1/2">
              <img src={study_manager} className="inline-block w-9 h-9  mr-2" />
              학술부장
            </div>
            <div className="flex items-center justify-center w-1/2 text-slate-600">
              이다은
            </div>
          </div>
          <div className="h-fit w-full flex flex-row border-b mb-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md ">
            <div className="flex items-center justify-start text-indigo-900 w-1/2">
              <img src={librarian} className="inline-block w-9 h-9  mr-2" />
              사서
            </div>
            <div className="flex items-center justify-center w-1/2 text-slate-600">
              이다은
            </div>
          </div>
        </div>
        <div className="bg-violet-50 ml-2 p-2 md:w-9/12 w-full h-full flex flex-col text-center">
          <div className="bg-violet-200 w-full h-fit p-2">
            현재회장 : 정현모
          </div>
          <div className="bg-white w-full h-full flex flex-col">
            <div className="flex justify-center items-center bg-violet-50 border-2 border-violet-200 w-full h-full">
              모든 키퍼 인원 목록 보여줍싀다 (체크박스 형식)
            </div>
            <div className="bg-violet-100 flex flex-row justify-end w-full h-fit ">
              <button className="bg-white border-x-2 border-violet-200 p-1 hover:bg-violet-200">
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthUser>
  );
};

export default Appointment;
