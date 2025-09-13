import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './connection.js'; // Importing the connection SQL pool
import selectedBooksRoutes from './selectedBooks.js'; // Correct import for selectedBooks router
import searchBookshelfRoutes from './searchBookshelf.js';
import loginPageRoutes from './logInPage.js';

dotenv.config(); // Load environment variables

// Middleware to parse JSON request body
const app = express();
// app.use(express.json());
app.use(express.json()); // Only one call to bodyParser is needed, express.json() already parses JSON
// Allow requests from any origin (CORS)
app.use(cors({ origin: '*' }));

// Module route setups
app.use('/selected-books', selectedBooksRoutes);
app.use('/search-bookshelf', searchBookshelfRoutes);
app.use('/login-page', loginPageRoutes);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Server: Connected to database.');
    connection.release();
  } catch (err) {
    console.error('Server: Database connection failed: ' + err.message);
  }
})();

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app, server}; // Export both the app and server instances