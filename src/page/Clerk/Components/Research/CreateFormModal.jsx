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
const getNow = () => {
  return new Date().toISOString().substring(0, 10);
};
const CreateFormModal = ({ isModify, setOnCreateModal, researchData }) => {
  return (
    <div className="font-basic border h-w-full flex justify-center fixed top-0 left-0 right-0 bottom-0 z-[99] bg-mainBlack bg-opacity-60">
      <div className="my-auto">
        <div className="rounded-t-lg relative p-3 pr-8 bg-mainWhite font-bold dark:bg-darkPoint dark:text-gray-200">
          KEEPER 활동인원조사 {isModify ? '수정하기' : '등록하기'}
          <button
            className="text-2xl absolute top-2 right-[15px] w-5 font-bold text-center text-gray-400 bg-transparent"
            onClick={() => {
              setOnCreateModal(false);
            }}
          >
            &times;
          </button>
        </div>
        <form
          className="max-w-2xl w-[70vw] h-[50vh] bg-slate-200 rounded-b-lg flex flex-col justify-center"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="p-4 font-bold">활동 기간</span>
                <input
                  type="number"
                  id="year"
                  className="mt-1 inline-block px-3 w-[5em] py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                  placeholder="연도"
                  defaultValue={researchData?.year}
                  required
                />
                년
                <select
                  className="mt-1 inline-block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                  onBlur={(e) => console.log('')}
                  defaultValue={researchData?.season}
                  required
                >
                  <option value="1">1학기</option>
                  <option value="2">여름방학</option>
                  <option value="3">2학기</option>
                  <option value="4">겨울방학</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="p-4 font-bold">조사 기간</span>
                <input
                  type="date"
                  className="mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                  defaultValue={
                    researchData?.startDate ? researchData.startDate : getNow()
                  }
                  required
                />
                ~
                <input
                  type="date"
                  className="mt-1 inline-block px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                  defaultValue={
                    researchData?.endDate ? researchData.endDate : getNow()
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center m-3">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-600 dark:text-gray-300 dark:border-darkComponent"
              onClick={() => setOnCreateModal(false)}
            >
              닫기
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-400 hover:bg-violet-500 focus:outline-none"
            >
              {isModify ? '수정하기' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateFormModal;
