import React from 'react';
import './RoomsList.scss'

import i1 from '../../assets/images/i1.png';
import i2 from '../../assets/images/i2.png';
import i3 from '../../assets/images/i3.png';
import i4 from '../../assets/images/i4.png';

const RoomsList = () => {
    return (
        <div className="roomsListContainer">
            <div className="heading">Rooms</div>
            <div className="searchBox">
                <input type='text' placeholder='search rooms'></input>
            </div>
            <div className="roomsList">
                <div className="roomTab">
                    <div className="profileImg">
                        <img src={i1} alt=''></img>
                    </div>
                    <div className="roomDescrip">
                        <div className="roomName">My Chat Team</div>
                        <div className="lastMessage">Get done with frontend</div>
                    </div>
                </div>

                <div className="roomTab">
                    <div className="profileImg">
                        <img src={i2} alt=''></img>
                    </div>
                    <div className="roomDescrip">
                        <div className="roomName">Developers Guild</div>
                        <div className="lastMessage">Anyone here knows strapi ?</div>
                    </div>
                </div>

                <div className="roomTab">
                    <div className="profileImg">
                        <img src={i3} alt=''></img>
                    </div>
                    <div className="roomDescrip">
                        <div className="roomName">Hackers County</div>
                        <div className="lastMessage">Anonymous news ...</div>
                    </div>
                </div>

                <div className="roomTab">
                    <div className="profileImg">
                        <img src={i4} alt=''></img>
                    </div>
                    <div className="roomDescrip">
                        <div className="roomName">Indian Devs</div>
                        <div className="lastMessage">What about national data policy ?</div>
                    </div>
                </div>

                <div className="roomTab">
                    <div className="profileImg">
                        <img src={i1} alt=''></img>
                    </div>
                    <div className="roomDescrip">
                        <div className="roomName">React With Us</div>
                        <div className="lastMessage">Component rendering slow any ideas ...</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomsList