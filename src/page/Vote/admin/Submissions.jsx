import React, { useState } from 'react';
import { connect } from 'react-redux';
// redux
import actionMember from 'redux/action/member';
//local
import Header from '../Components/Submissions/SubmitHeader';
import Content from '../Components/Submissions/SubmitContent';
import getContentData from '../Components/Submissions/GetContentData';

const Submissions = ({ member, vote }) => {
  // 현재 어느 목록의 후보자를 보여줄 것인지
  const [job, setJob] = useState(1); // 1 == 회장
  const current = getContentData({ member, vote, job });

  return (
    <div className="flex flex-1 justify-center ">
      <div className="flex flex-col w-fit mt-5">
        <Header job={job} setJob={setJob} />
        <Content memberList={current} />
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member, vote: state.vote };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Submissions);
