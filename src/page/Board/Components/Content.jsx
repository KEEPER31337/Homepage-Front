import React, { useRef } from 'react';
import { testText } from 'page/Board/testText';
import '@toast-ui/editor/dist/toastui-editor.css'; //마크다운 편집기 뷰어 에디터
import { Viewer } from '@toast-ui/react-editor';
import { connect } from 'react-redux';

//local
import { actions } from 'store';
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
    <div className="border-4 border-black">
      <div className=" bg-mainYellow rounded-t-lg">
        <p className="text-2xl">{board.title}</p>
        {board.user}
        {board.date + ' ' + board.time}
        조회수 : {board.watch}
        댓글수 : {board.commentN}
        추천수 : {board.goodN}
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

      <div className="border-2 text-center">
        <button className=" border-2 m-2 border-white rounded-lg shadow-lg p-2 bg-blue-400 active:mr-1 active:ml-3 active:shadow-none ">
          추천
        </button>
        <button className=" border-2 m-2 border-white rounded-lg shadow-lg p-2 bg-red-400 active:mr-1 active:ml-3 active:shadow-none ">
          비추천
        </button>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Content);
