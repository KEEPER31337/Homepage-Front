import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import GeneraitonSelect from './GeneraitonSelect';
const REGULAR = 2; // 정회원
const SLEEP = 3; // 휴면회원
const GRADUATE = 4; // 졸업

const Header = ({ setGen }) => {
  const checked =
    'w-24 text-center border border-b-4 p-1 mr-1 shadow border-violet-200 bg-violet-100 rounded-md cursor-pointer';

  const notChecked =
    'w-24 text-center border border-b-4 p-1 mr-1 shadow border-violet-200 bg-white hover:bg-violet-100 rounded-md cursor-pointer';

  return (
    <div className="flex w-full dark:text-white dark:bg-violet-200 bg-amber-200 justify-between p-2  text-lg rounded-t-md">
      <div className="grid sm:grid-cols-5 grid-cols-3 items-center">
        <div className="dark:border-violet-300 border-amber-300 flex flex-row justify-center items-center dark:bg-darkPoint bg-white w-24 text-center border-b-4 p-1 mr-1 rounded-md ">
          <div>비회원</div>
          <div className="bg-slate-200  ml-2 w-3 h-3 rounded-3xl "></div>
        </div>
        <div className="dark:border-violet-300 border-amber-300 flex flex-row justify-center items-center dark:bg-darkPoint bg-white w-24 text-center border-b-4 p-1 mr-1 rounded-md ">
          <div>정회원</div>
          <div className="bg-emerald-300 ml-2 w-3 h-3 rounded-3xl "></div>
        </div>
        <div className="dark:border-violet-300 border-amber-300 flex flex-row justify-center items-center dark:bg-darkPoint bg-white w-24 text-center border-b-4 p-1 mr-1 rounded-md ">
          <div>휴면</div>
          <div className="bg-amber-300 ml-2 w-3 h-3 rounded-3xl "></div>
        </div>
        <div className="dark:border-violet-300 border-amber-300 flex flex-row justify-center items-center dark:bg-darkPoint bg-white w-24 text-center border-b-4 p-1 mr-1 rounded-md ">
          <div>졸업</div>
          <div className="bg-slate-900 ml-2 w-3 h-3 rounded-3xl "></div>
        </div>
        <div className="dark:border-violet-300 border-amber-300 flex flex-row justify-center items-center dark:bg-darkPoint bg-white w-24 text-center border-b-4 p-1 mr-1 rounded-md ">
          <div>탈퇴</div>
          <div className="bg-red-400 ml-2 w-3 h-3 rounded-3xl "></div>
        </div>
      </div>
      <GeneraitonSelect setGen={setGen} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Header);
