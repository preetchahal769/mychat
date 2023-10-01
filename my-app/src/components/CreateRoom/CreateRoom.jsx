import React from 'react';

import './CreateRoom.scss';

const CreateRoom = () => {
  return (
    <div className='createRoomContainer'>
        <div className="createRoomHead">
            Create a New Room
        </div>
        <div className="createRoomForm">
            <form>
                <input type='text' placeholder='Enter your room name' required></input>
                <input type='text' placeholder='Enter a unique roomid' required></input>
                <textarea name="" id="" cols="30" rows="5" placeholder='Enter your room description'></textarea>
                <button>Create Room</button>
            </form>
        </div>
    </div>
  )
}

export default CreateRoom