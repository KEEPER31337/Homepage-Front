//NOTE 안쓰는 파일

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PencilIcon, PlusSmIcon } from '@heroicons/react/outline';

const WriteButtonMobile = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  return (
    <div>
      <button
        className="rounded-full bg-mainWhite border-4 border-mainYellow shadow-lg px-2 py-5 text-xl text-mainYellow active:mt-1 active:ml-1 active:shadow-none dark:bg-darkComponent"
        onClick={() => navigate(`/write/${categoryName}`)}
      >
        <PlusSmIcon className="inline-block h-7 w-7  text-mainYellow" />
        <PencilIcon className="inline-block h-7 w-7  text-mainYellow" />
      </button>
    </div>
  );
};

export default WriteButtonMobile;
