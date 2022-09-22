import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  ViewGridIcon,
  ChatAltIcon,
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
  PlusIcon,
} from '@heroicons/react/solid';

//local
import commentAPI from 'API/v1/comment';
import { getDiffTimeWithFormat2 } from '../BoardUtil';

const Comments = ({
  boardId,
  commentCount: commentCount,
  state,
  commentChangeFlag,
  setCommentChangeFlag,
}) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [subContent, setSubContent] = useState('');
  const [focusedComment, setFocusedComment] = useState();
  const [isView, setIsView] = useState(false);
  const [dislikedComments, setDislikedComments] = useState([]); //싫어요 표시한 댓글들의 id  리스트
  const [likedComments, setLikedComments] = useState([]); //좋아요 표시한 댓글들의 id 리스트
  const [numComments, setNumComments] = useState(10); //현재 보여주는 댓글 개수(대댓글 제외, 페이지네이션 목적)
  const [realCommentNum, setRealCommentNum] = useState(0); //이 게시글의 총 댓글 수(대댓글 제외)
  const isDark = state.darkMode?.isDark;
  const token = state.member.token;
  const myId = state.member?.memberInfo?.id;

  useEffect(() => {
    commentAPI
      .get({
        boardId: boardId,
        size: numComments,
        token: token,
      })
      .then((res) => {
        setComments(res.list);
        // console.log(comments);
        comments.map((comment) => {
          if (comment.checkedLike)
            setLikedComments([...likedComments, comment.id]);
          if (comment.checkedDislike)
            setDislikedComments([...dislikedComments, comment.id]);
        });
      });
  }, [isDark, commentChangeFlag, numComments, boardId]);

  const loadAdditionalComments = () => {
    //댓글 페이지네이션(더 불러오기)
    setNumComments(numComments + 10);
    //console.log('댓글 더 불러오기');
  };
  const commentContentHandler = (e) => {
    //작성중인 댓글 내용을 state로 저장
    setContent(e.target.value);
  };
  const subCommentContentHandler = (e) => {
    //작성중인 대댓글 내용을 state로 저장
    //console.log(e.target.value);
    setSubContent(e.target.value);
  };

  const addCommentHandler = () => {
    //댓글 작성
    //console.log('addCommentHandler');
    if (content === '') {
      //console.log('alert!');
      alert('댓글에 내용을 입력해주세요.');
    } else {
      commentAPI
        .create({
          boardId: boardId,
          content: content,
          token: token,
        })
        .then((res) => {
          if (res.success) {
            setCommentChangeFlag(!commentChangeFlag);
            setContent('');
          } else {
            alert('댓글 달기 실패! 전산관리자에게 문의하세요~');
          }
        });
    }
  };
  const addSubCommentHandler = (parentId = 0) => {
    //대댓글 작성
    //console.log('addSubCommentHandler');
    if (subContent === '') {
      //console.log('alert!');
      alert('대댓글에 내용을 입력해주세요.');
    } else {
      commentAPI
        .create({
          boardId: boardId,
          content: subContent,
          parentId: parentId,
          token: token,
        })
        .then((res) => {
          if (res.success) {
            setCommentChangeFlag(!commentChangeFlag);
            setSubContent('');
          } else {
            alert('댓글 달기 실패! 전산관리자에게 문의하세요~');
          }
        });
    }
  };
  const deleteCommentHandler = (id) => {
    //댓글 및 대댓글 삭제
    if (window.confirm('정말로 댓글을 삭제하시겠습니까?')) {
      commentAPI
        .remove({
          commentId: id,
          token: token,
        })
        .then((res) => {
          if (res.success) {
            //console.log('delete comment');
            setCommentChangeFlag(!commentChangeFlag);
          } else {
            alert('댓글 삭제 실패!');
          }
        });
    }
  };

  const displayInput = (id) => {
    //대댓글 버튼 클릭시 대댓글 입력 창이 보였다가 안 보였다가 할 수 있도록
    setFocusedComment(id);
    if (focusedComment != id) setIsView(true);
    else setIsView(!isView);
    if (isView) {
      //TODO 대댓글 버튼 눌렀을 때 자동으로 입력창이 포커싱되게 하기(왜인지 잘 안됨)
      document.getElementById(focusedComment).firstElementChild.focus();
      setSubContent('');
    }
    //console.log(document.getElementById(focusedComment)?.firstElementChild);

    //console.log(isView);
  };
  const clickLikeHandler = (id) => {
    //댓글에 좋아요 버튼 눌렀을 경우
    commentAPI
      .like({
        commentId: id,
        memberId: myId,
        token: token,
      })
      .then((res) => {
        //console.log(res);
        setCommentChangeFlag(!commentChangeFlag);
        if (likedComments.filter((a) => a == id).length == 0) {
          setLikedComments([...likedComments, id]);
        } else {
          setLikedComments(likedComments.filter((a) => a != id));
        }
      });
  };
  const clickDislikeHandler = (id) => {
    //댓글에 싫어요 버튼 눌렀을 경우
    commentAPI
      .dislike({
        commentId: id,
        memberId: myId,
        token: token,
      })
      .then((res) => {
        //console.log(res);
        setCommentChangeFlag(!commentChangeFlag);
        if (dislikedComments.filter((a) => a == id).length == 0) {
          setDislikedComments([...dislikedComments, id]);
        } else {
          setDislikedComments(dislikedComments.filter((a) => a != id));
        }
      });
  };

  const filterParentComment = (comments) => {
    return comments.filter((comment) => comment.parentId == 0);
  };
  const filterChildComment = (comments, id) => {
    return comments.filter((comment) => comment.parentId == id);
  };
  return (
    <div className="dark:text-mainWhite space-y-5">
      <p className="text-2xl">
        <strong>
          <ChatAltIcon className="inline-block h-10 w-10 text-mainYellow" />
          댓글({commentCount})
        </strong>
      </p>

      <div name="댓글 리스트" className="space-y-3">
        {filterParentComment(comments).map((comment) => (
          <div
            key={comment.id}
            name="댓글"
            className=" flex dark:border-darkComponent"
          >
            {/*console.log(comment)*/}
            <div className="border w-[5em] h-[5em] mr-4 my-1 mt-2 rounded-full items-center shadow-md flex-shrink-0 text-divisionGray hidden sm:flex dark:border-gray-500 dark:text-gray-500">
              {comment.writerThumbnailPath ? (
                <img
                  src={comment.writerThumbnailPath}
                  className="rounded-full"
                />
              ) : (
                <UserCircleIcon className="inline-block" />
              )}
            </div>
            <div className="border-2 rounded-lg shadow-sm inline-block p-1 w-full dark:border-darkComponent">
              <div className="flex justify-between">
                <div className=" min-w-[11em] inline-block">
                  <h4
                    name="댓글작성자"
                    className="inline-block font-bold bg-slate-200 rounded-lg px-2 py-[1px] dark:bg-gray-500"
                  >
                    {comment.writer}
                  </h4>
                  <span className="text-xs mx-2">
                    {getDiffTimeWithFormat2(comment.registerTime)}
                  </span>
                </div>
                <div
                  className={
                    comment.writer == '탈퇴회원'
                      ? 'hidden'
                      : ' sm:max-w-full flex flex-wrap justify-end'
                  }
                >
                  <div className=" inline-block">
                    <button
                      name="댓글 추천 버튼"
                      className="mx-1 text-red-400 text-xs sm:text-base hover:text-red-500"
                      onClick={() => clickLikeHandler(comment.id)}
                    >
                      {comment.checkedLike ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </button>
                    {comment.likeCount}
                    <button
                      name="댓글 비추천 버튼"
                      className="mx-1 text-blue-400 text-xs sm:text-base hover:text-blue-500"
                      onClick={() => clickDislikeHandler(comment.id)}
                    >
                      {comment.checkedDislike ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </button>
                    {comment.dislikeCount}

                    <button
                      className="mx-1 text-mainYellow text-xs sm:text-sm hover:text-pointYellow"
                      onClick={() => displayInput(comment.id)}
                    >
                      <span className="inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mt-1 -mb-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </span>
                      대댓글
                    </button>
                  </div>
                  {myId == comment.writerId ? (
                    <button
                      onClick={() => deleteCommentHandler(comment.id)}
                      className="mr-1 text-red-400 text-xs sm:text-sm hover:text-red-600"
                    >
                      <span className="inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 mt-1 -mb-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                      삭제
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <p className="my-1 px-3">{comment.content}</p>

              {filterChildComment(comments, comment.id).map((childCom) => (
                <div
                  key={childCom.id}
                  name="대댓글"
                  className="border-b border-slate-200 px-2 py-1 flex w-full bg-slate-50 rounded-lg dark:bg-darkComponent dark:border-darkComponent"
                >
                  <div className="border w-[3em] h-[3em] mr-2 rounded-full items-center shadow-md flex-shrink-0 text-divisionGray hidden sm:flex dark:border-gray-500 dark:text-gray-500">
                    {childCom.writerThumbnailPath ? (
                      <img
                        src={childCom.writerThumbnailPath}
                        className="rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className="inline-block" />
                    )}
                  </div>
                  <div className="w-full">
                    <div className=" flex justify-between">
                      <h4 className="inline-block text-sm font-bold rounded-lg">
                        {childCom.writer}
                      </h4>
                      {myId === childCom.writerId ? (
                        <button
                          onClick={() => deleteCommentHandler(childCom.id)}
                          className="mx-1 text-red-400 text-xs sm:text-sm hover:text-red-600"
                        >
                          <span className="inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4 mt-1 -mb-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                          삭제
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                    <p className="px-3">{childCom.content}</p>
                  </div>
                </div>
              ))}
              <div
                id={comment.id}
                name="대댓글 작성창"
                className={
                  (isView && focusedComment == comment.id ? '' : 'hidden') +
                  ' flex pr-2 mb-1'
                }
              >
                <textarea
                  value={subContent}
                  onChange={subCommentContentHandler}
                  className="resize-none border-2 border-divisionGray m-2 p-1 w-full h-20 rounded-md focus:ring-slate-400 focus:border-slate-400 dark:bg-darkComponent dark:border-darkComponent dark:text-white"
                ></textarea>
                <button
                  className="border-4 border-slate-400 my-1 p-2 pr-3 rounded-xl hover:shadow-lg text-slate-400 active:mt-3 active:mb-1 active:shadow-none"
                  onClick={() => {
                    addSubCommentHandler(comment.id, subContent);
                  }}
                >
                  <PencilIcon className="inline-block m-1 h-5 w-5 " />
                  <strong>COMMENT</strong>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*TODO 현재 댓글 삭제 시 commentCount가 증가하는 문제가 있어 페이지네이션에도 오류가 있음  */}
      {/*console.log(commentCount)}
      {console.log(comments.length)*/}
      {commentCount > comments.length ? (
        <div name="댓글 더 불러오기" className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <button
              className="px-3 bg-white text-lg font-medium text-gray-900 hover:text-slate-300 dark:bg-mainBlack dark:text-mainWhite dark:hover:text-gray-500"
              onClick={() => loadAdditionalComments()}
            >
              <PlusIcon className="inline-block m-1 h-5 w-5 " />
              댓글 더보기
            </button>
          </div>
        </div>
      ) : (
        ''
      )}

      <div name="댓글 작성 창" className="px-4">
        <div className="flex">
          <textarea
            value={content}
            onChange={commentContentHandler}
            className="inline-block resize-none border-2 border-divisionGray p-1 w-[80vw] h-20 sm:w-full sm:h-32 rounded-md focus:ring-mainYellow focus:border-mainYellow dark:bg-darkComponent dark:border-darkComponent dark:text-white"
          ></textarea>
          <button
            className="inline-block w-[15vw] border-4 border-mainYellow ml-2 p-2 pr-3 rounded-xl sm:hidden hover:shadow-lg text-mainYellow active:mt-3 active:mb-1 active:shadow-none"
            onClick={addCommentHandler}
          >
            <PencilIcon className="inline-block h-7 w-7 " />
          </button>
        </div>

        <div className="justify-end hidden sm:flex">
          <button
            className="border-4 border-mainYellow my-2 p-2 pr-3 rounded-lg hover:shadow-lg text-mainYellow active:mt-3 active:mb-1 active:shadow-none"
            onClick={addCommentHandler}
          >
            <PencilIcon className="inline-block m-1 h-5 w-5 " />
            <strong>COMMENT</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Comments);
