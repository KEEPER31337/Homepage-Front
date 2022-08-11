import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import ProbOpenCloseBtn from '../Components/Operation/ProbOpenCloseBtn';

import DeleteVote from '../Components/Operation/DeleteVote';
import CreateVote from '../Components/Operation/CreateVote';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

//api
import voteAPI from 'API/v1/vote';

//local
import AuthModal from '../Components/AuthModal';

const Operation = ({ member }) => {
  // 권한 없는 자가 접근했을 경우, vote페이지로 이동
  const [auth, setAuth] = useState(['ROLE_회장']);
  const jobs = member?.memberInfo?.jobs;
  const ModalRef = useRef({});

  const [voteList, setVoteList] = useState([]);
  const [update, setUpdate] = useState(true);

  const updateHandler = () => {
    setUpdate(!update);
    console.log('ㅇㅇㅇ');
  };

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
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }

    voteAPI
      .getVoteList({
        page: page,
        size: 5,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          setCanGoPrev(data.page.first);
          setCanGoNext(data.page.last);
          setVoteList(data.page.content);
          console.log(voteList);
        }
      });
  }, []);
  useEffect(() => {
    voteAPI
      .getVoteList({
        page: page,
        size: 5,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          setCanGoPrev(data.page.first);
          setCanGoNext(data.page.last);
          setVoteList(data.page.content);
        }
      });
  }, [page, update]);

  return (
    <div className="flex flex-col w-full h-full font-basic text-black p-4">
      <div className="flex flex-row  text-xl justify-end my-1 mb-1">
        <CreateVote updateHandler={updateHandler} />
      </div>

      <table className="text-center h-full w-full dark:bg-darkPoint  bg-white shadow-md">
        <thead>
          <tr className=" h-10 w-full bg-slate-200 font-extrabold text-center dark:text-black">
            <th className="w-3/12">선거이름</th>
            <th className="w-7/12">설명</th>
            <th className="w-1/12">상태</th>

            <th className="w-1/12">삭제</th>
          </tr>
        </thead>
        <tbody className="">
          {voteList.map((info) => (
            <tr key={info.electionId} className="h-10 w-full  ">
              {/* shadow shadow-purple-300 */}
              <td className="dark:text-white">{info.name}</td>
              <td className="dark:text-white">{info.description}</td>

              <td>
                <ProbOpenCloseBtn
                  isAvailable={info.isAvailable}
                  electionId={info.electionId}
                />
              </td>
              <td>
                <DeleteVote
                  electionId={info.electionId}
                  updateHandler={updateHandler}
                  // checkedItemHandler={checkedItemHandler}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-full  justify-end mt-2">
        {canGoPrev ? (
          <button disabled className="cursor-not-allowed">
            <ChevronLeftIcon className="inline-block  rounded h-8 w-8 text-white bg-slate-300" />
          </button>
        ) : (
          <button onClick={goPrevPage}>
            <ChevronLeftIcon className="inline-block  dark:hover:bg-indigo-500 hover:bg-amber-500  rounded h-8 w-8 text-white bg-amber-400 dark:bg-indigo-300" />
          </button>
        )}
        <div className="h-8 w-8 text-center justify-center text-3xl mx-1 rounded flex items-center dark:bg-indigo-300 bg-amber-400 text-white font-bold">
          {page + 1}
        </div>
        {canGoNext ? (
          <button disabled className="cursor-not-allowed">
            <ChevronRightIcon className="inline-block rounded h-8 w-8 text-white bg-slate-300" />
          </button>
        ) : (
          <button onClick={goNextPage}>
            <ChevronRightIcon className="inline-block dark:hover:bg-indigo-500 hover:bg-amber-500    rounded h-8 w-8 text-white bg-amber-400 dark:bg-indigo-300" />
          </button>
        )}
      </div>
      <AuthModal ref={ModalRef}>선거 관리자만 접근할 수 있습니다</AuthModal>
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
