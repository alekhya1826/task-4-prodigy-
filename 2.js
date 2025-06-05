const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', (username) => {
    socket.username = username;
    socket.broadcast.emit('message', `${username} joined the chat`);
  });

  socket.on('chat', (msg) => {
    io.emit('message', `${socket.username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    io.emit('message', `${socket.username} left the chat`);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
