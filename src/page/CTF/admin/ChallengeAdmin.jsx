import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ctfAPI from 'API/v1/ctf';
import Modal from 'react-awesome-modal';
import 'moment/locale/ko';
// local
import authAPI from 'API/v1/auth';
import actionMember from 'redux/action/member';
import OpenCloseBtn from '../Components/OpenCloseBtn';
import DeleteBtn from '../Components/DeleteBtn';

const ChallengeAdmin = ({ member, memberSignIn }) => {
  const [rankList, setRankList] = useState([]);
  const onClick = useCallback(() => {
    for (let item of checkedItems) {
      ctfAPI
        .deleteProb({
          pid: item,
          token: member.token,
        })
        .then((data) => {
          if (data.success) {
            setRankList((rankList) =>
              rankList.filter((rankList) => rankList.challengeId !== item)
            );
            checkedItems.delete(item); //set안에 다 지우기
          }
        });
    }
    closeModal();
  });
  const [checkedItems, setCheckedItems] = useState(new Set());
  const checkedItemHandler = (challengeId, isChecked) => {
    if (isChecked) {
      checkedItems.add(challengeId);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(challengeId)) {
      checkedItems.delete(challengeId);
      setCheckedItems(checkedItems);
    }
  };
  const [modalStatus, setModalState] = useState(false);
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  useEffect(() => {
    ctfAPI
      .getAdminProbList({
        ctfId: 2,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          setRankList(data.list);
        }
      });
  }, []);

  return (
    <div className="md:w-4/5 flex flex-col flex-1 p-3">
      <div className="md:flex p-1 mt-2">
        <div className="w-full m-2 ">
          <div className="p-1 bg-white">
            <div className="flex justify-between m-1">
              <div className="font-extrabold text-4xl m-1">문제관리페이지</div>

              <div className="flex m-1">
                <div className="mr-1 flex rounded p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                  <div className=" text-md ">
                    <button className="hover:bg-amber-500  m-1 hover:text-mainWhite rounded font-bold">
                      <Link to="/ctf/admin/challengeWrite">추가</Link>
                    </button>
                  </div>
                </div>
                <div className="flex rounded p-1 bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
                  <div className=" text-md ">
                    <button
                      onClick={openModal}
                      className="hover:bg-amber-500  m-1 hover:text-mainWhite rounded font-bold"
                    >
                      삭제
                    </button>
                    <Modal // 팀 정보 수정 클릭 시 뜨는 창
                      visible={modalStatus}
                      width="300"
                      height="140"
                      effect="fadeInDown"
                      onClickAway={() => closeModal()}
                    >
                      <div className="m-5 p-3 flex flex-col items-center text-center">
                        삭제하시겠습니까?
                        <div className="flex m-8">
                          <button
                            className="bg-white mx-1 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            onClick={() => {
                              closeModal();
                            }}
                          >
                            취소
                          </button>
                          <button
                            className="bg-white   mx-1 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            onClick={() => {
                              onClick();
                            }}
                          >
                            확인
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            {/*구분선*/}
          </div>
          <div className="p-[2px] mb-2 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>

          <div className="w-full h-1/12 flex rounded overflow-auto">
            <table className="text-center h-full w-full bg-white dark:text-white dark:bg-darkPoint">
              <thead>
                <tr className=" h-10 w-full bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400  text-lg text-white font-extrabold text-center ">
                  <th className="w-2/12">문제</th>
                  <th className="w-2/12">카테고리</th>
                  <th className="w-4/12">플래그</th>

                  <th className="w-1/12">출제자</th>
                  <th className="w-1/12">점수</th>
                  <th className="w-1/12">상태</th>
                  <th className="w-1/12"></th>
                </tr>
              </thead>
              <tbody className="">
                {rankList.map((info) => (
                  <tr key={info.challengeId} className="h-10 w-full  ">
                    {/* shadow shadow-purple-300 */}
                    <td>{info.title}</td>
                    <td>{info.category.name}</td>
                    <td>{info.flag}</td>
                    <td>{info.creatorName}</td>
                    <td>{info.score}</td>

                    <td className="dark:text-black">
                      <OpenCloseBtn
                        isSolvable={info.isSolvable}
                        challengeId={info.challengeId}
                      />
                    </td>
                    <td>
                      <DeleteBtn
                        challengeId={info.challengeId}
                        checkedItemHandler={checkedItemHandler}
                      />{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ChallengeAdmin);
