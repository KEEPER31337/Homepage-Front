import React, { useState, useEffect } from 'react';

//local

const buttons = [
  '활동',
  '휴면(군대)',
  '휴면(기타)',
  '탈퇴',
  '무응답자',
  '통계',
];

const ResultModal = ({ setOnResultModal, resultInfo, resultData }) => {
  console.log(resultData);
  const [curButton, setCurButton] = useState(buttons[0]);
  const [activeData, setActiveData] = useState([]); //활동
  const [armyData, setArmyData] = useState([]); //휴면(군대)
  const [inactiveData, setInactiveData] = useState([]); //휴면(기타)
  const [dropData, setDropData] = useState([]); //탈퇴회원
  const [noapplyData, setNoapplyData] = useState([]); //무응답

  useEffect(() => {
    setNoapplyData(resultData.filter((data) => data.isRespond === false));
    setActiveData(resultData.filter((data) => data.respond === '1'));
    setArmyData(resultData.filter((data) => data.respond === '2'));
    setInactiveData(resultData.filter((data) => data.respond === '3'));
    setDropData(resultData.filter((data) => data.respond === '4'));
  }, []);
  const getList = (button) => {
    if (button === buttons[0]) return activeData;
    else if (button === buttons[1]) return armyData;
    else if (button === buttons[2]) return inactiveData;
    else if (button === buttons[3]) return dropData;
    else if (button === buttons[4]) return noapplyData;
  };
  return (
    <div className="font-basic border h-w-full flex justify-center fixed top-0 left-0 right-0 bottom-0 z-[99] bg-mainBlack bg-opacity-60">
      <div className="my-auto text-sm sm:text-base">
        <div className="rounded-t-lg relative p-3 pr-8 bg-mainWhite font-bold dark:bg-darkPoint dark:text-gray-200">
          {resultInfo.year}년 {resultInfo.season} KEEPER 활동인원조사 집계결과
          <button
            className="text-2xl absolute top-2 right-[15px] w-5 font-bold text-center text-gray-400 bg-transparent"
            onClick={() => {
              setOnResultModal(false);
            }}
          >
            &times;
          </button>
        </div>
        <form
          className="relative max-w-2xl w-[95vw] sm:w-[80vw] h-[60vh] p-4 bg-mainWhite rounded-b-lg flex flex-col justify-center"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-wrap justify-center text-xs gap-2 mb-4">
            {buttons.map((button, index) => (
              <>
                {button === buttons[5] ? (
                  <button
                    key={index}
                    className={
                      (curButton === button
                        ? 'ring-2 ring-red-400 ring-offset-4 bg-red-400'
                        : 'bg-red-200 hover:bg-red-400') +
                      ' ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-xl text-white focus:outline-none'
                    }
                    onClick={() => setCurButton(button)}
                    disabled={curButton === button}
                  >
                    {button}
                  </button>
                ) : (
                  <button
                    key={index}
                    className={
                      (curButton === button
                        ? 'ring-2 ring-violet-400 ring-offset-4 bg-violet-400'
                        : 'bg-violet-200 hover:bg-violet-400') +
                      ' ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-xl text-white focus:outline-none'
                    }
                    onClick={() => setCurButton(button)}
                    disabled={curButton === button}
                  >
                    {button}
                  </button>
                )}
              </>
            ))}
          </div>
          <div
            className={
              curButton === buttons[5]
                ? 'border rounded-md h-full flex flex-col justify-center p-2'
                : 'hidden'
            }
          >
            <div className="flex flex-col justify-center h-full">
              <div className="flex gap-1  bg-slate-100 w-full mt-2 p-2 text-center text-xs">
                <span className="flex gap-1 p-1 grow rounded-md ring-1 ring-slate-400">
                  <span
                    style={{
                      width:
                        (100 * activeData.length) /
                          (resultData.length - noapplyData.length) +
                        '%',
                    }}
                    className="block bg-green-300 p-1"
                  >
                    활동
                  </span>
                  <span
                    style={{
                      width:
                        (100 * armyData.length) /
                          (resultData.length - noapplyData.length) +
                        '%',
                    }}
                    className="block bg-yellow-300 p-1"
                  >
                    휴면(군대)
                  </span>
                  <span
                    style={{
                      width:
                        (100 * inactiveData.length) /
                          (resultData.length - noapplyData.length) +
                        '%',
                    }}
                    className="block bg-yellow-300 p-1"
                  >
                    휴면(기타)
                  </span>
                  <span className="grow bg-red-300 p-1">탈퇴</span>
                </span>
                <span
                  style={{
                    width: (100 * noapplyData.length) / resultData.length + '%',
                  }}
                  className="flex py-1"
                >
                  <span className="grow bg-gray-300 p-1">무응답</span>
                </span>
              </div>
              <div className="flex gap-1 w-full text-center text-xs sm:text-sm text-slate-400">
                <span className="grow">
                  응답자({resultData.length - noapplyData.length}명)
                </span>
                <span
                  style={{
                    width: (100 * noapplyData.length) / resultData.length + '%',
                  }}
                >
                  무응답자({noapplyData.length}명)
                </span>
              </div>
            </div>
            <div className="border-t flex items-center px-4 pt-2">
              <span className="text-center min-w-[10em] p-2">
                활동인원조사 대상자
                <br />
                {resultData.length}명
              </span>
              <p className="border-l flex flex-col w-full p-2 items-start">
                <p className="">
                  응답자 : {resultData.length - noapplyData.length}명
                </p>
                <p className="pl-4 text-xs">
                  [ {activeData.length}명 활동 |{' '}
                  {armyData.length + inactiveData.length}명 휴면 |{' '}
                  {dropData.length}명 탈퇴 ]
                </p>
                <p className="">무응답자 : {noapplyData.length}명</p>
              </p>
            </div>
          </div>
          {curButton !== buttons[5] ? (
            <>
              <div className="sticky top-0 w-full h-[2em] bg-mainWhite">
                <div className="mx-auto px-4 w-full sm:w-[40vw] max-w-full flex items-center text-center text-sm font-bold">
                  <span className="w-[2em]">No.</span>
                  {curButton === buttons[2] ? (
                    <>
                      <span className="w-[10em]">이름</span>
                      <span className="w-full">휴면 사유</span>
                    </>
                  ) : (
                    <span className="w-full">이름</span>
                  )}
                  <span className="w-[5em] text-right">기수</span>
                </div>
              </div>
              <div className="rounded-md flex flex-col w-full h-full items-center bg-slate-200 overflow-auto">
                <div className="mx-auto border w-full sm:w-[40vw] max-w-full px-2">
                  {getList(curButton).map((data, index) => (
                    <>
                      <p
                        key={index}
                        className="min-h-[2.5em] border border-slate-400 rounded-md flex items-center p-2 my-2 gap-2"
                      >
                        <span className="w-[2em] border-r border-slate-400">
                          {index + 1}
                        </span>

                        {curButton === buttons[2] ? (
                          <>
                            <span className="w-[10em] text-center">
                              {data.name}
                            </span>
                            <span className="border-b border-slate-400 w-full text-sm text-center">
                              {data.reason}
                            </span>
                          </>
                        ) : (
                          <span className="w-full text-center">
                            {data.name}
                          </span>
                        )}
                        <span className="w-[5em] text-right text-slate-400 text-xs">
                          {data.unitNo}기
                        </span>
                      </p>
                    </>
                  ))}
                </div>
              </div>
            </>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
};
export default ResultModal;
