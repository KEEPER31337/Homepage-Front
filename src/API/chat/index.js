import clientSocket from 'socket.io-client';

const url = process.env.REACT_APP_CHAT_URL;
const socket = clientSocket(url);

const event = {
  connection: 'connection',
  joinRoom: 'join_room',
  msg: 'msg',
};

socket.on(event.msg, ({ userName, msg }) => {
  console.log(userName, msg);
  alert(msg);
});

const joinGlobal = () => {
  socket.emit(event.joinRoom, { roomName: 'global' });
};
const sendMsgGlobal = ({ token, msg, done }) => {
  console.log(done);
  socket.emit(event.msg, { roomName: 'global', token, msg }, done);
};

const joinRoom = ({ roomName }) => {
  socket.emit(event.joinRoom, { roomName });
};
const sendMsg = ({ roomName, token, msg }) => {
  socket.emit(event.msg, { roomName, msg });
};

export { socket, event };
export default { joinGlobal, sendMsgGlobal, joinRoom, sendMsg };
