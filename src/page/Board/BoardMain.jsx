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
  const { categoryId } = useParams();
  return (
    <>
      <AuthUser>
        <div className="w-full flex justify-center dark:bg-mainBlack">
          <div className="flex justify-center min-h-screen max-w-[70rem]">
            <div className="inline-block m-5 w-[90vw]">
              <Info />
              <Boards categoryId={categoryId} />
            </div>
          </div>
          <div
            name="mobile 글쓰기 버튼"
            className="fixed right-0 bottom-10 m-5 inline-block md:hidden"
          >
            <WriteButtonMobile />
          </div>
        </div>
      </AuthUser>
    </>
  );
};

export default Board;
