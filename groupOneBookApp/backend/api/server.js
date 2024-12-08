import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import selectedBooksRouter from './selectedBooks.js'; // Correct import for selectedBooks router
import searchBookshelf from './searchBookshelf.js';

dotenv.config();

const app = express();

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// Middleware to parse JSON bodies
app.use(express.json());

// Use the selectedBooks route handler (assuming no prefix as per your request)
app.use('/favouriteBooks', selectedBooksRouter);
app.use('/', searchBookshelf);

// // Root endpoint (optional)
// app.get('/', (req, res) => {
//   res.send("Welcome to the server's root URL.");
// });

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
