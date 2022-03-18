import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import {
  XCircleIcon,
  PaperAirplaneIcon,
  UsersIcon,
} from '@heroicons/react/solid';

// local
import ChatLog from './ChatLog';
import actionMember from 'redux/action/member';
import { isMobile } from 'react-device-detect';

const url = process.env.REACT_APP_CHAT_URL;
const socket = io.connect(url);

const event = {
  connection: 'connection',
  disconnect: 'disconnect',
  joinRoom: 'join_room',
  msg: 'msg',
};

const ChatModal = ({ member, visible, handleClose }) => {
  const [msg, setMsg] = useState('');
  const [chatLogList, setChatLogList] = useState([]);
  const [peopleCount, setPeopleCount] = useState(1);

  const sendDone = (time) => {
    setChatLogList((prevChatLogList) => [
      ...prevChatLogList,
      {
        member: member.memberInfo,
        msg,
        time,
      },
    ]);
    setMsg('');
  };

  const joinDone = ({ peopleCount }) => {
    setPeopleCount((prevPeopleCount) => peopleCount);
  };

  const handleSend = () => {
    if (msg) {
      socket.emit(
        event.msg,
        { roomName: 'global', token: member.token, msg },
        sendDone
      );
    }
  };

  const handleReceive = (chatLog) => {
    setChatLogList((prevChatLogList) => [...prevChatLogList, chatLog]);
  };
  const handleReceiveJoin = ({ peopleCount }) => {
    setPeopleCount((prevPeopleCount) => peopleCount);
  };
  const handleReceiveLeave = ({ peopleCount }) => {
    setPeopleCount((prevPeopleCount) => peopleCount);
  };

  useEffect(() => {
    if (member.token) {
      socket.emit(
        event.joinRoom,
        { token: member.token, roomName: 'global' },
        joinDone
      );
      socket.on(event.msg, handleReceive);
      socket.on(event.joinRoom, handleReceiveJoin);
      socket.on(event.disconnect, handleReceiveLeave);
      return () => socket.off(event.msg, handleReceive);
    }
  }, [member]);

  return (
    <>
      <Draggable disabled={isMobile}>
        <div
          className={`${
            visible ? 'visible' : 'hidden'
          } w-full sm:w-80 rounded-md cursor-grabbing text-center ring-amber-400 bg-orange-50 text-mainBlack dark:bg-darkComponent dark:text-mainWhite`}
        >
          <div className="rounded-t-md h-10 pt-2 font-semibold bg-amber-400 w-full">
            Keeper
            <span className="px-1">
              <UsersIcon className="inline-block h-6 w-6" />
              {peopleCount}
            </span>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
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
            </form>
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