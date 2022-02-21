import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//local
import Info from 'page/Board/Components/Info';
import Table from 'page/Board/Components/Table';
import Content from 'page/Board/Components/Content';
import Comments from 'page/Board/Components/Comments';
import WriteButton from 'page/Board/Components/WriteButton';
import WriteButtonMobile from 'page/Board/Components/MobileWriteButton';
import testData from 'page/Board/testData';
import postAPI from 'API/v1/post';

const BoardView = (props) => {
  const { no } = useParams();
  const [board, setBoard] = useState({});
  const [prevBoard, setPrevBoard] = useState(null);
  const [commentChangeFlag, setCommentChangeFlag] = useState(false); //댓글이 추가/제거됐을 때 페이지를 재 렌더링하기 위함(굳이 필요한가?)
  const token = props.state.member.token;
  useEffect(() => {
    prevBoard ? setPrevBoard({ id: -1 }) : setPrevBoard(board);
    if (token) {
      console.log('token : ' + token);
      postAPI
        .getOne({
          no: no,
          token: token,
        })
        .then((res) => {
          console.log(res);
          setBoard(res.data);
        });
    }
  }, [no, token, commentChangeFlag]);

  // const board = testData.boards[no - 1]; //해당 게시글 관련 정보

  return (
    <>
      <div className="flex justify-center dark:bg-mainBlack">
        <div className="inline-block m-5 w-full">
          <Info />
          {board?.id && prevBoard.id !== board.id ? (
            <Content board={board} commentChangeFlag={commentChangeFlag} />
          ) : (
            ''
          )}
          {board?.id && prevBoard.id !== board.id ? (
            <Comments
              boardId={board.id}
              commentCount={board.commentCount}
              commentChangeFlag={commentChangeFlag}
              setCommentChangeFlag={setCommentChangeFlag}
            />
          ) : (
            ''
          )}
          <Table commentChangeFlag={commentChangeFlag} />
        </div>
        <div name="left-sideBar" className="hidden m-5 w-1/6 md:inline-block">
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

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(BoardView);
