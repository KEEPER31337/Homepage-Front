import React from 'react';
import Info from 'page/Board/Info';
import Table from 'page/Board/Table';
import Editer from 'page/Board/Editer';

const BoardWrite = () => {
  return (
    <div className="m-5 w-4/5">
      <Info />
      <div>
        <Editer />
      </div>
    </div>
  );
};

export default BoardWrite;
