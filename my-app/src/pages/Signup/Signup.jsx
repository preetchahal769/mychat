import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";

import applogo from "../../assets/icons/mychat.png";
import Toasts from "../../components/Toasts/Toasts";

const Signup = () => {

  // state to set changes made in form field values as object

  const [inputs, setInputs] = useState({
    name: " ",
    username: " ",
    email: " ",
    password: " ",
    cnfpassword: " ",
  })

  // a function to record changes in the form field values

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const navigate = useNavigate();

  // a function to handle submission of form data

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();  // to prevent default load

    try {

      // sending user input to 'http://localhost:8800/server/auth/signup' (through proxy set in package.json)

      await axios.post("/auth/signup", inputs);
      navigate("/login");
    }
    catch (err) {
      let data = err.response.data;
      setMessage(data)
      setError(true)
      setTimeout(()=>{
        setError(false);
      }, 2000);
    }
  }

  return (
    <div className="signupContainer">
      
      <Toasts message={message} error={error} />
      
      <div className="signupBox" id="sgbx">

        {/* dividing signup box into two halves - left and right*/}

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
          <div className="signupHeading">Signup to iChat</div>
          <div className="inputBox">

            {/* actual login form begins here */}

            <form>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              ></input>
              <input
                type="text"
                name="username"
                placeholder="Enter a username"
                onChange={handleChange}
                required
              ></input>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              ></input>
              <input
                type="password"
                name="password"
                placeholder="Enter a new password"
                onChange={handleChange}
                required
              ></input>
              <input
                type="password"
                name="cnfpassword"
                placeholder="Enter your password again"
                onChange={handleChange}
                required
              ></input>
              <button type="submit" onClick={handleSubmit}>
                Signup
              </button>
            </form>
          </div>

          <div className="signupFoot">
            Already signed up ? <Link to="/login">Login</Link> now !
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
