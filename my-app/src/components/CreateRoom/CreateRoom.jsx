import React, { useState } from "react";
import axios from "axios";
import "./CreateRoom.scss";

const CreateRoom = () => {
  const [inputs, setInputs] = useState({
    roomName: "",
    roomDesp: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async(e)=>{
    e.preventDefault(); // to prevent default load
    try {
       // sending room details to 'http://localhost:8800/server' (through proxy set in package.json)
       const currentUser = JSON.parse(localStorage.getItem("currentUser"));

       const roomDetails = {
        roomName : inputs.roomName,
        roomdesp : inputs.roomDesp,
        username : currentUser.username
       }
       
       await axios.post("/room/newroom", roomDetails)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="createRoomContainer">
      <div className="createRoomHead">Create a New Room</div>
      <div className="createRoomForm">
        <form>
          <input
            type="text"
            placeholder="Enter your room name"
            onChange={handleChange}
            name="roomName"
            required
          ></input>

          <textarea
            name="roomDesp"
            id=""
            cols="30"
            rows="5"
            onChange={handleChange}
            placeholder="Enter your room description"
          ></textarea>
          <button onClick={handleSubmit} type="submit">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
