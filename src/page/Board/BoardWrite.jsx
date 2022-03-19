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
      <div className="w-full flex justify-center">
        <div className="flex justify-center max-w-[70rem] dark:bg-mainBlack">
          <div className="m-5 w-[90vw]">
            <Info isWrite={true} />
            <div>
              <TextEditer redirectData={redirectData} />
            </div>
          </div>
        </div>
      </div>
    </AuthUser>
  );
};

export default BoardWrite;
