import React, { useRef, useState } from 'react';

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
      <div className="absolute bottom-5 right-5">
        <button
          className={`${
            open ? 'invisible' : 'visible'
          } rounded-md p-3 font-semibold text-mainBlack bg-mainYellow hover:bg-pointYellow`}
          onClick={handleOpen}
        >
          Chat
        </button>
      </div>
      <div className="absolute bottom-20 right-5">
        <ChatModel visible={open} handleClose={handleClose} />
      </div>
    </>
  );
};

export default Chatting;
