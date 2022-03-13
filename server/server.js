const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://192.168.254.27:3000"
  }
});
const path = require('path');
const User = require('./User.js');

const RoomList = {}

//app.use(express.static(path.join(__dirname, '/../build')));

io.on('connection', (socket) => {
  console.log('a user connected');
  //handle incoming requests

  socket.on("error", (data) => {
    let message = JSON.parse(data);
    console.log(`Error: ${message.error}`);
  });

  socket.on('joinRoom', (data) => {
    let message = JSON.parse(data);
    if(!(message.room in RoomList)){
      RoomList[message.room] = [new User(message.user, socket), null];
      socket.emit("joinRoom", JSON.stringify({success: "created"}));
      console.log(`User ${message.user} created Room ${message.room}`);
    } else if(message.room in RoomList && RoomList[message.room][1] == null){
      RoomList[message.room][1] = new User(message.user, socket);
      socket.emit("joinRoom", JSON.stringify({success: "joined"}));
      RoomList[message.room][0].socket.emit("joinRoom", JSON.stringify({success: "joined"}));
      console.log(`User ${message.user} joined Room ${message.room}`);
    } else {
      socket.emit("error", JSON.stringify({error: "Room is full sorry :("}));
      console.log(`User ${message.user} failed to join Room ${message.room} (Room was full)`);
    }
  });

  socket.on('cat', (data) => {
    let message = JSON.parse(data);
    if(message.room && message.room in RoomList){
      if(message.user === RoomList[message.room][0].user){
        RoomList[message.room][1].socket.emit('cat', JSON.stringify({image: message.image}));
        console.log(`User ${message.user} changed their profile, propagating to ${RoomList[message.room][1].user}`);
      }
      else if(message.user === RoomList[message.room][1].user){
        RoomList[message.room][0].socket.emit('cat', JSON.stringify({image: message.image}));
        console.log(`User ${message.user} changed their profile, propagating to ${RoomList[message.room][0].user}`);
      }
    }
  })

  socket.on('move', (data) => {
    let message = JSON.parse(data);
    let room = RoomList[message.room];
    if(message.user === room[0].user){
      room[1].socket.emit("move", JSON.stringify({from: message.from, to: message.to}));
      console.log(`User ${message.user} moved from ${message.to} tp ${message.from}. Propagating to ${room[1].user}`);
    } else if (message.user === room[1].user){
      room[0].socket.emit("move", JSON.stringify({from: message.from, to: message.to}));
      console.log(`User ${message.user} moved from ${message.to} tp ${message.from}. Propagating to ${room[0].user}`);
    } else {
      socket.emit("error", JSON.stringify({error: "User is not in specified room!"}));
      console.log(`User ${message.user} is not in Room ${message.room}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  })
  
});

server.listen(3001, () => {
  console.log('listening on *:3000');
});