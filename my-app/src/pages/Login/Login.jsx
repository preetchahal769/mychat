import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.scss";

import applogo from "../../assets/icons/mychat.png";

const Login = () => {
  //    Varible to store the data user iput feild data
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  //   Function to handle change and store feild data to data variable
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevObject) => ({
      ...prevObject,
      [name]: value,
    }));
  };
  // function to handle the submit event when user click on submit button;
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!data.userName || !data.password ) {
    alert("value should not be empty");
  } else if (data.userName.length <= 3 || data.userName.length >= 20) {
    alert("name max char is 20 and min char is 3");
  }  else if (data.password.length <= 5 || data.password.length >= 60) {
    alert("pass max char is 60 and min char is 5");
  }  else {
    try { 
      // request to the server 
      console.log("data in name ", data.Name);
      const response = await axios.post("http://localhost:3005/confirmUser", data);
// repose from the server 
      alert(JSON.stringify(response.data.message));
    } catch (error) {
      alert( error);
    }
  }
  // Perform any additional validations or processing here
  console.log("Submitted object:", data);
};  
  return (
    <div className="loginContainer">
      <div className="loginBox" id="lgbx">
        {/* dividing login box into two halves - left and right*/}

        <div className="boxLeft">
          <div className="welcomeText">
            Where Conversations Come to Life !
            <div className="note">
              Join our community today and explore the chat rooms.
            </div>
          </div>
        </div>

        {/*--------------------------------------------------------*/}

        <div className="boxRight">
          <div className="appLogo">
            <img src={applogo} alt=""></img>
          </div>
          <div className="loginHeading">Login to My-Chat</div>
          <div className="inputBox">
            {/* actual login form begins here */}

            <form>
              <input type="text" name="userName" placeholder="Enter username" onChange={handleChange} required></input>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              ></input>
              <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
          </div>

          <div className="loginFoot">
            New here ? <Link to="/signup">Signup</Link> now !
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
