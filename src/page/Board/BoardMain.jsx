import React from 'react';

//local
import Info from 'page/Board/Components/Info';
import Table from 'page/Board/Components/Table';
import WriteButton from 'page/Board/Components/WriteButton';
/*
<img
          src={require('assets/img/icons/b_gallary.png')}
          className="h-5 w-5"
        ></img>
*/
const Board = () => {
  return (
    <div className="flex justify-center h-screen dark:bg-mainBlack">
      <div className="inline-block m-5 w-3/5">
        <Info />
        <Table />
      </div>
      <div name="left-sideBar" className="m-5 w-1/6">
        <WriteButton />
      </div>
    </div>
  );
};

export default Board;
