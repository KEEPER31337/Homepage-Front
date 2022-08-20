import React, { useEffect, useState } from 'react';
import AuthUser from 'shared/AuthUser';

//local
import CreateFormModal from './Components/Research/CreateFormModal';
import FormModal from './Components/Research/FormModal';
import './Components/Research/research.css';
const Research = () => {
  const [isRespond, setIsRespond] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [serveyPeriod, setServeyPeriod] = useState(true);
  const [researchData, setResearchData] = useState({
    year: 2022,
    season: 3,
    startDate: '2022-08-18',
    endDate: '2022-08-25',
  });
  const [response, setResponse] = useState();
  const [onCreateModal, setOnCreateModal] = useState(false);
  const [onResearchModal, setOnResearchModal] = useState(false);
  const respondHandler = () => {};
  const viewList = () => {};
  useEffect(() => {}, []);
  return (
    <AuthUser>
      {onCreateModal ? (
        <CreateFormModal
          setOnCreateModal={setOnCreateModal}
          isModify={serveyPeriod}
          researchData={researchData}
        />
      ) : (
        ''
      )}
      {onResearchModal ? (
        <FormModal
          setOnResearchModal={setOnResearchModal}
          isModify={isRespond}
          response={response}
        />
      ) : (
        ''
      )}
      <div>
        <button className="border" onClick={() => setIsRespond(!isRespond)}>
          응답여부 : {isRespond ? 'true' : 'false'}
        </button>
        <button className="border" onClick={() => setIsAdmin(!isAdmin)}>
          관리자여부 : {isAdmin ? 'true' : 'false'}
        </button>
        <button
          className="border"
          onClick={() => setServeyPeriod(!serveyPeriod)}
        >
          기간여부 : {serveyPeriod ? 'true' : 'false'}
        </button>
      </div>
      <div className="flex flex-1 justify-center font-basic">
        <div className="border bg-slate-50 rounded-md flex flex-col gap-2 max-w-md w-screen h-[70vh] my-4 mx-2 p-4">
          <div className="text-center text-lg text-violet-600 p-1">
            {serveyPeriod ? (
              <>
                2022년 2학기 활동인원조사가 진행중입니다!
                <br />
                <span className="text-sm text-gray-400">
                  응답 기간 : 7/22~7/29
                </span>
              </>
            ) : (
              '지금은 조사 기간이 아닙니다.'
            )}
          </div>
          <div className="flex justify-center">
            {isAdmin ? (
              <button
                className="border border-gray-400 rounded-md shadow-md p-1 px-2 bg-gray-100 text-xs hover:bg-gray-200 active:shadow-none focus:outline-none focus:ring-0"
                onClick={() => setOnCreateModal(true)}
              >
                {serveyPeriod
                  ? '활동인원조사 폼 수정하기'
                  : '활동인원조사 폼 만들기'}
              </button>
            ) : (
              ''
            )}
          </div>
          <div className="border bg-mainWhite mb-4 h-full flex flex-col items-center justify-center">
            {serveyPeriod ? (
              <>
                {isRespond ? (
                  <>
                    <p className=" text-violet-500 text-sm mb-2">
                      *응답을 완료했습니다.*
                    </p>
                    <p className="mb-4  ">
                      현재 응답 :{' '}
                      <strong className="inline-block px-4 py-2 border shadow-inner rounded-md text-violet-400">
                        활동
                      </strong>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-red-500 text-sm mb-2">
                      *아직 인원 조사에 응답하지 않았습니다.*
                    </p>
                  </>
                )}
                <button
                  className="border border-violet-400 rounded-md shadow-md p-1 px-2 bg-violet-200 active:shadow-none focus:outline-none focus:ring-0"
                  onClick={() => setOnResearchModal(true)}
                >
                  {isRespond ? '다시 ' : ''}응답하기
                </button>
              </>
            ) : (
              <div className="text-center">
                <p className="my-2">2022년 1학기 활동 여부</p>
                <strong className="block px-4 py-2 border shadow-inner rounded-md text-violet-400">
                  활동
                </strong>
                <div className="h-12"></div>
              </div>
            )}
          </div>

          {isAdmin ? (
            <div className="border flex items-end">
              <button
                className="border w-full border-gray-400 rounded-md shadow-md p-2 bg-gray-100 text-sm hover:bg-gray-200 active:shadow-none focus:outline-none focus:ring-0"
                onClick={() => viewList()}
              >
                집계결과 보기
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </AuthUser>
  );
};

export default Research;
