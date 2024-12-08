import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import selectedBooks from './selectedBooks.js'; // Correct import for selectedBooks router
import searchBookshelf from './searchBookshelf.js';
import pool from './connection.js'; // Importing the connection SQL pool

dotenv.config(); // Load environment variables

// Middleware to parse JSON request body
const app = express();
// app.use(express.json());
app.use(bodyParser.json()); // Only one call to bodyParser is needed, express.json() already parses JSON
// Allow requests from any origin (CORS)
app.use(cors({ origin: '*' }));

// Routes setup
app.use('/favouriteBooks', selectedBooks); // Handle requests to '/favouriteBooks'
app.use('/', searchBookshelf);  // Search books route (make sure it's correct)
app.use(selectedBooks);  // Optionally, you can use '/api' for favouriteBooks if needed

// Test database connection
const testDatabaseConnection = async () => {
  try {
    await pool.query('SELECT 1');  // This uses the promise-based query method
    console.log('Connected to database.');
  } catch (err) {
    console.error('Database connection failed:', err.stack);
  }
};

testDatabaseConnection();  // Test the database connection when the server starts

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
