import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/outline';

const WriteButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="border-4 border-mainYellow rounded-lg shadow-lg py-3 w-full dark:text-mainWhite active:mt-1 active:ml-1 active:shadow-none"
        onClick={() => navigate('/board/write')}
      >
        <PencilIcon className="inline-block h-7 w-7 m-1 text-mainYellow" />글
        쓰기
      </button>
    </div>
  );
};

export default WriteButton;
