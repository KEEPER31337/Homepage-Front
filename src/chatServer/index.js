const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const cors = require('cors');

const PORT = 3002;

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
  socket.on(event.joinRoom, ({ roomName }) => {
    socket.join(roomName);
    console.log(socket.rooms);
  });

  socket.on(event.msg, ({ roomName, msg }, done) => {
    console.log(roomName, msg, socket.rooms);
    socket.to(roomName).emit(event.msg, { userName: 'anony', msg });
    done();
  });
});

const handleListen = () => console.log(`Listening on ${PORT}`);
httpServer.listen(PORT, handleListen);
