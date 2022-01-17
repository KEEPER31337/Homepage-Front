import React from 'react';
import BoardInfo from 'page/Board/BoardInfo';
import BoardTable from 'page/Board/BoardTable';
import Content from 'page/Board/Content';
import Comments from 'page/Board/Comments';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import testData from 'page/Board/testData';

const BoardView = () => {
  const { pathname } = useLocation();
  const { no } = useParams();
  const navigate = useNavigate(); //다른 페이지로 이동시키기 위함

  //console.log(pathname); //현재 path url
  //console.log(no); //게시글 번호

  const board = testData.boards[no - 1]; //해당 게시글 관련 정보

  return (
    <div>
      <div className="inline-block m-5 w-4/5">
        <BoardInfo />
        <Content board={board} />
        <Comments comments={board.comments} />
        <BoardTable />
      </div>

      <button
        className="border-2 border-mainYellow rounded-lg shadow-lg"
        onClick={() => navigate('/board/write', { property: 'test' })}
      >
        글 쓰기
      </button>
    </div>
  );
};

export default BoardView;
