import React from 'react';
import BoardInfo from 'page/Board/BoardInfo';
import BoardTable from 'page/Board/BoardTable';
import Editer from 'page/Board/Editer';

const BoardWrite = () => {
  return (
    <div className="m-5 w-4/5">
      <BoardInfo />
      <div>
        <Editer />
      </div>
    </div>
  );
};

export default BoardWrite;
