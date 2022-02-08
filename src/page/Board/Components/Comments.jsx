import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ViewGridIcon, ChatAltIcon, PencilIcon } from '@heroicons/react/solid';

const Comments = ({ board, state }) => {
  var comments = board.comments;
  const isDark = state.darkMode;
  const addComment = () => {
    console.log('addComment');
  };
  useEffect(() => {}, [isDark, comments]);
  return (
    <div className="dark:text-mainWhite">
      <p className="text-2xl">
        <strong>
          <ChatAltIcon className="inline-block h-10 w-10 text-mainYellow" />
          댓글({board.commentN})
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
      <div>
        <textarea className="resize-none border-2 m-2 p-1 w-4/5 h-32 rounded-md dark:bg-darkComponent focus:outline-mainYellow dark:border-darkComponent dark:text-white"></textarea>
        <button
          className="border-4 border-mainYellow p-1 rounded-lg shadow-lg dark:text-mainWhite active:mt-1 active:ml-1 active:shadow-none"
          onClick={addComment()}
        >
          <PencilIcon className="inline-block m-1 h-5 w-5 text-mainYellow" />
          Comment
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Comments);
