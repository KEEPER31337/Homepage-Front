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
  const [isDisliked, setIsDisliked] = useState(); //싫어요 여부
  const [isLiked, setIsLiked] = useState(); //좋아요 여부
  const postingId = board.id;
  const token = state.member.token;
  //const files=board.files;
  const files = [
    {
      fileName: 'dwg.png',
      filePath: 'dwg.png',
      fileSize: 3496,
      id: 1645204350432,
      ipAddress: '1.1.1.1',
      uploadTime: '2022-1-18T22:16:53',
    },
    {
      fileName: 'jar.png',
      filePath: 'jar.png',
      fileSize: 3482,
      id: 1645204350433,
      ipAddress: '1.1.1.1',
      uploadTime: '2022-1-18T22:16:53',
    },
    {
      fileName: 'java.png',
      filePath: 'java.png',
      fileSize: 3479,
      id: 1645204350434,
      ipAddress: '1.1.1.1',
      uploadTime: '2022-1-18T22:16:53',
    },
    {
      fileName: 'jpg.png',
      filePath: 'jpg.png',
      fileSize: 3478,
      id: 1645204350435,
      ipAddress: '1.1.1.1',
      uploadTime: '2022-1-18T22:16:53',
    },
  ];

  //console.log(board);
  const viwerRef = useRef();
  const clickLikeHandler = () => {
    const type = isLiked ? 'DEC' : 'INC';
    postAPI
      .like({
        type: type,
        postingId: postingId,
        token: token,
      })
      .then((res) => {
        console.log(res);
      });
    setIsLiked(!isLiked);
  };
  const clickDislikeHandler = () => {
    const type = isDisliked ? 'DEC' : 'INC';
    postAPI
      .dislike({
        type: type,
        postingId: postingId,
        token: token,
      })
      .then((res) => {
        console.log(res);
      });
    setIsDisliked(!isDisliked);
  };

  const deletePostingHandler = () => {
    postAPI.remove({ boardId: postingId, token: token }).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    postAPI
      .check({
        postingId: postingId,
        token: token,
      })
      .then((res) => {
        console.log('is dislike?');
        console.log(res);
        setIsLiked(res.data.liked);
        setIsDisliked(res.data.disliked);
      });
    const viwerInstance = viwerRef.current.getInstance();
    viwerInstance.setMarkdown(board.content);
  }, [board.content]);

  return (
    <div className="my-5">
      <div className="justify-between bg-mainYellow rounded-t-2xl p-3 px-5 md:flex">
        <p className="break-all text-2xl">
          <strong>{board.title}</strong>
        </p>
        <p className="min-w-[180px] flex flex-col-reverse text-right text-xs">
          <div>
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
          </div>
        </p>
      </div>
      {board.writerId == myId ? (
        <div className="px-10 absolute w-full text-xs md:w-[75%] sm:text-base flex flex-row-reverse ">
          <div className="rounded-lg bg-slate-100 my-2 dark:bg-darkComponent">
            <UserCircleIcon className="inline-block h-5 w-5 m-1 text-divisionGray dark:text-slate-500 " />

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
