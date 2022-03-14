import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlusSmIcon, PaperClipIcon, CogIcon } from '@heroicons/react/solid';

const API_URL = process.env.REACT_APP_API_URL;

const AboutCard = ({ study }) => {
  return (
    <div
      name="상세보기"
      className="bg-[rgb(255,209,90)] shadow overflow-hidden sm:rounded-lg my-5 border-2 border-mainYellow dark:text-mainWhite"
    >
      <div className="bg-transparent px-3 py-2 sm:rounded-t-lg sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2 ">
            <h3 className=" font-bold leading-6 text-gray-900 sm:text-2xl">
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
      <div className="bg-mainWhite px-4 py-5 sm:px-6 dark:bg-darkComponent">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              스터디 소개
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
              {study.information}
            </dd>
          </div>
          <div className=" sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              스터디장
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
              <span className="inline-block border border-gray-300 min-w-[4em] py-1 pl-2 pr-5 m-[1px] text-sm rounded-full">
                {study.headMember?.nickName}
              </span>
            </dd>
            <dt className="text-sm mt-3 font-medium text-gray-500 dark:text-gray-400">
              스터디원 ({study.memberNumber}명)
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
              {study.memberList?.map((member) => (
                <span className="inline-block border border-gray-300 min-w-[4em] py-1 pl-2 pr-5 m-[1px] text-sm rounded-full">
                  {member.nickName}
                </span>
              ))}
            </dd>
          </div>

          <div className=" sm:row-span-2">
            <img
              src={API_URL + study.thumbnailPath}
              alt="썸네일 이미지"
              className="w-full h-full object-center object-cover rounded-lg"
            />
          </div>
          {study.gitLink || study.noteLink || study.etcLink ? (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                외부 링크
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
                <ul
                  role="list"
                  className="border border-gray-200 rounded-md divide-y divide-gray-200 dark:border-gray-600 dark:divide-gray-600"
                >
                  {study.gitLink ? (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <img
                          src={require('assets/img/icons/github.png')}
                          className="flex-shrink-0 h-5 w-5"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          <a href={study.gitLink} target="_blank">
                            {study.gitLink}
                          </a>
                        </span>
                      </div>
                    </li>
                  ) : (
                    ''
                  )}
                  {study.noteLink ? (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <img
                          src={require('assets/img/icons/notion.png')}
                          className="flex-shrink-0 h-5 w-5"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          <a href={study.noteLink} target="_blank">
                            {study.noteLink}
                          </a>
                        </span>
                      </div>
                    </li>
                  ) : (
                    ''
                  )}
                  {study.etcLink ? (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          <a href={study.etcLink} target="_blank">
                            {study.etcLink}
                          </a>
                        </span>
                      </div>
                    </li>
                  ) : (
                    ''
                  )}
                </ul>
              </dd>
            </div>
          ) : (
            ''
          )}
        </dl>
      </div>
    </div>
  );
};

export default AboutCard;
