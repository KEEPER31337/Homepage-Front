import React from 'react';
import { Link } from 'react-router-dom';

const ContestOverview = (props) => {
  const { name, description, creator } = props;

  return (
    <>
      <button
        className={
          'w-52 h-40 truncate mx-3 mb-6 rounded-md shadow-md bg-orange-100'
        }
      >
        <div className="my-3">
          <div className="text-xl m-4">{name}</div>
          <div>{description}</div>
          <div>{creator}</div>
        </div>
        <Link to="/ctf/challenge"></Link>
      </button>
    </>
  );
};

export default ContestOverview;
