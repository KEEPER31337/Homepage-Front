import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom';

const Content = ({ typeMemberList }) => {
  useEffect(() => {
    console.log(typeMemberList);
  }, [typeMemberList]);

  const navigate = useNavigate();
  const reviseClick = () => {
    navigate('/clerk/revise');
  };
  return (
    <>
      <div className="bg-white border-2 border-violet-100 p-2 w-full h-[50vh] scrollbar-hide overflow-y-scroll flex flex-col text-center ">
        <div className="grid grid-cols-4 md:grid-cols-6 w-full h-fit text-center">
          {typeMemberList.map((member) => (
            <div className="h-fit border bg-violet-100 border-violet-50 flex flex-row justify-start m-[2px] text-slate-800 rounded">
              <div className="p-1">
                <img
                  src={member.profileImagePath}
                  className="h-9 w-9 rounded"
                />
              </div>
              <div className="flex  items-center">
                <div className="text-sm text-slate-400">
                  {`${member.generation === null ? '?' : member.generation}기`}
                </div>
                <div className="px-2 ">{member.nickName}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-white items-center flex justify-end p-2">
        <div
          className="text-center bg-violet-200 hover:bg-violet-200 border-b-4  border-violet-300 w-20 p-1 rounded-md cursor-pointer"
          onClick={reviseClick}
        >
          {/* TODO 모달창, 이 사람들을 삭제하시겠습니까 */}
          수정하기
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Content);
