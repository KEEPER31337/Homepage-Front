import React from 'react';
import ChallengeCard from './ChallengeCard';

const Category = (props) => {
  const { category, categoryList } = props;

  return (
    <div className="my-5 mx-12 md:mx-5">
      <div className="justify-center flex sm:justify-start mb-6">
        <div className="text-2xl dark:text-yellow-100">{category}</div>
      </div>
      <div className="justify-center flex flex-wrap sm:justify-start">
        {categoryList.map((challenge, challengeIdx) => (
          <ChallengeCard
            key={challengeIdx}
            id={challenge.challengeId}
            title={challenge.title}
            score={challenge.score}
            isSolved={challenge.isSolved}
          />
        ))}
      </div>
    </div>
  );
};
export default Category;
