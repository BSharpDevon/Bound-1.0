// Import required libraries
import express from 'express';
import dotenv from 'dotenv';
import searchBookshelf from './searchBookshelf.js'; // Use .js extension for local file imports
import SigninApi from './SigninApi.js'; // Use .js extension for local file imports

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Use the routes defined in searchBookshelf.js and SigninApi.js
app.use('/api/search', searchBookshelf);  // Prefix routes with '/api/search' for searchBookshelf
app.use('/api/signin', SigninApi);        // Prefix routes with '/api/signin' for SigninApi


