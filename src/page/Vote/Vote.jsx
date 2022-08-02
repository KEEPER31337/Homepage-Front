import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';

// local
import VoteOverview from './Components/VoteOverview';
import VoteTable from './Components/VoteTable';

const Vote = ({ member }) => {
  const [contestList, setContestList] = useState([]);
  const tableHead = ['대회명', '설명', '개최자'];

  useEffect(() => {
    setContestList([
      {
        name: '2022 2학기',
        description: '2022 2학기 선거입니댜',
        ctfId: 2,
        creator: {
          id: 5,
          nickName: '정현모',
          jobs: ['ROLE_회원', 'ROLE_회장', 'ROLE_출제자'],
          thumbnailPath: 'http://13.209.6.87/v1/util/thumbnail/1',
          generation: 13,
        },
      },
    ]);
    console.log(contestList);
  }, []);

  return (
    <div className="md:w-4/5 flex flex-col flex-1 p-3">
      <div className="mr-20">
        {contestList.length == 0 ? (
          <div className="pt-5 grid place-items-center mr-20">
            <div className="flex whitespace-pre text-center dark:text-slate-200 text-4xl m-2 font-bold">
              대회 <div className="text-mainYellow">준비중</div>
              입니다.
            </div>
          </div>
        ) : (
          <>
            <div className="my-10 text-center text-lg font-basic dark:text-amber-200 ">
              참여할 선거를 선택해주세요!
            </div>
            <div className="my-10 mx-20 flex flex-wrap justify-between">
              <div className="mb-20 w-full">
                <div className="flex flex-wrap justify-center">
                  {contestList.map((contest, contestIdx) =>
                    contestIdx < 3 ? (
                      <VoteOverview
                        key={contestIdx}
                        id={contest.ctfId}
                        name={contest.name}
                        description={contest.description}
                        creator={contest.creator.nickName}
                      />
                    ) : null
                  )}
                </div>
              </div>
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
                        <VoteTable
                          key={contestIdx}
                          id={contest.ctfId}
                          name={contest.name}
                          description={contest.description}
                          creator={contest.creator.nickName}
                        />
                      ))}
                    </tbody>
                  </table>
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
