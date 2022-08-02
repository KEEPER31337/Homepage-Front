import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import VoteSelect from './Components/VoteSelect';

const MyPick = ({ member }) => {
  //TODO
  //투표여부 확인 api -> 했으면 -> 진행여부(실시간) 애니메이션만
  // 안했으면 ->
  return (
    <div className="md:w-4/5 w-full p-3 text-xl font-basic flex justify-center">
      <div className="h-full w-full flex container justify-center bg-slate-50 items-center p-3">
        {/* 투표용지 */}
        <div className="h-full md:w-5/12 w-full flex flex-col p-3 bg-white border border-slate-100 shadow-md">
          <div className="mt-2 mb-4 text-center "> 2022년 2학기 </div>

          <div className="flex flex-row w-full">
            <div className="w-2/6 items-center p-2">회장</div>
            <div className="w-4/6">
              <VoteSelect />
            </div>
          </div>
          <div className="flex flex-row w-full ">
            <div className="w-2/6 text-xl font-basic flex items-center p-2">
              부회장
            </div>
            <div className="w-4/6">
              <VoteSelect />
            </div>
          </div>
          <div className="flex flex-row w-full ">
            <div className="w-2/6 text-xl font-basic flex items-center p-2">
              총무
            </div>
            <div className="w-4/6">
              <VoteSelect />
            </div>
          </div>
          <div className="flex justify-between">
            <div></div>

            <button class="bg-slate-100 border-slate-300 rounded border-b-4 mt-4 px-4 py-1  hover:bg-slate-200">
              투표
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPick);
