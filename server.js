const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...');

    // Welcome current user
    socket.emit('message', 'Welcome to ChatCord')

    // Broadcast when a user connects all exapt connected user
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Run when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        console.log(msg);
       io.emit('message', msg);
    })


    // All client
    //io.emit();
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));