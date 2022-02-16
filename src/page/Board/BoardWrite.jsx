import React from 'react';
import { useLocation } from 'react-router-dom';

//local
import Info from 'page/Board/Components/Info';
import TextEditer from 'page/Board/Components/TextEditer';

const BoardWrite = () => {
  const redirectData = useLocation();
  return (
    <div className="flex justify-center dark:bg-mainBlack">
      <div className="m-5 w-4/5">
        <Info />
        <div>
          <TextEditer redirectData={redirectData} />
        </div>
      </div>
    </div>
  );
};

export default BoardWrite;
