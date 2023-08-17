import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.scss";

import applogo from "../../assets/icons/mychat.png";

const Login = () => {
  //    Varible to store the data user iput feild data
  const [data, setData] = useState({
    Name: "",
    userName: "",
    email: "",
    password: "",
    confirmPass: "",
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
    if (
      !data.Name ||
      !data.userName ||
      !data.email ||
      !data.password ||
      !data.confirmPass
    ) {
      alert("value should not be empty");
    } else if (data.Name.length <= 3 || data.Name.length >= 20) {
      alert("name max char is 20 and min char is 3");
    } else if (data.email.length <= 10 || data.email.length >= 40) {
      alert("gmail max char is 40 and min char is 10");
    } else if (data.password.length <= 5 || data.password.length >= 60) {
      alert("pass max char is 60 and min char is 5");
    } else if (data.password !== data.confirmPass) {
      alert("Password and Confirm passwod shoul be same");
      console.log(
        `pass : ${data.password} confirmPass : ${data.confirmPass} compare : ${
          data.password === data.confirmPass
        }`
      );
    } else {
      try {
        // request to the server
        console.log("data in name ", data.Name);
        const response = await axios.post(
          "http://localhost:3005/storeUser",
          data
        );
        // request to the server
        alert(response.data.message);
      } catch (error) {
        alert(error);
      }
    }
    // Perform any additional validations or processing here
    console.log("Submitted object:", data);
  };
  return (
    <div className="signupContainer">
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
                name="Name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              ></input>
              <input
                type="text"
                name="userName"
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
                name="confirmPass"
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

export default Login;
