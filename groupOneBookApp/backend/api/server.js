// Import required libraries
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import searchBookshelf from './searchBookshelf.js'; // Use .js extension for local file imports
import SigninApi from './SigninApi.js'; // Use .js extension for local file imports

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// Use the routes defined in searchBookshelf.js
app.use('', searchBookshelf); // Prefix routes with '/api'
app.use('', SigninApi); // Prefix routes with '/api'

// Set up the server to listen on a specific port
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});