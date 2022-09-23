import React, { useRef } from 'react';
import { connect } from 'react-redux';
import itmanagerAPI from 'API/v1/itmanager';
import AlertModal from '../AlertModal.jsx';
const CreateBtn = ({
  token,
  member,
  selectJob,
  jobMemberList,
  setJobMemberList,
  isDark,
}) => {
  //출제자 추가버튼 모달 관련
  const alertModalRef = useRef({});

  const createHandler = () => {
    if (jobMemberList.findIndex((item) => item.memberId == member.id) == -1) {
      itmanagerAPI
        .addRole({
          memberId: member.id,
          jobId: selectJob,
          token: token,
        })
        .then((data) => {
          if (data.success) {
            setJobMemberList(
              jobMemberList.concat({
                generation: member.generation,
                nickName: member.nickName,
                memberId: member.id,
              })
            );
          }
        });
    } else {
      alertModalRef.current.open();
    }
  };

  return (
    <div
      onClick={createHandler}
      className={
        isDark
          ? 'bg-white hover:bg-slate-100 h-fit  flex flex-row justify-start  mt-1 mx-[2px] text-slate-800 rounded'
          : 'bg-darkPoint hover:bg-black h-fit  flex flex-row justify-start  mt-1 mx-[2px] text-white rounded'
      }
    >
      <div className="p-1">
        <img src={member.thumbnailPath} className="h-9 w-9 rounded" />
      </div>
      <div className="flex  items-center">
        <div className="text-sm text-slate-400">{member.generation}기</div>
        <div className="px-2 ">{member.nickName}</div>
      </div>
      <AlertModal
        msg="이미 추가한 사람입니다!"
        ref={alertModalRef}
      ></AlertModal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { token: state.member.token };
};

export default connect(mapStateToProps)(CreateBtn);
