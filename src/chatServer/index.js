const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const cors = require('cors');
const dayjs = require('dayjs');
// local
const authAPI = require('./authAPI');

const PORT = 3002;
const timeFormat = 'YYYY-MM-DD hh:mm:ss';

const event = {
  connection: 'connection',
  joinRoom: 'join_room',
  msg: 'msg',
};

const app = express();
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

wsServer.on(event.connection, (socket) => {
  console.log('socketID:', socket.id);
  socket.on(event.joinRoom, ({ token, roomName }) => {
    authAPI.getAuth({ token }).then((data) => {
      if (data.success) socket.join(roomName);
    });
  });

  socket.on(event.msg, ({ roomName, token, msg }, done) => {
    const time = dayjs().format(timeFormat);
    authAPI.getAuth({ token }).then((data) => {
      if (data.success && msg) {
        socket.to(roomName).emit(event.msg, {
          member: data.data,
          msg,
          time,
        });
        done(time);
      }
    });
  });
});

const handleListen = () => console.log(`Listening on ${PORT}`);
httpServer.listen(PORT, handleListen);
