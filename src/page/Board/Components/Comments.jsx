import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div className="border-4 border-black">
      {comments.map((comment) => (
        <p key={comment.no} className="border">
          {comment.content}
        </p>
      ))}
    </div>
  );
};

export default Comments;
