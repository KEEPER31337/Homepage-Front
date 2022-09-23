import React, { useState, useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import { connect } from 'react-redux';

import clerkAPI from 'API/v1/clerk';
import ReasonModal from './ReasonModal';

const ViewTable = ({
  curYear,
  recordData,
  setRecordData,
  isChanged,
  setIsChanged,
  state,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isModify, setIsModify] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const token = state.member.token;

  //탭 크기가 변할때마다 페이지를 재렌더링하기위한 state
  const smWidth = resolveConfig().theme.screens.sm;
  const resizeHandler = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  const removeHandler = (meritId) => {
    if (window.confirm('정말로 해당 내역을 삭제하시겠습니까?')) {
      clerkAPI.removePoint({ token, meritId }).then((res) => {
        if (res?.success) setIsChanged(!isChanged);
        else
          alert(
            '상벌점 내역을 삭제하는데 실패하였습니다. 새로고침 후 다시 실행해주세요.'
          );
      });
    }
  };
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  useEffect(() => {
    clerkAPI.getPointOfYear({ token, year: curYear }).then((res) => {
      //console.log(res);
      if (res?.success) {
        setRecordData(res.list);
        setIsModify(false);
      }
    });
  }, [curYear, isChanged]);

  return (
    <>
      <div className="flex justify-end text-xs">
        <button
          className="border border-slate-400 flex items-center p-1 rounded-md hover:bg-gray-200 focus:outline-none dark:hover:bg-darkPoint"
          onClick={() => {
            setIsModify(!isModify);
          }}
        >
          {isModify ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
              편집 완료
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
              내역 편집
            </>
          )}
        </button>
      </div>
      <div className="bg-mainWhite rounded-md p-2 dark:bg-darkPoint">
        {isOpen ? (
          <ReasonModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalData={modalData}
          />
        ) : (
          ''
        )}

        <div className="w-full text-center">
          <p className="flex w-full font-bold">
            <p className="border-b-2 min-w-[2em] w-[2em] px-1 dark:border-gray-600">
              No
            </p>
            <div className="border-x border-b-2 flex w-full dark:border-gray-600">
              <p className="min-w-[7em] w-[7em] px-1">날짜</p>
              <p className="min-w-[6em] w-full sm:w-[6em]  px-1">이름</p>
              {/**모바일에서 내역을 클릭하면 모달창으로 사유를 띄워주도록*/}
              <p className="hidden sm:block sm:w-full px-1">사유</p>
              <p className="min-w-[3em] sm:w-[6em] px-1">상점</p>
              <p className="min-w-[3em] sm:w-[6em] px-1">벌점</p>
            </div>
            {isModify ? <p className="min-w-[3em] sm:w-[3em] px-1"></p> : ''}
          </p>
          {recordData?.length !== 0 ? (
            recordData.map((data, index) => (
              <div key={index} className="flex">
                <button
                  className="flex w-full border-b dark:border-gray-600"
                  onClick={() => {
                    setModalData({ ...data, no: index + 1 });
                    setIsOpen(true);
                  }}
                  disabled={window.innerWidth > parseInt(smWidth, 10)}
                >
                  <p className="min-w-[2em] w-[2em] p-1 my-auto">{index + 1}</p>
                  <div className="border-x flex w-full dark:border-gray-600">
                    <p className="min-w-[7em] w-[7em] p-1 flex items-center justify-center text-gray-400">
                      {data.date}
                    </p>
                    <p className="min-w-[6em] w-full sm:w-[6em] p-1 flex items-center justify-center text-violet-400 font-bold">
                      {data.awarderRealName}
                    </p>
                    {/**모바일에서 내역을 클릭하면 모달창으로 사유를 띄워주도록*/}
                    <p className="hidden sm:block sm:w-full p-1 text-left">
                      {data.detail}
                    </p>
                    <p className="min-w-[3em] sm:w-[6em] p-1 border-x flex items-center justify-center text-green-400 dark:border-gray-600">
                      {data.isMerit ? data.merit : ''}
                    </p>
                    <p className="min-w-[3em] sm:w-[6em] p-1 flex items-center justify-center text-red-400">
                      {!data.isMerit ? data.merit : ''}
                    </p>
                  </div>
                </button>
                {isModify ? (
                  <p className="my-auto flex justify-center items-center min-w-[3em] sm:w-[3em]">
                    <button
                      className="border rounded-md px-1 bg-slate-100 hover:bg-slate-200 focus:outline-none dark:border-gray-600 dark:bg-darkComponent dark:hover:bg-gray-600"
                      onClick={() => {
                        removeHandler(data.meritLogId);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="inline-block w-5 h-5 text-red-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </p>
                ) : (
                  ''
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-20 text-slate-300 ">
              상벌점 내역이 존재하지 않습니다
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(ViewTable);
