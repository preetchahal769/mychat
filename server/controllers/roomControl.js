// setting up  protocols for creating a room and other room realted action

import room from "../models/roomSchema.js";
import userAuth from "../models/userAuthSchema.js"
import { v4 as uuidv4 } from "uuid"; // Import the UUID library
// defining a protocol for creating a new room

export const createRoom = async (req, res) => {

  // function to create room document
 
  try {
    const { roomName, roomdesp, username ,message } = req.body;
    
    if (!roomName) {
      // if roomName is empty
      // console.log("stage1");
      return res.status(409).json("Name can't be empty !");
    } else {
      // db query to check if roomname already exists or not
      const rNameExist = await room.findOne({ roomName });
      // console.log("stage2" ,rNameExist);
      if (rNameExist) {
        // if Room already exists
        // console.log("stage3");
        return res.status(409).json("Room already exists !");
      } else {
        if (!roomdesp) {
          // console.log("stage4");
          // if room description is empty
          return res.status(409).json("Name can't be empty !");
        } else {
          // console.log("stage5");
        
          const adminExist = await userAuth.findOne({username });
          if (!adminExist) {
            // cherk that the admin user exist or not
            // console.log("stage6",admin);
            return res.status(409).json("admin user doesn't exists !");
          } else {
            console.log("stage7");
            // count the no of documentin collection to crate a id for room 
            const count = await room.countDocuments();
            console.log('count : ',count);
         
            const roomID = uuidv4();
            const userRoomID = uuidv4();
            const adminUser = {
              username : username ,
             userroomId:userRoomID,
              position:"admin"
            }
            // new room details 
            const newRoom = new room({
              roomname : roomName,
              roomID : roomID,
              description : roomdesp,
              admin : username,
              users :[adminUser],
              message
            });

            // saving the newroom to the database collection named 'room'

            await newRoom.save();
            res.status(201).json({ message: "Room created successfully" });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error while signing up:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating a room" });
  }
};

// defining a protocol for deleting a room

export const removeRoom = async (res, req) => {
  try {
    const { roomName, admin } = req.body;
    if (!roomName) {
      // if roomName is empty
      return res.status(409).json("Name can't be empty !");
    } else {
      const rNameExist = await room.findOne({ roomName });
      if (!rNameExist) {
        // if Room doesn't exists
        return res.status(409).json("Room didn't exists !");
      } else {
        if (rNameExist.admin != admin) {
          return res
            .status(409)
            .json("This service is only aviable for room admin");
        } else {
          await room.deleteOne({ roomName });

          res.status(200).json({ message: "Room deleted successfully" });
        }
      }
    }
  } catch (error) {
    console.error("Error while deleting room:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the room" });
  }
};

// defining a protocol for getting user's list in a room

export const userList = async (req, res) => {
  try {
    const { roomName, userName } = req.body;
    if (!roomName) {
      res.status(409).json("Room didn't exist ");
    } else {
      const rNameExist = await room.findOne({ roomName });
      if (!rNameExist) {
        // if Room doesn't exists
        return res.status(409).json("Room didn't exists !");
      } else {
        const uNameExist = rNameExist.users.find(
          (user) => user.username === userName
        );
        if (!uNameExist) {
          res.status(409).json("you have to join the room to see participants");
        } else {
          res.status(200).json(rNameExist.users);
        }
      }
    }
  } catch (error) {
    console.error("Error while fetchuing users:", error);
    res
      .status(500)
      .json({ message: "An error occurred whilefetching the users list" });
  }
};

// defining a protocol for letting a user join a room

export const joinRoom = async (req, res) => {
  try {
    const { username, roomName, roomId } = req.body;
    if (!username) {
      res.status(409).json("user cant be empty");
    } else {
      // db query to check if a user with given username  exists or not

      const userExists = await userAuth.findOne({ username });
      if (!userExists) {
        res.status(409).json("user doesn,t exist");
      } else {
        const userRoomID = uuidv4();
        const newuser = {
          userName: username,
          roomId: userRoomID,
          position: `member`,
        };
        // db query to and new user in array
        room.findByIdAndUpdate(
          roomName,
          { $push: { users: newuser } },
          { new: true }, // This option returns the updated document
          (err, updatedRoom) => {
            if (err) {
              console.error("Error:", err);
              res.status(409).json("Error while joining the room");
            } else if (updatedRoom) {
              console.log("User added to room:", updatedRoom);
              res.status(200).json("room joined");
              // The updatedRoom object contains the room document with the new user added to the users array
            } else {
              console.log("Room not found.");
            }
          }
        );
      }
    }
  } catch (error) {
    res.status(500).json("Error while joining the room");
  }
};
// api for get all room list 
export const allRooms = async(req , res)=>{
  try {
    console.log('api called')
    const projection = {
      roomname: 1, 
      description: 1, 
      roomID: 1 
    };
  
    const rooms = await room.find({}, projection).exec();

    if (!rooms || rooms.length === 0) {
      console.log('No rooms found');
      return res.status(404).json('No rooms found');
    }else{

    console.log('Rooms with selected properties:', rooms);
    return res.status(200).json(rooms);}
  } catch (error) {
    console.log('Error in finding document',error);
    res.status(500).json("server error");
  }
}
