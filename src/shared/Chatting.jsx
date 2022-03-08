import React, { useRef } from 'react';

//local

import ChatModel from './Component/ChatModal';

const Chatting = () => {
  const handleEnter = () => {};

  return (
    <>
      <div className="absolute bottom-5 left-5">
        <button
          className="rounded-md p-3 font-semibold text-mainBlack bg-mainYellow hover:bg-pointYellow"
          onClick={handleEnter}
        >
          Chat
        </button>
      </div>
      <div className="absolute bottom-5 right-5">
        <ChatModel />
      </div>
    </>
  );
};

export default Chatting;
