import React from 'react';
import { useLocation } from 'react-router-dom';

//local
import Info from 'page/Board/Components/Info';
import TextEditer from 'page/Board/Components/TextEditer';
import AuthUser from 'shared/AuthUser';

const BoardWrite = () => {
  const redirectData = useLocation();
  return (
    <div className="font-basic dark:bg-mainBlack dark:text-mainWhite">
      <AuthUser>
        <div className="min-h-screen max-w-3xl mx-auto px-2 py-5 md:max-w-5xl sm:px-3 md:px-8 dark:bg-mainBlack">
          <div className="space-y-4">
            <Info isWrite={true} />
            <TextEditer redirectData={redirectData} />
          </div>
        </div>
      </AuthUser>
    </div>
  );
};

export default BoardWrite;
