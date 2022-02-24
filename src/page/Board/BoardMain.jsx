import React from 'react';

//local
import Info from 'page/Board/Components/Info';
import Table from 'page/Board/Components/Table';
import WriteButton from 'page/Board/Components/WriteButton';
import WriteButtonMobile from 'page/Board/Components/MobileWriteButton';
/*
<img
          src={require('assets/img/icons/b_gallary.png')}
          className="h-5 w-5"
        ></img>
*/
const Board = () => {
  return (
    <>
      <div className="flex justify-center h-full dark:bg-mainBlack">
        <div className="inline-block m-5 w-full">
          <Info />
          <Table />
        </div>
        <div name="left-sideBar" className="hidden m-5 w-1/6 sm:inline-block">
          <WriteButton />
        </div>
      </div>
      <div
        name="mobile 글쓰기 버튼"
        className="fixed right-0 bottom-10 m-5 inline-block sm:hidden"
      >
        <WriteButtonMobile />
      </div>
    </>
  );
};

export default Board;
