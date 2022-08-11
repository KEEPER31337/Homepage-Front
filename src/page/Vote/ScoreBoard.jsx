import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
// redux
import actionMember from 'redux/action/member';
// local
import ChartBar from './Components/ScoreBoard/GetChartBar';
import noticeImg from 'assets/img/ctfImg/notice.png';
import Header from './Components/ScoreBoard/ScoreHeader';
// api
import voteAPI from 'API/v1/vote';

const ScoreBoard = ({ member, vote }) => {
  // 투표 집계 가능한지 판단 기준!!
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    voteAPI.getVoteList({ token: member.token }).then((data) => {
      if (data.success) {
        data.page.content.map((ct) => {
          if (ct.electionId === vote.voteId) {
            setVisible(!ct.isAvailable);
            // 종료 된지 그 여부를 알고 싶기 때문에 not!
          }
        });
      } // TODO 만약 다른 이유로 데이터를 받아오는데 문제가 생겼다면???
    });
  }, []);

  // 지금 어느 직업 개표인지 판단
  const [job, setJob] = useState(1); // 1 == BOSS

  return (
    <div className="flex flex-col items-center w-full font-basic">
      <Header job={job} setJob={setJob} />
      {visible ? (
        <ChartBar member={member} vote={vote} job={job} />
      ) : (
        <div className="pt-5 grid place-items-center">
          <img className="h-24 w-24" src={noticeImg} />
          <div className="flex whitespace-pre text-center dark:text-slate-200 text-4xl m-2 font-bold">
            아직 투표가 <div className="text-mainYellow">진행중</div>입니다!
          </div>
          <div className="text-xl">투표 종료를 해주세욥!!</div>
        </div>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);
