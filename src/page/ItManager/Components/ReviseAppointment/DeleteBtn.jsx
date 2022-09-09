import React, { useRef } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { connect } from 'react-redux';
import itmanagerAPI from 'API/v1/itmanager';
import AlertModal from '../AlertModal.jsx';

const DeleteBtn = ({
  token,
  member,

  isDark,
  selectJob,
  jobMemberList,
  setJobMemberList,
}) => {
  const alertModalRef = useRef({});

  const deleteHandler = () => {
    if (jobMemberList.length === 1 && (selectJob === 1 || selectJob === 2)) {
      alertModalRef.current.open();
    } else {
      itmanagerAPI
        .deleteRole({
          memberId: member.memberId,
          jobId: selectJob,
          token: token,
        })
        .then((data) => {
          if (data.success) {
            setJobMemberList(
              jobMemberList.filter((data) => data.memberId != member.memberId)
            );
          } else {
          }
        });
    }
  };
  return (
    <div
      className={
        isDark
          ? 'bg-white flex flex-row justify-between items-center p-1 my-[3px] mx-[2px] text-slate-800 rounded-2xl '
          : 'bg-darkComponent flex flex-row justify-between items-center p-1 my-[3px] mx-[2px] text-white rounded-2xl '
      }
    >
      <div className="flex items-center">
        <div className="text-sm px-2 text-slate-400">{member.generation}기</div>
        <div>{member.nickName}</div>
      </div>
      <XIcon
        className={
          isDark
            ? 'h-6 w-6 hover:bg-amber-200 rounded-2xl text-amber-300 hover:text-white cursor-pointer'
            : 'h-6 w-6 hover:bg-violet-200 rounded-2xl text-violet-300 hover:text-white cursor-pointer'
        }
        aria-hidden="true"
        onClick={deleteHandler}
      />
      <AlertModal
        msg="회장, 부회장은 1명이상 존재해야 합니다!"
        ref={alertModalRef}
      ></AlertModal>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { token: state.member.token };
};

export default connect(mapStateToProps)(DeleteBtn);
