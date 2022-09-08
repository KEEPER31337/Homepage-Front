import React, { useState, useEffect, useRef } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { connect } from 'react-redux';
import itmanagerAPI from 'API/v1/itmanager';

const DeleteBtn = ({
  token,
  memberId,
  nickName,
  generation,
  selectJob,
  jobMemberList,
  setJobMemberList,
}) => {
  // "멤버 id" + "job id" => 직책 삭제
  const deleteHandler = () => {
    if (jobMemberList.length === 1 && (selectJob === 1 || selectJob === 2))
      alert('회장님은 냐냐ㅑㄴ');
    //한개일시 경고창

    // jobMemberList.map((item) => {
    //   if (item.memberId === memberId) {
    //     console.log(item);
    //   }
    // });

    itmanagerAPI
      .deleteRole({
        memberId: memberId,
        jobId: selectJob,
        token: token,
      })
      .then((data) => {
        if (data.success) {
          setJobMemberList(
            jobMemberList.filter((data) => data.memberId != memberId)
          );
        } else {
        }
      });
  };
  return (
    <div className="bg-white flex flex-row justify-between items-center p-1 my-[3px] mx-[2px] text-slate-800 rounded-2xl ">
      <div className="flex items-center">
        <div className="text-sm px-2 text-slate-400">{generation}기</div>
        <div>{nickName}</div>
      </div>
      <XIcon
        className="h-6 w-6 hover:bg-amber-200 rounded-2xl text-amber-300 hover:text-white cursor-pointer"
        aria-hidden="true"
        onClick={deleteHandler}
      />
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { token: state.member.token };
};

export default connect(mapStateToProps)(DeleteBtn);
