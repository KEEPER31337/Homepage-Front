import React from 'react';

const Content = ({ board }) => {
  var realContent = board.content.replace(/(\n|\r\n)/g, '<br>');
  return (
    <div className="border-4 border-black">
      <div className=" bg-mainYellow rounded-t-lg">
        <p className="text-2xl">{board.title}</p>
        {board.user}
        {board.date + ' ' + board.time}
        조회수 : {board.watch}
        댓글수 : {board.commentN}
        추천수 : {board.goodN}
      </div>
      <div className="w-full p-5">
        <input
          type="textArea"
          className="w-full resize-none bg-blue-400 h-14"
          value={realContent}
          readonly="readonly"
        ></input>
      </div>

      <div className="text-center">
        <button className="border-2 border-white rounded-lg shadow-lg bg-blue-400">
          추천
        </button>
        <button className="border-2 border-white rounded-lg shadow-lg bg-red-400">
          비추천
        </button>
      </div>
    </div>
  );
};

export default Content;
