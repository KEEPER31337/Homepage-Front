import React from 'react';
import BoardInfo from 'page/Board/BoardInfo';
import BoardTable from 'page/Board/BoardTable';
import { useLocation, useNavigate } from 'react-router-dom';

const Board = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="inline-block m-5 w-4/5">
        <BoardInfo />
        <BoardTable />
      </div>
      <button
        className="border-2 border-mainYellow rounded-lg shadow-lg"
        onClick={() => navigate('/board/write')}
      >
        글 쓰기
      </button>
    </div>
  );
};

export default Board;
