import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const BOSS = 1; // 회장
const MIDDLEBOSS = 2; // 부회장
const MONEYMEN = 7; // 총무
const VOTER = 4; // 활동인원

const Header = ({ job, setJob }) => {
  const navigate = useNavigate();
  const checked = 'px-2 pt-2 pb-1 bg-gray-500 text-white rounded-t-lg';
  const notChecked = 'px-2 pt-2 pb-1 bg-gray-400 text-white rounded-t-lg';

  const button = 'py-1 px-2 m-1 rounded-lg';
  const completeClick = () => {
    navigate('/vote/admin/submissions');
  };

  return (
    <div className="flex justify-between text-xs sm:text-base">
      <div className="flex flex-row">
        <div
          className={job === BOSS ? checked : notChecked}
          onClick={() => setJob(BOSS)}
        >
          회장 후보
        </div>
        <div
          className={job === MIDDLEBOSS ? checked : notChecked}
          onClick={() => setJob(MIDDLEBOSS)}
        >
          부회장 후보
        </div>
        <div
          className={job === MONEYMEN ? checked : notChecked}
          onClick={() => setJob(MONEYMEN)}
        >
          총무 후보
        </div>
        <div
          className={job === VOTER ? checked : notChecked}
          onClick={() => setJob(VOTER)}
        >
          활동 인원
        </div>
      </div>
      <div className="flex flex-row">
        <div className={`${button} bg-green-300`} onClick={completeClick}>
          완료
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Header);
