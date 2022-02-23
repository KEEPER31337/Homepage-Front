import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, PlusSmIcon } from '@heroicons/react/outline';

const WriteButtonMobile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="rounded-full bg-mainWhite border-4 border-mainYellow shadow-lg px-2 py-5 text-xl text-mainYellow active:mt-1 active:ml-1 active:shadow-none dark:bg-darkComponent"
        onClick={() => navigate('/board/write')}
      >
        <PlusSmIcon className="inline-block h-7 w-7  text-mainYellow" />
        <PencilIcon className="inline-block h-7 w-7  text-mainYellow" />
      </button>
    </div>
  );
};

export default WriteButtonMobile;
