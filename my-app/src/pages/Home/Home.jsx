// importing dependencies

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Home.scss';

// importing assets

import ichat from '../../assets/icons/mychat.png';
import allroomsDark from '../../assets/icons/allroomsDark.png';
import profile from '../../assets/images/i2.png';
import settingsDark from '../../assets/icons/settingsDark.png';

// importing components

import RoomsList from '../../components/RoomsList/RoomsList';
import ChatBox from '../../components/ChatBox/ChatBox';
import ProfileList from '../../components/ProfileList/ProfileList';
import SettingsList from '../../components/SettingsList/SettingsList';
import SettingDescripBox from '../../components/SettingDescripBox/SettingDescripBox';

const Home = () => {

    const [listBox, setListBox] = useState('allrooms'); // setting state of middle part list box

    // retrieving current user data from localstorage

    const isCurrentuser = JSON.parse(localStorage.getItem('currentUser'));

    return isCurrentuser ? (
        <div className="homeContainer">

            {/* left side of home page */}

            <div className="homeLeft">
                <div className="ichatLogo">
                    <img src={ichat} alt='' />
                </div>
                <div className={`redirect ${listBox === 'allrooms' ? 'active' : 'inactive'}`} onClick={() => setListBox('allrooms')}>
                    <img src={allroomsDark} alt='' id='alrms' />
                </div>
                <div className="roomIcons">
                    Rooms
                </div>
                <div className={`redirect ${listBox === 'profile' ? 'active' : 'inactive'}`} onClick={() => setListBox('profile')}>
                    <img src={profile} alt='' />
                </div>
                <div className={`redirect ${listBox === 'settings' ? 'active' : 'inactive'}`} onClick={() => setListBox('settings')}>
                    <img src={settingsDark} alt='' id='stng' />
                </div>
            </div>

            {/* middle part of home page */}

            <div className="homeMiddle">
                <div className="listBox">
                    
                    {/* switching list box content based on selected right side option */}

                    {
                        listBox === 'profile' ? 
                        <ProfileList listBox='profile' /> :
                            listBox === 'settings' ? <SettingsList /> :
                                <RoomsList listBox='rooms' />
                    }

                </div>
            </div>

            {/* right side of home page */}

            <div className="homeRight">
                {
                    listBox === 'allrooms' ?
                      <ChatBox /> :
                    listBox === 'settings' ?
                        <SettingDescripBox /> :
                        ''
                }
            </div>

        </div>
    ) : <Navigate to='/login' />; 
};

export default Home;
