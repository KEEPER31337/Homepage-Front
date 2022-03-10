import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { XCircleIcon, PaperAirplaneIcon } from '@heroicons/react/solid';

// local
import ChatLog from './ChatLog';
import actionMember from 'redux/action/member';
import { isMobile } from 'react-device-detect';

const url = process.env.REACT_APP_CHAT_URL;
const socket = io.connect(url);

const event = {
  connection: 'connection',
  joinRoom: 'join_room',
  msg: 'msg',
};

const ChatModal = ({ member, visible, handleClose }) => {
  const [msg, setMsg] = useState('');
  const [chatLogList, setChatLogList] = useState([]);

  const sendDone = (time) => {
    setChatLogList((prevChatLogList) => [
      ...prevChatLogList,
      {
        userName: 'You',
        profileImage:
          'https://avatars.githubusercontent.com/u/23546441?s=400&u=db7abf2929e5518c12189034dc3fed9bda94f0a6&v=4',
        msg,
        time,
      },
    ]);
    setMsg('');
  };

  const handleSend = () => {
    socket.emit(
      event.msg,
      { roomName: 'global', token: member.token, msg },
      sendDone
    );
  };

  const handleReceive = (chatLog) => {
    setChatLogList((prevChatLogList) => [...prevChatLogList, chatLog]);
  };
  useEffect(() => {
    socket.emit(event.joinRoom, { roomName: 'global' });
    socket.on(event.msg, handleReceive);
    return () => socket.off(event.msg, handleReceive);
  }, []);

  return (
    <>
      <Draggable disabled={isMobile}>
        <div
          className={`${
            visible ? 'visible' : 'invisible'
          } w-full sm:w-80 rounded-md cursor-grabbing text-center ring-amber-400 bg-amber-50 text-mainBlack dark:bg-darkComponent dark:text-mainWhite`}
        >
          <div className="rounded-t-md h-10 pt-2 font-semibold bg-amber-400 w-full">
            Keeper
            <button
              className="absolute right-1 top-1 bg-mainYellow text-white hover:text-pointYellow"
              onClick={handleClose}
            >
              <XCircleIcon className="inline-block h-8 w-8" />
            </button>
          </div>
          <div className="pb-2">
            <ChatLog chatLogList={chatLogList} />
          </div>
          <div className="py-2 px-5">
            <input
              className="w-4/5 p-2 rounded-md text-black"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button
              className="mx-1 p-1 font-bold border-2 border-amber-400 rounded-md text-white bg-mainYellow hover:bg-pointYellow"
              onClick={handleSend}
            >
              <PaperAirplaneIcon className="inline-block h-8 w-8" />
            </button>
          </div>
        </div>
      </Draggable>
    </>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    signOut: () => {
      dispatch(actionMember.signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatModal);
