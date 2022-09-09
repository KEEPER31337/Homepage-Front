import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const NON = 1; //비회원
const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업
const QUIT = 5; //탈퇴

const Content = ({ type, typeMemberList }) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    switch (type) {
      case NON:
        setColor('bg-slate-100 mr-2 w-3 h-3 rounded-3xl');
        break;
      case REGULAR:
        setColor('bg-emerald-300 mr-2 w-3 h-3 rounded-3xl');
        break;
      case SLEEP:
        setColor('bg-amber-300 mr-2 w-3 h-3 rounded-3xl');
        break;
      case GRADUATE:
        setColor('bg-slate-800 mr-2 w-3 h-3 rounded-3xl');
        break;
      case QUIT:
        setColor('bg-red-400 mr-2 w-3 h-3 rounded-3xl');
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      {typeMemberList.map((member) => (
        <div
          key={member.memberId}
          className="bg-white dark:bg-darkPoint dark:text-white h-fit relative flex flex-row justify-start m-[2px] text-slate-800 rounded "
        >
          <div className="p-1 ">
            <img src={member.profileImagePath} className="h-9 w-9 rounded " />
          </div>
          <div className="flex flex-row items-center justify-between flex-1">
            <div className="flex flex-row items-center ">
              <div className="text-sm text-slate-400">
                {`${member.generation === null ? '?' : member.generation}기`}
              </div>
              <div className="px-2 ">{member.nickName}</div>
            </div>

            <div className={color}></div>
          </div>
        </div>
      ))}
    </>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Content);
