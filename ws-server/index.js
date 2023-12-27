const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer((request, response) => {
  
})
const io = new Server(server,{
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log('A user connected');

  socket.on('chat-message', (message) => {
    io.emit('chat-message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
});

io.listen(8080);