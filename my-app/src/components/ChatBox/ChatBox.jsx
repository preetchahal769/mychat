import React from 'react';
import './ChatBox.scss';
import { useSelector } from 'react-redux';

import send from '../../assets/icons/send.png';
import fileupload from '../../assets/icons/fileupload.png';
import avinas from '../../assets/images/i1.png'
import preet from '../../assets/images/i3.png'

const ChatBox = () => {

  // retrieving updated states of activeRoomDetails from roomsReducer 

  const activeRoom = useSelector((state) => state.rooms.activeRoomDetails);

  return activeRoom !== null ? (
    <div className="chatBoxContainer">

      <div className="chatBox">
        <div className="messages">
          <div className="msg" id='incoming'>
            <img src={preet} alt=''></img>
            <div className="details">
              <div className="name">Preet Chahal</div>
              <div className="dm">Ram-ram bhai !</div>
            </div>
          </div>

          <div className="msg" id='outgoing'>
            <img src={avinas} alt=''></img>
            <div className="details">
              <div className="name">Avinash Dubey</div>
              <div className="dm">Ram-ram ! Kaise ho ?</div>
            </div>
          </div>

          <div className="msg" id='incoming'>
            <img src={preet} alt=''></img>
            <div className="details">
              <div className="name">Preet Chahal</div>
              <div className="dm">Badhia hu ! Tum batao ??</div>
            </div>
          </div>

          <div className="msg" id='outgoing'>
            <img src={avinas} alt=''></img>
            <div className="details">
              <div className="name">Avinash Dubey</div>
              <div className="dm">Mera bhi sab badhia hai. kya chal rha aajkal ?</div>
            </div>
          </div>

          <div className="msg" id='incoming'>
            <img src={preet} alt=''></img>
            <div className="details">
              <div className="name">Preet Chahal</div>
              <div className="dm">Aajkal to open-sourcing chal rha hai. Side projects bhi kr rha hu sath me.</div>
            </div>
          </div>

          <div className="msg" id='outgoing'>
            <img src={avinas} alt=''></img>
            <div className="details">
              <div className="name">Avinash Dubey</div>
              <div className="dm">noice bro. mai bhi ek collab me project bana raha hu.</div>
            </div>
          </div>
        </div>

        {/* customized input box to send message */}

        <div className="inputBox">
          <button><img src={fileupload} alt=''></img></button>
          <input type='text' placeholder='Enter your message ...'></input>
          <button><img src={send} alt=''></img></button>
        </div>
      </div>
    </div>
  )

    :

    (<div className="chatBoxContainer">
      Select a Chat to view messages !
    </div>
    )
}

export default ChatBox;