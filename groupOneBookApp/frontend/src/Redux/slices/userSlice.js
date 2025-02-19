import { createSlice } from '@reduxjs/toolkit'; // Import Redux Toolkit to create slices

// Initial state for the user slice
const initialState = {
    member_id: null,    // Store the member's ID
    email: null,        // Optionally store the member's email
    isLoggedIn: false,  // Track whether the member is logged in
};

// The user slice
const userSlice = createSlice({
    name: 'user', // Name of the slice
    initialState, // Initial state
    reducers: {
        // Action to set the member's ID and email when they log in or sign up
        setMemberId(state, action) {
            state.member_id = action.payload.member_id; // Update the member_id in the state (payload is the data sent to the store).
            state.email = action.payload.email || null; // Optionally store the email
            state.isLoggedIn = true; // Set the member as logged in
        },
        // Clear the member's data when they log out
        logOutUser(state) {
            state.member_id = null; // Clear the member_id
            state.email = null; // Clear the email
            state.isLoggedIn = false; // Set logged-in status to false
        },
    },
});

// Export actions to be used in components
export const { setMemberId, logOutUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
