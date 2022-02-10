import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//local
import Info from 'page/Board/Components/Info';
import Table from 'page/Board/Components/Table';
import Content from 'page/Board/Components/Content';
import Comments from 'page/Board/Components/Comments';
import WriteButton from 'page/Board/Components/WriteButton';
import testData from 'page/Board/testData';
import postAPI from 'API/v1/post';

/* TODO 지울 부분 시작 */
import { signIn } from './tempSign';
/* TODO 지울 부분 끝 */



const BoardView = (props) => {
  //const { pathname } = useLocation();
  const { no } = useParams();
  const [board, setBoard] = useState({});
  const [prevBoard, setPrevBoard] = useState({});
  //console.log(pathname); //현재 path url
  // console.log(no); //게시글 번호

  // TODO getBoard는 사용!!
  useEffect(() => {
    setPrevBoard(board);
    /* TODO 지울 부분 시작 */
    signIn()
    .then(response => {
      const tempToken = response.data.data.substr(7);
      console.log(tempToken)

  /* TODO 살릴 부분 시작 */
      postAPI.getBoard({
        no: no,
        token: tempToken
      }).then(res => {
        console.log(res);
        setBoard(res);
      });
  /* TODO 살릴 부분 끝 */

    });
    /* TODO 지울 부분 끝 */
}, [no]);
  



  // const board = testData.boards[no - 1]; //해당 게시글 관련 정보

  return (
    <div className="flex justify-center dark:bg-mainBlack">
      <div className="inline-block m-5 w-3/5">
        <Info />
        {prevBoard.id !== board.id && board.id ? <Content board={board} /> : ''}
        {prevBoard.id !== board.id && board.id ? <Comments boardId={board.id} /> : ''}
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