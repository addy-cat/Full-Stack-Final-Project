const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const User = require('./User.js');

const RoomList = {}

app.use(express.static(path.join(__dirname, '/../build')));

io.on('connection', (socket) => {
  console.log('a user connected');
  //handle incoming requests
  socket.on("message", (data) => {
    let message = JSON.parse(data);
    console.log(message);
    //message = {'username':'', 'room':'', 'requestType':''}
    //If request is for a new room  
    switch(message.requestType){
      case "joinRoom":
        if(!(message.room in RoomList)){
          RoomList[message.room] = [new User(message.user, socket), null];
          socket.emit("message", JSON.stringify({success: "created"}));
          console.log("created");
        } else if(message.room in RoomList && RoomList[message.room][1] == null){
          RoomList[message.room][1] = new User(message.user, socket);
          socket.emit("message", JSON.stringify({success: "joined"}));
          RoomList[message.room][0].socket.emit("message", JSON.stringify({success: "joined"}));
          console.log("joined");
        } else {
          socket.emit("message", JSON.stringify({error: "Room is full sorry :("}));
          console.log("Room is full sorry :(");
        }
        break;
      case "move":
        let room = RoomList[message.room];
        if(message.user === room[0].user){
          room[1].socket.emit("move", JSON.stringify({from: message.from, to: message.to}));
        } else if (message.user === room[1].user){
          room[0].socket.emit("move", JSON.stringify({from: message.from, to: message.to}));
        } else {
          socket.emit("message", JSON.stringify({error: "User is not in specified room!"}));
          console.log("User is not in specified room!");
        }
        break;
      default:
        socket.emit("message", JSON.stringify({error: "Invalid message type"}));
        console.log("Invalid message type");
    }
  });

  socket.on("disconnect", () => {
    console.log("AWWWWWWW :(");
  })
  
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});