import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import itmanagerAPI from 'API/v1/itmanager';
const CreateBtn = ({
  token,
  member,
  selectJob,
  jobMemberList,
  setJobMemberList,
}) => {
  // "멤버 id" + "job id" => 직책 삭제

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
            console.log(data);
            setJobMemberList(
              jobMemberList.concat({
                generation: member.generation,
                nickName: member.nickName,
                memberId: member.id,
              })
            );
          } else {
          }
        });
    }
  };

  //   const addMember = (author) => {
  //   //이미 출제자인사람 추가하기 막음
  //   if (creatorList.findIndex((cmember) => cmember.id == author.id) == -1) {
  //     ctfAPI
  //       .addAuthor({
  //         memberId: author.id,
  //         token: token,
  //       })
  //       .then((data) => {
  //         if (data.success) {
  //           // console.log(data);
  //           ctfAPI.getAuthor({ token: token }).then((data) => {
  //             setJobMemberList(data.list);
  //           });
  //         } else {
  //           // console.log(data);
  //           alert('출제자 지정 중 오류가 발생하였습니다.');
  //         }
  //       });
  //   }
  // };

  return (
    <div
      onClick={createHandler}
      className="bg-white hover:bg-slate-100 h-fit  flex flex-row justify-start  mt-1 mx-[2px] text-slate-800 rounded"
    >
      <div className="p-1">
        <img src={member.thumbnailPath} className="h-9 w-9 rounded" />
      </div>
      <div className="flex  items-center">
        <div className="text-sm text-slate-400">{member.generation}기</div>
        <div className="px-2 ">{member.nickName}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { token: state.member.token };
};

export default connect(mapStateToProps)(CreateBtn);
