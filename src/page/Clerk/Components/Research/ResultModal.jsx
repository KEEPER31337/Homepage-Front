import React, { useState, useEffect } from 'react';

//local

const buttons = [
  '활동',
  '휴면(군대)',
  '휴면(기타)',
  '졸업',
  '탈퇴',
  '무응답자',
  '통계',
];

const ResultModal = ({
  onResultModal,
  setOnResultModal,
  resultInfo,
  resultData,
  noapplyData,
  memberList,
}) => {
  //console.log(resultData);
  const [curButton, setCurButton] = useState(buttons[0]);
  const [activeData, setActiveData] = useState([]); //활동
  const [armyData, setArmyData] = useState([]); //휴면(군대)
  const [inactiveData, setInactiveData] = useState([]); //휴면(기타)
  const [graduateData, setGraduateData] = useState([]); //졸업
  const [dropData, setDropData] = useState([]); //탈퇴회원

  useEffect(() => {}, []);
  useEffect(() => {
    setActiveData(resultData.filter((data) => data.reply === '활동'));
    setArmyData(resultData.filter((data) => data.reply === '휴면(군대)'));
    setInactiveData(resultData.filter((data) => data.reply === '휴면(기타)'));
    setGraduateData(resultData.filter((data) => data.reply === '졸업'));
    setDropData(resultData.filter((data) => data.reply === '탈퇴'));
  }, [onResultModal]);
  const getList = (button) => {
    if (button === buttons[0]) return activeData;
    else if (button === buttons[1]) return armyData;
    else if (button === buttons[2]) return inactiveData;
    else if (button === buttons[3]) return graduateData;
    else if (button === buttons[4]) return dropData;
    else if (button === buttons[5]) return noapplyData;
  };
  return (
    <div className="font-basic border h-w-full flex justify-center fixed top-0 left-0 right-0 bottom-0 z-[99] bg-mainBlack bg-opacity-60 dark:text-mainWhite">
      {/*console.log(noapplyData)*/}
      <div className="my-auto text-sm sm:text-base">
        <div className="rounded-t-lg relative p-3 pr-8 bg-mainWhite font-bold dark:bg-darkPoint dark:text-gray-200">
          {resultInfo.surveyName} 집계결과
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
          className="relative max-w-2xl w-[95vw] sm:w-[80vw] h-[60vh] p-4 bg-mainWhite rounded-b-lg flex flex-col justify-center dark:bg-darkComponent"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-wrap justify-center text-xs gap-2 mb-4">
            {buttons.map((button, index) => (
              <>
                {button === buttons[6] ? (
                  <button
                    key={index}
                    className={
                      (curButton === button
                        ? 'ring-2 ring-red-400 ring-offset-4 bg-red-400 dark:ring-offset-darkComponent dark:ring-red-600 dark:bg-red-600'
                        : 'bg-red-200 hover:bg-red-400 dark:bg-red-400 dark:hover:bg-red-500 dark:border-2 dark:border-red-600') +
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
                        ? 'ring-2 ring-violet-400 ring-offset-4 bg-violet-400 dark:ring-offset-darkComponent dark:ring-violet-600 dark:bg-violet-600'
                        : 'bg-violet-200 hover:bg-violet-400 dark:bg-violet-400 dark:hover:bg-violet-500 dark:border-2 dark:border-violet-600') +
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
              curButton === buttons[6]
                ? 'border rounded-md h-full flex flex-col justify-center p-2 dark:border-gray-600'
                : 'hidden'
            }
          >
            <div className="flex flex-col justify-center h-full">
              <div className="flex gap-2 text-xs">
                <div className=" flex gap-1 items-center">
                  <span className="inline-block rounded-full bg-green-300 h-2 w-2"></span>
                  활동
                </div>
                <div className=" flex gap-1 items-center">
                  <span className="inline-block rounded-full bg-yellow-300 h-2 w-2"></span>
                  휴면(군대)
                </div>
                <div className=" flex gap-1 items-center">
                  <span className="inline-block rounded-full bg-orange-300 h-2 w-2"></span>
                  휴면(기타)
                </div>
                <div className=" flex gap-1 items-center">
                  <span className="inline-block rounded-full bg-blue-300 h-2 w-2"></span>
                  졸업
                </div>
                <div className=" flex gap-1 items-center">
                  <span className="inline-block rounded-full bg-red-300 h-2 w-2"></span>
                  탈퇴
                </div>
                <div className=" flex gap-1 items-center">
                  <span className="inline-block rounded-full bg-gray-300 h-2 w-2"></span>
                  무응답
                </div>
              </div>
              <div className="rounded-md flex gap-1 bg-slate-100 w-full mt-2 p-2 text-center text-xs h-10 dark:bg-darkPoint">
                <span className="flex gap-1 p-[1px] grow rounded-sm ring-1 ring-slate-400 ring-offset-1 dark:ring-offset-darkPoint">
                  <span
                    style={{
                      width:
                        (100 * activeData.length) / resultData.length + '%',
                      display: activeData.length === 0 ? 'none' : 'block',
                    }}
                    name="활동"
                    className="block bg-green-300 p-1"
                  ></span>
                  <span
                    style={{
                      width: (100 * armyData.length) / resultData.length + '%',
                      display: armyData.length === 0 ? 'none' : 'block',
                    }}
                    name="휴면(군대)"
                    className="bg-yellow-300 p-1"
                  ></span>
                  <span
                    style={{
                      width:
                        (100 * inactiveData.length) / resultData.length + '%',
                      display: inactiveData.length === 0 ? 'none' : 'block',
                    }}
                    name="휴면(기타)"
                    className="block bg-orange-300 p-1"
                  ></span>
                  <span
                    style={{
                      width:
                        (100 * graduateData.length) / resultData.length + '%',
                      display: graduateData.length === 0 ? 'none' : 'block',
                    }}
                    name="졸업"
                    className="block bg-blue-300 p-1"
                  ></span>
                  <span
                    style={{
                      width: (100 * dropData.length) / resultData.length + '%',
                      display: dropData.length === 0 ? 'none' : 'block',
                    }}
                    name="탈퇴"
                    className="grow bg-red-300 p-1"
                  ></span>
                </span>
                <span
                  style={{
                    width:
                      (100 * noapplyData?.length) / memberList.length + '%',
                    display: noapplyData?.length === 0 ? 'none' : 'block',
                  }}
                  className="flex bg-gray-300 py-1"
                >
                  <span className=""></span>
                </span>
              </div>
              <div className="flex gap-1 w-full text-center text-xs sm:text-sm text-slate-400">
                <span className="grow">
                  응답자({memberList.length - noapplyData?.length}명)
                </span>
                <span
                  style={{
                    width:
                      (100 * noapplyData?.length) / memberList.length + '%',
                    display: noapplyData.length === 0 ? 'none' : '',
                  }}
                >
                  {/*console.log((100 * noapplyData?.length) / memberList.length)*/}
                  무응답자({noapplyData.length}명)
                </span>
              </div>
            </div>
            <div className="border-t flex items-center px-4 pt-2 dark:border-gray-600">
              <span className="text-center min-w-[10em] p-2">
                활동인원조사 대상자
                <br />
                {memberList.length}명
              </span>
              <p className="border-l flex flex-col w-full p-2 items-start dark:border-gray-600">
                <p className="">
                  응답자 : {memberList.length - noapplyData.length}명
                </p>
                <p className="pl-4 text-xs">
                  [ {activeData.length}명 활동 |{' '}
                  {armyData.length + inactiveData.length}명 휴면 |{' '}
                  {graduateData.length}명 졸업 | {dropData.length}명 탈퇴 ]
                </p>
                <p className="">무응답자 : {noapplyData.length}명</p>
              </p>
            </div>
          </div>
          {curButton !== buttons[6] ? (
            <>
              <div className="sticky top-0 w-full h-[2em] bg-mainWhite dark:bg-darkComponent">
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
              <div className="rounded-md flex flex-col w-full h-full items-center bg-slate-200 overflow-auto dark:bg-gray-600">
                <div className="mx-auto w-full sm:w-[40vw] max-w-full h-full px-2">
                  {getList(curButton)?.length !== 0 ? (
                    getList(curButton).map((data, index) => (
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
                                {data.realName}
                              </span>
                              <span className="underline underline-offset-2 decoration-slate-400 w-full text-sm text-center">
                                {data.excuse}
                              </span>
                            </>
                          ) : (
                            <span className="w-full text-center">
                              {data.realName ? data.realName : data.nickName}
                            </span>
                          )}
                          <span className="w-[5em] text-right text-slate-400 text-xs">
                            {data.generation}기
                          </span>
                        </p>
                      </>
                    ))
                  ) : (
                    <div className="h-full flex justify-center items-center text-slate-400">
                      해당 문항에 응답한 회원이 없습니다.
                    </div>
                  )}
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
