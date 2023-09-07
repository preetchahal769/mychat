// setting up centralized redux store for all reducers 

import { configureStore } from '@reduxjs/toolkit'; // for configuring redux store 
import settingsReducer from '../reducers/settingsReducer';
import roomsReducer from '../reducers/roomsReducer';

// creating a redux store to manage reducers

const store = configureStore({
    reducer: {  // defining reducer object
        settings: settingsReducer, // creating slice named 'settings' for settingsReducer
        rooms: roomsReducer, // creating a slice named 'rooms' for roomsReducer
    },
});

export default store;
