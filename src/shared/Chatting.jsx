import React, { useRef, useState } from 'react';
import { ChatIcon } from '@heroicons/react/solid';

//local
import ChatModel from './Component/ChatModal';

const Chatting = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-5 right-5">
        <button
          className={`${
            open ? 'invisible' : 'visible'
          } rounded-md px-5 py-1 font-semibold text-mainBlack bg-mainYellow hover:bg-pointYellow`}
          onClick={handleOpen}
        >
          <ChatIcon className="h-8 w-8" />
          Chat
        </button>
      </div>
      <div className="fixed bottom-20 right-5">
        <ChatModel visible={open} handleClose={handleClose} />
      </div>
    </>
  );
};

export default Chatting;
