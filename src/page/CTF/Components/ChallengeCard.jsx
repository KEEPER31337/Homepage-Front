import React from 'react';

const ChallengeCard = (props) => {
  const { name, score, isSolved } = props;

  return (
    <button
      className={
        'w-60 h-40 truncate mr-8 rounded-md ' +
        (isSolved ? 'bg-green-200' : 'bg-slate-500')
      }
    >
      <div className="my-3">
        <div className="text-xl m-4">{name}</div>
        <div>{score}</div>
      </div>
    </button>
  );
};
export default ChallengeCard;
