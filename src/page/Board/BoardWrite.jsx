import React from 'react';

//local
import Info from 'page/Board/Components/Info';
import TextEditer from 'page/Board/Components/TextEditer';

const BoardWrite = () => {
  return (
    <div className="flex justify-center dark:bg-mainBlack">
      <div className="m-5 w-4/5">
        <Info />
        <div>
          <TextEditer />
        </div>
      </div>
    </div>
  );
};

export default BoardWrite;
