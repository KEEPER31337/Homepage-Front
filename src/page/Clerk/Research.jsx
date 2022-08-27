import React, { useEffect, useState } from 'react';
import AuthUser from 'shared/AuthUser';

//local
import CreateFormModal from './Components/Research/CreateFormModal';
import FormModal from './Components/Research/FormModal';
import ResultModal from './Components/Research/ResultModal';
import './Components/Research/research.css';
const Research = () => {
  const [isRespond, setIsRespond] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [serveyPeriod, setServeyPeriod] = useState(true);
  const [researchData, setResearchData] = useState({
    year: 2022,
    season: 3,
    startDate: '2022-08-18',
    startTime: '12:00:00',
    endDate: '2022-08-25',
    endTime: '12:00:00',
    description: 'ㅁㅁㅁㅁ',
    isVisible: true,
  });
  const [response, setResponse] = useState(); //내가 제출할 응답
  const [result, setResult] = useState({
    info: { year: 2022, season: '1학기' },
    data: [
      {
        no: 1,
        name: '가가가',
        unitNo: 12,
        isRespond: true,
        respond: '1',
        reason: '',
      },
      {
        no: 2,
        name: '나나나',
        unitNo: 11,
        isRespond: false,
        respond: '',
        reason: '',
      },
      {
        no: 3,
        name: '라라라',
        unitNo: 11,
        isRespond: true,
        respond: '2',
        reason: '',
      },
      {
        no: 4,
        name: '마마마',
        unitNo: 12,
        isRespond: true,
        respond: '3',
        reason: 'ㅁㅁㅁㅁㅁㅁ',
      },
      {
        no: 5,
        name: '다다다',
        unitNo: 12.5,
        isRespond: true,
        respond: '1',
        reason: '',
      },
      {
        no: 6,
        name: '사사사',
        unitNo: 10,
        isRespond: true,
        respond: '4',
        reason: '',
      },
      {
        no: 7,
        name: '아아아',
        unitNo: 10.5,
        isRespond: false,
        respond: '',
        reason: '',
      },
      {
        no: 8,
        name: '하하하',
        unitNo: 12,
        isRespond: false,
        respond: '',
        reason: '',
      },
      {
        no: 9,
        name: '차차차',
        unitNo: 12,
        isRespond: true,
        respond: '4',
        reason: '',
      },
      {
        no: 10,
        name: '으으으',
        unitNo: 11,
        isRespond: true,
        respond: '4',
        reason: '',
      },
      {
        no: 11,
        name: '므므므',
        unitNo: 12,
        isRespond: true,
        respond: '3',
        reason: 'ㅁㅁㅁㅁㅇㄹㅇㄹㄴ',
      },
      {
        no: 12,
        name: '자자자',
        unitNo: 12.5,
        isRespond: false,
        respond: '',
        reason: '',
      },
      {
        no: 13,
        name: '카카카',
        unitNo: 10,
        isRespond: true,
        respond: '1',
        reason: '',
      },
      {
        no: 14,
        name: '박박박',
        unitNo: 10,
        isRespond: false,
        respond: '',
        reason: '',
      },
      {
        no: 15,
        name: '김김김',
        unitNo: 10.5,
        isRespond: true,
        respond: '2',
        reason: '',
      },
      {
        no: 16,
        name: '이이이',
        unitNo: 11,
        isRespond: true,
        respond: '2',
        reason: '',
      },
      {
        no: 17,
        name: '안안안',
        unitNo: 11,
        isRespond: false,
        respond: '',
        reason: '',
      },
      {
        no: 18,
        name: '송송송',
        unitNo: 11.5,
        isRespond: true,
        respond: '1',
        reason: '',
      },
      {
        no: 19,
        name: '장장장',
        unitNo: 12.5,
        isRespond: true,
        respond: '4',
        reason: '',
      },
      {
        no: 20,
        name: '루루루',
        unitNo: 12,
        isRespond: true,
        respond: '1',
        reason: '',
      },
      {
        no: 21,
        name: '백백백',
        unitNo: 11,
        isRespond: true,
        respond: '2',
        reason: '',
      },
      {
        no: 22,
        name: '임임임',
        unitNo: 11.5,
        isRespond: true,
        respond: '1',
        reason: '',
      },
      {
        no: 23,
        name: '정정정정',
        unitNo: 11,
        isRespond: true,
        respond: '3',
        reason: 'ㄴㄹㅇㄹㄴㄹ',
      },
      {
        no: 24,
        name: '고양이',
        unitNo: 12,
        isRespond: true,
        respond: '2',
        reason: '',
      },
      {
        no: 25,
        name: '멍멍이',
        unitNo: 10,
        isRespond: true,
        respond: '4',
        reason: '',
      },
    ],
  }); //조사 집계 결과를 저장
  const [onCreateModal, setOnCreateModal] = useState(false);
  const [onResearchModal, setOnResearchModal] = useState(false);
  const [onResultModal, setOnResultModal] = useState(false);
  const respondHandler = () => {};
  const loadResult = () => {
    //API 호출하여 조사집계결과를 가져옴
    setOnResultModal(true);
  };
  const viewList = () => {};
  useEffect(() => {}, []);
  return (
    <AuthUser>
      {onCreateModal ? (
        <CreateFormModal
          setOnCreateModal={setOnCreateModal}
          isModify={serveyPeriod}
          researchData={researchData}
          setResearchData={setResearchData}
        />
      ) : (
        ''
      )}
      {onResearchModal ? (
        <FormModal
          setOnResearchModal={setOnResearchModal}
          isModify={isRespond}
          response={response}
          setResponse={setResponse}
        />
      ) : (
        ''
      )}
      {onResultModal ? (
        <ResultModal
          setOnResultModal={setOnResultModal}
          resultInfo={result.info}
          resultData={result.data}
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
        <div className="border bg-slate-200 rounded-md flex flex-col gap-2 max-w-md w-screen h-[70vh] my-4 mx-2 p-4">
          <div className="font-title text-center text-lg text-violet-600 p-1">
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
                className="border border-gray-400 rounded-md shadow-md p-1 px-2 bg-slate-100 text-xs hover:bg-slate-200 active:shadow-none focus:outline-none focus:ring-0"
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
                  className="border border-violet-400 rounded-md shadow-md p-1 px-2 bg-violet-200 hover:bg-violet-300 active:shadow-none focus:outline-none focus:ring-0"
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
                className="border w-full border-gray-400 rounded-md shadow-md p-2 bg-slate-100 text-sm hover:bg-slate-200 active:shadow-none focus:outline-none focus:ring-0"
                onClick={() => loadResult()}
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
