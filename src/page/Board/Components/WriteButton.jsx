import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/outline';

const WriteButton = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  return (
    <button
      className="max-w-[180px] min-w-[150px] border-4 border-mainYellow rounded-2xl py-2 w-[20vw] text-xl text-mainYellow active:mt-1 active:ml-1 active:shadow-none hover:shadow-lg hover:text-pointYellow hover:border-pointYellow"
      onClick={() => navigate(`/write/${categoryName}`)}
    >
      <PencilIcon className="inline-block h-7 w-7 m-1" />글 쓰기
    </button>
  );
};

export default WriteButton;
