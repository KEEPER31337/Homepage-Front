import React from 'react';

const MemberBtn = ({ member }) => {
  return (
    <div className="bg-white  flex flex-row justify-between items-center p-1 text-slate-800 rounded-2xl ">
      <div className="flex items-center">
        <div className="text-sm px-2 text-slate-400">{member.generation}기</div>
        <div>{member.nickName}</div>
      </div>
    </div>
  );
};

export default MemberBtn;
