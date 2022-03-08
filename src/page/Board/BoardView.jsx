import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

//local
import Info from 'page/Board/Components/Info';
import Boards from 'page/Board/Components/Boards';
import Content from 'page/Board/Components/Content';
import Comments from 'page/Board/Components/Comments';
import WriteButton from 'page/Board/Components/WriteButton';
import WriteButtonMobile from 'page/Board/Components/MobileWriteButton';
import testData from 'page/Board/testData';
import postAPI from 'API/v1/post';
import AuthUser from 'shared/AuthUser';
import ScrollToTop from './Components/ScrollToTop';

const BoardView = (props) => {
  const { categoryId, postId } = useParams();
  const [board, setBoard] = useState({});
  const [prevBoard, setPrevBoard] = useState(null);
  const [commentChangeFlag, setCommentChangeFlag] = useState(false); //댓글이 추가/제거됐을 때 페이지를 재 렌더링하기 위함(굳이 필요한가?)
  const [likeChangeFlag, setLikeChangeFlag] = useState(false); //게시글의 추천/비추천 여부의 변경을 감지하기 위한 플래그
  const token = props.state.member.token;

  useEffect(() => {
    prevBoard ? setPrevBoard({ id: -1 }) : setPrevBoard(board);
    if (token) {
      postAPI
        .getOne({
          no: postId,
          token: token,
          password: 'aaaa',
        })
        .then((res) => {
          console.log(res);
          setBoard(res.data);
        });
    }
  }, [postId, token, commentChangeFlag, likeChangeFlag]);

  // const board = testData.boards[no - 1]; //해당 게시글 관련 정보

  return (
    <>
      <AuthUser>
        <ScrollToTop />
        <div className="flex justify-center dark:bg-mainBlack">
          <div className="inline-block m-5 w-[90vw]">
            <Info />
            {board?.id && prevBoard.id !== board.id ? (
              <Content
                board={board}
                commentChangeFlag={commentChangeFlag}
                likeChangeFlag={likeChangeFlag}
                setLikeChangeFlag={setLikeChangeFlag}
              />
            ) : (
              ''
            )}
            {board?.allowComment == 0 ? (
              <div className="text-center text-slate-400 text-xl h-[200px] pt-[80px]">
                작성자가 댓글 작성을 허용하지 않은 게시글입니다.
              </div>
            ) : (
              <div>
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
              </div>
            )}

            <Boards
              commentChangeFlag={commentChangeFlag}
              categoryId={categoryId}
            />
          </div>
        </div>
        <div
          name="mobile 글쓰기 버튼"
          className="fixed right-0 bottom-10 m-5 inline-block md:hidden"
        >
          <WriteButtonMobile />
        </div>
      </AuthUser>
    </>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(BoardView);
