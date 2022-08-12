import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import vote from 'assets/img/vote.png';
// local
import noticeImg from 'assets/img/ctfImg/notice.png';
import VoteOverview from './Components/Vote/VoteOverview';
import CloseVoteOverview from './Components/Vote/CloseVoteOverview';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
//api
import voteAPI from 'API/v1/vote';

const Vote = ({ member }) => {
  const [allVoteList, setAllVoteList] = useState([]);
  const [openVoteList, setOpenVoteList] = useState([]);
  const [closeVoteList, setCloseVoteList] = useState([]);

  //page 이동 관련
  const [totalPage, setTotalPage] = useState(0);
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
    voteAPI
      .getOpenVoteList({
        page: page,
        size: 10,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          setOpenVoteList(data.page.content);
        }
      });

    voteAPI
      .getCloseVoteList({
        page: page,
        size: 5,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          setCanGoPrev(data.page.first);
          setCanGoNext(data.page.last);
          setCloseVoteList(data.page.content);

          setTotalPage(data.page.totalElements);
        }
      });
  }, []);

  useEffect(() => {
    voteAPI
      .getCloseVoteList({
        page: page,
        size: 5,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          setCanGoPrev(data.page.first);
          setCanGoNext(data.page.last);
          setCloseVoteList(data.page.content);
        }
      });
  }, [page]);

  return (
    <div className=" flex flex-col flex-1 p-3 font-basic dark:text-white">
      <div className="flex sm:flex-row flex-col w-full h-full justify-center ">
        <>
          <div className="flex flex-col w-full sm:w-2/3 mb-8 h-full  justify-start items-center">
            <div className="my-5 text-lg  ">다음 선거가 진행중입니다!</div>
            {openVoteList.map((info) => (
              <VoteOverview
                key={info.electionId}
                id={info.electionId}
                name={info.name}
                description={info.description}
              />
            ))}
          </div>
          <div className="flex flex-col  w-full dark:text-slate-200 sm:w-1/3 h-full bg-slate-50 dark:bg-[#080a12] justify-start items-center p-5">
            <div className="text-lg">완료된 선거</div>
            {closeVoteList.map((info) => (
              <CloseVoteOverview
                key={info.electionId}
                id={info.electionId}
                name={info.name}
                description={info.description}
              />
            ))}
            {totalPage > 5 ? (
              <div className="flex w-full  justify-end mt-4">
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
            ) : (
              <></>
            )}
          </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
