import React, { useState, useRef, useEffect } from 'react';
import { testText } from 'page/Board/testText';
import '@toast-ui/editor/dist/toastui-editor.css'; //마크다운 편집기 뷰어 에디터
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { Viewer } from '@toast-ui/react-editor';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ThumbUpIcon,
  ThumbDownIcon,
  UserCircleIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleDownIcon,
  DocumentDownloadIcon,
} from '@heroicons/react/solid';

//local
import { getDateWithFormat } from '../BoardUtil';
import postAPI from 'API/v1/post';

import utilAPI from 'API/v1/util';

const API_URL = process.env.REACT_APP_API_URL;

const Content = ({ state, board, likeChangeFlag, setLikeChangeFlag }) => {
  const { categoryName, postId } = useParams();
  //board는 게시글 정보가 담긴 객체
  //console.log(state.member.memberId); //(내 아이디)나중에 업데이트 될거임
  const isDark = state.darkMode?.isDark; //Dark모드 여부
  const myId = state.member?.memberInfo?.id; //게시글을 보고 있는 나의 정보
  const [isDisliked, setIsDisliked] = useState(); //비추천을 눌렀는지 여부
  const [isLiked, setIsLiked] = useState(); //추천을 눌렀는지 여부
  const [files, setFiles] = useState([]); //게시글에 첨부된 파일 목록
  const [thumbnailBase64, setThumbnailBase64] = useState(null); // 섬네일 이미지 base64
  const [toggle, setToggle] = useState(false); //첨부파일 토글이 열렸는지 여부

  const postingId = board.id;
  const token = state.member.token;
  const navigate = useNavigate();
  //const files=board.files;

  //console.log(board);
  const viwerRef = useRef();
  const clickLikeHandler = () => {
    //게시글 추천버튼 눌렀을 경우
    const type = isLiked ? 'DEC' : 'INC';
    postAPI
      .like({
        type: type,
        postingId: postingId,
        token: token,
      })
      .then((res) => {
        setLikeChangeFlag(!likeChangeFlag);
      });
    setIsLiked(!isLiked);
  };
  const clickDislikeHandler = () => {
    //게시글 비추천버튼 눌렀을 경우
    const type = isDisliked ? 'DEC' : 'INC';
    postAPI
      .dislike({
        type: type,
        postingId: postingId,
        token: token,
      })
      .then((res) => {
        // console.log(res);
        setLikeChangeFlag(!likeChangeFlag);
      });
    setIsDisliked(!isDisliked);
  };

  const deletePostingHandler = () => {
    //게시글 삭제 버튼 눌렀을 시
    if (window.confirm('정말로 해당 게시글을 삭제하시겠습니까?')) {
      postAPI.remove({ boardId: postingId, token: token }).then((res) => {
        if (res.success) {
          navigate(`/board/${categoryName}`);
        } else {
          alert('게시물 삭제 실패! 전산관리자에게 문의하세요~');
        }
      });
    }
  };
  const toggleFiles = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    /*utilAPI.getThumbnail({ thumbnailId: board.thumbnail.id }).then((data) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          setThumbnailBase64(base64);
        }
      };
      reader.readAsDataURL(data);
    });*/
    // console.log(board);

    postAPI
      .check({
        postingId: postingId,
        token: token,
      })
      .then((res) => {
        setIsLiked(res.data.liked);
        setIsDisliked(res.data.disliked);
      });
    const viwerInstance = viwerRef.current.getInstance();
    viwerInstance.setMarkdown(board.content);
    setFiles(board.files);
  }, [state.member.token, board]);

  return (
    <div className="">
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
        <div
          name="글 수정/삭제"
          className="px-2 text-xs sm:text-base flex flex-row-reverse "
        >
          <div className="rounded-lg bg-slate-100 my-2 dark:bg-darkComponent">
            <UserCircleIcon className="inline-block h-5 w-5 m-1 text-divisionGray dark:text-slate-500 " />
            <Link
              to={`/write/${categoryName}`}
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
      <div
        name="썸네일"
        className={
          (board.thumbnailPath ? '' : 'hidden') + ' flex justify-center'
        }
      >
        <img
          className={
            'border-4 border-slate-500 m-3 p-1 max-h-[400px] max-w-[400px] h-full w-full rounded-xl'
          }
          src={board.thumbnailPath}
          alt="thumbnail"
        />
      </div>
      <div className="p-5 min-h-[300px] dark:bg-mainBlack">
        <Viewer
          initialValue={board.content}
          change={board.content}
          theme={isDark ? 'dark' : 'light'}
          height="100%"
          ref={viwerRef}
        />
      </div>
      <div
        name="첨부파일 폼"
        className={
          (board.files.length != 0 ? '' : 'hidden') +
          ' m-3 my-5 w-4/5 border-y-2 bg-opacity-50 dark:border-gray-600'
        }
      >
        <button className="dark:text-mainWhite" onClick={() => toggleFiles()}>
          {toggle ? (
            <ChevronDoubleDownIcon className="inline-block h-5 w-5 m-1 text-divisionGray dark:text-slate-500 " />
          ) : (
            <ChevronDoubleRightIcon className="inline-block h-5 w-5 m-1 text-mainYellow" />
          )}
          첨부파일 <span className="text-mainYellow">({files.length})</span>
        </button>
        {toggle ? (
          <div className="ml-5 pb-2">
            <table className="w-full rounded-lg dark:text-mainWhite">
              <thead>
                <tr className="bg-slate-300 dark:bg-slate-600">
                  <th className="rounded-t-lg py-1">
                    파일명
                    <span className="inline-block sm:hidden">
                      (터치하여 다운로드)
                    </span>
                    <span className="hidden sm:inline-block">
                      (클릭하여 다운로드)
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {files?.map((file) => {
                  return (
                    <tr
                      key={file.id}
                      className="border-b  hover:bg-slate-100 dark:hover:bg-darkComponent dark:border-darkComponent"
                    >
                      <a
                        href={API_URL + '/v1/post/download/' + file.id}
                        className=" w-full inline-block "
                        download={file.fileName}
                      >
                        <td className="border-b px-2 flex justify-between dark:border-darkComponent ">
                          <div className="w-[50vw] md:w-[40vw] ">
                            <p className="truncate">{file.fileName}</p>
                          </div>
                          <span>
                            <DocumentDownloadIcon className="inline-block h-5 w-5 m-1 text-mainYellow" />
                          </span>
                        </td>
                      </a>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}
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
          추천({board.likeCount})
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
          비추천({board.dislikeCount})
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Content);
