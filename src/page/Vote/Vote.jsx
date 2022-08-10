import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import vote from 'assets/img/vote.png';
// local
import VoteOverview from './Components/VoteOverview';

//api
import voteAPI from 'API/v1/vote';

const Vote = ({ member }) => {
  const [allVoteList, setAllVoteList] = useState([]);
  const [openVoteList, setOpenVoteList] = useState([]);
  const [closeVoteList, setCloseVoteList] = useState([]);
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
    voteAPI
      .getVoteList({
        page: page,
        size: 10,
        token: member.token,
      })
      .then((data) => {
        // TODO cid 받아와서 넣기
        if (data.success) {
          setCanGoPrev(data.page.first);
          setCanGoNext(data.page.last);
          setOpenVoteList(data.page.content);
          setCloseVoteList(data.page.content);

          //open
          setOpenVoteList((aa) => aa.filter((s) => s.isAvailable === true));
          //close

          setCloseVoteList((aa) => aa.filter((s) => s.isAvailable === false));
        }
      });
  }, []);

  return (
    <div className=" flex flex-col flex-1 p-3">
      <div className="mr-20">
        {openVoteList.length == 0 ? (
          <div className="pt-5 grid place-items-center mr-20">
            <div className="flex whitespace-pre text-center dark:text-slate-200 text-4xl m-2 font-bold">
              대회 <div className="text-mainYellow">준비중</div>
              입니다.
            </div>
          </div>
        ) : (
          <>
            <div className="my-10 text-center text-lg font-basic dark:text-amber-200 ">
              진행중 선거
            </div>
            <div className="my-10 mx-20 flex flex-wrap justify-between">
              <div className="mb-20 w-full">
                <div className="flex flex-wrap justify-center">
                  {openVoteList.map((info) => (
                    <VoteOverview
                      key={info.electionId}
                      id={info.electionId}
                      name={info.name}
                      description={info.description}
                    />
                  ))}
                  완료
                  {closeVoteList.map((info) => (
                    <VoteOverview
                      key={info.electionId}
                      id={info.electionId}
                      name={info.name}
                      description={info.description}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
