import React, { useState, useEffect, useRef } from 'react';
import { XIcon } from '@heroicons/react/outline';

const DeleteBtn = ({ member, selectJob }) => {
  return (
    <div className="bg-white  flex flex-row justify-between items-center p-1 text-slate-800 rounded-2xl ">
      <div className="flex items-center">
        <div className="text-sm px-2 text-slate-400">{member.generation}기</div>
        <div>{member.nickName}</div>
      </div>
    </div>
  );
};

export default DeleteBtn;
