import React from 'react';
import { useParams } from 'react-router-dom';
import { PlusSmIcon, PaperClipIcon, CogIcon } from '@heroicons/react/solid';
//local
import AuthUser from 'shared/AuthUser';
import { studies, years } from 'page/Study/testData';

const API_URL = process.env.REACT_APP_API_URL;

const Study = () => {
  console.log(studies);
  var flag = true;
  var cyear = 2022;
  var link =
    'https://enormous-button-c5d.notion.site/2021-7a9e28c746934f22863f7077fec061da';
  return (
    <>
      <AuthUser>
        <div className="flex gap-x-6 h-fit p-5 dark:bg-mainBlack dark:text-mainWhite">
          <div
            name="좌측 사이드바"
            className="border w-[20vw] rounded-lg p-3 py-5 bg-gray-50"
          >
            <button
              type="button"
              className="inline-flex items-center text-mainYellow shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <PlusSmIcon
                className="-ml-1.5 mr-1 h-5 w-5 "
                aria-hidden="true"
              />
              <span>
                <strong>Add</strong>
              </span>
            </button>
            {years?.map((year, index) => (
              <div
                key={index}
                className={
                  (cyear == year
                    ? 'bg-mainYellow '
                    : 'bg-mainWhite hover:bg-yellow-200') +
                  ' border border-mainYellow w-full p-2  my-1'
                }
              >
                {year}년도
              </div>
            ))}
          </div>
          <div className="">
            <button
              type="button"
              className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusSmIcon
                className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>스터디 추가하기</span>
            </button>
            <div name="스터디 추가 폼" className="border w-[80vw] bg-slate-300">
              <input type="text"></input>
            </div>
            <div name="시즌 태그들" className=" mt-5">
              <div className="border-x-2 border-t-2 border-mainYellow bg-mainYellow inline-block w-[5em] p-1 px-2 text-xl rounded-t-2xl hover:bg-slate-100">
                1학기
              </div>
              <div className="border-x-2 border-t-2 inline-block w-[5em] p-1 text-xl rounded-t-2xl hover:bg-slate-100">
                하계방학
              </div>
              <div className="border-x-2 border-t-2 inline-block w-[5em] p-1 text-xl rounded-t-2xl hover:bg-slate-100">
                2학기
              </div>
              <div className="border-x-2 border-t-2 inline-block w-[5em] p-1 text-xl rounded-t-2xl hover:bg-slate-100">
                동계방학
              </div>
            </div>
            <div className="border-2 border-mainYellow rounded-b-lg rounded-tr-lg bg-gray-50 w-[80vw] px-5 dark:bg-darkComponent">
              {link ? (
                <p className="border-b border-x bg-mainWhite my-3 p-3 rounded-lg dark:border-gray-700 dark:bg-mainBlack">
                  노션 링크 :
                  <a href={link} target="_blank">
                    {' '}
                    {link}
                  </a>
                </p>
              ) : (
                ''
              )}
              {studies?.map((study, index) => (
                <div key={index}>
                  {flag ? (
                    <div
                      name="상세보기"
                      className="bg-white shadow overflow-hidden sm:rounded-lg my-5 border-2 border-mainYellow dark:bg-gray-800 dark:text-mainWhite"
                    >
                      <div className="bg-[rgb(255,209,90)] px-4 py-5 sm:rounded-t-lg sm:px-6">
                        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                          <div className="ml-4 mt-2 ">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                              {study.title}
                            </h3>
                          </div>
                          <div className="ml-4 mt-2 flex-shrink-0">
                            <button
                              type="button"
                              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                            >
                              <CogIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>수정하기</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className=" border-gray-200 px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              스터디 소개
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
                              {study.information}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              스터디장
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
                              Margot Foster
                            </dd>
                          </div>
                          <div className="hidden sm:block sm:row-span-2">
                            <img
                              src={API_URL + study.thumbnail}
                              alt="썸네일 이미지"
                              className="w-full h-full object-center object-cover rounded-lg"
                            />
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              스터디원
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
                              {study.memberIdList.join(', ')}
                            </dd>
                          </div>
                          <div className="sm:hidden sm:row-span-2">
                            <img
                              src={API_URL + study.thumbnail}
                              alt="썸네일 이미지"
                              className="w-full h-full object-center object-cover rounded-lg"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              외부 링크
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
                              <ul
                                role="list"
                                className="border border-gray-200 rounded-md divide-y divide-gray-200"
                              >
                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div className="w-0 flex-1 flex items-center">
                                    <img
                                      src={require('assets/img/icons/github.png')}
                                      className="flex-shrink-0 h-5 w-5"
                                    />
                                    <span className="ml-2 flex-1 w-0 truncate">
                                      resume_back_end_developer.pdf
                                    </span>
                                  </div>
                                </li>
                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div className="w-0 flex-1 flex items-center">
                                    <img
                                      src={require('assets/img/icons/notion.png')}
                                      className="flex-shrink-0 h-5 w-5"
                                    />
                                    <span className="ml-2 flex-1 w-0 truncate">
                                      coverletter_back_end_developer.pdf
                                    </span>
                                  </div>
                                </li>
                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div className="w-0 flex-1 flex items-center">
                                    <PaperClipIcon
                                      className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span className="ml-2 flex-1 w-0 truncate">
                                      coverletter_back_end_developer.pdf
                                    </span>
                                  </div>
                                </li>
                              </ul>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  ) : (
                    <div
                      name="디폴트 카드"
                      className="border-4 w-full h-32 my-5 rounded-md shadow-lg hover:bg-slate-100 dark:bg-darkComponent"
                    >
                      <p className="text-2xl font-bold text-pointYellow">
                        {study.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AuthUser>
    </>
  );
};

export default Study;
