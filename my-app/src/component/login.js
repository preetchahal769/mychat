import React from "react";
import io from "socket.io-client";
import Chat from "./chat.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const socket = io.connect("http://localhost:3005");
export default function login() {
  let user = "";
  let roomId = "";

  let srno;
  const buttonImg = {
    height: "2vh",
  };
  const sendButton = {
    marginLeft: "3%",
    position: "relative",
  };
  const handleNavigate = () => {
    window.location.href = "./chat.js";
  };

  return (
    <>
      <Router>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
          <input
            type="text"
            placeholder="enter your name"
            onChange={(e) => {
              user = e.target.value;
            }}
          />
          <input
            type="text"
            placeholder="enter room id"
            onChange={(e) => {
              roomId = e.target.value;
            }}
          />
          <button
            onClick={() => {
              if (!user || !roomId) {
                alert("empty");
              } else {
                let userJoined = {
                  sr_no: srno,
                  username: user,
                  roomName: roomId,
                  msg: "Joined",
                  position: "center",
                };
                socket.emit("user-joined", userJoined);
                console.log(
                  localStorage.setItem("userData", JSON.stringify(userJoined))
                );
                window.location.href = "./chat.js";
                return <Chat />;
              }
            }}
            style={sendButton}
          >
            <img src="/images/send.png" alt="send" style={buttonImg} />
          </button>
        </div>
      </Router>
    </>
  );
}
