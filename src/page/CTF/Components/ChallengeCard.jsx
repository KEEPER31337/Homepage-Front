import React, { useState, useEffect, useRef } from 'react';
import ChallengeModal from './ChallengeModal';

const ChallengeCard = (props) => {
  const { name, score, isSolved } = props;

  const challengeModalRef = useRef({});

  return (
    <>
      <button
        onClick={() => challengeModalRef.current.open()}
        className={
          'w-52 h-28 truncate mx-3 mb-6 rounded-md shadow-md dark:shadow-slate-500 ' +
          (isSolved
            ? 'bg-green-300 dark:bg-teal-500'
            : 'bg-slate-300 dark:bg-slate-600')
        }
      >
        <div className="my-3">
          <div className="text-xl m-4">{name}</div>
          <div>{score}</div>
        </div>
      </button>

      <ChallengeModal ref={challengeModalRef} />
    </>
  );
};
export default ChallengeCard;
