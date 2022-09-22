//상벌점 타입 편집창
import React, { useState, useEffect, useRef } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';

import clerkAPI from 'API/v1/clerk';

//local

const TypeModal = ({
  isOpen,
  setIsOpen,
  Preason,
  Mreason,
  isChanged,
  setIsChanged,
  state,
}) => {
  //편집창 상에서 보이는 상벌점 사유 리스트(UI)
  const [viewMerit, setViewMerit] = useState(Preason);
  const [viewDemerit, setViewDemerit] = useState(Mreason);
  /**
   *  [{isMerit:true, merit:3,detail:3,nflag:true},...]
   */
  //새로 추가될 상/벌점 데이터(단일)
  const [newMerit, setNewMerit] = useState({});
  const [newDemerit, setNewDemerit] = useState({});
  /**
   * {merit:3,detail:3}
   */
  //저장 버튼을 누르기 전까지 모달창에서 보존할 데이터(추가데이터, 제거데이터)
  const [addData, setAddData] = useState([]);
  /**
   * [{isMerit:true, merit:3,detail:3},...]
   */
  const [removeData, setRemoveData] = useState([]);
  /**
   * [1,5,2] id 리스트
   */
  const token = state.member?.token;
  const outside = useRef();
  const handleModalClose = (e) => {
    //모달창 바깥 배경 클릭 시 모달이 닫히도록
    if (isOpen && outside.current === e.target) setIsOpen(false);
  };
  const submitHandler = () => {
    //console.log('add', addData);
    //console.log('remove', removeData);
    if (addData.length !== 0)
      clerkAPI
        .addPointType({
          token,
          modifyData: addData.map((data) => {
            return {
              merit: data.merit,
              isMerit: data.isMerit,
              detail: data.detail,
            };
          }),
        })
        .then((res) => {
          //console.log(res);
          if (removeData.length !== 0) {
            clerkAPI
              .removePointType({ token, typeIds: removeData })
              .then((res) => {
                //console.log(res);
                if (res?.success) {
                  setIsChanged(!isChanged);
                  setIsOpen(false);
                } else
                  alert(
                    '상벌점 정보를 수정하는 데 실패하였습니다. 새로고침 후 다시 실행해주세요.'
                  );
              });
          } else {
            setIsChanged(!isChanged);
            setIsOpen(false);
          }
        });
    else {
      if (removeData.length !== 0)
        clerkAPI.removePointType({ token, typeIds: removeData }).then((res) => {
          //console.log(res);
          if (res?.success) {
            setIsChanged(!isChanged);
            setIsOpen(false);
          } else
            alert(
              '상벌점 정보를 수정하는 데 실패하였습니다. 새로고침 후 다시 실행해주세요.'
            );
        });
      else {
        setIsChanged(!isChanged);
        setIsOpen(false);
      }
    }
    /*;*/
  };

  useEffect(() => {
    setAddData([]);
    setNewMerit({
      detail: '',
      merit: '',
    });
    setNewDemerit({
      detail: '',
      merit: '',
    });
    setRemoveData([]);
  }, [isOpen]);

  useEffect(() => {
    setNewMerit({
      detail: '',
      merit: '',
    });
    setNewDemerit({
      detail: '',
      merit: '',
    });
  }, [addData]);
  return (
    <div
      className="font-basic h-w-full flex justify-center fixed top-0 left-0 right-0 bottom-0 z-[99] bg-mainBlack bg-opacity-60 dark:text-mainWhite"
      ref={outside}
      onClick={(e) => handleModalClose(e)}
    >
      {/*console.log(viewMerit)*/}
      {/*console.log(viewDemerit)*/}
      <div className="flex flex-col w-[80vw] h-[80vh] p-2 my-auto text-sm sm:text-base">
        <div className="h-[2em] rounded-t-lg relative p-2 px-4 bg-mainWhite font-bold dark:bg-darkPoint dark:text-gray-200">
          상벌점 사유 수정하기
          <button
            className="text-2xl absolute -top-[3px] right-1 w-5 font-bold text-center text-gray-400 "
            onClick={() => {
              setIsOpen(false);
            }}
          >
            &times;
          </button>
        </div>
        <div className="h-full bg-mainWhite rounded-b-lg p-4 pb-4 flex flex-col justify-center dark:bg-darkPoint">
          <div className="flex flex-col gap-2 justify-center items-center h-full p-2">
            <div className="flex w-full gap-2 text-center font-bold">
              <div className="text-green-400 w-full underline decoration-green-400 underline-offset-4">
                상점 사유
              </div>
              <div className="text-red-400 w-full underline decoration-red-400 underline-offset-4">
                벌점 사유
              </div>
            </div>
            <div className="flex w-full gap-2">
              <div className="border-2 rounded-md w-full h-[40vh] overflow-auto dark:border-gray-600">
                {viewMerit.map((reason, index) => (
                  <div
                    key={index}
                    className={
                      (reason?.nflag
                        ? 'bg-green-100'
                        : reason?.dflag
                        ? 'bg-red-100'
                        : 'group') +
                      ' flex p-1 border-b relative dark:border-gray-600'
                    }
                  >
                    <p className="w-[2em] text-center my-auto font-bold text-gray-400">
                      {index + 1}
                    </p>
                    <p className="border-x w-full px-2  dark:border-gray-600">
                      {reason.detail}
                    </p>
                    <p className="w-[3em] text-center my-auto">
                      {reason.merit}점
                    </p>
                    <div className="absolute top-0 right-0 justify-center items-center w-full h-full bg-slate-300 bg-opacity-50 group-hover:flex hidden dark:bg-slate-600 dark:bg-opacity-50">
                      <button
                        className="w-[6em] p-1 text-center text-xs bg-red-400 text-mainWhite rounded-md border hover:bg-red-600 focus:outline-none dark:border-gray-600"
                        onClick={() => {
                          //ui 수정
                          setViewMerit(
                            viewMerit.map((merit) => {
                              if (merit.id === reason.id)
                                return { ...merit, dflag: true };
                              return merit;
                            })
                          );
                          setRemoveData([...removeData, reason.id]);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-2 rounded-md w-full h-[40vh] overflow-auto dark:border-gray-600">
                {viewDemerit.map((reason, index) => (
                  <div
                    key={index}
                    className={
                      (reason?.nflag
                        ? 'bg-green-100 dark:bg-green-600'
                        : reason?.dflag
                        ? 'bg-red-100 dark:bg-red-600'
                        : 'group') +
                      ' flex p-1 border-b relative dark:border-gray-600'
                    }
                  >
                    <p className="w-[2em] text-center my-auto font-bold text-gray-400">
                      {index + 1}
                    </p>
                    <p className="border-x w-full px-2 dark:border-gray-600">
                      {reason.detail}
                    </p>

                    <p className="w-[3em] text-center my-auto">
                      {reason.merit}점
                    </p>
                    <div className="absolute top-0 right-0 justify-center items-center w-full h-full bg-slate-300 bg-opacity-50 group-hover:flex hidden dark:bg-slate-600 dark:bg-opacity-50">
                      <button
                        className="w-[6em] p-1 text-center text-xs bg-red-400 text-mainWhite rounded-md border hover:bg-red-600 focus:outline-none dark:border-gray-600"
                        onClick={() => {
                          //ui 수정
                          setViewDemerit(
                            viewDemerit.map((demerit) => {
                              if (demerit.id === reason.id)
                                return { ...demerit, dflag: true };
                              return demerit;
                            })
                          );
                          setRemoveData([...removeData, reason.id]);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full gap-4 text-center font-bold">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  //ui에 반영하고 addData에 추가
                  setViewMerit([
                    ...viewMerit,
                    { ...newMerit, isMerit: true, nflag: true },
                  ]);
                  setAddData([...addData, { ...newMerit, isMerit: true }]);
                }}
                className="flex p-2 border-b w-full gap-2 dark:border-gray-600"
              >
                <p className="grow">
                  <input
                    type="text"
                    className="resize-none border-slate-400 w-full sm:text-sm rounded-md focus:outline-none focus:ring-violet-400 focus:border-violet-400 dark:bg-mainBlack dark:border-darkComponent"
                    value={newMerit?.detail}
                    onChange={(e) =>
                      setNewMerit({ ...newMerit, detail: e.target.value })
                    }
                    required
                  />
                </p>
                <p className="w-[3.5em] flex text-center items-center">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    className="inline-block pl-2 pr-0 py-2 w-full text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                    value={newMerit?.merit}
                    onChange={(e) =>
                      setNewMerit({ ...newMerit, merit: e.target.value })
                    }
                    required
                  />
                  <p>점</p>
                </p>
                <p className="w-[3.5em]">
                  <button
                    type="submit"
                    className="w-[2em] text-center my-auto font-bold focus:outline-none"
                  >
                    <PlusIcon className="text-violet-400 rounded-md border-2 hover:bg-slate-50 dark:border-gray-600 hover:bg-darkComponent" />
                  </button>
                </p>
              </form>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  //ui에 반영하고 addData에 추가
                  setViewDemerit([
                    ...viewDemerit,
                    { ...newDemerit, isMerit: false, nflag: true },
                  ]);
                  setAddData([...addData, { ...newDemerit, isMerit: false }]);
                }}
                className="flex p-2 border-b w-full gap-2 dark:border-gray-600"
              >
                <p className="grow">
                  <input
                    type="text"
                    className="resize-none border-slate-400 w-full sm:text-sm rounded-md focus:outline-none focus:ring-violet-400 focus:border-violet-400 dark:bg-mainBlack dark:border-darkComponent"
                    value={newDemerit?.detail}
                    onChange={(e) =>
                      setNewDemerit({ ...newDemerit, detail: e.target.value })
                    }
                    required
                  />
                </p>
                <p className="w-[3.5em] flex text-center items-center">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    className="inline-block pl-2 pr-0 py-2 w-full text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
                    value={newDemerit?.merit}
                    onChange={(e) =>
                      setNewDemerit({ ...newDemerit, merit: e.target.value })
                    }
                    required
                  />
                  <p>점</p>
                </p>
                <p className="w-[3.5em]">
                  <button
                    type="submit"
                    className="w-[2em] text-center my-auto font-bold focus:outline-none"
                  >
                    <PlusIcon className="text-violet-400 rounded-md border-2 hover:bg-slate-50 focus:outline-none dark:border-gray-600 hover:bg-darkComponent" />
                  </button>
                </p>
              </form>
            </div>
          </div>
          <div className="flex justify-end px-2">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-600 dark:text-gray-300 dark:border-darkComponent"
            >
              닫기
            </button>
            <button
              type="button"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-400 hover:bg-violet-500 focus:outline-none dark:bg-violet-600 dark:hover:bg-violet-400"
              onClick={() => {
                submitHandler();
              }}
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(TypeModal);
