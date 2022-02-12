import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ViewGridIcon, ChatAltIcon, PencilIcon } from '@heroicons/react/solid';
import postAPI from 'API/v1/post';

const Comments = ({ boardId: boardId, state }) => {
  const [comments, setComments] = useState([]);
  const isDark = state.darkMode;
  const addComment = () => {
    console.log('addComment');
  };

  useEffect(() => {
    postAPI
      .getCommentByBoardId({
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
          <div key={comment.id} name="댓글" className="flex border-b mt-4">
            <ViewGridIcon className="mr-4 flex-shrink-0 border h-10 w-10 text-mainYellow" />
            <div className="inline-block p-2 w-3/5">
              <h4 className="text-lg font-bold">{comment.memberId}</h4>
              <p className="mt-1">{comment.content}</p>

              {filterChildComment(comments, comment.id).map((childCom) => (
                <div key={childCom.id} name="대댓글" className="mt-6 flex">
                  <ViewGridIcon className="mr-4 flex-shrink-0 border h-10 w-10 text-mainYellow" />
                  <div className="">
                    <h4 className="text-lg font-bold">{childCom.memberId}</h4>
                    <p className="mt-1">{childCom.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div name="댓글 작성 창">
        <textarea className="resize-none border-2 border-divisionGray m-2 p-1 w-full h-32 rounded-md focus:ring-mainYellow focus:border-mainYellow dark:bg-darkComponent dark:border-darkComponent dark:text-white"></textarea>
        <button
          className="border-4 border-mainYellow p-2 pr-3 rounded-lg shadow-lg text-mainYellow active:mt-1 active:ml-1 active:shadow-none"
          onClick={addComment()}
        >
          <PencilIcon className="inline-block m-1 h-5 w-5 " />
          <strong>COMMENT</strong>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Comments);
