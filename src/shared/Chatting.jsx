import React, { useRef, useState, useEffect } from 'react';
import { ChatIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';

//local
import ChatModal from './Component/ChatModal';
import authAPI from 'API/v1/auth';

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
