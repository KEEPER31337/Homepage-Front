import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import TeamModal from './Components/TeamModal';
import noticeImg from 'assets/img/ctfImg/notice.png';

// API
import ctfAPI from 'API/v1/ctf';
import ChallengeCard from './Components/ChallengeCard';

const Challenge = ({ member, ctfId }) => {
  const [probList, setProbList] = useState([
    {
      challengeId: null,
      title: null,
      categories: [],
      score: null,
      isSolved: null,
      contestId: null,
    },
  ]);

  const ModalRef = useRef({});

  useEffect(() => {
    ctfAPI
      .seeMyTeam({
        ctfId: ctfId,
        token: member.token,
      })
      .then((data) => {
        if (data.code === -13004) {
          ModalRef.current.open();
        }
      });
  }, []);
  useEffect(() => {
    ctfAPI
      .getProbList({
        cid: ctfId,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          // console.log(data);
          setProbList(data.list);
        } else {
          // console.log(data);
          // alert('문제 목록을 받아오는 중 오류가 발생하였습니다.');
        }
      });
  }, []);

  return (
    <div className="md:w-4/5 flex flex-col flex-1 p-3">
      {probList.length == 0 ? (
        <div className="pt-5 grid place-items-center mr-20">
          <img className="h-24 w-24" src={noticeImg} />
          <div className="flex whitespace-pre text-center dark:text-slate-200 text-4xl m-2 font-bold">
            문제 <div className="text-mainYellow">준비중</div>
            입니다.
          </div>
        </div>
      ) : null}
      <div className="justify-center flex flex-wrap sm:justify-start">
        <div className="w-4/5 mb-3">
          <div className="font-extrabold text-4xl m-1 dark:text-white">
            Challenges
          </div>
          <div className="p-[2px] mb-2 dark:from-purple-500 dark:via-purple-200 dark:to-amner-200 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300" />
        </div>
        {probList.map((challenge, challengeIdx) => (
          <ChallengeCard
            key={challengeIdx}
            id={challenge.challengeId}
            title={challenge.title}
            score={challenge.score}
            categories={challenge.categories}
            isSolved={challenge.isSolved}
          />
        ))}
      </div>
      <TeamModal ref={ModalRef}>
        가입한 팀을 찾을 수 없습니다 <br />팀 가입 부탁드립니다!
      </TeamModal>
    </div>
  );
};

const mapStateToProps = (state, ctfId) => {
  return { member: state.member, ctfId: state.ctf.ctfId };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
