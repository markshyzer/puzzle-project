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
    //console.log(io.sockets.adapter.rooms.get(roomId).size)
    let playerCount = socket.adapter.rooms.get(roomId);
    //possible issue -> quick solution
    //console.log(data.roomId.roomId);
    let check = false // meaining scatter
    if(playerCount){//error somewhere if playerCount is not valid, skip this
      check = (playerCount.size > 1);//true is when you dont need  to scatter
    }
    console.log(check);
    console.log("init",roomId);
    //puzzle already created.
    io.in(roomId).emit("init", check);
});

  socket.on("newPlayer", (data)=>{
    //socket.broadcast.emit("newPlayerFound")
    console.log("new player", roomId);
    socket.to(roomId).emit("newPlayerFound")
    //sends out signal except myself
  })

  socket.on("fullPuzzle", (data) => {
    console.log("full puzzle", roomId);
    io.in(roomId).emit("fullPuzzleRecieve", data)
  })
  
  socket.on("pushState", (data) => {
    socket.to(roomId).emit("callState",data);

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
