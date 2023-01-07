import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import Modal from 'react-awesome-modal';
import CreatorModal from '../Components/CreatorModal.jsx';

// local
import ContestOpenCloseBtn from '../Components/ContestOpenCloseBtn';
import AuthModal from '../Components/AuthModal';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

//api
import ctfAPI from 'API/v1/ctf';

const Operation = ({ member }) => {
  //권한 없을시 나가게
  const [auth, setAuth] = useState(['ROLE_회장']);
  const jobs = member?.memberInfo?.jobs;
  const ModalRef = useRef({});
  useEffect(() => {
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }
  }, []);

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

  const [create, setCreate] = useState(false);

  //page 이동 관련
  const [page, setPage] = useState(0);
  const [canGoNext, setCanGoNext] = useState(false);
  const [canGoPrev, setCanGoPrev] = useState(false);

  const goNextPage = () => {
    setPage(page + 1);
  };

  const goPrevPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    ctfAPI
      .getContestList({
        page: page,
        size: 9,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setCanGoPrev(data.page.first);
          setCanGoNext(data.page.last);
          setContestList(data.page.content);
        }
      });
  }, [page, create]);

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
          // console.log(data);
          setCreate(!create);
        } else {
          // console.log(data);
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

  //출제자 추가버튼 모달 관련
  const creatorModalRef = useRef({});
  const handleCreator = () => {
    creatorModalRef.current.open();
  };

  return (
    <div className="md:w-4/5 flex flex-col flex-1 p-3 text-sm">
      <div className="">
        <div className=" w-full container mx-auto justify-center items-center">
          {/* 1. 커스텀 색상 팔레트 */}

          <div className="md:flex p-1 mt-2">
            <div className="w-full m-2 ">
              <div className="p-1 bg-white dark:bg-mainBlack dark:text-mainWhite">
                <div className="flex justify-between m-1">
                  <div className="font-extrabold text-4xl m-1">
                    CTF-Operation
                  </div>

                  <div className="flex m-1">
                    <div className="flex rounded p-1 bg-amber-300 dark:bg-indigo-400 dark:border-indigo-500  border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                      <div className=" text-md ">
                        <button
                          className="hover:bg-amber-500 dark:hover:bg-indigo-500 m-1 hover:text-mainWhite rounded font-bold"
                          onClick={createContestHandler}
                        >
                          대회 추가
                        </button>
                      </div>
                    </div>
                    <div className="ml-1 flex rounded p-1 text-md bg-amber-300 dark:bg-indigo-400 dark:border-indigo-500  border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                      <button
                        className="hover:bg-amber-500 dark:hover:bg-indigo-500 m-1 hover:text-mainWhite rounded font-bold"
                        onClick={handleCreator}
                      >
                        출제자 추가
                      </button>
                      <CreatorModal ref={creatorModalRef}></CreatorModal>
                    </div>
                  </div>
                </div>
              </div>
              {/*구분선*/}
              <div className="p-[2px] mb-2 dark:from-purple-500 dark:via-purple-200 dark:to-amner-200 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>
              {/* 2.  프로필 이미지 + 팔로우 + 포인트 */}

              <div className="w-full">
                <div className="w-full h-[450px] inline-block rounded overflow-hidden text-center">
                  <table className="text-center h-fit w-full bg-white dark:text-white dark:bg-darkPoint">
                    <thead>
                      <tr className="h-10 w-full bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400  text-lg text-white font-extrabold text-center ">
                        {tableHead.map((head, headIdx) => (
                          <th key={headIdx}>{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            value={contestName}
                            onChange={contestNameHandler}
                            // defaultValue={contestName}
                            placeholder="추가 대회 이름"
                            className="w-2/3 h-8 mt-2 text-center dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-gray-300 focus:ring-gray-300 focus:ring-1 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={description}
                            name="description"
                            onChange={descriptionHandler}
                            // defaultValue={description}
                            placeholder="추가 대회 설명"
                            className="w-2/3 h-8 mt-2 text-center dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-gray-300 focus:ring-gray-300 focus:ring-1 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
                          />
                        </td>
                        <td>{member.memberInfo.nickName}</td>
                        <td>닫힘</td>
                      </tr>
                      {contestList.map((contest, contestIdx) => (
                        <tr
                          key={contestIdx}
                          className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]"
                        >
                          <td>{contest.name}</td>
                          <td>{contest.description}</td>
                          <td>{contest.creator.nickName}</td>
                          <td className="flex justify-center pt-1.5 dark:text-black">
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
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex w-full justify-end ">
                {canGoPrev ? (
                  <button disabled className="cursor-not-allowed">
                    <ChevronLeftIcon className="inline-block  rounded h-9 w-9 text-white bg-slate-300" />
                  </button>
                ) : (
                  <button onClick={goPrevPage}>
                    <ChevronLeftIcon className="inline-block  dark:hover:bg-indigo-500 hover:bg-amber-500  rounded h-9 w-9 text-white bg-amber-400 dark:bg-indigo-300" />
                  </button>
                )}
                <div className="h-9 w-9 text-center justify-center text-3xl mx-1 rounded flex items-center dark:bg-indigo-300 bg-amber-400 text-white font-bold">
                  {page + 1}
                </div>
                {canGoNext ? (
                  <button disabled className="cursor-not-allowed">
                    <ChevronRightIcon className="inline-block mr-2 rounded h-9 w-9 text-white bg-slate-300" />
                  </button>
                ) : (
                  <button onClick={goNextPage}>
                    <ChevronRightIcon className="inline-block mr-2  dark:hover:bg-indigo-500 hover:bg-amber-500    rounded h-9 w-9 text-white bg-amber-400 dark:bg-indigo-300" />
                  </button>
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
      <AuthModal ref={ModalRef}>CTF운영자만 접근할 수 있습니다</AuthModal>
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
