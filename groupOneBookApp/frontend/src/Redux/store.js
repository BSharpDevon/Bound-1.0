import { configureStore } from '@reduxjs/toolkit'; // Import Redux Toolkit for store configuration
import userReducer from './slices/userSlice'; // Import the user slice reducer

// Configure the Redux store
const store = configureStore({
    reducer: {
        user: userReducer, // Add the user slice reducer to the store
    },
});

// Export the configured store
export default store;
