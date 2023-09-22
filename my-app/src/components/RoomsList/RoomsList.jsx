import React from 'react';
import './RoomsList.scss'

import i1 from '../../assets/images/i1.png';
import i2 from '../../assets/images/i2.png';
import i3 from '../../assets/images/i3.png';
import i4 from '../../assets/images/i4.png';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveRoomDetails } from '../../reducers/roomsReducer.js';

const RoomsList = () => {

    const rooms = [
        {
            id: 0,
            profileImg: i1,
            roomName: 'My Chat Team',
        },
        {
            id: 1,
            profileImg: i2,
            roomName: 'Developers Guild',
        },
        {
            id: 2,
            profileImg: i3,
            roomName: 'Hackers County',
        },
        {
            id: 3,
            profileImg: i4,
            roomName: 'Indian Devs',
        },
    ];

    // retrieving updated states of activeRoomDetails from roomsReducer

    const activeRoom = useSelector((state) => state.rooms.activeRoomDetails);

    const dispatch = useDispatch();

    return activeRoom !== null ? (
        <div className="roomsListContainer">

            {/* Search Bar */}

            {/* <div className="searchBox">
                <input type='text' placeholder='search rooms'></input>
            </div> */}

            {/* rooms list */}

            <div className="roomsList">
                {rooms.map((room, index) => (

                    // dispatching room details to the setActiveRoomDetails function of roomsReducer

                    <div className={`roomTab ${activeRoom.roomId === index ? 'active' : 'inactive'}`} key={room.id} onClick={() => dispatch(setActiveRoomDetails({
                        roomId: room.id,
                        roomName: room.roomName,
                    }))}>

                        <div className="profileImg">
                            <img src={room.profileImg} alt=''></img>
                        </div>
                        {/* <div className="roomDescrip">
                            <div className="roomName">{room.roomName}</div>
                            <div className="lastMessage">{room.lastMessage}</div>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    )

        :

        <div className="roomsListContainer">

            {/* Search Bar */}

            {/* <div className="searchBox">
                <input type='text' placeholder='search rooms'></input>
            </div> */}

            {/* rooms list */}

            <div className="roomsList">
                {rooms.map((room) => (
                    <div className='roomTab' key={room.id} onClick={() => dispatch(setActiveRoomDetails({
                        roomId: room.id,
                        roomName: room.roomName,
                    }))}>
                        <div className="profileImg">
                            <img src={room.profileImg} alt=''></img>
                        </div>
                        {/* <div className="roomDescrip">
                            <div className="roomName">{room.roomName}</div>
                            <div className="lastMessage">{room.lastMessage}</div>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
}

export default RoomsList