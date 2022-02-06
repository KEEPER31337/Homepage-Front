import React from 'react';
import Info from 'page/Board/Components/Info';
import TextEditer from 'page/Board/Components/TextEditer';

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
