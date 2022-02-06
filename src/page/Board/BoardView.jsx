import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//local
import Info from 'page/Board/Components/Info';
import Table from 'page/Board/Components/Table';
import Content from 'page/Board/Components/Content';
import Comments from 'page/Board/Components/Comments';
import { actions } from 'store';
import testData from 'page/Board/testData';

const BoardView = (props) => {
  //const { pathname } = useLocation();
  const { no } = useParams();
  const navigate = useNavigate(); //다른 페이지로 이동시키기 위함
  //console.log(pathname); //현재 path url
  //console.log(no); //게시글 번호

  const board = testData.boards[no - 1]; //해당 게시글 관련 정보

  return (
    <div className="flex justify-between dark:bg-mainBlack">
      <div className="inline-block m-5 w-4/5">
        <Info />
        <Content board={board} />
        <Comments comments={board.comments} />
        <Table />
      </div>

      <button
        className="border-2 border-mainYellow rounded-lg shadow-lg m-5 w-1/6"
        onClick={() => navigate('/board/write')}
      >
        글 쓰기
      </button>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    darkModeToggle: () => {
      dispatch(actions.darkModeToggle());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardView);
