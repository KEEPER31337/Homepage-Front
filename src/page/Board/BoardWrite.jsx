import React from 'react';
import Info from 'page/Board/Info';
import TextEditer from 'page/Board/TextEditer';

const BoardWrite = () => {
  return (
    <div className="m-5 w-4/5">
      <Info />
      <div>
        <TextEditer />
      </div>
    </div>
  );
};

export default BoardWrite;
