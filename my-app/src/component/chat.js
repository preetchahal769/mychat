import React, { useState } from "react";
import ReactDOM from "react-dom";
import Msg from "./msg.js";
import "../css/scrollbar.css";
import io from "socket.io-client";
import Login from "./login";
const socket = io.connect("http://localhost:3005");
const { useEffect } = require("react");

function Chat() {
  let textValue = "";
  let user ;
  let room;
  

  let srno;
  let recivedChat;
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Perform some action when Enter key is pressed
      sendMessage(event);
    }
  };
  const setTextValue = () => {
    const element = document.querySelector(".textBox");
    if (element) {
      ReactDOM.findDOMNode(element).value = "";
    }
  };
  // stylesheet variables
  const chatbox = {
    height: "70vh",
    width: "60%",
    marginLeft: "20%",
    marginTop: "5%",
  };
  const textbox = {
    textDecoration: "none",
    width: "80%",
    marginLeft: " 7%",
  };
  const msgBox = {
    height: "66vh",
    width: "100%",
    overflowY: "scroll",
  };
  const sendButton = {
    marginLeft: "3%",
    position: "relative",
  };
  const buttonImg = {
    height: "2vh",
  };
  // chat array {
  const [chat, setChat] = useState([]);

  // }
  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  if (!storedUserData) {
    alert('no user defined')
  } else {
    user = storedUserData.username;
    room = storedUserData.roomName;
    // console.log(user);
  }
  // function to send msg 
  const sendMessage = (e) => {
    if (!textValue) {
      e.preventDefault();
      alert("empty");
    } else {
      e.preventDefault();
      // create a new chat Object
      if (chat.length === 0) {
        srno = 0;
      } else {
        srno = chat.length - 1 + 1;
      }
      let currentChat = {
        sr_no: srno,
        username: user,
        roomName:room,
        msg: textValue,
        position: "sent",
      };
      setChat([...chat, currentChat]);

      console.log(chat);

      socket.emit("send_message", {
        sr_no: currentChat.sr_no,
        username: currentChat.username,
        message: currentChat.msg,
        room:currentChat.roomName
      });

      setTextValue();
    }
  };
  // reciving msg 
  useEffect(() => {
    socket.on("recive", (data) => {
      console.log('recived',data)
      srno = chat.length - 1 + 1;
      recivedChat = {
        sr_no: srno,
        username: data.username,
        msg: data.msg,
        position: data.position,
      };
      setChat([...chat, recivedChat]);
    });
  });
  // }

  if (!storedUserData) {
    return <Login user={user} />;
  } else {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Navbar
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div style={chatbox}>
          <div>
            <div style={msgBox} className="chatBox">
              {
                chat.map((e) => {
                  console.log(e);
                  return (
                    <Msg
                      key={e.sr_no}
                      username={e.username}
                      msg={e.msg}
                      position={e.position}
                    />
                  );
                })

               
              }
            </div>
            <div>
              <input
                onKeyDown={handleKeyPress}
                className="textBox"
                type="text"
                style={textbox}
                placeholder="Type your message..."
                onChange={(e) => {
                  textValue = e.target.value;
                  console.log(textValue);
                }}
              />
              <button onClick={sendMessage} style={sendButton}>
                <img src="/images/send.png" alt="send" style={buttonImg} />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Chat;
