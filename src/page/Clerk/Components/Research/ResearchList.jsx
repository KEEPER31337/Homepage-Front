import { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { connect } from 'react-redux';
import {
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  WrenchIcon,
} from '@heroicons/react/outline';

import clerkAPI from 'API/v1/clerk';
import { getNow, getTime, getProgress } from './ResearchUtil';

const ResearchList = ({
  setOnCreateModal,
  selectedSurvey,
  setSelectedSurvey,
  setIsModify,
  state,
}) => {
  const token = state.member.token;
  const jobs = state.member?.memberInfo?.jobs;
  const [surveyList, setSurveyList] = useState([]);
  const openHandler = (surveyId) => {
    clerkAPI.open({ token, surveyId }).then((res) => {
      console.log(res);
    });
  };
  const closeHandler = (surveyId) => {
    clerkAPI.close({ token, surveyId }).then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    setSurveyList([
      {
        surveyId: 7,
        surveyName: '2021년 2학기 설문',
        year: 2021,
        season: '2학기',
        description: 'aaaa',
        startDate: '2022-09-10',
        startTime: '12:00:00',
        endDate: '2022-09-30',
        endTime: '12:00:00',
        isVisible: false,
      },
      {
        surveyId: 6,
        surveyName: '2021년 여름방학 설문',
        year: 2021,
        season: '여름방학',
        description: 'bbb',
        startDate: '2022-08-01',
        startTime: '12:00:00',
        endDate: '2022-09-10',
        endTime: '12:00:00',
        isVisible: true,
      },
      {
        surveyId: 5,
        surveyName: '2021년 1학기 설문',
        year: 2021,
        season: '1학기',
        description: 'ccc',
        startDate: '2022-08-01',
        startTime: '12:00:00',
        endDate: '2022-08-20',
        endTime: '12:00:00',
        isVisible: true,
      },

      {
        surveyId: 4,
        surveyName: '2020년 겨울방학 활동인원조사',
        year: 2020,
        season: '겨울방학',
        description: 'dddd',
        startDate: '2022-08-01',
        startTime: '12:00:00',
        endDate: '2022-08-20',
        endTime: '12:00:00',
        isVisible: true,
      },
      {
        surveyId: 3,
        surveyName: '2020년 2학기 설문',
        year: 2020,
        season: '2학기',
        description: 'eeeee',
        startDate: '2022-08-01',
        startTime: '12:00:00',
        endDate: '2022-08-20',
        endTime: '12:00:00',
        isVisible: true,
      },
    ]);
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2 border rounded-md p-2 text-center">
        역대 설문 목록
        <button
          className="w-full border border-gray-400 rounded-xl shadow-md p-1 px-2 bg-violet-100 text-xs hover:bg-violet-200 active:shadow-none focus:outline-none focus:ring-0"
          onClick={() => {
            setIsModify(false);
            setSelectedSurvey({
              year: '',
              season: '1학기',
              startDate: getNow(),
              startTime: getTime(),
              endDate: getNow(),
              endTime: getTime(),
              description: '테스트테스트',
              isVisible: true,
            });
            setOnCreateModal(true);
          }}
        >
          <PlusIcon
            className={'inline-block text-violet-400 h-4 w-4 '}
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
                className="w-full flex justify-center border-2 rounded-lg bg-slate-50 p-1 gap-1 items-center"
              >
                {getProgress(
                  survey.startDate,
                  survey.startTime,
                  survey.endDate,
                  survey.endTime
                ) === 'P' ? (
                  <div className="py-3 w-10 h-10 text-[3px] rounded-full bg-yellow-400 text-mainWhite">
                    예정
                  </div>
                ) : getProgress(
                    survey.startDate,
                    survey.startTime,
                    survey.endDate,
                    survey.endTime
                  ) === 'R' ? (
                  <div className="py-3 w-10 h-10 text-[3px] rounded-full bg-green-400 text-mainWhite">
                    진행중
                  </div>
                ) : (
                  <div className="py-3 w-10 h-10 text-[3px] rounded-full bg-gray-400 text-mainWhite">
                    종료
                  </div>
                )}
                <div className="w-[80%] min-w-[15em]">
                  <div className="text-center relative">
                    <div>{survey.surveyName}</div>
                    <div className="text-gray-500 text-xs">
                      {survey.startDate.split('-').join('/')}~
                      {survey.endDate.split('-').join('/')}
                      {survey.isVisible ? (
                        <EyeIcon
                          className={
                            'absolute right-0 bottom-0 inline-block text-blue-400 h-5 w-5 hover:cursor-pointer'
                          }
                          aria-hidden="true"
                          onClick={() => closeHandler(survey.surveyId)}
                        />
                      ) : (
                        <EyeOffIcon
                          className={
                            'absolute right-0 bottom-0 inline-block text-gray-400 h-5 w-5 hover:cursor-pointer'
                          }
                          aria-hidden="true"
                          onClick={() => openHandler(survey.surveyId)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-xs flex gap-2">
                    <button
                      className="border rounded-md bg-gray-100 w-full hover:bg-gray-200 active:shadow-none focus:outline-none focus:ring-0"
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
                    <button className="border rounded-md bg-gray-100 w-full hover:bg-gray-200 active:shadow-none focus:outline-none focus:ring-0">
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
              </div>
            ))
          )}
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
