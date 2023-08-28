import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

import applogo from "../../assets/icons/mychat.png";
import Toasts from "../../components/Toasts/Toasts";

const Login = () => {
  // useState to set changes made in form field values as object

  const [inputs, setInputs] = useState({
    username: " ",
    password: " ",
  });

  // a function to record changes in the form field values

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  // a function to handle submission of form data

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent default load

    try {
      // sending user input to 'http://localhost:8800/server' (through proxy set in package.json)

      await axios.post("/auth/login", inputs)

      const res = await axios.get("/auth/verifyToken")

      // storing user information in local storage/session storage

      localStorage.setItem("currentUser", JSON.stringify(res.data));

      // retrieving user information from local storage

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (currentUser) {

        // if currentUser exists, navigate to the room page

        navigate("/rooms");
      } else {
        navigate("/login")
      }

    } catch (err) {
      let data = err.response.data;
      setMessage(data);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <div className="loginContainer">
      {/* importing toast component and passing message and error as props to it */}

      <Toasts message={message} error={error} />

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
          <div className="loginHeading">Login to iChat</div>
          <div className="inputBox">
            
            {/* actual login form begins here */}

            <form>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
                required
              ></input>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              ></input>
              <button onClick={handleSubmit} type="submit">
                Login
              </button>
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
