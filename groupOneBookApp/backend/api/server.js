// Import required libraries
import express from 'express';
import dotenv from 'dotenv';
import searchBookshelf from './searchBookshelf.js'; // Note: Use .js extension when importing local files
import sqlDBApi from './apiSigninApi.js'; // Note: Use .js extension when importing local files

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

const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes'); // Import the routes where your GET endpoint is defined

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware to parse JSON request body
app.use(bookRoutes); // Use the routes for handling book-related requests

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
