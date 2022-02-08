import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

//마크다운 편집기 에디터
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

//마크다운 편집기 플러그인
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';

//local
import { testText } from 'page/Board/testText';

const TextEditer = (props) => {
  const isDark = props.state.darkMode; //Dark모드 여부
  //현재 작성된 상황 저장(입력 내용, 체크박스 등)
  const [EditerState, setEditerState] = useState([]);
  const [text, setText] = useState({
    title: '',
    content: '', //testText
  });
  const { title, content } = text;

  const editorRef = useRef();

  useEffect(() => {
    console.log(title);
    console.log(content); //에디터의 텍스트를 수정할 때마다 출력됨
  }, [text]);

  const updateTitle = (e) => {
    const getTitle = e.target.value;
    setText({ title: getTitle, content });
  };
  const updateContent = () => {
    const editorInstance = editorRef.current.getInstance();
    const getContent_md = editorInstance.getMarkdown();
    setText({ title, content: getContent_md });
  };

  const postContent = () => {
    //게시하기
  };

  return (
    <div className="border-4 border-black">
      <div name="input" className="border border-black ">
        <div name="title_box" className="my-5">
          <p className="text-center p-1 w-1/12 bg-mainYellow rounded-r-full">
            제목
          </p>
          <input
            type="text"
            className="border-2 m-2 p-1 w-4/5 rounded-md dark:bg-darkComponent focus:outline-mainYellow dark:border-darkComponent dark:text-white"
            onChange={updateTitle}
          ></input>
          {/*필수 입력 조건 아이콘 표시(임시)*/}
          <span className={'text-red-400' + (title == '' ? '' : ' hidden')}>
            필수
          </span>
        </div>
        <div name="content_box" className="my-5">
          <p className="text-center p-1 w-1/12 bg-mainYellow rounded-r-full">
            내용
          </p>
          <div className="m-2 w-4/5 h-screen inline-block">
            <Editor
              initialValue={content}
              usageStatistics={false}
              plugins={[
                chart,
                codeSyntaxHighlight,
                colorSyntax,
                tableMergedCell,
                uml,
              ]}
              theme={isDark ? 'dark' : 'light'}
              previewStyle="vertical"
              height="100%"
              onChange={updateContent}
              ref={editorRef}
            />
          </div>
          {/*필수 입력 조건 아이콘 표시(임시)*/}
          <span className={'text-red-400' + (content == '' ? '' : ' hidden')}>
            필수
          </span>
        </div>
        <div name="file_box" className="my-5">
          <p className="text-center p-1 w-1/12 bg-mainYellow rounded-r-full">
            파일 첨부
          </p>
          <input
            type="textArea"
            className="border-2 m-2 w-4/5 rounded-md"
          ></input>
        </div>
      </div>
      <div className="flex justify-between">
        <div
          name="option"
          className="border border-red-400 inline-block dark:text-mainWhite"
        >
          <input type="checkbox" value="댓글 허용" checked="checked" />
          댓글 허용
          <br />
          <input type="checkbox" value="엮인글 허용" checked />
          엮인글 허용
          <br />
          <input type="checkbox" value="알림" />
          알림
          <br />
          <input type="checkbox" value="공지" checked />
          공지
          <br />
          <input type="checkbox" value="비밀글" />
          비밀글
          <br />
        </div>
        <div className="inline-block border border-blue-400 dark:text-mainWhite">
          <button
            className="border-4 float-right w-4/5 border-mainYellow rounded-lg m-2 shadow-lg p-2 active:mr-1 active:ml-3 active:shadow-none"
            onClick={postContent()}
          >
            게시하기
          </button>

          <br />

          <button className="border-4 border-divisionGray rounded-lg m-2 shadow-lg p-2 active:mr-1 active:ml-3 active:shadow-none">
            임시저장
          </button>
          <button className="border-4 border-divisionGray rounded-lg m-2 shadow-lg p-2 active:mr-1 active:ml-3 active:shadow-none">
            불러오기
          </button>
          <button className="border-4 border-divisionGray rounded-lg m-2 shadow-lg p-2 active:mr-1 active:ml-3 active:shadow-none">
            미리보기
          </button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { state };
};
export default connect(mapStateToProps)(TextEditer);
