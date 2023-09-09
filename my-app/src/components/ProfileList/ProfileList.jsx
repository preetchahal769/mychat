import React from 'react';
import './ProfileList.scss';

import avinas from '../../assets/images/i1.png'

const ProfileList = () => {
  return (
    <div className="profileContainer">
      <div className="heading">Profile</div>
      <div className="profileBox">
        <div className="profileImageBox">
          <img src={avinas} alt=''></img>
        </div>
        <div className="profileDetailsBox">
          <button><label>Name</label>Avinash Dubey</button>
          <button><label>Username</label>avinasdube</button>
          <button><label>Email</label>avinasdube@gmail.com</button>
          <button><label>Phone</label>9999999999</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileList