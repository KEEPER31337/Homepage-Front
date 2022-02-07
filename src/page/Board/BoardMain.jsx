import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//local
import Info from 'page/Board/Components/Info';
import Table from 'page/Board/Components/Table';

const Board = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen dark:bg-mainBlack">
      <div className="inline-block m-5 w-4/5">
        <Info />
        <Table />
      </div>
      <button
        className="border-2 border-mainYellow rounded-lg shadow-lg dark:text-mainWhite active:mt-1 active:ml-1 active:shadow-none"
        onClick={() => navigate('/board/write')}
      >
        글 쓰기
      </button>
    </div>
  );
};

export default Board;
