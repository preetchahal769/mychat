// importing createSlice to create roomSlice

import { createSlice } from '@reduxjs/toolkit';

// setting up initial state of activeRoomDetails

const initialState = {
    activeRoomDetails: null,
};

// defining roomSlice of roomsReducer

export const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        
        // defining reducer function to get the details of current selected room

        setActiveRoomDetails: (state, action) => {
            return{
                activeRoomDetails: action.payload
            }
        }
    }
})

export const { setActiveRoomDetails } = roomSlice.actions;

export default roomSlice.reducer;