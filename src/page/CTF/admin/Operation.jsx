import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import {
  PlusSmIcon,
  PaperClipIcon,
  XIcon,
  PlusIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/solid';

// local
import NavigationLayout from '../Components/NavigationLayout';
import Table from '../Components/Table';

//api
import memberAPI from 'API/v1/member';
import ctfAPI from 'API/v1/ctf';

const Operation = ({ member }) => {
  const [memberList, setMemberList] = useState([]); //멤버 오브젝트 리스트
  const [memberIdList, setMemberIdList] = useState([]); //멤버 아이디 리스트
  const [viewMemberList2, setViewMemberList2] = useState(false);
  const [allMemberList, setAllMemberList] = useState([]); //멤버 추가 시 보여줄 동아리 회원의 전체 리스트
  const [headMember, setHeadMember] = useState([]); //멤버 오브젝트

  const tableHead = ['대회명', '설명', '개최자', '개최여부'];
  const [tableBody, setTableBody] = useState([
    [
      <input type="text" placeholder="추가 대회 이름" className="w-2/3 h-8" />,
      <input type="text" placeholder="추가 대회 설명" className="w-2/3 h-8" />,
      <input
        type="text"
        placeholder="추가 대회 개최자"
        className="w-2/3 h-8"
      />,
      '닫힘',
    ],
  ]);

  useEffect(() => {
    memberAPI.getAllMembers().then((data) => {
      setAllMemberList(data.list);
    });
    ctfAPI
      .getContestList({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          data.list.map((contest, contestIdx) => {
            const joinable = contest.joinable ? '열림' : '닫힘';
            setTableBody(
              tableBody.concat([
                [
                  contest.name,
                  contest.description,
                  contest.creatorId,
                  joinable,
                ],
              ])
            );
          });
        } else {
          console.log(data);
          alert('대회 목록 불러오는 중 오류가 발생하였습니다.');
        }
      });
  }, []);

  const addMember = (author) => {
    ctfAPI
      .addAuthor({
        memberId: author.id,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
        } else {
          console.log(data);
          alert('출제자 지정 중 오류가 발생하였습니다.');
        }
      });
    if (memberList.findIndex((cmember) => cmember.id == author.id) == -1) {
      setMemberList([...memberList, author]);
      setMemberIdList([...memberIdList, author.id]);
      console.log(memberList);
    }
  };

  const createContestHandler = () => {
    console.log('추가추가');
    /* ctfAPI.createContest({
  token: member.token, name, description
}) */
  };
  console.log(tableBody);
  console.log([...tableBody].reverse());
  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}
          <div className="">
            <div className=" w-full container mx-auto justify-center items-center">
              {/* 1. 커스텀 색상 팔레트 */}

              <div className="md:flex p-1 mt-2">
                <div className="w-full m-2 ">
                  <div className="p-1 bg-white">
                    <div className="flex justify-between m-1">
                      <div className="font-extrabold text-4xl m-1">
                        CTF-Operation
                      </div>
                      <div className="flex m-1">
                        <div className=" flex rounded p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                          <div className=" text-md ">
                            <button
                              className="hover:bg-amber-500  m-1 hover:text-mainWhite rounded font-bold"
                              onClick={createContestHandler}
                            >
                              대회 추가
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*구분선*/}
                  <div className="p-[2px] mb-2 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>
                  {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}

                  <div className="w-full">
                    <Table
                      headList={tableHead}
                      bodyList={[...tableBody].reverse()}
                    ></Table>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className={
                        (viewMemberList2
                          ? 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
                          : 'bg-white hover:bg-gray-100 dark:bg-darkComponent dark:hover:bg-gray-700') +
                        ' mx-2 inline-flex items-center shadow-sm py-1 px-2 my-1 border border-gray-300 text-gray-700 text-sm leading-5 font-medium rounded-lg  focus:outline-none dark:text-gray-300 dark:border-mainBlack'
                      }
                      onClick={() => setViewMemberList2(!viewMemberList2)}
                    >
                      {viewMemberList2 ? (
                        <XIcon
                          className="text-gray-400 dark:text-mainBlack -ml-1.5 h-4 w-4 "
                          aria-hidden="true"
                        />
                      ) : (
                        <PlusIcon
                          className="text-gray-400 -ml-1.5 h-4 w-4 "
                          aria-hidden="true"
                        />
                      )}
                      출제자 추가
                    </button>
                  </div>
                  <div className="flex justify-end">
                    {viewMemberList2 ? (
                      <div className="w-1/3 border h-[15em] overflow-y-scroll bg-mainWhite dark:bg-mainBlack dark:border-darkComponent">
                        <ul className="">
                          {allMemberList.map((memb, membIdx) => (
                            <li
                              className="border p-1 flex justify-between items-center group hover:bg-slate-100 dark:hover:bg-gray-800 dark:border-darkComponent"
                              onClick={() => addMember(memb)}
                              key={membIdx}
                            >
                              <div className="flex items-center">
                                <div>
                                  {memb.thumbnailPath ? (
                                    <img
                                      className="border inline-block h-9 w-9 rounded-full dark:border-gray-600"
                                      src={memb.thumbnailPath}
                                      alt=""
                                    />
                                  ) : (
                                    <div className="inline-block h-9 w-9 rounded-full"></div>
                                  )}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium">
                                    {memb.nickName}
                                  </div>
                                </div>
                              </div>
                              <PlusIcon
                                className="text-gray-400 -ml-1.5 h-5 w-5 "
                                aria-hidden="true"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Operation);
