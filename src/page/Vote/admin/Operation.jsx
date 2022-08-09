import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import ProbOpenCloseBtn from '../Components/ProbOpenCloseBtn';

import DeleteVote from '../Components/Operation/DeleteVote';
import CreateVote from '../Components/Operation/CreateVote';

const Operation = ({ member }) => {
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    setRankList([
      {
        voteId: 1,
        title: '2022 1학기 선거',
        descript: '2022 1학기 선거 선거입니다욤~~',
        isOpen: false,
      },
      {
        voteId: 2,
        title: '2022 2학기 선거',
        descript: '선거입니다욤~~~!@!@',
        isOpen: true,
      },
    ]);
  }, []);

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
