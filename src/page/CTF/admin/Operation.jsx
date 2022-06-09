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
import Modal from 'react-awesome-modal';

// local
import ContestOpenCloseBtn from '../Components/ContestOpenCloseBtn';

//api
import memberAPI from 'API/v1/member';
import ctfAPI from 'API/v1/ctf';

const Operation = ({ member }) => {
  const [memberList, setMemberList] = useState([]); //멤버 오브젝트 리스트
  const [memberIdList, setMemberIdList] = useState([]); //멤버 아이디 리스트
  const [viewMemberList2, setViewMemberList2] = useState(false);
  const [allMemberList, setAllMemberList] = useState([]); //멤버 추가 시 보여줄 동아리 회원의 전체 리스트
  const [headMember, setHeadMember] = useState([]); //멤버 오브젝트

  const [contestList, setContestList] = useState([]);

  const [contestName, setcontestName] = useState('');
  const [description, descriptionName] = useState('');

  const contestNameHandler = (e) => {
    setcontestName(e.target.value);
  };
  const descriptionHandler = (e) => {
    descriptionName(e.target.value);
  };

  const tableHead = ['대회명', '설명', '개최자', '개최여부'];

  const [addContestInput, setTableBody] = useState([
    [
      <input
        onChange={contestNameHandler}
        defaultValue={contestName}
        placeholder="추가 대회 이름"
        className="w-2/3 h-8 text-center rounded-md border-2"
      />,
      <input
        name="description"
        onChange={descriptionHandler}
        defaultValue={description}
        placeholder="추가 대회 설명"
        className="w-2/3 h-8 text-center rounded-md border-2"
      />,
      member.memberInfo.nickName,
      '닫힘',
    ],
  ]);
  useEffect(() => {
    memberAPI.getAllMembers().then((data) => {
      setAllMemberList(data.list);
    });
  });

  const [create, setCreate] = useState(false);

  useEffect(() => {
    ctfAPI
      .getContestList({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          setContestList(data.list);
        } else {
          console.log(data);
          alert('대회 목록 불러오는 중 오류가 발생하였습니다.');
        }
      });
  }, [create]);

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
    if (contestName === '' || description === '') {
      openModal(); //다시 입력하라는 모달
    } else {
      openModal2(); //대회를 추가하겠냐는 모달
    }
  };
  const createContest = () => {
    //대회 추가하겠냐는 모달 후, 확인누르면, 실제로 api 동작하는 함수
    ctfAPI
      .createContest({
        token: member.token,
        name: contestName,
        description: description,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          setCreate(!create);
        } else {
          console.log(data);
          alert('대회 생성 중 오류가 발생하였습니다.');
        }
      });

    onReset();
  };

  const onReset = () => {
    setcontestName('');
    descriptionName('');
  };
  //모달 관련
  const [modalStatus, setModalState] = useState(false); //대회명과 설명을 입력해주세요
  const [modalStatus2, setModalState2] = useState(false); //대회를 추가하시겠습니까?
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  const openModal2 = () => {
    setModalState2(true);
  };
  const closeModal2 = () => {
    setModalState2(false);
  };
  return (
    <div className="md:w-4/5 flex flex-col flex-1 p-3">
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
                <div className="w-full h-full inline-block rounded overflow-hidden text-center">
                  <table className="w-full shadow bg-white">
                    <thead>
                      <tr className="h-10 w-full bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400  text-lg text-white font-extrabold text-center ">
                        {tableHead.map((head, headIdx) => (
                          <th key={headIdx}>{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {contestList.map((contest, contestIdx) => (
                        <tr
                          key={contestIdx}
                          className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]"
                        >
                          <td>{contest.name}</td>
                          <td>{contest.description}</td>
                          <td>{contest.creator.nickName}</td>
                          <td className="flex justify-center pt-1.5">
                            {/* <button
                                  className={contest.joinable ? '열림' : '닫힘'}
                                >
                                  {contest.joinable ? '열림' : '닫힘'} */}
                            <ContestOpenCloseBtn
                              isJoinable={contest.joinable}
                              ctfId={contest.ctfId}
                            />
                            {/* </button> */}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <input
                            value={contestName}
                            onChange={contestNameHandler}
                            // defaultValue={contestName}
                            placeholder="추가 대회 이름"
                            className="w-2/3 h-8 text-center rounded-md border-2"
                          />
                        </td>
                        <td>
                          <input
                            value={description}
                            name="description"
                            onChange={descriptionHandler}
                            // defaultValue={description}
                            placeholder="추가 대회 설명"
                            className="w-2/3 h-8 text-center rounded-md border-2"
                          />
                        </td>
                        <td>{member.memberInfo.nickName}</td>
                        <td>닫힘</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
      <Modal // 아무것도 체크안했을때 뜨는 모달
        visible={modalStatus}
        width="300"
        height="140"
        effect="fadeInDown"
        onClickAway={() => closeModal()}
      >
        <div className="m-5 p-3 flex flex-col items-center text-center">
          대회명과 설명을 입력해주세요
          <div className="flex m-8">
            <button
              className="bg-white mx-1 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                closeModal();
              }}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>

      <Modal // 아무것도 체크안했을때 뜨는 모달
        visible={modalStatus2}
        width="300"
        height="140"
        effect="fadeInDown"
        onClickAway={() => closeModal2()}
      >
        <div className="m-5 p-3 flex flex-col items-center text-center">
          대회를 추가하시겠습니까?
          <div className="flex m-8">
            <button
              className="bg-white mx-1 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                closeModal2();
              }}
            >
              취소
            </button>
            <button
              className="bg-white   mx-1 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                createContest();
                closeModal2();
              }}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
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
