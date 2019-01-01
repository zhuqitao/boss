const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

const app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    // console.log('user login');
    socket.on('sendmsg',data=> {
        console.log(data);
        io.emit('recvmsg', data);
    })
})
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(8888);

