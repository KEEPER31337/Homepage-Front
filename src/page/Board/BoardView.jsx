import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//local
import Info from 'page/Board/Components/Info';
import Table from 'page/Board/Components/Table';
import Content from 'page/Board/Components/Content';
import Comments from 'page/Board/Components/Comments';
import WriteButton from 'page/Board/Components/WriteButton';
import testData from 'page/Board/testData';

const BoardView = (props) => {
  //const { pathname } = useLocation();
  const { no } = useParams();
  //console.log(pathname); //현재 path url
  //console.log(no); //게시글 번호

  const board = testData.boards[no - 1]; //해당 게시글 관련 정보

  return (
    <div className="flex justify-center dark:bg-mainBlack">
      <div className="inline-block m-5 w-full">
        <Info />
        <Content board={board} />
        <Comments board={board} />
        <Table />
      </div>
      <div name="left-sideBar" className="hidden m-5 w-1/6 sm:inline-block">
        <WriteButton />
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(BoardView);
