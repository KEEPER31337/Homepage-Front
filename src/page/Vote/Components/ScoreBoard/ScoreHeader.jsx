import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const BOSS = 1; // 회장
const MIDDLEBOSS = 2; // 부회장
const MONEYMEN = 7; // 총무

const Header = ({ job, setJob }) => {
  const checked =
    'w-24 h-10 font-extrabold bg-amber-400 border-amber-500 rounded border-b-4 px-4 py-1 hover:bg-amber-300 mx-2';
  const notChecked =
    'w-24 h-10 font-extrabold bg-amber-200 border-amber-400 rounded border-b-4 px-4 py-1 hover:bg-amber-300 mx-2';

  return (
    <div className="text-xl font-bold  p-2 mt-4">
      <button
        className={job === BOSS ? checked : notChecked}
        onClick={() => setJob(BOSS)}
      >
        회장
      </button>
      <button
        className={job === MIDDLEBOSS ? checked : notChecked}
        onClick={() => setJob(MIDDLEBOSS)}
      >
        부회장
      </button>
      <button
        className={job === MONEYMEN ? checked : notChecked}
        onClick={() => setJob(MONEYMEN)}
      >
        총무
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Header);
