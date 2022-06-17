import React, { useState, useEffect, useRef } from 'react';
import ChallengeModal from './ChallengeModal';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';

// API
import ctfAPI from 'API/v1/ctf';

const ChallengeCard = (props) => {
  const { id, title, score, isSolved, member } = props;

  const challengeModalRef = useRef({});

  const [detailProbList, setDetailProbList] = useState({
    challengeId: null,
    title: null,
    content: null,
    category: {
      id: null,
      name: null,
    },
    score: null,
    creatorName: null,
    contestId: null,
    solvedTeamCount: null,
    isSolved: null,
    file: null,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    ctfAPI
      .getDetailProbList({
        pid: id,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          setDetailProbList(data.data);
        } else {
          console.log(data);
          alert('문제 세부 목록을 받아오는 중 오류가 발생하였습니다.');
        }
      });
  }, [open]);

  return (
    <>
      <button
        onClick={() => {
          setOpen((prev) => !prev);

          challengeModalRef.current.open();
        }}
        className={
          'w-52 h-28 truncate mx-3 mb-6 rounded-md shadow-md dark:shadow-slate-500 ' +
          (isSolved
            ? 'bg-green-300 dark:bg-teal-500'
            : 'bg-slate-300 dark:bg-slate-600')
        }
      >
        <div className="my-3">
          <div className="text-xl m-3 font-semibold">{title}</div>
          <div>{score}</div>
        </div>
      </button>

      <ChallengeModal
        detailProbList={detailProbList}
        member={member}
        ref={challengeModalRef}
      />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCard);
