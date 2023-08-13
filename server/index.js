// imported modules
const express = require("express"); //express
const http = require("http"); //http module for creating socket.io server
const { Server } = require("socket.io"); //socket.io
const cors = require("cors"); //cors
const { Socket } = require("dgram");
// creating the server
const app = express();
app.use(cors());

const server = http.createServer(app);
//io server variable
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
//starting io server
const users = new Map();
let mainData = {};
io.on("connection", (socket) => {
  // console.log(`User Connected : ${socket.id}`);
  socket.on("user-joined", (data) => {
    users.set(data.username, socket.id);
    console.log(`User ${socket.id} (${data.username}) joined`);
    
    mainData = {
      position: "center",
      username: data.username,
      msg: "joined",
    };
    
    // io.to(room).emit("recive", mainData);
    socket.broadcast.emit("recive", mainData);
  });
  socket.on("send_message", (data) => {
    const recipientSocketId = users.get(data.room);
    
    mainData = {
      position: "recived",
      
      username: data.username,
      msg: data.message,
    };
    // if (recipientSocketId) {
      console.log(recipientSocketId)
      // Emit the private message to the recipient's socket
      io.to(recipientSocketId).emit('recive', mainData);
    // }
    // socket.join(room)
  //  console.log(users)
  //   socket.broadcast.emit("recive", mainData);
    // io.to(room).emit("recive", mainData);
  });
});
server.listen(3005, () => {
  console.log("server started");
});
