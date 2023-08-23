import React, { useState } from 'react';
import './SettingsList.scss';

import logout from '../../assets/icons/logoutDark.png';
import setStatus from '../../assets/icons/statusDark.png';
import theme from '../../assets/icons/themeDark.png';

const SettingsList = () => {
  const [option, setOption] = useState();

  return (
    <div className="settingsContainer">
      <div className="heading">Settings</div>
        <div className="settingOptions">
            <button className={`button ${option === 'status' ? 'active' : 'inactive'}`} onClick={()=>setOption('status')}><img src={setStatus} alt=''></img><label>Set Status</label></button>
            <button className={`button ${option === 'theme' ? 'active' : 'inactive'}`} onClick={()=>setOption('theme')}><img src={theme} alt=''></img><label>Appearance</label></button>
            <button className={`button ${option === 'logout' ? 'active' : 'inactive'}`} onClick={()=>setOption('logout')}><img src={logout} alt='' id='lgout'></img><label>Logout</label></button>
        </div>
    </div>
  )
}

export default SettingsList;