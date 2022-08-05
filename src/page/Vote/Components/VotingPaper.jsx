import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import vote from 'assets/img/vote.png';
const VotingPaper = ({ member }) => {
  //TODO
  //투표여부 확인 api -> 했으면 -> 진행여부(실시간) 애니메이션만
  // 안했으면 ->
  return (
    <div className="items-center flex justify-center w-8 h-11 bg-white border border-slate-300 rounded-sm shadow-sm border-b-2 mr-1 mb-1">
      <img className="h-6 w-6" src={vote}></img>
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

export default connect(mapStateToProps, mapDispatchToProps)(VotingPaper);
