import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import ProbOpenCloseBtn from '../Components/ProbOpenCloseBtn';

import DeleteVote from '../Components/Operation/DeleteVote';
import CreateVote from '../Components/Operation/CreateVote';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
const Operation = ({ member }) => {
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    setRankList([
      {
        voteId: 2,
        title: '2022 2학기 선거',
        descript: '선거입니다욤~~~!@!@',
        isOpen: true,
      },
    ]);
  }, []);

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
    // ctfAPI
    //   .getAdminProbList({
    //     ctfId: ctfId,
    //     page: page,
    //     size: 10,
    //     token: member.token,
    //   })
    //   .then((data) => {
    //     // TODO cid 받아와서 넣기
    //     if (data.success) {
    //       setCanGoPrev(data.page.first);
    //       setCanGoNext(data.page.last);
    //       setRankList(data.page.content);
    //     }
    //   });
  }, [page]);

  return (
    <div className="flex flex-col w-full h-full font-basic text-black p-4">
      <div className="flex flex-row text-xl justify-end my-1 mb-1">
        <CreateVote />
      </div>

      <table className="text-center h-full w-full  bg-white shadow-md">
        <thead>
          <tr className=" h-10 w-full bg-slate-200 font-extrabold text-center ">
            <th className="w-3/12">선거이름</th>
            <th className="w-7/12">설명</th>
            <th className="w-1/12">상태</th>

            <th className="w-1/12">삭제</th>
          </tr>
        </thead>
        <tbody className="">
          {rankList.map((info) => (
            <tr key={info.voteId} className="h-10 w-full  ">
              {/* shadow shadow-purple-300 */}
              <td>{info.title}</td>
              <td>{info.descript}</td>

              <td>
                <ProbOpenCloseBtn
                  isSolvable={info.isOpen}
                  challengeId={info.voteId}
                />
              </td>
              <td>
                <DeleteVote
                  challengeId={info.voteId}
                  // checkedItemHandler={checkedItemHandler}
                />{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-full justify-end mt-1">
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
            <ChevronRightIcon className="inline-block  mr-2  rounded h-9 w-9 text-white bg-slate-300" />
          </button>
        ) : (
          <button onClick={goNextPage}>
            <ChevronRightIcon className="inline-block  mr-2  dark:hover:bg-indigo-500 hover:bg-amber-500    rounded h-9 w-9 text-white bg-amber-400 dark:bg-indigo-300" />
          </button>
        )}
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
