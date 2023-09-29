// setting up room model schema

import mongoose from "mongoose";

// schema for creating room

const userAuthSchema = new mongoose.Schema({
  roomname: {
    type: String,
  },
  description: {
    type: String,
  },
  admin: {
    type: String,
  },
  users: [
    {
      username: String,
      roomId: Number,
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

const room = mongoose.model("rooms", userAuthSchema);

export default room;
