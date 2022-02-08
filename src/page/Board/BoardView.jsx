import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//local
import Info from 'page/Board/Components/Info';
import Table from 'page/Board/Components/Table';
import Content from 'page/Board/Components/Content';
import Comments from 'page/Board/Components/Comments';
import testData from 'page/Board/testData';

const BoardView = (props) => {
  //const { pathname } = useLocation();
  const { no } = useParams();
  const navigate = useNavigate(); //다른 페이지로 이동시키기 위함
  //console.log(pathname); //현재 path url
  //console.log(no); //게시글 번호

  const board = testData.boards[no - 1]; //해당 게시글 관련 정보

  return (
    <div className="flex justify-center dark:bg-mainBlack">
      <div className="inline-block m-5 w-3/5">
        <Info />
        <Content board={board} />
        <Comments comments={board.comments} />
        <Table />
      </div>
      <div name="left-sideBar" className="m-5 w-1/6">
        <button
          className="border-2 border-mainYellow rounded-lg shadow-lg w-full dark:text-mainWhite active:mt-1 active:ml-1 active:shadow-none"
          onClick={() => navigate('/board/write')}
        >
          글 쓰기
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(BoardView);
