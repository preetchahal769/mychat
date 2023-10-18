// setting up room model schema

import mongoose from "mongoose";

// schema for creating room

const roomAuthSchema = new mongoose.Schema({
  roomname: {
    type: String,
  },
  description: {
    type: String,
  },
  roomID:{
    type : String,
    unique : true,
  },
  admin: {
    type: String,
  },
  users: [
    {
      username: String,
      userroomId: {
        type: String,
        unique: true, // Ensures roomId values are unique
      },
      position: String,
    },
  ],
  messages: [
    {
      username: String,
      messageText: String,
      timeStamp: String,
    },
  ],
});

// creating a mongoose model/mongodb collection named 'room' to store our rooms details

const room = mongoose.model("rooms", roomAuthSchema);

export default room;
