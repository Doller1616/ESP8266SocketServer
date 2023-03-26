const socketIO = require('socket.io')
let io;

function setupSocketServer(server) {
  io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');
        socket.on('disconnect',()=> {
        console.log('user disconnected');
    });

    socket.on('message', (msg)=> {
      console.log("message: ", msg);
      io.emit('message', `I got your message "${msg}"`);
    });

   timeout();
  });
}

function timeout(){
    setTimeout(()=>{
        io.emit('reply', "A Message from server");
        timeout();
    }, 5000);
}

console.log('Socket Server Started: ws://localhost:3000')
module.exports = setupSocketServer;