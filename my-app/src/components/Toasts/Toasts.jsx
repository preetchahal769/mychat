import React from 'react';
import './Toasts.scss';

const Toasts = ({ message, error }) => {

    return (
        <div className='toastContainer'>
            <div className={`toastbox ${error === true ? 'active' : 'inactive'}`}>
                <div className="closeButton">
                    <span id='s1'></span>
                    <span id='s2'></span>
                </div>
                <div className="toastMessage">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default Toasts;