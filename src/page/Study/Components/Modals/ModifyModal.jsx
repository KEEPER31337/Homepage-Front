import { updateLocale } from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  PlusSmIcon,
  PaperClipIcon,
  CogIcon,
  XIcon,
  PlusIcon,
} from '@heroicons/react/solid';

//local
import ModifyStudy from './ModifyStudy';

const ModifyModal = ({
  currentStudy,
  setCurrentStudy,
  changeFlag,
  setChangeFlag,
}) => {
  return (
    <div className="border h-w-full flex justify-center fixed top-0 left-0 right-0 bottom-0 z-[99] py-10 bg-mainBlack bg-opacity-60">
      <div className="">
        <div className="rounded-t-lg relative p-3 pr-8 bg-mainWhite font-bold dark:bg-darkPoint dark:text-gray-200">
          스터디 수정하기
          <button
            className="text-2xl absolute top-2 right-[15px] w-5 font-bold text-center text-gray-400 bg-transparent"
            onClick={() => {
              setCurrentStudy(null);
            }}
          >
            &times;
          </button>
        </div>
        <div className="max-w-3xl w-[90vw] h-[80vh] overflow-y-scroll">
          <ModifyStudy
            study={currentStudy}
            setCurrentStudy={setCurrentStudy}
            changeFlag={changeFlag}
            setChangeFlag={setChangeFlag}
          />
        </div>
      </div>
    </div>
  );
};
export default ModifyModal;
