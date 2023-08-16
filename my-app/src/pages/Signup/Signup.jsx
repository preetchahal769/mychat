import React from 'react'
import { Link } from 'react-router-dom';
import './Signup.scss';

import applogo from '../../assets/icons/mychat.png'

const Login = () => {
    return (
        <div className="signupContainer">
            <div className="signupBox" id='sgbx'>

                {/* dividing signup box into two halves - left and right*/}

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
                    <div className="signupHeading">
                        Signup to My-Chat
                    </div>
                    <div className="inputBox">

                        {/* actual login form begins here */}

                        <form>
                            <input type='text' placeholder='Enter your name' required></input>
                            <input type='text' placeholder='Enter a username' required></input>
                            <input type='email' placeholder='Enter your email' required></input>
                            <input type='password' placeholder='Enter a new password' required></input>
                            <input type='password' placeholder='Enter your password again' required></input>
                            <button type='submit'>Signup</button>
                        </form>

                    </div>

                    <div className="signupFoot">
                        Already signed up ? <Link to='/login'>Login</Link> now !
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login