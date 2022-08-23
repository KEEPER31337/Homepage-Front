import React from 'react';

import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/outline';

const Header = ({ setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(true);
  };

  const btnClassname =
    'bg-violet-100 border-violet-300 border-b-4 rounded-xl hover:bg-violet-200 hover:text-white mx-2 mt-2 mb-1';

  return (
    <div className="flex justify-between w-full">
      <button
        onClick={closeModal}
        className={btnClassname + 'w-28 h-10 px-2 py-2'}
      >
        세미나 추가
      </button>
      <div className="flex flex-row mb-1">
        <button
          className={btnClassname + 'flex-shrink-0 h-10 w-10  px-2 pt-2 pb-3'}
        >
          <ArrowSmLeftIcon aria-hidden="true" />
        </button>
        <button
          className={btnClassname + 'flex-shrink-0 h-10 w-10  px-2 pt-2 pb-3'}
        >
          <ArrowSmRightIcon aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Header;
/* className="flex-shrink-0 h-10 w-10 bg-violet-100 border-violet-300 rounded-xl border-b-4 px-2 pt-2 pb-3 hover:bg-violet-200 hover:text-white mx-2 mt-2 mb-1" */
