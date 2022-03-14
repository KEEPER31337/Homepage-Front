import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlusSmIcon, PaperClipIcon } from '@heroicons/react/solid';
//local
import ThumbnailZone from 'page/Study/Components/ThumbnailZone';

const AddStudy = ({ setOpen, currentYear, currentSeason }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState('');
  const [headMember, setHeadMember] = useState();
  const [memberList, setMemberList] = useState([]);
  const [gitLink, setGitLink] = useState('');
  const [noteLink, setNoteLink] = useState('');
  const [etcLink, setEtcLink] = useState('');

  const createHandler = () => {
    console.log(title);
    console.log(information);
    console.log(headMember);
    console.log(memberList);
    console.log(gitLink);
    console.log(noteLink);
    console.log(etcLink);
    console.log(thumbnail);
  };
  console.log('load AddStudy');
  return (
    <>
      <div name="스터디 추가 폼" className="p-5 bg-slate-200 rounded-lg">
        <div className="bg-[rgb(255,209,90)] shadow overflow-hidden border-2 border-mainYellow sm:rounded-lg dark:text-mainWhite">
          <div className="bg-transparent px-4 pb-3 sm:rounded-t-lg sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="border-b-2 border-pointYellow ml-4 mt-2 w-full">
                <label htmlFor="study-name" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center"></div>
                  <input
                    name="스터디명"
                    id="study-name"
                    type="text"
                    className="block h-full w-full border-transparent bg-transparent pb-1 pr-3 text-gray-900 font-bold placeholder-[rgb(218,154,70)] focus:outline-none focus:placeholder-[rgb(255,235,110)] focus:ring-0 focus:border-transparent sm:text-2xl"
                    placeholder="스터디명"
                    onBlur={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-mainWhite border-gray-200 px-4 py-5 sm:px-6 dark:bg-darkComponent">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  스터디 소개
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="shadow-sm focus:ring-mainYellow focus:border-mainYellow block w-full sm:text-sm border border-gray-300 rounded-md dark:bg-mainBlack dark:border-gray-600"
                    defaultValue={''}
                    onBlur={(e) => setInformation(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  스터디에 대해 소개해주세요.
                </p>
              </div>
              <div className=" sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  스터디장
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
                  <span className="inline-block border border-gray-300 min-w-[4em] py-1 pl-2 pr-5 m-[1px] text-sm rounded-full"></span>
                </dd>
                <dt className="text-sm mt-3 font-medium text-gray-500 dark:text-gray-400">
                  스터디원
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
                  dd
                </dd>
              </div>
              <div className="border sm:row-span-2">
                <ThumbnailZone setThumbnail={setThumbnail} />
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  외부 링크
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-mainWhite ">
                  <ul
                    role="list"
                    className="border border-gray-200 rounded-md divide-y divide-gray-200 dark:border-gray-600 dark:divide-gray-600"
                  >
                    <li className="pl-3 pr-4 py-1 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <img
                          src={require('assets/img/icons/github.png')}
                          className="flex-shrink-0 h-5 w-5"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          <label
                            htmlFor="Github"
                            className="block ml-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Github
                          </label>
                          <div className="m-1">
                            <input
                              id="Github"
                              name="Github"
                              type="text"
                              autoComplete="Github"
                              placeholder="http://"
                              className="py-1 shadow-sm focus:ring-mainYellow focus:border-mainYellow block w-full sm:text-sm border-gray-300 rounded-md  dark:bg-mainBlack dark:border-gray-600"
                              onBlur={(e) => setGitLink(e.target.value)}
                            />
                          </div>
                        </span>
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-1 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <img
                          src={require('assets/img/icons/notion.png')}
                          className="flex-shrink-0 h-5 w-5"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          <label
                            htmlFor="Notion"
                            className="block ml-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Notion
                          </label>
                          <div className="m-1">
                            <input
                              id="Notion"
                              name="Notion"
                              type="text"
                              autoComplete="Notion"
                              placeholder="http://"
                              className="py-1 shadow-sm focus:ring-mainYellow focus:border-mainYellow block w-full sm:text-sm border-gray-300 rounded-md  dark:bg-mainBlack dark:border-gray-600"
                              onBlur={(e) => setNoteLink(e.target.value)}
                            />
                          </div>
                        </span>
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-1 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <PaperClipIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          <label
                            htmlFor="etc"
                            className="block ml-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            .Etc
                          </label>
                          <div className="m-1">
                            <input
                              id="etc"
                              name="etc"
                              type="text"
                              autoComplete="etc"
                              placeholder="http://"
                              className="py-1 shadow-sm focus:ring-mainYellow focus:border-mainYellow block w-full sm:text-sm border-gray-300 rounded-md  dark:bg-mainBlack dark:border-gray-600"
                              onBlur={(e) => setEtcLink(e.target.value)}
                            />
                          </div>
                        </span>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="pt-3 pr-3">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={() => setOpen(false)}
            >
              닫기
            </button>
            <button
              type="button"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-mainYellow hover:bg-pointYellow focus:outline-none"
              onClick={() => createHandler()}
            >
              추가하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudy;
