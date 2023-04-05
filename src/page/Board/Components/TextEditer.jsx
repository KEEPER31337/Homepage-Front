import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import FileUploadForm from 'page/Board/Components/fileUploadForm';
import FilesUploadForm from 'page/Board/Components/FilesUploadForm';
import {
  PencilIcon,
  InboxInIcon,
  ExclamationIcon,
} from '@heroicons/react/solid';

//local
import postAPI from 'API/v1/post';
import ResponsiveEditor from './ResponsiveEditor';
import categoryMapper from './categoryMapper';

const NO_TEMP = 0;
const TEMP = 1;

const TextEditer = (props) => {
  const { categoryName } = useParams();
  const categoryId = categoryMapper[categoryName].id;
  const isDark = props.state.darkMode?.isDark; //Dark모드 여부
  const token = props.state.member.token;
  const modifyFlag = !!props.redirectData.state?.modifyFlag;
  const board = props.redirectData.state?.board;
  const navigate = useNavigate();

  const [allowComment, setAllowComment] = useState(true);
  const [isNotice, setIsNotice] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const [password, setPassword] = useState('');
  const [uploadAble, setUploadAble] = useState(false);
  const [thumbnailBase64, setThumbnailBase64] = useState(null); // 파일 base64
  const [thumbnail, setThumbnail] = useState(null);
  const [isThumbnailModify, setIsThumbnailModify] = useState(false);
  const [files, setFiles] = useState([]);
  const [originFiles, setOriginFiles] = useState([]);
  const [deleteFileIdList, setDeleteFileIdList] = useState([]); //삭제할 파일 목록

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
    setPassword(target.value);
  };

  const [text, setText] = useState({
    title: modifyFlag ? board.title : '',
    content: modifyFlag ? board.content : '', //testText
  });
  const { title, content } = text;

  const editorRef = useRef();

  useEffect(() => {
    if (modifyFlag) {
      setText({ title: board.title, content: board.content });
      setAllowComment(!!board.allowComment);
      setIsNotice(!!board.isNotice);
      setIsSecret(!!board.isSecret);
      setUploadAble(true);
      setOriginFiles(board.files);
    }
  }, []);

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
    // console.log(thumbnailBase64);
    // console.log(thumbnail);
    postAPI
      .create({
        title: text.title,
        content: text.content,
        categoryId: categoryId,
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
        if (res?.success) {
          navigate(`/board/${categoryName}`);
        } else {
          alert('게시물 생성 실패! 전산관리자에게 문의하세요~');
        }
      });
  };
  const uploadModifyhandler = (isTemp) => {
    setUploadAble(false);

    postAPI
      .deleteFiles({
        fileIdList: deleteFileIdList,
        token: token,
      })
      .then((res) => {
        console.log(res);
      });

    postAPI
      .modify({
        boardId: board.id,
        title: text.title,
        content: text.content,
        categoryId: categoryId,
        allowComment: +allowComment,
        isNotice: +isNotice,
        isSecret: +isSecret,
        isTemp: +isTemp,
        password: password,
        token: token,
        files: files,
      })
      .then((res) => {
        setUploadAble(true);
        if (res.success) {
          if (isThumbnailModify) {
            postAPI
              .modifyThumbnail({
                thumbnail,
                boardId: board.id,
                token,
              })
              .then((res) => {
                if (res.success) {
                  window.location.replace(`/post/${categoryName}/${board.id}`);
                  return;
                } else {
                  alert('게시물 썸네일 수정 실패! 전산관리자에게 문의하세요~');
                  return;
                }
              });
          }
          navigate(`/post/${categoryName}/${board.id}`);
        } else {
          alert('게시물 수정 실패! 전산관리자에게 문의하세요~');
        }
      });
  };

  return (
    <div className="space-y-2">
      <div name="input" className="space-y-2">
        <div name="제목과 썸네일" className="md:flex">
          <div
            name="title_box"
            className="w-full inline-block flex-1 md:w-content"
          >
            <span className="inline-block text-center p-1 px-3 bg-mainYellow rounded-r-full shadow-lg border-b-2 border-pointYellow">
              제목
            </span>
            <div className="p-2 space-y-2">
              <div
                className={
                  (title == '' ? '' : ' hidden') +
                  ' rounded-md bg-red-50 p-4 dark:bg-red-300'
                }
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      제목은 필수로 입력해야 합니다.
                    </h3>
                  </div>
                </div>
              </div>
              <input
                type="text"
                className="border-2 border-divisionGray p-1 w-full rounded-md focus:ring-mainYellow focus:border-mainYellow dark:bg-darkComponent dark:bg-darkPoint dark:border-darkComponent dark:text-white"
                value={text.title}
                onChange={updateTitle}
              ></input>
            </div>
          </div>

          <div className=" inline-block md:px-0 w-full md:w-fit flex justify-center">
            <FileUploadForm
              setThumbnail={setThumbnail}
              setIsThumbnailModify={setIsThumbnailModify}
              modifyFlag={modifyFlag}
              board={board}
            />
          </div>
        </div>
        <div name="content_box" className="">
          <span className="inline-block text-center p-1 px-3 bg-mainYellow rounded-r-full shadow-lg border-b-2 border-pointYellow">
            내용
          </span>
          <div className="p-2 space-y-2">
            <div
              className={
                (content == '' ? '' : ' hidden') +
                '  rounded-md bg-red-50  p-4 dark:bg-red-300'
              }
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    내용은 필수로 입력해야 합니다.
                  </h3>
                </div>
              </div>
            </div>
            <div className="w-full h-[50vh] min-h-[500px] inline-block">
              <ResponsiveEditor
                content={content}
                isDark={isDark}
                updateContent={updateContent}
                editorRef={editorRef}
              />
            </div>
          </div>
        </div>
        <div name="file_box">
          <span className="hidden text-center p-1 px-3 bg-mainYellow rounded-r-full shadow-lg border-b-2 border-pointYellow sm:inline-block">
            파일 첨부
          </span>
          <div className="p-2 space-y-2">
            <FilesUploadForm
              files={files}
              setFiles={setFiles}
              modifyFlag={modifyFlag}
              deleteFileIdList={deleteFileIdList}
              setDeleteFileIdList={setDeleteFileIdList}
              originFiles={originFiles}
              setOriginFile={setOriginFiles}
            />
          </div>
        </div>
      </div>
      <div className="justify-between space-y-4 sm:flex">
        <div name="option" className=" px-4 dark:text-mainWhite">
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
        <div className="sm:px-0 px-10 w-full sm:w-fit inline-block dark:text-mainWhite">
          <div className="flex justify-between sm:justify-end space-x-2">
            {modifyFlag ? (
              <button
                className="text-xl border-4 border-divisionGray rounded-xl shadow-lg p-2 active:mr-1 active:ml-3 active:shadow-none"
                onClick={(e) => uploadModifyhandler(TEMP, e)}
              >
                <InboxInIcon className="inline-block m-1 h-7 w-7  text-divisionGray" />
                임시저장
              </button>
            ) : (
              <button
                className="text-xl border-4 border-divisionGray rounded-xl shadow-lg p-2 active:mr-1 active:ml-3 active:shadow-none"
                onClick={(e) => uploadPostinghandler(TEMP, e)}
              >
                <InboxInIcon className="inline-block m-1 h-7 w-7  text-divisionGray" />
                임시저장
              </button>
            )}
            {modifyFlag ? (
              <button
                className={
                  (uploadAble
                    ? 'border-mainYellow text-mainYellow shadow-lg'
                    : 'border-divisionGray text-mainWhite bg-divisionGray dark:text-darkComponent dark:bg-darkPoint dark:border-darkComponent') +
                  ' text-xl border-4  rounded-xl p-2 active:mr-1 active:ml-3 active:shadow-none'
                }
                onClick={(e) => uploadModifyhandler(NO_TEMP, e)}
                disabled={!uploadAble}
              >
                <PencilIcon className="inline-block m-1 h-7 w-7 " />
                수정하기
              </button>
            ) : (
              <button
                className={
                  (uploadAble
                    ? 'border-mainYellow text-mainYellow shadow-lg'
                    : 'border-divisionGray text-mainWhite bg-divisionGray dark:text-darkComponent dark:bg-darkPoint dark:border-darkComponent') +
                  ' text-xl border-4  rounded-xl  p-2 active:mr-1 active:ml-3 active:shadow-none'
                }
                onClick={(e) => uploadPostinghandler(NO_TEMP, e)}
                disabled={!uploadAble}
              >
                <PencilIcon className="inline-block m-1 h-7 w-7 " />
                게시하기
              </button>
            )}
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
