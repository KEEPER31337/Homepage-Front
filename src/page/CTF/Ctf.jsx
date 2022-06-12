import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';

// local
import ContestOverview from './Components/ContestOverview';

// API
import ctfAPI from 'API/v1/ctf';

const Ctf = ({ member }) => {
  const tableHead = ['대회명', '설명', '개최자'];
  const [contestList, setContestList] = useState([]);

  useEffect(() => {
    console.log(member);
    ctfAPI
      .getJoinableContestList({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          setContestList(data.list);
        } else {
          console.log(data);
          alert('대회 목록을 받아오는 중 오류가 발생하였습니다.');
        }
      });
  }, []);

  return (
    <div className="md:w-4/5 flex flex-col flex-1 p-3">
      <div className="mr-20">
        <div className="my-10 text-center text-lg font-basic dark:text-amber-200 ">
          참여할 대회를 선택해주세요!
        </div>
        <div className="my-10 mx-20 flex flex-wrap justify-between">
          <div className="mb-20 w-full">
            <div className="m-5">OverView</div>
            <div className="flex flex-wrap justify-center">
              {contestList.map((contest, contestIdx) =>
                contestIdx < 3 ? (
                  <ContestOverview
                    key={contestIdx}
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
                    <tr
                      key={contestIdx}
                      className="w-full h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]"
                    >
                      <td>{contest.name}</td>
                      <td>{contest.description}</td>
                      <td>{contest.creator.nickName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ctf);
