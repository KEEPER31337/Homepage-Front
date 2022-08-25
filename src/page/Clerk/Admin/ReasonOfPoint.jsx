import React, { useState, useEffect } from 'react';
import AuthUser from 'shared/AuthUser';
import { PlusCircleIcon } from '@heroicons/react/solid';

import WriteTable from '../Components/ReasonOfPoint/WriteTable';
import ViewTable from '../Components/ReasonOfPoint/ViewTable';
const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
const testData = [
  {
    date: '2022-08-16',
    name: '김김김',
    reason: '무단결석',
    plusP: 0,
    minusP: 2,
  },
  {
    date: '2022-08-16',
    name: '이이이',
    reason: '회비 미납부',
    plusP: 0,
    minusP: 1,
  },
  {
    date: '2022-08-16',
    name: '아무개',
    reason: '각종 대외발표',
    plusP: 2,
    minusP: 0,
  },
  {
    date: '2022-08-22',
    name: '정정정',
    reason: '무단결석',
    plusP: 0,
    minusP: 2,
  },
  {
    date: '2022-08-22',
    name: '박박박',
    reason: '지각 2회',
    plusP: 0,
    minusP: 2,
  },
  {
    date: '2022-08-22',
    name: '김김김',
    reason: '그냥',
    plusP: 1,
    minusP: 0,
  },
];

const ReasonOfPoint = () => {
  const [appendData, setAppendData] = useState([]);
  const [recordData, setRecordData] = useState([]);
  const [curYear, setCurYear] = useState();

  const getNow = () => {
    //오늘 날짜 반환
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
    setRecordData(testData);
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
            <div name="연도 선택"></div>
            <div className="flex flex-col gap-y-2 pl-2">
              <div className="flex flex-wrap gap-2 justify-center p-4">
                {years.map((year, index) => (
                  <button
                    key={index}
                    className={
                      (curYear === year
                        ? 'ring-2 ring-violet-400 ring-offset-4 ring-offset-gray-100 bg-violet-400'
                        : 'bg-violet-200 hover:bg-violet-400') +
                      ' shadow-sm rounded-md p-1 px-4 focus:outline-none'
                    }
                    onClick={() => {
                      setCurYear(year);
                    }}
                    disabled={curYear === year}
                  >
                    {year}
                  </button>
                ))}
              </div>
              <ViewTable
                curYear={curYear}
                recordData={recordData}
                setRecordData={setRecordData}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthUser>
  );
};

export default ReasonOfPoint;
