// importing dependencies

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SettingsList.scss';

// importing assets

import logout from '../../assets/icons/logoutDark.png';
import setStatus from '../../assets/icons/statusDark.png';
import theme from '../../assets/icons/themeDark.png';

// importing reducer function 'setActiveOption' from settingsReducer

import { setActiveOption } from '../../reducers/settingsReducer'

const SettingsList = () => {

  const dispatch = useDispatch(); // useDispatch to dispatch payloads/states to reducers

  // retrieving updated states of activeOption from settingsReducer

  const activeOption = useSelector((state) => state.settings.activeOption); 

  // a function to handle dispatch payload on clicking setting option buttons

  const handleOptionClick = (option) => {
    dispatch(setActiveOption(option)); 
  };

  return (
    <div className="settingsContainer">
      <div className="heading">Settings</div>
      <div className="settingOptions">
        <button className={`button ${activeOption === 'status' ? 'active' : 'inactive'}`} onClick={() => handleOptionClick('status')}><img src={setStatus} alt=''></img><label>Set Status</label></button>
        <button className={`button ${activeOption === 'theme' ? 'active' : 'inactive'}`} onClick={() => handleOptionClick('theme')}><img src={theme} alt=''></img><label>Appearance</label></button>
        <button className={`button ${activeOption === 'logout' ? 'active' : 'inactive'}`} onClick={() => handleOptionClick('logout')}><img src={logout} alt='' id='lgout'></img><label>Logout</label></button>
      </div>
    </div>
  )
}

export default SettingsList;