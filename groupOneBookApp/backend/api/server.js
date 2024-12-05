// Import required libraries
import express from 'express';
import dotenv from 'dotenv';
import searchBookshelf from './searchBookshelf.js'; // Note: Use .js extension when importing local files
import SigninApi from './SigninApi.js'; // Note: Use .js extension when importing local files

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Use the routes defined in searchBookshelf.js
app.use('/api', searchBookshelf); // Prefix routes with '/api'
app.use('/api', SigninApi); // Prefix routes with '/api'

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 8000; // Default to port 8000 if not defined
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
