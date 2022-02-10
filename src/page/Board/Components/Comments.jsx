import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ViewGridIcon, ChatAltIcon, PencilIcon } from '@heroicons/react/solid';
import postAPI from 'API/v1/post';

const Comments = ({ boardId : boardId, state }) => {
  const [comments, setComments] = useState([]);
  const isDark = state.darkMode;
  const addComment = () => {
    console.log('addComment');
  };

  useEffect(() => {
    postAPI.getCommentByBoardId({
      boardId: boardId,
    }).then(res => {
      setComments(res.list);
    });
  }, [isDark]);

  return (
    <div className="dark:text-mainWhite">
      <p className="text-2xl">
        <strong>
          <ChatAltIcon className="inline-block h-10 w-10 text-mainYellow" />
          댓글({comments.length})
        </strong>
      </p>

      {comments.map((comment) => (
        <div key={comment.no} className="border">
          <div className="inline-block w-1/6">
            <ViewGridIcon className="inline-block h-5 w-5 text-mainYellow" />
            {comment.user}:
          </div>
          <div className="inline-block p-2 w-3/5">{comment.content}</div>
        </div>
      ))}
      <div name="댓글 작성 창">
        <textarea className="resize-none border-2 border-divisionGray m-2 p-1 w-4/5 h-32 rounded-md focus:ring-mainYellow focus:border-mainYellow dark:bg-darkComponent dark:border-darkComponent dark:text-white"></textarea>
        <button
          className="border-4 border-mainYellow p-1 rounded-lg shadow-lg text-mainYellow active:mt-1 active:ml-1 active:shadow-none"
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
