const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

require('dotenv').config();
require('./config/database');


app.use(logger('dev'));
app.use(express.json());
app.use(require('cors')())
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/images', require('./routes/api/images'))
// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work 
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;


var server = require("http").createServer(app);

// app.listen(port, function() {
//   console.log(`Express app is running on port ${port}`)
// });


const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});


// var server = require('http').createServer(app)
// const io = require("socket.io")(server)

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
// const PORT = 4000;
let roomList = []
io.on("connection", (socket) => {
  console.log("CONNECTION!", port)
  socket.on("roomList", () => {
    roomList.filter((room)=>{
      return (room)
    })
    socket.emit("roomListReceived",roomList)
  })

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);//creates a room if it doesnt exist or you join a previously created room
  if(!roomList.includes(roomId) && roomId !== undefined){
    roomList.push(roomId)
  }
  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });
  
  //Listen for Init
  socket.on("init", (data)=>{
    //pass down puzzle pieces data
    //console.log(io.sockets.adapter.rooms.get(roomId).size)
    let playerCount = socket.adapter.rooms.get(roomId);
    //possible issue -> quick solution
    //console.log(data.roomId.roomId);
    let check = false // meaining scatter
    if(playerCount){//error somewhere if playerCount is not valid, skip this
      check = (playerCount.size > 1);//true is when you dont need  to scatter
    }
    //puzzle already created.
    io.in(roomId).emit("init", check);
  });

  socket.on("newPlayer", (data)=>{
    //socket.broadcast.emit("newPlayerFound")
    socket.to(roomId).emit("newPlayerFound")
    //sends out signal except myself
  })

  socket.on("fullPuzzle", (data) => {
    io.in(roomId).emit("fullPuzzleRecieve", data)
  })
  
  socket.on("pushState", (data) => {
    socket.to(roomId).emit("callState",data);

    // //pass data from server side - > client side(to sync state)
    // //this has to be the newest state data.
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
    roomList = roomList.filter((room) =>{
      return room != roomId
    })
  });
});

// server.listen(port, () => {
//   console.log(`Socket listening on port ${port}`);
// });

server.listen(port, () => {
  console.log(`Socket listening on port ${port}`);
});