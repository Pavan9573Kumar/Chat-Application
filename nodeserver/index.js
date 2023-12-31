// node server which will handle socket io connections

const io = require('socket.io')(8000)
const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined', name=>{
        //If any new user joins, let other users connected to the server know! 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    // If someone sends a message, then brodcast it to all other people
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name: users[socket.id]})
    });
    // If someone leave the chat app , let others know
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete(users[socket.id]);
    });
})