// importing dependencies

import React from 'react'
import { useSelector } from 'react-redux';
import './SettingDescripBox.scss'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SettingDescripBox = () => {
  
  const navigate = useNavigate();

  // retrieving updated states of activeOption from settingsReducer

  const activeOption = useSelector((state) => state.settings.activeOption);

  // function to handle logout 

  const handleLogOut = async () => {
    try {
      await axios.get("/auth/logout");
      
      // Clear the user information from local storage
      
      localStorage.removeItem('currentUser');
      navigate("/login");

    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className="settingsBoxContainer">

      {/* a description box for setting list options based on their activity*/}

      {
        // setting option description for user status 

        activeOption === 'status' ?
          <div className="settingContainer">
            <div className="heading">
              Set Status
            </div>
            <div className="options">
              <button>Online</button>
              <button>Busy</button>
              <button>Offline</button>
            </div>
          </div>

          // setting option description for application theme 

          : activeOption === 'theme' ?

            <div className="settingContainer">
              <div className="heading">
                Set Appearance
              </div>
              <div className="options">
                <button>Light</button>
                <button>Dark</button>
              </div>
            </div>

            // setting option description for logout

            : activeOption === 'logout' ?

              <div className="settingContainer">
                <div className="heading">
                  Logout
                </div>
                <div className="options">
                  <button onClick={handleLogOut}>Logout</button>
                </div>
              </div>
              : ''}
    </div>
  )
}

export default SettingDescripBox;