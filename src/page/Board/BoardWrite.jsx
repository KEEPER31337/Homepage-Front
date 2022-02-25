import React from 'react';
import { useLocation } from 'react-router-dom';

//local
import Info from 'page/Board/Components/Info';
import TextEditer from 'page/Board/Components/TextEditer';
import AuthUser from 'shared/AuthUser';

const BoardWrite = () => {
  const redirectData = useLocation();
  return (
    <AuthUser>
      <div className="flex justify-center dark:bg-mainBlack">
        <div className="m-5 w-4/5">
          <Info />
          <div>
            <TextEditer redirectData={redirectData} />
          </div>
        </div>
      </div>
    </AuthUser>
  );
};

export default BoardWrite;
