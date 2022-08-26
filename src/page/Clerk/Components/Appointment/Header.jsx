import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업

const Header = ({ type, setType }) => {
  const navigate = useNavigate();
  const checked =
    'w-24 text-center border-b-4 p-1 mr-1 border-violet-200 bg-violet-100 rounded-md cursor-pointer';

  const notChecked =
    'w-24 text-center border-b-4 p-1 mr-1 border-violet-200 bg-white hover:bg-violet-100 rounded-md cursor-pointer';

  const reviseClick = () => {
    navigate('/clerk/revise');
  };

  return (
    <div className="flex w-full bg-violet-50 justify-between p-2">
      <div className="flex flex-row  items-center">
        <div
          className={type === REGULAR ? checked : notChecked}
          onClick={() => setType(REGULAR)}
        >
          정회원
        </div>
        <div
          className={type === SLEEP ? checked : notChecked}
          onClick={() => setType(SLEEP)}
        >
          휴면회원
        </div>
        <div
          className={type === GRADUATE ? checked : notChecked}
          onClick={() => setType(GRADUATE)}
        >
          졸업
        </div>
      </div>
      <div className="flex items-center">
        <div
          className="text-center bg-violet-400 hover:bg-[#977beb] text-white  border-violet-400 w-20 p-1 rounded-md cursor-pointer"
          onClick={reviseClick}
        >
          수정
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Header);
