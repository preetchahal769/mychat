import React from "react";

export default function msg(props) {
  const leftText = {
    borderRadius: "10px",
    backgroundColor: "#ECE6E6",
    width: "24%",
    padding: "1%",
    wordWrap: "break-word",
    float: "left",
    clear: "both",
    marginTop: "1%",
  };

  const rightText = {
    borderRadius: "10px",
    backgroundColor: "#ECE6E6",
    width: "24%",
    padding: "1%",
    wordWrap: "break-word",
    float: "right",
    clear: "both",
    marginTop: "1%",
  };
  const centerText = {
    clear: "both",

    textAlign: "center",
    padding: "1%",
    wordWrap: "break-word",

    marginleft: "auto",
    marginRight: "auto",
    marginTop: "1%",
  };
  if (props.position === "recived") {
    return (
      <div>
        <div key={props.sr_no} style={leftText}>
          {props.username + ":" + props.msg}
        </div>
      </div>
    );
  } else if (props.position === "center") {
    return (
      <div key={props.sr_no} style={centerText}>
        {props.username + "  joined the chat"}
      </div>
    );
  } else {
    return (
      <div>
        <div key={props.sr_no} style={rightText}>
          {"you :" + props.msg}
        </div>
      </div>
    );
  }
}
