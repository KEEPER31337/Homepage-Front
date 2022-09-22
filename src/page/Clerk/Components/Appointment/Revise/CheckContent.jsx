import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

const NON = 1; //비회원
const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업
const QUIT = 5; //탈퇴

const CheckContent = ({ type, member, changeItems }) => {
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

  const checkHandler = (e) => {
    //TODO parseInt 써야함!!
    changeItems.forEach((item) => {
      if (item.memberId === member.memberId) {
        changeItems.delete(item);
      }
    });

    changeItems.add({
      typeId: parseInt(e.target.value),
      memberId: member.memberId,
    });
    //원래 있었으면 그건 delete해야함!!!!!!!

    switch (parseInt(e.target.value)) {
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
  };

  const [tooltip, setTooltip] = useState(false);

  return (
    <div
      className="bg-white dark:bg-darkPoint dark:text-white hover:bg-slate-100 h-fit relative flex flex-row justify-start m-[2px] text-slate-800 rounded "
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      {tooltip && (
        <div className="absolute dark:bg-darkPoint dark:text-white right-0 top-0 flex flex-col bg-white shadow-md border  w-fit h-fit z-10">
          <button
            onClick={checkHandler}
            value="1"
            className="dark:hover:bg-slate-500  hover:bg-slate-200  w-16 h-fit p-1"
          >
            비회원
          </button>
          <button
            onClick={checkHandler}
            value="2"
            className=" dark:hover:bg-emerald-600 hover:bg-emerald-300  w-16 h-fit p-1"
          >
            정회원
          </button>
          <button
            onClick={checkHandler}
            value="3"
            className="dark:hover:bg-amber-400 hover:bg-amber-300  w-16 h-fit p-1"
          >
            휴면
          </button>
          <button
            onClick={checkHandler}
            value="4"
            className="dark:hover:bg-slate-800 hover:bg-slate-600 hover:text-white w-16 h-fit p-1"
          >
            졸업
          </button>
          <button
            onClick={checkHandler}
            value="5"
            className="dark:hover:bg-red-600 hover:bg-red-400 rounded-b-sm w-16  h-fit p-1 "
          >
            탈퇴
          </button>
        </div>
      )}
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
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { token: state.member.token };
};
export default connect(mapStateToProps)(CheckContent);
