import React, { useRef, useState, useEffect } from 'react';
import { ChatIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import Draggable from 'react-draggable';

//local
import ChatModal from './Component/ChatModal';
import authAPI from 'API/v1/auth';
import imgChat from 'assets/img/chat.png';

const Chatting = ({ member }) => {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (member.token) {
      authAPI.getAuth({ token: member.token }).then((data) => {
        if (data.success) {
          setAuth(true);
        }
      });
    } else {
      // TODO : out from the room
      setAuth(false);
    }
  }, [member]);
  return (
    <>
      {auth ? (
        <>
          <Draggable disabled={isMobile}>
            <div
              className={`${
                isMobile
                  ? 'absolute top-5 right-20 w-8 h-8'
                  : 'fixed bottom-5 right-5'
              } z-30`}
            >
              <button
                className={`${open ? 'invisible' : 'visible'} ${
                  isMobile ? 'p-1 rounded-md' : 'p-2 rounded-full'
                } font-semibold text-mainBlack bg-mainYellow hover:bg-pointYellow`}
                onClick={handleOpen}
              >
                {isMobile ? (
                  <ChatIcon className="h-8 w-8" />
                ) : (
                  <img src={imgChat} className="w-14 h-14" />
                )}
              </button>
            </div>
          </Draggable>
          <div
            className={`fixed ${
              isMobile ? 'bottom-3 right-3' : 'bottom-20 right-5'
            }`}
          >
            <ChatModal visible={open} handleClose={handleClose} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Chatting);
