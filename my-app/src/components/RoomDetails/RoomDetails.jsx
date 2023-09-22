import React from 'react'
import { useSelector } from 'react-redux';
import './RoomDetails.scss';
import avinas from '../../assets/images/i3.png'

const RoomDetails = () => {
    // retrieving updated states of activeRoomDetails from roomsReducer 

    const activeRoom = useSelector((state) => state.rooms.activeRoomDetails);

    return (
        <div className="roomDetailsContainer">
            <div className="chatRoomTitle">
                <div className="chatRoomName">{activeRoom?.roomName}</div>
                <div className="chatRoomMembersDetail">2000 members, 849 active</div>
            </div>

            <div className="chatRoomMembers">
                <heading>Admin</heading>
                <div className="admin">
                    <div className="member">
                        <img src={avinas} alt=''></img>
                        <div className="memberDetails">
                            <div className="memberName">Avinash Dubey</div>
                            <div className="memberRole">Admin</div>
                        </div>
                    </div>
                </div>


                <heading>Members</heading>
                <div className="roomMembers">
                    <div className="member">
                        <img src={avinas} alt=''></img>
                        <div className="memberDetails">
                            <div className="memberName">Avinash Dubey</div>
                            <div className="memberRole">Member</div>
                        </div>
                    </div>
                    <div className="member">
                        <img src={avinas} alt=''></img>
                        <div className="memberDetails">
                            <div className="memberName">Avinash Dubey</div>
                            <div className="memberRole">Member</div>
                        </div>
                    </div>
                    <div className="member">
                        <img src={avinas} alt=''></img>
                        <div className="memberDetails">
                            <div className="memberName">Avinash Dubey</div>
                            <div className="memberRole">Member</div>
                        </div>
                    </div>
                    <div className="member">
                        <img src={avinas} alt=''></img>
                        <div className="memberDetails">
                            <div className="memberName">Avinash Dubey</div>
                            <div className="memberRole">Member</div>
                        </div>
                    </div>
                    <div className="member">
                        <img src={avinas} alt=''></img>
                        <div className="memberDetails">
                            <div className="memberName">Avinash Dubey</div>
                            <div className="memberRole">Member</div>
                        </div>
                    </div>
                    <div className="member">
                        <img src={avinas} alt=''></img>
                        <div className="memberDetails">
                            <div className="memberName">Avinash Dubey</div>
                            <div className="memberRole">Member</div>
                        </div>
                    </div>
                    <div className="member">
                        <img src={avinas} alt=''></img>
                        <div className="memberDetails">
                            <div className="memberName">Avinash Dubey</div>
                            <div className="memberRole">Member</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails