import React, { useState, useRef, useEffect } from 'react';
import { testText } from 'page/Board/testText';
import '@toast-ui/editor/dist/toastui-editor.css'; //마크다운 편집기 뷰어 에디터
import { Viewer } from '@toast-ui/react-editor';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ThumbUpIcon,
  ThumbDownIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';

//local
import { getDateWithFormat } from '../BoardUtil';
import postAPI from 'API/v1/post';

const Content = ({ state, board }) => {
  //board는 게시글 정보가 담긴 객체
  //console.log(state.member.memberId); //(내 아이디)나중에 업데이트 될거임
  const isDark = state.darkMode; //Dark모드 여부
  const myId = state.member.userInfo.id; //게시글을 보고 있는 나의 정보
  const [isDisliked, setIsDisliked] = useState(false); //싫어요 여부
  const [isLiked, setIsLiked] = useState(false); //좋아요 여부
  const postingId = board.id;
  const token = state.member.token;
  console.log(board);
  const viwerRef = useRef();
  const clickLikeHandler = () => {
    setIsLiked(!isLiked);
    console.log(isLiked);
  };
  const clickDislikeHandler = () => {
    setIsDisliked(!isDisliked);

    console.log(isDisliked);
    if (!isDisliked) {
      postAPI
        .dislike({
          type: 'INC',
          postingId: postingId,
          token: token,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const deletePostingHandler = () => {
    postAPI.remove({ boardId: postingId, token: token }).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    const viwerInstance = viwerRef.current.getInstance();
    viwerInstance.setMarkdown(board.content);
  }, [board.content]);

  return (
    <div className="my-5">
      <div className="justify-between bg-mainYellow rounded-t-2xl p-3 px-5 sm:flex">
        <p className="break-all text-2xl">
          <strong>{board.title}</strong>
        </p>
        <p className="text-right text-xs">
          <br />
          작성자 : <strong>{board.writer ? board.writer : ''}</strong>
          <br />
          작성 일시 :{' '}
          <strong>
            {board.registerTime ? getDateWithFormat(board.registerTime) : ' '}
          </strong>
          {board.registerTime != board.updateTime ? (
            <>
              <br />
              수정 일시 :{' '}
              <strong>
                {board.updateTime ? getDateWithFormat(board.updateTime) : ' '}
              </strong>
            </>
          ) : null}
          <br />
          조회수 : <strong>{board.visitCount} </strong>
          댓글수 : <strong>{board.commentCount} </strong>
          추천수 : <strong>{board.likeCount} </strong>
        </p>
      </div>
      {board.writerId == myId ? (
        <div className="px-10 absolute w-full text-xs sm:w-4/5 sm:text-base flex flex-row-reverse ">
          <div className=" rounded-lg bg-slate-100 my-2">
            <UserCircleIcon className="inline-block h-5 w-5 m-1 text-divisionGray " />

            <Link
              to="/board/write"
              state={{
                modifyFlag: true,
                board,
              }}
            >
              <button className="text-mainYellow font-bold mx-1 hover:text-pointYellow">
                글 수정
              </button>
            </Link>
            <button
              className="text-red-400 font-bold mx-2 hover:text-red-600 "
              onClick={deletePostingHandler}
            >
              <span className="">글 삭제</span>
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="p-5 min-h-[200px] dark:bg-mainBlack">
        <Viewer
          initialValue={board.content}
          change={board.content}
          theme={isDark ? 'dark' : 'light'}
          height="100%"
          ref={viwerRef}
        />
      </div>

      <div className="border-y-2 text-center bg-backGray shadow-lg dark:bg-darkPoint dark:border-darkComponent">
        <button
          className={
            (isLiked
              ? 'bg-cyan-700 shadow-inner border-slate-400'
              : 'bg-blue-400 hover:shadow-lg border-white') +
            ' border-4 m-2  rounded-xl p-2 active:mr-1 active:ml-3 active:shadow-none dark:border-darkComponent'
          }
          disabled={isLiked}
          onClick={() => clickLikeHandler()}
        >
          <ThumbUpIcon
            className={
              (isLiked
                ? 'text-slate-400'
                : 'text-mainWhite dark:text-mainBlack') +
              ' inline-block h-5 w-5 m-1 text-mainWhite dark:text-mainBlack '
            }
          />
          추천
        </button>
        <button
          className={
            (isDisliked
              ? 'bg-red-900 shadow-inner border-slate-400'
              : 'bg-red-400 hover:shadow-lg border-white') +
            ' border-4 m-2  rounded-xl p-2 active:mr-1 active:ml-3 active:shadow-none dark:border-darkComponent'
          }
          disabled={false /*isDisliked*/}
          onClick={() => clickDislikeHandler()}
        >
          <ThumbDownIcon
            className={
              (isDisliked
                ? 'text-slate-400'
                : 'text-mainWhite dark:text-mainBlack') +
              ' inline-block h-5 w-5 m-1 text-mainWhite dark:text-mainBlack '
            }
          />
          비추천
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Content);
