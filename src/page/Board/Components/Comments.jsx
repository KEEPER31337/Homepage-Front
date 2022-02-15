import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  ViewGridIcon,
  ChatAltIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import commentAPI from 'API/v1/comment';

const Comments = ({ boardId: boardId, state }) => {
  const [comments, setComments] = useState([]);
  const isDark = state.darkMode;
  const myId = state.member.userInfo.id;
  console.log(state.member.userInfo);
  const addCommentHandler = () => {
    console.log('addComment');
  };

  useEffect(() => {
    commentAPI
      .get({
        boardId: boardId,
      })
      .then((res) => {
        setComments(res.list);
      });
  }, [isDark]);

  const filterParentComment = (comments) => {
    return comments.filter((comment) => comment.parentId == 0);
  };
  const filterChildComment = (comments, id) => {
    return comments.filter((comment) => comment.parentId == id);
  };
  return (
    <div className="dark:text-mainWhite">
      <p className="text-2xl">
        <strong>
          <ChatAltIcon className="inline-block h-10 w-10 text-mainYellow" />
          댓글({comments.length})
        </strong>
      </p>

      <div name="댓글 리스트">
        {filterParentComment(comments).map((comment) => (
          <div
            key={comment.id}
            name="댓글"
            className=" border-b-4 flex border-b mt-4 pb-4"
          >
            <ViewGridIcon className="mr-4 mt-2 rounded-full shadow-lg flex-shrink-0 border-4 h-[10%] w-[10%] max-w-[5em] text-mainYellow" />
            <div className="border-2 rounded-lg shadow-lg inline-block p-2 w-full">
              <div className="flex justify-between">
                <h4 className="inline-block border text-lg font-bold bg-slate-200 rounded-lg px-2">
                  {comment.writer}
                </h4>
                <div>
                  <button className="mx-1 text-mainYellow text-xs sm:text-base hover:text-pointYellow">
                    <PencilIcon className="inline-block Sh-5 w-5" />
                    대댓글
                  </button>
                  {myId == comment.writerId ? (
                    <button className="mx-1 text-red-400 text-xs sm:text-base hover:text-red-600">
                      <TrashIcon className="inline-block Sh-5 w-5" />
                      삭제
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <p className="mt-1 px-3">{comment.content}</p>

              {filterChildComment(comments, comment.id).map((childCom) => (
                <div
                  key={childCom.id}
                  name="대댓글"
                  className="mt-6 p-2 flex w-full bg-slate-50 rounded-lg"
                >
                  <ViewGridIcon className="mr-4 rounded-full shadow-lg flex-shrink-0 border-4  h-[10%] w-[10%] max-w-[3em] text-mainYellow" />
                  <div className="w-full">
                    <div className=" flex justify-between">
                      <h4 className="inline-block text-base font-bold rounded-lg px-2 ">
                        {childCom.writer}
                      </h4>
                      {myId === comment.writerId ? (
                        <button className="mx-1 text-red-400 text-xs sm:text-base hover:text-red-600">
                          <TrashIcon className="inline-block Sh-5 w-5" />
                          삭제
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                    <p className="mt-1 px-3 text-slate-500">
                      {childCom.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div name="댓글 작성 창">
        <textarea className="resize-none border-2 border-divisionGray m-2 p-1 w-full h-32 rounded-md focus:ring-mainYellow focus:border-mainYellow dark:bg-darkComponent dark:border-darkComponent dark:text-white"></textarea>
        <div className="flex justify-end">
          <button
            className="border-4 border-mainYellow p-2 pr-3 rounded-lg shadow-lg text-mainYellow active:mt-1 active:ml-1 active:shadow-none"
            onClick={addCommentHandler()}
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
