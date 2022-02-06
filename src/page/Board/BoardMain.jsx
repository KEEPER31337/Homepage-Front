import React from 'react';
import Info from 'page/Board/Components/Info';
import Table from 'page/Board/Components/Table';
import { useLocation, useNavigate } from 'react-router-dom';

const Board = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="inline-block m-5 w-4/5">
        <Info />
        <Table />
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
