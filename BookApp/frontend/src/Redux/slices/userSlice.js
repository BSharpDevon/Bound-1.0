import { createSlice } from '@reduxjs/toolkit'; 

// Initial state for the user slice
const initialState = {
    memberId: null,  
    email: null,  
    fullName: null,  
    isLoggedIn: false,  
};

// The user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action to set the member's ID and email when they log in or sign up
        setMemberId(state, action) {  
            state.memberId = action.payload.memberId; 
            state.email = action.payload.email; 
            state.fullName = action.payload.fullName;
            state.isLoggedIn = true;
        },
        // Action to clear user data when they log out
        logoutUser(state) { 
            state.memberId = null;
            state.email = null;
            state.fullName = null;
            state.isLoggedIn = false;
        },
    },
});

// Export actions to be used in components
export const { setMemberId, logoutUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
