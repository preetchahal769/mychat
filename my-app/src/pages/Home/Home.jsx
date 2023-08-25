import React, { useState } from 'react';
import './Home.scss';

import ichat from '../../assets/icons/mychat.png';

import allroomsDark from '../../assets/icons/allroomsDark.png';
import profile from '../../assets/images/i2.png';
import settingsDark from '../../assets/icons/settingsDark.png';

import RoomsList from '../../components/RoomsList/RoomsList';
import ChatBox from '../../components/ChatBox/ChatBox';
import ProfileList from '../../components/ProfileList/ProfileList';
import SettingsList from '../../components/SettingsList/SettingsList';
import Settings from '../Settings/Settings';
import { Navigate } from 'react-router-dom';

const Home = () => {

    const [listBox, setListBox] = useState('allrooms');

    // Retrieve user information from local storage

    const isCurrentuser = JSON.parse(localStorage.getItem("user"));

  return isCurrentuser ? (
    <div className="homeContainer">
        <div className="homeLeft">
            <div className="ichatLogo">
                <img src={ichat} alt=''></img>
            </div>
            <div className={`redirect ${listBox === 'allrooms' ? 'active' : 'inactive'}`}  onClick={()=>setListBox('allrooms')}>
                <img src={allroomsDark} alt='' id='alrms'></img>
            </div>
            <div className="roomIcons">
                Rooms
            </div>
            <div className={`redirect ${listBox === 'profile' ? 'active' : 'inactive'}`} onClick={()=>setListBox('profile')}>
                <img src={profile} alt=''></img>
            </div>
            <div className={`redirect ${listBox === 'settings' ? 'active' : 'inactive'}`}  onClick={()=>setListBox('settings')}>
                <img src={settingsDark} alt='' id='stng'></img>
            </div>
        </div>
        <div className="homeMiddle">
            <div className="listBox">
                {
                    listBox === 'profile' ?
                    <ProfileList listBox='profile' /> :
                    listBox === 'settings' ?
                    <SettingsList listBox='settings' /> :
                    <RoomsList listBox='rooms' />
                }
            </div>
        </div>
        <div className="homeRight">
            {
                
                listBox === 'settings' ?
                <Settings /> : 
                <ChatBox />
            }
        </div>
    </div>
  ) : <Navigate to='/login' />
}

export default Home