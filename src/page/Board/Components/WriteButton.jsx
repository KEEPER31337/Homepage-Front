import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/outline';

const WriteButton = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  return (
    <div>
      <button
        className="min-w-[150px] border-4 border-mainYellow rounded-2xl py-3 w-full text-xl text-mainYellow active:mt-1 active:ml-1 active:shadow-none hover:shadow-lg hover:text-pointYellow hover:border-pointYellow"
        onClick={() => navigate(`/write/${categoryId}`)}
      >
        <PencilIcon className="inline-block h-7 w-7 m-1" />글 쓰기
      </button>
    </div>
  );
};

export default WriteButton;
