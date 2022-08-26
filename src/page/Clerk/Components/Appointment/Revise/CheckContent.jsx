import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업

const CheckContent = ({ token, type, member, typeMemberList, changeItems }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(typeMemberList?.has(member.memberId));
    // console.log(typeMemberList);
  }, [typeMemberList]);

  const checkHandler = () => {
    setChecked(true);
    //typeMemberList.add(member.memberId);
    changeItems.add(member.memberId);
    // checkedItemHandler(member, !checked);
    // console.log(member.token, member.memberId);
  };

  const selected =
    'bg-violet-200 border-b border-violet-200 flex flex-row justify-start m-[2px] text-slate-800 rounded cursor-auto';
  const notSelected =
    'bg-white hover:bg-violet-200 border-b border-violet-200 flex flex-row justify-start m-[2px] text-slate-800 rounded cursor-pointer';

  return (
    <div onClick={checkHandler} className={checked ? selected : notSelected}>
      <div className="p-1">
        <img src={member.thumbnailPath} className="h-9 w-9 rounded" />
      </div>
      <div className="flex  items-center">
        <div className="text-sm text-slate-400">
          {`${member.generation === null ? '?' : member.generation}기`}
        </div>
        <div className="px-2 ">{member.nickName}</div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { token: state.member.token };
};
export default connect(mapStateToProps)(CheckContent);
