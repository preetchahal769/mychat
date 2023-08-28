// importing createSlice to create settingSlice

import { createSlice } from '@reduxjs/toolkit';

// setting up initial state of activeOption

const initialState = {
    activeOption: null,
};

// defining settingSlice of settingsReducer

export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {

        // defining reducer function to set/track activeOption of settings list
        
        setActiveOption: (state, action) => {
            return {
                ...state,
                activeOption: action.payload 
            }
        }
    }
})

export const { setActiveOption } = settingSlice.actions;

export default settingSlice.reducer;