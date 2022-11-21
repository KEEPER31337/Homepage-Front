import React from 'react';
import { useParams } from 'react-router-dom';

//local
import Info from 'page/Board/Components/Info';
import Boards from 'page/Board/Components/Boards';
import WriteButton from 'page/Board/Components/WriteButton';
import WriteButtonMobile from 'page/Board/Components/MobileWriteButton';
import AuthUser from 'shared/AuthUser';

/*
<img
          src={require('assets/img/icons/b_gallary.png')}
          className="h-5 w-5"
        ></img>
*/
const Board = () => {
  const { categoryName } = useParams();
  return (
    <div className="font-basic dark:bg-mainBlack dark:text-mainWhite">
      <AuthUser>
        <div className="min-h-screen max-w-3xl mx-auto px-2 py-5 md:max-w-5xl sm:px-3 md:px-8 dark:bg-mainBlack">
          <div className="w-full space-y-4">
            <Info />
            <Boards categoryName={categoryName} />
          </div>
        </div>
      </AuthUser>
    </div>
  );
};

export default Board;
