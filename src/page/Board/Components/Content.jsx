import React, { useRef, useEffect } from 'react';
import { testText } from 'page/Board/testText';
import '@toast-ui/editor/dist/toastui-editor.css'; //마크다운 편집기 뷰어 에디터
import { Viewer } from '@toast-ui/react-editor';
import { connect } from 'react-redux';
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/solid';

//local
import { getDateWithFormat } from '../BoardUtil';

const Content = ({ state, board }) => {
  //board는 게시글 정보가 담긴 객체
  //console.log(state.member.memberId); //(내 아이디)나중에 업데이트 될거임
  //
  const isDark = state.darkMode; //Dark모드 여부
  const memberId = state.member.token;

  console.log();
  const viwerRef = useRef();

  useEffect(() => {
    const viwerInstance = viwerRef.current.getInstance();
    viwerInstance.setMarkdown(board.content);
  }, [board.content]);

  return (
    <div className="my-5">
      <button className="border border-black m-2 bg-divisionGray">수정</button>
      <button className="border border-black m-2 bg-divisionGray">삭제</button>
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
      <div className="w-full p-5 dark:bg-mainBlack">
        <Viewer
          initialValue={board.content}
          change={board.content}
          theme={isDark ? 'dark' : 'light'}
          height="100%"
          ref={viwerRef}
        />
      </div>

      <div className="border-y-2 text-center bg-backGray shadow-lg dark:bg-darkPoint dark:border-darkComponent">
        <button className=" border-4 m-2 border-white rounded-xl shadow-lg p-2 bg-blue-400 active:mr-1 active:ml-3 active:shadow-none dark:border-darkComponent">
          <ThumbUpIcon className="inline-block h-5 w-5 m-1 text-mainWhite dark:text-mainBlack " />
          추천
        </button>
        <button className=" border-4 m-2 border-white rounded-xl shadow-lg p-2 bg-red-400 active:mr-1 active:ml-3 active:shadow-none dark:border-darkComponent">
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
