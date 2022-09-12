import React, { useEffect, useState } from 'react';
import AuthUser from 'shared/AuthUser';
import { connect } from 'react-redux';

//local
import clerkAPI from 'API/v1/clerk';
import {
  isClerk,
  getNow,
  getTime,
  replyIdToReply,
} from './Components/Research/ResearchUtil';
import ResearchList from './Components/Research/ResearchList';
import CreateFormModal from './Components/Research/CreateFormModal';
import FormModal from './Components/Research/FormModal';
import ResultModal from './Components/Research/ResultModal';
import './Components/Research/research.css';

const Research = ({ state }) => {
  const [isRespond, setIsRespond] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModify, setIsModify] = useState(false); //관리자)설문 수정하기인지 생성하기인지 여부
  const [selectedSurvey, setSelectedSurvey] = useState(); //수정하기할 설문조사
  const [serveyPeriod, setServeyPeriod] = useState(false);
  const [lastData, setLastData] = useState();
  //마지막으로 진행된 설문조사의 정보와 나의 응답
  const [researchData, setResearchData] = useState({
    //현재 진행중인 설문조사
    year: '',
    season: '1학기',
    startDate: getNow(),
    startTime: getTime(),
    endDate: getNow(),
    endTime: getTime(),
    description: '',
    isVisible: true,
  });
  const [response, setResponse] = useState(); //현재 진행중인 설문에 대해 내가 제출할 응답
  const [result, setResult] = useState(); //조사 집계 결과를 저장
  //모달창 on/off
  const [onCreateModal, setOnCreateModal] = useState(false);
  const [onResearchModal, setOnResearchModal] = useState(false);
  const [onResultModal, setOnResultModal] = useState(false);

  //데이터를 새로 불러오고자 할 때
  const [isChanged, setIsChanged] = useState(false);
  //모든 회원
  const [memberList, setMemberList] = useState([]);

  const token = state.member.token;
  const myStatus = state.member.memberInfo.jobs;
  const memberId = state.member.memberInfo.id;

  useEffect(() => {
    setIsAdmin(isClerk(myStatus));
    clerkAPI.getRunningResearch({ token }).then((res) => {
      if (res.success && res.data != -1) {
        //지금 진행중인 설문조사가 있는 경우
        clerkAPI
          .getReply({ token, surveyId: res.data, memberId })
          .then((res) => {
            //console.log('지금 진행중인 설문 : ', res);
            if (res.success) {
              setServeyPeriod(true);
              const data = res.data;
              setResearchData({
                surveyId: data.surveyId,
                surveyName: data.surveyName,
                year: Number(data.surveyName.slice(0, 4)),
                season: data.surveyName.split(' ')[1],
                startDate: data.openTime.split('T')[0],
                startTime: data.openTime.split('T')[1],
                endDate: data.closeTime.split('T')[0],
                endTime: data.closeTime.split('T')[1],
                description: '',
                isVisible: data.isVisible,
              });
              setIsRespond(data.isResponded);
              setResponse({
                state: data.replyId,
                reason: data.excuse,
              });
            }
          });
      } else {
        setServeyPeriod(false);
        clerkAPI.getLastResearch({ token }).then((res) => {
          //console.log('가장 최근에 종료된 설문 : ', res);
          if (res.success && res.data != -1) {
            setLastData({
              surveyName: res.data.surveyName,
              replyId: res.data.replyId,
            });
          }
        });
      }
    });
  }, [onCreateModal, onResearchModal, onResultModal, isChanged]);
  return (
    <AuthUser>
      {onCreateModal ? (
        <CreateFormModal
          onCreateModal={onCreateModal}
          setOnCreateModal={setOnCreateModal}
          isModify={isModify}
          selectedSurvey={selectedSurvey}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
      ) : (
        ''
      )}
      {onResearchModal ? (
        <FormModal
          onResearchModal={onResearchModal}
          setOnResearchModal={setOnResearchModal}
          isModify={isRespond}
          researchData={researchData}
          isRespond={isRespond}
          response={response}
          setResponse={setResponse}
        />
      ) : (
        ''
      )}
      {onResultModal ? (
        <ResultModal
          onResultModal={onResultModal}
          setOnResultModal={setOnResultModal}
          resultInfo={result.info}
          resultData={result.data}
          noapplyData={result.noApply}
          memberList={memberList}
        />
      ) : (
        ''
      )}
      <div className="entirePage w-full dark:bg-mainBlack dark:text-mainWhite">
        <div className=" max-w-3xl mx-auto px-2 py-4 space-y-4 sm:space-y-0 md:max-w-5xl sm:px-3 md:px-8 md:flex sm:gap-x-3 md:gap-x-5 font-basic">
          <div className=" w-full flex justify-center">
            <div className=" bg-slate-200 rounded-md flex flex-col gap-2 max-w-md w-screen h-[70vh] my-4 mx-2 p-4 dark:bg-darkComponent">
              <div className="font-title text-center text-lg text-violet-600 p-1">
                {serveyPeriod ? (
                  <>
                    {researchData.surveyName}가 진행중입니다!
                    <br />
                    <span className="text-sm text-gray-400">
                      응답 기간 : {researchData.startDate.split('-').join('/')}{' '}
                      {parseInt(researchData.startTime.slice(0, 2)) > 12
                        ? '오후 ' +
                          parseInt(researchData.startTime.slice(0, 2)) +
                          ':' +
                          researchData.startTime.slice(3, 5)
                        : '오전 ' + researchData.startTime.slice(0, 5)}
                      ~{researchData.endDate.split('-').join('/')}{' '}
                      {parseInt(researchData.endTime.slice(0, 2)) > 12
                        ? '오후 ' +
                          parseInt(researchData.endTime.slice(0, 2)) +
                          ':' +
                          researchData.endTime.slice(3, 5)
                        : '오전 ' + researchData.endTime.slice(0, 5)}
                    </span>
                  </>
                ) : (
                  '지금은 조사 기간이 아닙니다.'
                )}
              </div>

              <div className="border bg-mainWhite mb-4 h-full flex flex-col items-center justify-center dark:bg-mainBlack dark:border-transparent">
                {serveyPeriod ? (
                  <>
                    {isRespond ? (
                      <>
                        <p className=" text-violet-500 text-sm mb-2">
                          *응답을 완료했습니다.*
                        </p>
                        <p className="mb-4  ">
                          현재 응답 :{' '}
                          <strong className="inline-block px-4 py-2 border shadow-inner rounded-md text-violet-400 dark:border-gray-600">
                            {replyIdToReply(response?.state)}
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
                      className="border border-violet-400 rounded-md shadow-md p-1 px-2 bg-violet-200 hover:bg-violet-300 active:shadow-none focus:outline-none focus:ring-0 dark:bg-violet-500 dark:hover:bg-violet-400 dark:border-transparent"
                      onClick={() => setOnResearchModal(true)}
                    >
                      {isRespond ? '다시 ' : ''}응답하기
                    </button>
                  </>
                ) : lastData?.surveyName ? (
                  <div className="text-center">
                    <p className="my-2">{lastData.surveyName}에 응답한 내용</p>
                    <strong className="block px-4 py-2 border shadow-inner rounded-md text-violet-400 dark:border-gray-600">
                      {lastData.replyId ? (
                        replyIdToReply(lastData.replyId)
                      ) : (
                        <span className="text-gray-400">무응답</span>
                      )}
                    </strong>
                    <div className="h-12"></div>
                  </div>
                ) : (
                  <div className="text-center text-slate-300">
                    이전에 진행된 설문조사가 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
          {isAdmin ? (
            <div name="관리자페이지 리스트" className="py-4">
              <ResearchList
                setOnCreateModal={setOnCreateModal}
                setSelectedSurvey={setSelectedSurvey}
                setIsModify={setIsModify}
                setResult={setResult}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
                memberList={memberList}
                setMemberList={setMemberList}
                setOnResultModal={setOnResultModal}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </AuthUser>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Research);
