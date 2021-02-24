const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work 
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});


const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const PORT = 4000;
io.on("connection", (socket) => {

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);//creates a room if it doesnt exist or you join a previously created room
  
  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });
  
  //Listen for Init
  socket.on("init", (data)=>{
    //pass down puzzle pieces data
    let playerCount = socket.adapter.rooms.get(data.roomId.roomId);
    let check = (playerCount.size > 1);
    //puzzle already created.
    io.in(roomId).emit("init", check);
});

  socket.on("newPlayer", (data)=>{
    socket.broadcast.emit("newPlayerFound")
  })

  socket.on("fullPuzzle", (data) => {
    io.in(roomId).emit("fullPuzzleRecieve", data)
  })
  
  socket.on("pushState", (data) => {
    io.in(roomId).emit("callState",data);
    // //pass data from server side - > client side(to sync state)
    // //this has to be the newest state data.
  });
  //Listen for Update(drag)
//   socket.on("update", (data)=>{
//     ///pass down puzzle pieces(moving)
//     io.in(roomId).emit("update", data);
// });

//update every 0.1s no matter what(no event)

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });

  //probably do draggable event here
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
