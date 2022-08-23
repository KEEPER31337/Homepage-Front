import React, { useState, useEffect } from 'react';
import AuthUser from 'shared/AuthUser';
import { PlusCircleIcon } from '@heroicons/react/solid';

import WriteTable from '../Components/ReasonOfPoint/WriteTable';

const ReasonOfPoint = () => {
  const [appendData, setAppendData] = useState([]);

  const getNow = () => {
    return new Date().toISOString().substring(0, 10);
  };
  const addData = () => {
    setAppendData([
      ...appendData,
      {
        no: appendData.length + 1,
        name: '',
        pm: 'm',
        reason: '1',
        etcReason: '',
        point: 2,
        date: getNow(),
      },
    ]);
  };
  useEffect(() => {
    setAppendData([
      {
        no: 1,
        name: '',
        pm: 'm',
        reason: '1',
        etcReason: '',
        point: 2,
        date: getNow(),
      },
    ]);
  }, []);

  useEffect(() => {
    console.log(appendData);
  }, [appendData]);
  return (
    <AuthUser>
      <div className="flex flex-1 justify-center">
        <div className="flex flex-col gap-y-4 w-full p-2 bg-gray-100 sm:bg-transparent">
          <div
            name="상벌점 추가 폼"
            className="flex flex-col gap-y-2 rounded-md border w-full p-2 bg-mainWhite sm:bg-gray-100"
          >
            <p className="text-2xl">상벌점 내역 추가하기</p>
            <div className="rounded-md flex flex-col gap-y-2 p-2 bg-mainWhite">
              <WriteTable
                appendData={appendData}
                setAppendData={setAppendData}
              />
              <button
                className="flex border rounded-xl justify-center p-1 shadow-sm"
                onClick={() => addData()}
              >
                <PlusCircleIcon className="inline-block h-5 w-5 translate-y-0.5  text-slate-500" />
                추가하기
              </button>
            </div>
            <div className="flex justify-end items-center">
              <button
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-300 hover:bg-violet-400 focus:outline-none"
              >
                내역 저장하기
              </button>
            </div>
          </div>
          <div
            name="상벌점 추가 내역"
            className="flex flex-col gap-y-2 rounded-md border w-full p-2 bg-gray-100"
          >
            <p className="text-2xl">상벌점 내역</p>
            <div className="flex flex-col gap-y-2 pl-2">
              ~연도별로 분류해서 볼 수 있게 만들 예정~
            </div>
          </div>
        </div>
      </div>
    </AuthUser>
  );
};

export default ReasonOfPoint;
