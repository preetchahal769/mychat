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
    users.set(data.username, data.roomName);
    
    socket.join(data.roomName);
    mainData = {
      position: "center",
      username: data.username,
      msg: "joined",
    };

    // io.to(room).emit("recive", mainData);
    socket.to(data.roomName).emit("recive", mainData);
  });
  socket.on("send_message", (data) => {
    const roomName = users.get(data.username);
    socket.join(roomName);
    mainData = {
      position: "recived",
      
      username: data.username,
      msg: data.message,
    };
    if (roomName) {
      console.log(users);
    // Emit the private message to the recipient's socket
    socket.to(roomName).emit("recive", mainData);
    }
  });
});
server.listen(3005, () => {
  console.log("server started");
});
