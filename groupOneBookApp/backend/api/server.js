// Import required libraries
import express from 'express';
import dotenv from 'dotenv';
import searchBookshelf from './searchBookshelf.js'; // Use .js extension for local file imports
import SigninApi from './SigninApi.js'; // Use .js extension for local file imports

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Use the routes defined in searchBookshelf.js
app.use('/api', searchBookshelf); // Prefix routes with '/api'
app.use('/api', sqlDBApi); // Prefix routes with '/api'

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 8000; // Default to port 8000 if not defined
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
