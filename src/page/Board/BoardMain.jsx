import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//local
import Info from 'page/Board/Components/Info';
import Table from 'page/Board/Components/Table';

import { ArchiveIcon } from '@heroicons/react/solid';

const Board = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center h-screen dark:bg-mainBlack">
      <div className="inline-block m-5 w-3/5">
        <Info />
        <img
          src={require('assets/img/icons/b_gallary.png')}
          className="h-5 w-5"
        ></img>
        <ArchiveIcon className="h-5 w-5 text-mainYellow" />
        <Table />
      </div>
      <div name="left-sideBar" className="m-5 w-1/6">
        <button
          className="border-2 border-mainYellow rounded-lg shadow-lg w-full dark:text-mainWhite active:mt-1 active:ml-1 active:shadow-none"
          onClick={() => navigate('/board/write')}
        >
          글 쓰기
        </button>
      </div>
    </div>
  );
};

export default Board;
