import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';

const MyPick = ({ member }) => {
  //TODO
  //투표여부 확인 api -> 했으면 -> 진행여부(실시간) 애니메이션만
  // 안했으면 ->
  return (
    <div className="text-white text-center w-full">
      {' '}
      진짜로 투표를 하던가 자신의 투표 결과를 볼 수 있는 페이지
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
