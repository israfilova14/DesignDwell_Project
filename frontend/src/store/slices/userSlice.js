import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user:  null
}

const authSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {
         setUserDetails: (state, action) => {
             state.user = action.payload
         },

         logout: (state) => {
            state.user = null
         }
    }
})

export const {setUserDetails, logout} = authSlice.actions
export default authSlice.reducer