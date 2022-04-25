import { useState, useEffect, useRef } from 'react';
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
import MemberModal from './MemberModal';

const url = process.env.REACT_APP_CHAT_URL;
const socket = io.connect(url);

const event = {
  auth: 'auth',
  connection: 'connection',
  joinRoom: 'join_room',
  leaveRoom: 'leave_room',
  msg: 'msg',
};

const ChatModal = ({ member, visible, handleClose }) => {
  // TODO : use memo (채팅 입력할 때 다른 state 렌더링하지 않도록)
  const [msg, setMsg] = useState('');
  const [chatLogList, setChatLogList] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);

  const memberModalRef = useRef({});

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

  const handleSend = () => {
    if (msg) {
      socket.emit(
        event.msg,
        { roomName: 'global', token: member.token, msg },
        sendDone
      );
    }
  };

  const joinDone = ({ activeMembers, chatLogs }) => {
    setActiveMembers((prev) => activeMembers);
    setChatLogList((prev) => chatLogs);
  };
  const authDone = () => {
    socket.emit(
      event.joinRoom,
      { token: member.token, roomName: 'global' },
      joinDone
    );
  };

  const handleReceive = (chatLog) => {
    setChatLogList((prevChatLogList) => [...prevChatLogList, chatLog]);
  };
  const handleReceiveJoin = ({ newMember }) => {
    setActiveMembers((prev) => [...prev, newMember]);
  };
  const handleReceiveLeave = ({ leaveMember }) => {
    setActiveMembers((prev) =>
      prev.filter((member) => member.id !== leaveMember.id)
    );
  };

  useEffect(() => {
    if (member.token) {
      socket.emit(event.auth, { token: member.token }, authDone);
      socket.on(event.msg, handleReceive);
      socket.on(event.joinRoom, handleReceiveJoin);
      socket.on(event.leaveRoom, handleReceiveLeave);
      return () => {
        socket.off(event.msg, handleReceive);
        socket.off(event.joinRoom, handleReceiveJoin);
      };
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
          <div className="rounded-t-md h-10 pt-2 font-semibold w-full bg-mainYellow dark:bg-darkPoint">
            <span className="absolute left-1 top-2 px-1">
              <UsersIcon
                className="inline-block h-6 w-6 rounded-full text-mainYellow bg-white hover:bg-pointYellow "
                onClick={() => {
                  memberModalRef.current.open();
                }}
              />
            </span>
            Keeper
            <button
              className="absolute right-1 top-1 bg-mainYellow dark:bg-darkPoint text-white hover:text-pointYellow"
              onClick={handleClose}
            >
              <XCircleIcon className="inline-block h-8 w-8 " />
            </button>
          </div>
          <div className="pb-2">
            <ChatLog chatLogList={chatLogList} visible={visible} />
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
      <MemberModal people={activeMembers} ref={memberModalRef} />
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
