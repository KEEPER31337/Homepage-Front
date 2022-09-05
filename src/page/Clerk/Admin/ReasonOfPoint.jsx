import React, { useState, useEffect } from 'react';
import AuthUser from 'shared/AuthUser';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';

import clerkAPI from 'API/v1/clerk';
import WriteTable from '../Components/ReasonOfPoint/WriteTable';
import ViewTable from '../Components/ReasonOfPoint/ViewTable';
import { getNow } from '../Components/ReasonOfPoint/PointUtil';

const ReasonOfPoint = ({ state }) => {
  const [appendData, setAppendData] = useState([]);
  const [recordData, setRecordData] = useState([]);
  const [curYear, setCurYear] = useState();
  const [yearList, setYearList] = useState([]);

  const token = state?.member?.token;

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
  const saveHandler = () => {
    clerkAPI.addPoint({ token }).then((res) => {
      console.log(res);
      //TODO api 연동하기(api 함수 수정 후 적용)
    });
  };
  useEffect(() => {
    clerkAPI.getPointYearList({ token }).then((res) => {
      console.log(res);
      setYearList(res.list);
      setCurYear(yearList[0]);
    });
  }, []);
  useEffect(() => {
    console.log(appendData);
  }, [appendData]);

  return (
    <AuthUser>
      <div className="flex flex-1 justify-center min-h-screen">
        <div className="flex flex-col gap-y-4 w-full p-2 bg-gray-100 sm:bg-transparent">
          <form
            name="상벌점 추가 폼"
            className="flex flex-col gap-y-2 rounded-md border w-full p-2 bg-mainWhite sm:bg-gray-100"
            onSubmit={(e) => {
              e.preventDefault();
              saveHandler();
            }}
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
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-300 hover:bg-violet-400 focus:outline-none"
              >
                내역 저장하기
              </button>
            </div>
          </form>
          <div
            name="상벌점 추가 내역"
            className="flex flex-col gap-y-2 rounded-md border w-full p-2  bg-mainWhite sm:bg-gray-100"
          >
            <p className="text-2xl">상벌점 내역</p>
            <div name="연도 선택"></div>
            <div className="flex flex-col gap-y-2 pl-2">
              <div className="flex flex-wrap gap-2 justify-center p-4">
                {yearList?.map((year, index) => (
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

const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(ReasonOfPoint);
