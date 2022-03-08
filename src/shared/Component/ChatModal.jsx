import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// local
import ChatLog from './ChatLog';

const url = process.env.REACT_APP_CHAT_URL;
const socket = io.connect(url);

const event = {
  connection: 'connection',
  joinRoom: 'join_room',
  msg: 'msg',
};

const ChatModal = ({ token }) => {
  const [msg, setMsg] = useState('');
  const [chatLogList, setChatLogList] = useState([]);

  const sendDone = () => {
    setChatLogList((prevChatLogList) => [
      ...prevChatLogList,
      {
        name: 'Me',
        imageUrl:
          'https://avatars.githubusercontent.com/u/23546441?s=400&u=db7abf2929e5518c12189034dc3fed9bda94f0a6&v=4',
        msg,
        time: 'now',
      },
    ]);
    setMsg('');
  };

  const handleSend = () => {
    socket.emit(event.msg, { roomName: 'global', token, msg }, sendDone);
  };

  const handleReceive = ({ userName, msg }) => {
    setChatLogList((prevChatLogList) => [
      ...prevChatLogList,
      {
        name: userName,
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
        msg: msg,
        time: 'now',
      },
    ]);
  };
  useEffect(() => {
    socket.emit(event.joinRoom, { roomName: 'global' });
    socket.on(event.msg, handleReceive);
  }, []);

  return (
    <>
      <div className="rounded-md text-center h-96 overflow-y-scroll ring-amber-400 bg-amber-50 text-mainBlack dark:bg-darkComponent dark:text-mainWhite">
        <div className="bg-amber-400 w-full px-5">Keeper</div>
        <div className="pb-2 px-5">
          <ChatLog chatLogList={chatLogList} />
        </div>
        <div className="py-2 px-5">
          <input
            className="w-4/5 p-2 text-black"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className="w-1/5 py-2 font-bold border-2 border-amber-400 rounded-md text-amber-900 bg-amber-100 hover:bg-amber-200"
            onClick={handleSend}
          >
            전송
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatModal;
