import React, { useState, useEffect, useRef } from 'react';
import ChallengeModal from './ChallengeModal';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';

const ChallengeCard = (props) => {
  const { id, title, score, isSolved, member } = props;

  const challengeModalRef = useRef({});

  return (
    <>
      <button
        onClick={() => {
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
          <div className="text-xl m-3 font-semibold truncate">{title}</div>
          <div className="truncate">{score}</div>
        </div>
      </button>

      <ChallengeModal pid={id} member={member} ref={challengeModalRef} />
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
