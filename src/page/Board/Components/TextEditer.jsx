import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  PencilIcon,
  EyeIcon,
  InboxInIcon,
  ArchiveIcon,
} from '@heroicons/react/solid';

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
import postAPI from 'API/v1/post';
import ipAPI from 'API/v1/ip';

const NO_TEMP = 0;
const TEMP = 1;

const TextEditer = (props) => {
  const isDark = props.state.darkMode; //Dark모드 여부
  const currentCategoryId = props.state.category.current;
  const token = props.state.member.token;
  const navigate = useNavigate();

  const [allowComment, setAllowComment] = useState(true);
  const [isNotice, setIsNotice] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const [password, setPassword] = useState('');
  const [uploadAble, setUploadAble] = useState(false);
  const [thumbnailBase64, setThumbnailBase64] = useState(null); // 파일 base64
  const [thumbnail, setThumbnail] = useState(null);
  const [files, setFiles] = useState([]);

  const checkAllowCommentHandler = ({ target }) => {
    setAllowComment(target.checked);
  };

  const checkIsNoticeHandler = ({ target }) => {
    setIsNotice(target.checked);
  };

  const checkIsSecretHandler = ({ target }) => {
    setIsSecret(target.checked);
  };

  const passwordHandler = ({ target }) => {
    setPassword(target);
  };

  const changeThumbnailHandler = ({ target }) => {
    setThumbnail(target.files);
    setThumbnailBase64([]);
    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]); // 단일 파일일 경우 1개
    reader.onloadend = () => {
      const base64 = reader.result;
      console.log(base64);
      if (base64) {
        const base64Sub = base64.toString();
        setThumbnailBase64(base64Sub);
      }
    };
  };

  const changeFileHandler = ({ target }) => {
    setFiles(target.files);
  };

  const [text, setText] = useState({
    title: '',
    content: '', //testText
  });
  const { title, content } = text;

  const editorRef = useRef();

  useEffect(() => {}, [text]);

  const updateTitle = (e) => {
    const getTitle = e.target.value;
    if (getTitle && text.content) {
      setUploadAble(true);
    } else {
      setUploadAble(false);
    }
    setText({ title: getTitle, content });
  };
  const updateContent = () => {
    const editorInstance = editorRef.current.getInstance();
    const getContent_md = editorInstance.getMarkdown();
    if (text.title && getContent_md) {
      setUploadAble(true);
    } else {
      setUploadAble(false);
    }
    setText({ title, content: getContent_md });
  };

  const uploadPostinghandler = (isTemp) => {
    setUploadAble(false);
    ipAPI.getIp().then((ipAddress) => {
      postAPI
        .create({
          title: text.title,
          content: text.content,
          categoryId: currentCategoryId,
          ipAddress: ipAddress,
          allowComment: +allowComment,
          isNotice: +isNotice,
          isSecret: +isSecret,
          isTemp: +isTemp,
          password: password,
          token: token,
          files: files,
          thumbnailFile: thumbnail,
        })
        .then((res) => {
          setUploadAble(true);
          if (res.success) {
            navigate('/board');
          } else {
            alert('게시물 생성 실패! 전산관리자에게 문의하세요~');
          }
        });
    });
  };

  return (
    <div className="">
      <div name="input" className="">
        <div name="title_box" className="my-5">
          <p className="inline-block text-center p-1 px-3 bg-mainYellow rounded-r-full shadow-lg border-b-2 border-pointYellow">
            제목
          </p>
          {/*필수 입력 조건 아이콘 표시(임시)*/}
          <span className={'text-red-400' + (title == '' ? '' : ' hidden')}>
            필수
          </span>
          <input
            type="text"
            className="border-2 border-divisionGray m-2 p-1 w-full rounded-md focus:ring-mainYellow focus:border-mainYellow dark:bg-darkComponent dark:border-darkComponent dark:text-white"
            onChange={updateTitle}
          ></input>
          {/* TODO: 썸네일 tailwind 사용해서 구현 */}
          <input type="file" id="thumbnail" onChange={changeThumbnailHandler} />
          {thumbnailBase64 ? (
            <img
              className="d-block w-100"
              src={thumbnailBase64}
              alt="thumbnail"
              style={{ width: '100px', height: '100px' }}
            />
          ) : (
            ''
          )}
        </div>
        <div name="content_box" className="my-5">
          <p className="inline-block text-center p-1 px-3 bg-mainYellow rounded-r-full shadow-lg border-b-2 border-pointYellow">
            내용
          </p>
          {/*필수 입력 조건 아이콘 표시(임시)*/}
          <span className={'text-red-400' + (content == '' ? '' : ' hidden')}>
            필수
          </span>
          <div className="m-2 w-full h-screen inline-block">
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
        </div>
        <div name="file_box" className="my-5">
          <p className="inline-block text-center p-1 px-3 bg-mainYellow rounded-r-full shadow-lg border-b-2 border-pointYellow">
            파일 첨부
          </p>
          {/* TODO: 썸네일 tailwind 사용해서 구현 */}
          <input
            type="file"
            className="border-2 m-2 w-full rounded-md"
            onChange={changeFileHandler}
          ></input>
        </div>
      </div>
      <div className="justify-between sm:flex">
        <div name="option" className="mb-10 dark:text-mainWhite">
          <input
            type="checkbox"
            value="댓글 허용"
            className="text-mainYellow focus:ring-mainYellow rounded dark:bg-darkComponent dark:checked:bg-mainYellow"
            checked={allowComment}
            onChange={(e) => checkAllowCommentHandler(e)}
          />{' '}
          댓글 허용
          <br />
          <input
            type="checkbox"
            value="공지"
            className="text-mainYellow focus:ring-mainYellow rounded dark:bg-darkComponent dark:checked:bg-mainYellow"
            checked={isNotice}
            onChange={(e) => checkIsNoticeHandler(e)}
          />{' '}
          공지
          <br />
          <input
            type="checkbox"
            className="text-mainYellow focus:ring-mainYellow rounded dark:bg-darkComponent dark:checked:bg-mainYellow peer "
            id="isSecret"
            value="비밀글"
            checked={isSecret}
            onChange={(e) => checkIsSecretHandler(e)}
          />{' '}
          비밀글
          <br />
          {isSecret ? (
            <label
              htmlFor="isSecret"
              className="text-xs hidden peer-checked:contents"
            >
              비밀번호 :{' '}
              <input
                type="password"
                className="border-2 border-divisionGray m-2 p-1 text-xs rounded-md focus:ring-mainYellow focus:border-mainYellow dark:bg-darkComponent  dark:border-darkComponent dark:text-white"
                onBlur={(e) => passwordHandler(e)}
              ></input>
            </label>
          ) : (
            ' '
          )}
        </div>
        <div className="w-full sm:w-fit inline-block dark:text-mainWhite">
          <div className="flex justify-between sm:justify-end">
            <button
              className="text-xl border-4 border-divisionGray rounded-xl m-2 shadow-lg p-2 active:mr-1 active:ml-3 active:shadow-none"
              onClick={(e) => uploadPostinghandler(TEMP, e)}
            >
              <InboxInIcon className="inline-block m-1 h-7 w-7  text-divisionGray" />
              임시저장
            </button>
            <button
              className={
                (uploadAble
                  ? 'border-mainYellow text-mainYellow shadow-lg'
                  : 'border-divisionGray text-mainWhite bg-divisionGray dark:text-darkComponent dark:bg-darkPoint dark:border-darkComponent') +
                ' text-xl border-4  rounded-xl m-2 p-2 active:mr-1 active:ml-3 active:shadow-none'
              }
              onClick={(e) => uploadPostinghandler(NO_TEMP, e)}
              disabled={!uploadAble}
            >
              <PencilIcon className="inline-block m-1 h-7 w-7 " />
              게시하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(TextEditer);
