import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const BOSS = 0; // 회장
const MIDDLEBOSS = 1; // 부회장
const MONEYMEN = 2; // 총무
const USER = 3; // 활동인원

const Header = ({ job, setJob }) => {
  const checked = 'px-2 pt-2 pb-1 bg-gray-500 text-white rounded-t-lg';
  const notChecked = 'px-2 pt-2 pb-1 bg-gray-400 text-white rounded-t-lg';
  return (
    <div className="header flex flex-row text-xs sm:text-base">
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
        className={job === USER ? checked : notChecked}
        onClick={() => setJob(USER)}
      >
        활동 인원
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Header);
