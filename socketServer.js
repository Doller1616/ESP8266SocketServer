const { server } = require('./index');
const io = require('socket.io')(server);

// ws://localhost:3000
io.on('connection', (socket) => { 
    
    socket.on('disconnect',()=> {
        console.log('user disconnected');
    });

    socket.on('message', (msg)=> {
      console.log("message: ", msg);
    });

   timeout();
});

function timeout(){
    setTimeout(()=>{
        io.emit('reply', "A Message from server");
        timeout();
    }, 5000);
}
