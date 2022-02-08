import React, { useRef } from 'react';
import { testText } from 'page/Board/testText';
import '@toast-ui/editor/dist/toastui-editor.css'; //마크다운 편집기 뷰어 에디터
import { Viewer } from '@toast-ui/react-editor';
import { connect } from 'react-redux';
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/solid';

//local
import { useEffect } from 'react';

const Content = ({ state, board }) => {
  //board는 게시글 정보가 담긴 객체

  const isDark = state.darkMode; //Dark모드 여부
  const viwerRef = useRef();

  useEffect(() => {
    const viwerInstance = viwerRef.current.getInstance();
    viwerInstance.setMarkdown(board.content);
  }, [board.content]);

  return (
    <div className="my-5">
      <div className="flex justify-between bg-mainYellow rounded-t-2xl p-3 px-5">
        <p className="break-all text-2xl">
          <strong>{board.title}</strong>
        </p>
        <p className="text-right text-xs">
          <br />
          작성자 : <strong>{board.user + ' '}</strong>
          <br />
          작성일시 : <strong>{board.date + ' ' + board.time}</strong>
          <br />
          조회수 : <strong>{board.watch + ' '}</strong>
          댓글수 : <strong>{board.commentN + ' '}</strong>
          추천수 : <strong>{board.goodN + ' '}</strong>
        </p>
      </div>
      <div className="w-full p-5 dark:bg-mainBlack">
        <Viewer
          initialValue={board.content}
          change={board.content}
          theme={isDark ? 'dark' : 'light'}
          height="100%"
          ref={viwerRef}
        />
      </div>

      <div className="border-y-2 text-center bg-backGray shadow-lg">
        <button className=" border-4 m-2 border-white rounded-xl shadow-lg p-2 bg-blue-400 active:mr-1 active:ml-3 active:shadow-none ">
          <ThumbUpIcon className="inline-block h-5 w-5 m-1 text-mainWhite dark:text-mainBlack" />
          추천
        </button>
        <button className=" border-4 m-2 border-white rounded-xl shadow-lg p-2 bg-red-400 active:mr-1 active:ml-3 active:shadow-none ">
          <ThumbDownIcon className="inline-block h-5 w-5 m-1 text-mainWhite dark:text-mainBlack" />
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
