import React from 'react'
import { Link } from 'react-router-dom';
import './Login.scss';

import applogo from '../../assets/icons/mychat.png'

const Login = () => {
  return (
    <div className="loginContainer">
      <div className="loginBox" id='lgbx'>

        {/* dividing login box into two halves - left and right*/}
        
        <div className="boxLeft">
          
          <div className='welcomeText'>
            Where Conversations Come to Life !
            <div className="note">
              Join our community today and explore the chat rooms.
            </div>
          </div>
        </div>

        {/*--------------------------------------------------------*/}

        <div className="boxRight">
          <div className="appLogo">
            <img src={applogo} alt=''></img>
          </div>
          <div className="loginHeading">
            Login to My-Chat
          </div>
          <div className="inputBox">

            {/* actual login form begins here */}
            
            <form>
              <input type='text' placeholder='Enter username' required></input>
              <input type='password' placeholder='Enter password' required></input>
              <button type='submit'>Login</button>
            </form>

          </div>
          
          <div className="loginFoot">
            New here ? <Link to='/signup'>Signup</Link> now !
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login