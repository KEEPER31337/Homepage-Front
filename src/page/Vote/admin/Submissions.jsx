import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Marquee from 'react-fast-marquee';

// redux
import actionMember from 'redux/action/member';
//local
import Header from '../Components/Submissions/SubmitHeader';
import Content from '../Components/Submissions/SubmitContent';
// API
import memberAPI from 'API/v1/member';
import voteAPI from 'API/v1/vote';

const BOSS = 1; // 회장
const MIDDLEBOSS = 2; // 부회장
const MONEYMEN = 3; // 총무
const USER = 4; // 활동인원

const Submissions = ({ member, vote }) => {
  // TODO 각 후보자 목록 받아오는 걸로 바꾸기
  const [memberList, setMemberList] = useState([]);
  // TODO 아래로!
  const [current, setCurrent] = useState([]);
  const [BossCandidate, setBoss] = useState([]);
  const [MiddleCandidate, setMiddle] = useState([]);
  const [MoneyCandidate, setMoney] = useState([]);
  const [Voters, setvoters] = useState([]);
  useEffect(() => {
    memberAPI.getMembers({ token: member.token }).then((data) => {
      if (data.success) {
        setMemberList(data.list);
      }
    });
  }, [member]);

  useEffect(() => {
    // TODO data.list 에 정보가 담겨서 옴.
    // 닉네임, 기수, 썸네일이 다 표시 되면 그것에 맞게 고치기!
    // 제가 하겠습니다..
    // 서윤님 좀 만 기다려주세요...
    voteAPI
      .getCandidate({
        token: member.token,
        eid: vote.voteId,
        jid: USER,
      })
      .then((data) => console.log(data));
  }, []);

  // 현재 어느 목록의 후보자를 보여줄 것인지
  const [job, setJob] = useState(BOSS);

  useEffect(() => {
    switch (job) {
      case BOSS:
        setCurrent(BossCandidate);
        break;
      case MIDDLEBOSS:
        setCurrent(MiddleCandidate);
        break;
      case MONEYMEN:
        setCurrent(MoneyCandidate);
        break;
      case USER:
        setCurrent(Voters);
        break;
      default:
        break;
    }
  }, [BossCandidate, MiddleCandidate, MoneyCandidate, Voters, job]);

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col w-fit mt-5">
        <Header job={job} setJob={setJob} />
        {/* TODO 나중에 memberList -> current 로 바꾸기! */}
        <Content memberList={memberList} />
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
