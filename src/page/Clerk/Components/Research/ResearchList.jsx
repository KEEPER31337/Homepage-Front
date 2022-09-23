import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { EyeIcon, EyeOffIcon, PlusIcon } from '@heroicons/react/outline';

import clerkAPI from 'API/v1/clerk';
import memberAPI from 'API/v1/member';
import { getNow, getTime, getProgress } from './ResearchUtil';

const size = 5;

const ResearchList = ({
  setOnCreateModal,
  setSelectedSurvey,
  setIsModify,
  setResult,
  setOnResultModal,
  isChanged,
  setIsChanged,
  memberList,
  setMemberList,
  state,
}) => {
  const token = state.member.token;
  const jobs = state.member?.memberInfo?.jobs;
  const [surveyList, setSurveyList] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [isLast, setIsLast] = useState();

  const openHandler = (surveyId) => {
    clerkAPI.open({ token, surveyId }).then((res) => {
      if (res?.success) setIsChanged(!isChanged);
      else
        alert(
          '공개 전환 api 요청이 실패하였습니다. 새로고침 후 다시 실행해주세요.'
        );
    });
  };
  const closeHandler = (surveyId) => {
    clerkAPI.close({ token, surveyId }).then((res) => {
      if (res?.success) {
        setCurPage(curPage);
        setIsChanged(!isChanged);
      } else
        alert(
          '비공개 전환 api 요청이 실패하였습니다. 새로고침 후 다시 실행해주세요.'
        );
    });
  };

  const deleteHandler = (surveyId) => {
    if (window.confirm('해당 활동인원조사를 정말로 삭제하시겠습니까?')) {
      clerkAPI.removeResearch({ token, surveyId }).then((res) => {
        //console.log(res);
        if (res?.success) setIsChanged(!isChanged);
        else alert('활동인원조사 삭제 실패! 새로고침 후 다시 실행해주세요.');
      });
    }
  };

  const viewHandler = (survey) => {
    clerkAPI
      .getRespondents({ token, surveyId: survey.surveyId })
      .then((res) => {
        if (res?.success) {
          setResult({
            info: survey,
            data: res?.list,
            noApply: memberList.filter((data) => {
              return !res?.list.some((el) => el.memberId === data.id);
            }),
          });
          setOnResultModal(true);
        } else
          alert(
            '집계 결과를 불러오는 데 실패하였습니다. 새로고침 후 다시 실행해주세요.'
          );
      });
  };
  useEffect(() => {
    clerkAPI.getResearchList({ token, page: curPage, size }).then((res) => {
      if (res?.success) {
        setSurveyList(res.page.content);
        setIsLast(res.page.last);
      }
    });
  }, [curPage, isChanged]);

  useEffect(() => {
    setCurPage(0);
    clerkAPI.getResearchList({ token, page: curPage, size }).then((res) => {
      if (res?.success) {
        setSurveyList(res.page.content);
        setIsLast(res.page.last);
      }
    });
    memberAPI.getAllMembers().then((res) => {
      if (res?.success) {
        setMemberList(res.list);
      }
    });
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2 border rounded-md p-2 text-center dark:border-gray-600">
        역대 설문 목록
        <button
          className="w-full border border-gray-400 rounded-xl shadow-md p-1 px-2 bg-violet-100 text-xs hover:bg-violet-200 active:shadow-none focus:outline-none focus:ring-0 dark:bg-violet-500 dark:hover:bg-violet-400 dark:border-transparent"
          onClick={() => {
            setIsModify(false);
            setSelectedSurvey({
              year: '',
              season: '1학기',
              startDate: getNow(),
              startTime: getTime(),
              endDate: getNow(),
              endTime: getTime(),
              description: '',
              isVisible: true,
            });
            setOnCreateModal(true);
          }}
        >
          <PlusIcon
            className={
              'inline-block text-violet-400 h-4 w-4 dark:text-violet-200'
            }
            aria-hidden="true"
          />
          활동인원조사 폼 만들기
        </button>
        <div className="flex flex-col gap-1 items-center justify-center">
          {surveyList.length === 0 ? (
            <div className="w-full flex justify-center p-1 items-center h-[60vh]">
              <div className="py-3 w-[17.5rem] rounded-full text-slate-300">
                활동 인원 조사가 존재하지 않습니다.
              </div>
            </div>
          ) : (
            surveyList.map((survey, index) => (
              <div
                key={index}
                className="w-full flex justify-center border-2 rounded-lg bg-slate-50 p-1 gap-1 items-center dark:bg-darkPoint dark:border-gray-600"
              >
                {getProgress(survey.openTime, survey.closeTime) === 'P' ? (
                  <div className="py-3 flex-none w-10 h-10 text-[3px] rounded-full bg-yellow-400 text-mainWhite">
                    예정
                  </div>
                ) : getProgress(survey.openTime, survey.closeTime) === 'R' ? (
                  <div className="py-3 flex-none w-10 h-10 text-[3px] rounded-full bg-green-400 text-mainWhite">
                    진행중
                  </div>
                ) : (
                  <div className="py-3 flex-none w-10 h-10 text-[3px] rounded-full bg-gray-400 text-mainWhite dark:bg-gray-600">
                    종료
                  </div>
                )}
                <div className="w-[80%] min-w-[15em]">
                  <div className="text-center relative">
                    <div>{survey?.surveyName}</div>
                    <div className="text-gray-500 text-xs">
                      {survey.openTime.split('T')[0].split('-').join('/')}~
                      {survey.closeTime.split('T')[0].split('-').join('/')}
                      {survey.isVisible ? (
                        <EyeIcon
                          className={
                            'absolute right-1 bottom-0 inline-block text-blue-400 h-5 w-5 hover:cursor-pointer'
                          }
                          aria-hidden="true"
                          onClick={() => closeHandler(survey.surveyId)}
                        />
                      ) : (
                        <EyeOffIcon
                          className={
                            'absolute right-1 bottom-0 inline-block text-gray-400 h-5 w-5 hover:cursor-pointer'
                          }
                          aria-hidden="true"
                          onClick={() => openHandler(survey.surveyId)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-xs flex gap-2">
                    <button
                      className="border rounded-md bg-gray-100 w-full hover:bg-gray-200 active:shadow-none focus:outline-none focus:ring-0 dark:bg-darkPoint dark:hover:bg-darkComponent dark:border-gray-600"
                      onClick={() => {
                        setIsModify(true);
                        setSelectedSurvey(survey);
                        setOnCreateModal(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="inline-block text-gray-400 m-1 w-3 h-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                          clipRule="evenodd"
                        />
                      </svg>
                      수정하기
                    </button>
                    <button
                      className="border rounded-md bg-gray-100 w-full hover:bg-gray-200 active:shadow-none focus:outline-none focus:ring-0 dark:bg-darkPoint dark:hover:bg-darkComponent dark:border-gray-600"
                      onClick={() => {
                        deleteHandler(survey.surveyId);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="inline-block text-gray-400 m-1 w-3 h-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      삭제하기
                    </button>
                  </div>
                </div>
                <button
                  className="border-2 border-gray-300 rounded-md w-[5rem] flex flex-col gap-1 p-1 items-center bg-white text-gray-400 text-sm dark:bg-mainBlack dark:border-gray-600"
                  onClick={() => {
                    viewHandler(survey);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                  집계결과
                </button>
              </div>
            ))
          )}
          <div className="w-full flex justify-end gap-1 text-violet-400 font-bold">
            <button
              className={
                (curPage === 0
                  ? 'text-gray-400 bg-gray-200 dark:bg-gray-600'
                  : 'hover:bg-slate-100 dark:hover:bg-darkComponent') +
                ' border-2 rounded-md shrink active:shadow-none focus:outline-none focus:ring-0 dark:border-gray-600'
              }
              onClick={() => {
                setCurPage(curPage - 1);
              }}
              disabled={curPage <= 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className={
                (isLast
                  ? 'text-gray-400 bg-gray-200 dark:bg-gray-600'
                  : 'hover:bg-slate-100 dark:hover:bg-darkComponent') +
                ' border-2 rounded-md shrink active:shadow-none focus:outline-none focus:ring-0 dark:border-gray-600'
              }
              onClick={() => {
                setCurPage(curPage + 1);
              }}
              disabled={isLast}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(ResearchList);
