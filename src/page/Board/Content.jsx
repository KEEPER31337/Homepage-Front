import React from 'react';
import { testText } from 'page/Board/testText';
import '@toast-ui/editor/dist/toastui-editor.css'; //마크다운 편집기 뷰어 에디터
import { Viewer } from '@toast-ui/react-editor';

const isDark = false; //Dark모드 여부

const Content = ({ board }) => {
  //board는 게시글 정보가 담긴 객체
  return (
    <div className="border-4 border-black">
      <div className=" bg-mainYellow rounded-t-lg">
        <p className="text-2xl">{board.title}</p>
        {board.user}
        {board.date + ' ' + board.time}
        조회수 : {board.watch}
        댓글수 : {board.commentN}
        추천수 : {board.goodN}
      </div>
      <div className="w-full p-5">
        <Viewer
          initialValue={testText}
          theme={isDark ? 'dark' : 'light'}
          height="100%"
        />
      </div>

      <div className="text-center">
        <button className="border-2 border-white rounded-lg shadow-lg bg-blue-400">
          추천
        </button>
        <button className="border-2 border-white rounded-lg shadow-lg bg-red-400">
          비추천
        </button>
      </div>
    </div>
  );
};

export default Content;
