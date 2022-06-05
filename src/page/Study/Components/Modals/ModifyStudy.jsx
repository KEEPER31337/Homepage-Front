import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  PlusSmIcon,
  PaperClipIcon,
  XIcon,
  PlusIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/solid';
//local
import studyAPI from 'API/v1/study';
import ipAPI from 'API/v1/ip';
import memberAPI from 'API/v1/member';
import utilAPI from 'API/v1/util';
import ThumbnailZone from 'page/Study/Components/ThumbnailZone';

const ModifyStudy = ({
  study,
  setCurrentStudy,
  changeFlag,
  setChangeFlag,
  state,
}) => {
  const [title, setTitle] = useState(study.title);
  const [information, setInformation] = useState(study.information);
  const [year, setYear] = useState(study.year);
  const [season, setSeason] = useState(study.season);
  const [headMember, setHeadMember] = useState(study.headMember); //멤버 오브젝트
  const [memberList, setMemberList] = useState(study.memberList); //멤버 오브젝트 리스트
  const [memberIdList, setMemberIdList] = useState(
    memberList.map((member) => member.id)
  ); //멤버 아이디 리스트
  const [gitLink, setGitLink] = useState(study.gitLink);
  const [noteLink, setNoteLink] = useState(study.noteLink);
  const [etcLink, setEtcLink] = useState(study.etcLink);
  const [thumbnail, setThumbnail] = useState('');
  const token = state.member.token;
  //state.member.memberInfo.nickName;

  const [clickable, setClickable] = useState(true);
  const [notNumber, setNotNumber] = useState(false); //year이 숫자값인지 아닌지 확인
  const [viewMemberList2, setViewMemberList2] = useState(false);
  const [allMemberList, setAllMemberList] = useState([]); //멤버 추가 시 보여줄 동아리 회원의 전체 리스트

  const checkYear = (text) => {
    console.log(parseInt(text));
    setYear(text);
    if (isNaN(text) || parseInt(text) < 2000 || parseInt(text) > 2100) {
      setNotNumber(true);
    } else {
      setNotNumber(false);
    }
    console.log(notNumber);
  };

  const uploadable = () => {
    if (
      notNumber ||
      year === '' ||
      season === 0 ||
      title === '' ||
      information === ''
    )
      return false;
    return true;
  };

  useEffect(() => {
    console.log(study);
    console.log('load ModifyStudy');
    console.log(memberIdList);
    memberAPI.getAllMembers().then((data) => {
      setAllMemberList(data.list);
    });
  }, []);
  const deleteMember = (member) => {
    setMemberList(memberList.filter((cmember) => cmember.id != member.id));
    setMemberIdList(memberIdList.filter((cmember) => cmember != member.id));
  };
  const addMember = (member) => {
    if (member.id != headMember.id)
      if (memberList.findIndex((cmember) => cmember.id == member.id) == -1) {
        setMemberList([...memberList, member]);
        setMemberIdList([...memberIdList, member.id]);
        console.log(memberList);
      }
  };
  const print = () => {
    console.log(year);
    console.log(season);
    console.log(title);
    console.log(information);
    console.log(headMember);
    console.log(memberList);
    console.log(gitLink);
    console.log(noteLink);
    console.log(etcLink);
    console.log(thumbnail);
  };

  const modifyHandler = () => {
    print();
    setClickable(false);
    ipAPI.getIp().then((ipAddress) => {
      console.log([headMember.id, ...memberIdList]);
      studyAPI
        .modify({
          studyId: study.id,
          year: year,
          season: season,
          title: title,
          information: information,
          memberIdList: memberIdList,
          gitLink: gitLink,
          noteLink: noteLink,
          etcLink: etcLink,
          thumbnailFile: thumbnail,
          token: token,
          ipAddress: ipAddress,
        })
        .then((res) => {
          setClickable(true);
          if (res.success) {
            setCurrentStudy();
            setChangeFlag(!changeFlag);
          } else {
            alert('스터디 수정 실패! 전산관리자에게 문의하세요~');
          }
        });
    });
  };
  //console.log('load ModifyStudy');
  return (
    <>
      <div
        name="스터디 추가 폼"
        className="p-5 py-3 bg-slate-200 dark:text-mainWhite dark:bg-gray-700"
      >
        <div className="">
          <input
            type="text"
            placeholder="연도(숫자만)"
            defaultValue={year ? year : ''}
            onBlur={(e) => checkYear(e.target.value)}
            className="max-w-lg inline-block w-[8em] mx-2 mb-2 shadow-sm focus:ring-mainYellow focus:border-mainYellow sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:bg-mainBlack dark:border-darkComponent"
          />
          <select
            className="mt-1 inline-block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-mainYellow focus:border-mainYellow sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
            defaultValue={season ? season : ''}
            onBlur={(e) => setSeason(e.target.value)}
          >
            <option value="0">학기 선택</option>
            <option value="1">1학기</option>
            <option value="2">여름방학</option>
            <option value="3">2학기</option>
            <option value="4">겨울방학</option>
          </select>
          {notNumber || year == '' || season == 0 ? (
            <div className="inline-block group ">
              <ExclamationCircleIcon
                className="inline-block h-6 w-6 mr-1 ml-2 bg-mainWhite rounded-full text-red-400 group dark:text-red-700 dark:bg-gray-300"
                aria-hidden="true"
              />
              <div className="absolute border border-red-400 rounded-lg bg-[rgb(240,230,190)] text-red-600 text-sm px-3 hidden group-hover:inline-block dark:bg-[rgb(200,190,150)]">
                {notNumber
                  ? '연도는 유효한 숫자(2000~2100) 값만 기입할 수 있습니다'
                  : '필수로 기입해야하는 내용입니다!'}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="bg-[rgb(255,209,90)] shadow overflow-hidden border-2 border-mainYellow sm:rounded-lg dark:text-mainWhite">
          <div className="bg-transparent px-4 pb-3 sm:rounded-t-lg sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="border-b-2 border-pointYellow ml-4 mt-2 w-full">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center"></div>
                  <div className="flex justify-between items-center ">
                    <input
                      type="text"
                      className="inline-block h-full w-full border-transparent bg-transparent pb-1 pr-3 text-gray-900 font-bold placeholder-[rgb(218,154,70)] focus:outline-none focus:placeholder-[rgb(255,235,110)] focus:ring-0 focus:border-transparent sm:text-2xl"
                      placeholder="스터디명"
                      defaultValue={title ? title : ''}
                      onBlur={(e) => setTitle(e.target.value)}
                    />
                    {title == '' ? (
                      <div className="inline-block group ">
                        <div className="absolute right-10 border border-red-400 rounded-lg bg-mainYellow text-red-600 text-sm px-3 hidden group-hover:inline-block">
                          필수로 기입해야하는 내용입니다!
                        </div>
                        <ExclamationCircleIcon
                          className="inline-block h-6 w-6 mr-1 ml-2 bg-mainWhite rounded-full text-red-500 "
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-mainWhite border-gray-200 px-4 py-5 sm:px-6 dark:bg-darkComponent">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="inline-block text-sm font-medium text-gray-700 dark:text-gray-400">
                  스터디 소개
                </label>
                {information == '' ? (
                  <div className="inline-block group ">
                    <ExclamationCircleIcon
                      className="inline-block h-4 w-4 mr-1 ml-2 -mt-[1px] mb-[1px] bg-mainWhite rounded-full text-red-400 group dark:text-red-700 dark:bg-gray-300"
                      aria-hidden="true"
                    />
                    <div className="absolute border border-red-400 rounded-lg bg-[rgb(240,230,190)] text-red-600 text-sm px-3 hidden group-hover:inline-block dark:bg-[rgb(200,190,150)]">
                      필수로 기입해야하는 내용입니다!
                    </div>
                  </div>
                ) : (
                  ''
                )}
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="shadow-sm focus:ring-mainYellow focus:border-mainYellow block w-full sm:text-sm border border-gray-300 rounded-md dark:bg-mainBlack dark:border-gray-600"
                    defaultValue={information ? information : ''}
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
                <div className="border-t mb-1  dark:border-gray-500"></div>
                <div className="mt-1 text-sm text-gray-900 dark:text-mainWhite">
                  <div className="bg-slate-100 min-h-[3em] dark:bg-gray-700">
                    {headMember ? (
                      <div className="inline-block p-1">
                        <span className="flex justify-between border border-gray-300 bg-mainWhite min-w-[5em] px-2 py-1 m-[1px] text-sm rounded-full dark:bg-mainBlack">
                          <span>{headMember.nickName}</span>
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                <dt className="text-sm mt-3 font-medium text-gray-500 dark:text-gray-400">
                  스터디원
                </dt>
                <div className=" mt-1 text-sm text-gray-900 dark:text-mainWhite">
                  <div className="border-t mb-1  dark:border-gray-500"></div>
                  <div className="bg-slate-100 min-h-[3em] dark:bg-gray-700">
                    {memberList ? (
                      <div className="inline-block p-1">
                        {headMember ? (
                          <div className="inline-block">
                            <span className="flex bg-mainWhite border border-gray-300 min-w-[5em] px-2 py-1 m-[1px] text-sm rounded-full dark:bg-mainBlack">
                              <span>{headMember.nickName}</span>
                            </span>
                          </div>
                        ) : (
                          ''
                        )}

                        {memberList.map((member) => (
                          <div key={member.id} className="inline-block">
                            {member.id != headMember.id ? (
                              <span className="flex justify-between bg-mainWhite border border-gray-300 min-w-[5em] px-2 py-1 m-[1px] text-sm rounded-full dark:bg-mainBlack">
                                <span>{member.nickName}</span>
                                <XIcon
                                  className="inline-block h-5 w-5 text-slate-300 hover:text-slate-400  dark:text-gray-500 dark:hover:text-gray-300"
                                  aria-hidden="true"
                                  onClick={() => deleteMember(member)}
                                />
                              </span>
                            ) : (
                              ''
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                <button
                  className={
                    (viewMemberList2
                      ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
                      : 'bg-white hover:bg-gray-100 dark:bg-darkComponent ') +
                    ' inline-flex items-center shadow-sm py-1 px-2 pr-3 my-1 border border-gray-300text-gray-700  text-sm leading-5 font-medium rounded-lg  focus:outline-none dark:text-gray-300 dark:border-mainBlack'
                  }
                  onClick={() => setViewMemberList2(!viewMemberList2)}
                >
                  {viewMemberList2 ? (
                    <XIcon
                      className="text-gray-400 dark:text-mainBlack -ml-1.5 h-5 w-5 "
                      aria-hidden="true"
                    />
                  ) : (
                    <PlusIcon
                      className="text-gray-400 -ml-1.5 h-5 w-5 "
                      aria-hidden="true"
                    />
                  )}
                  추가하기
                </button>
                {viewMemberList2 ? (
                  <div className="border h-[15em] overflow-y-scroll bg-mainWhite dark:bg-mainBlack dark:border-darkComponent">
                    <ul className="">
                      {allMemberList.map((member) => (
                        <li
                          className="border p-1 flex justify-between items-center group hover:bg-slate-100 dark:hover:bg-gray-800 dark:border-darkComponent"
                          onClick={() => addMember(member)}
                        >
                          <div className="flex items-center">
                            <div>
                              {member.thumbnailPath ? (
                                <img
                                  className="border inline-block h-9 w-9 rounded-full dark:border-gray-600"
                                  src={member.thumbnailPath}
                                  alt=""
                                />
                              ) : (
                                <div className="inline-block h-9 w-9 rounded-full"></div>
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">
                                {member.nickName}
                              </p>
                            </div>
                          </div>
                          <div className="text-mainYellow px-3 hidden group-hover:block">
                            추가하기
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="sm:row-span-2">
                <ThumbnailZone
                  modifyFlag={true}
                  study={study}
                  setThumbnail={setThumbnail}
                />
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
                          <label className="block ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Github
                          </label>
                          <div className="m-1">
                            <input
                              type="text"
                              autoComplete="Github"
                              placeholder="http://"
                              className="py-1 shadow-sm focus:ring-mainYellow focus:border-mainYellow block w-full sm:text-sm border-gray-300 rounded-md  dark:bg-mainBlack dark:border-gray-600"
                              defaultValue={gitLink ? gitLink : ''}
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
                          <label className="block ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Notion
                          </label>
                          <div className="m-1">
                            <input
                              type="text"
                              autoComplete="Notion"
                              placeholder="http://"
                              className="py-1 shadow-sm focus:ring-mainYellow focus:border-mainYellow block w-full sm:text-sm border-gray-300 rounded-md  dark:bg-mainBlack dark:border-gray-600"
                              defaultValue={noteLink ? noteLink : ''}
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
                          <label className="block ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            기타
                          </label>
                          <div className="m-1">
                            <input
                              type="text"
                              autoComplete="etc"
                              placeholder="http://"
                              className="py-1 shadow-sm focus:ring-mainYellow focus:border-mainYellow block w-full sm:text-sm border-gray-300 rounded-md  dark:bg-mainBlack dark:border-gray-600"
                              defaultValue={etcLink ? etcLink : ''}
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
          <div className="flex justify-end items-center">
            {!uploadable() ? (
              <div className="flex-1 flex text-red-500 mx-2 dark:text-red-600">
                <ExclamationCircleIcon
                  className="h-5 w-5 mr-2 -mt-[2px] mb-[2px] bg-mainWhite rounded-full text-red-400 group dark:text-red-700 dark:bg-gray-300"
                  aria-hidden="true"
                />
                <span className="flex-1">작성되지 않은 내용이 있습니다.</span>
              </div>
            ) : (
              ''
            )}
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-600 dark:text-gray-300 dark:border-darkComponent"
              onClick={() => setCurrentStudy()}
            >
              닫기
            </button>
            <button
              type="button"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-mainYellow hover:bg-pointYellow focus:outline-none"
              onClick={() => modifyHandler()}
              disabled={!clickable || !uploadable()}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(ModifyStudy);
