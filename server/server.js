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
    //If room has not been created yet
    if(!(message.room in RoomList)){
      //Create room, and add user to room
      RoomList[message.room] = [new User(message.user, socket, message.image), null];
      //Tell user room has been created, and to wait for another user to join
      socket.emit("joinRoom", JSON.stringify({success: "created"}));
      console.log(`User ${message.user} created Room ${message.room}`);
    }
    //If user has already joined room
    else if(message.user === RoomList[message.room][0].user){
      //Tell user they need to wait
      socket.emit('error', JSON.stringify({error: "You already joined the room, wait for another player"}));
      console.log(`User ${message.user} tried to join room ${message.room}, but was already in it`);
    } 
    //If there is room for another user in the room
    else if(RoomList[message.room][1] == null){
      //Send first users profile to second user
      socket.emit('cat', JSON.stringify({image: RoomList[message.room][0].image}));
      //Add user to room
      RoomList[message.room][1] = new User(message.user, socket);
      //Tell user they have been added successfully
      socket.emit("joinRoom", JSON.stringify({success: "joined"}));
      //Tell first user that a user has joined
      RoomList[message.room][0].socket.emit("joinRoom", JSON.stringify({success: "joined"}));
      //Send first user second users profile
      RoomList[message.room][0].socket.emit('cat', JSON.stringify({image: message.image}));
      console.log(`User ${message.user} joined Room ${message.room}`);
    }
    //Something has gone horribly wrong 
    else {
      socket.emit("error", JSON.stringify({error: "Room is full sorry :("}));
      console.log(`User ${message.user} failed to join Room ${message.room} (Room was full)`);
    }
  });

  socket.on('cat', (data) => {
    let message = JSON.parse(data);
    //If Room exists
    if(message.room && message.room in RoomList){
      //If user is first user in room and there is a second user
      if(message.user === RoomList[message.room][0].user && RoomList[message.room][1] != null){
        //Set users profile to new profile
        RoomList[message.room][0].image = message.image;
        //Send other user their new profile
        RoomList[message.room][1].socket.emit('cat', JSON.stringify({image: message.image}));
        console.log(`User ${message.user} changed their profile, propagating to ${RoomList[message.room][1].user}`);
      }
      //If user is second user in the room
      else if(RoomList[message.room][1] != null && message.user === RoomList[message.room][1].user){
        //Set users profile to new profile
        RoomList[message.room][1].image = message.image;
        //Send other user the new profile
        RoomList[message.room][0].socket.emit('cat', JSON.stringify({image: message.image}));
        console.log(`User ${message.user} changed their profile, propagating to ${RoomList[message.room][0].user}`);
      }
    }
  })

  socket.on('move', (data) => {
    let message = JSON.parse(data);
    //If Room exists and has at least one user in it
    if(RoomList[message.room] && RoomList[message.room][1] != null){
      let room = RoomList[message.room];
      //If user is first user in room
      if(message.user === room[0].user){
        //Send second user the move
        room[1].socket.emit("move", JSON.stringify({from: message.from, to: message.to}));
        console.log(`User ${message.user} moved from ${message.to} tp ${message.from}. Propagating to ${room[1].user}`);
      }
      //If user is second user in room 
      else if (message.user === room[1].user){
        //Send first user the move
        room[0].socket.emit("move", JSON.stringify({from: message.from, to: message.to}));
        console.log(`User ${message.user} moved from ${message.to} tp ${message.from}. Propagating to ${room[0].user}`);
      }
      //Something has gone horribly wrong 
      else {
        socket.emit("error", JSON.stringify({error: "User is not in specified room!"}));
        console.log(`User ${message.user} is not in Room ${message.room}`);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  })
  
});

server.listen(3001, () => {
  console.log('listening on *:3000');
});