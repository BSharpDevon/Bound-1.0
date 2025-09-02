// Import the libraries we need
import express from 'express'; // For building the web server
import axios from 'axios'; // For making HTTP requests
import bodyParser from 'body-parser'; // For parsing JSON request bodies
import cors from 'cors'; // For handling CORS
import dotenv from 'dotenv'; // For loading environment variables
import connection from './connection.js'; // Import the connection from connections.js

dotenv.config(); // Load environment variables from .env file

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Configure CORS
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend's URL
  methods: ["GET", "POST"],
  credentials: true,
}));

console.log("CORS and Body Parser Middleware Configured");

// Create a router
const searchBookshelf = express.Router();

// Search Endpoint: http://localhost:8000/search-bookshelf/search
searchBookshelf.get('/search', (req, res) => {
  const { searchRequest } = req.query;
  console.log("Received search request:", searchRequest);

  // Validate searchRequest
  if (!searchRequest || searchRequest.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid book title.",
    });
  }

  // Define search parameters
  const maxResults = 10;
  const startIndex = req.query.startIndex || 0;

  // Construct the Google Books API URL
  const searchGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchRequest)}&key=${process.env.GOOGLE_BOOKS_API_KEY}&startIndex=${startIndex}&maxResults=${maxResults}`;

  console.log("Google Books API URL:", searchGoogleBooks);

  // Make the request to Google Books API using axios
  axios.get(searchGoogleBooks)
    .then(searchResult => {
      // Check if any books were found
      if (searchResult.data.totalItems === 0) {
        return res.status(404).json({
          success: false,
          message: "No books found for your search. Try a different title!",
        });
      }

      // Simplify the data received from Google Books
      const books = searchResult.data.items.map((item) => ({
        id: item.id, // Unique ID for each book
        title: item.volumeInfo.title || "No Title Available",
        authors: item.volumeInfo.authors || ["Unknown Author"],
        description: item.volumeInfo.description || "No description available.",
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "No image available.",
        link: item.volumeInfo.infoLink || "#",
      }));

      // Respond with the simplified book data
      return res.status(200).json({
        success: true,
        books,
      });
    })
    .catch(error => {
      // Log the error for debugging
      console.error("Error fetching books from Google Books API:", error.message);

      // Respond with a generic error message
      return res.status(500).json({
        success: false,
        message: "An error occurred while searching for books. Please try again later.",
      });
    });
});

// FavouriteBooks Endpoint
searchBookshelf.post('/favouriteBooks', (req, res) => {
  const { googlebookId, memberId } = req.body;
  console.log("Received favouriteBooks request for Google Book ID:", {googlebookId, memberId});

  // Validate googlebookId
  if (!googlebookId || googlebookId.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Google Book ID is required to add a book to favourites.",
    });
  }

  if (!memberId || typeof memberId !== 'number') {
    return res.status(400).json({
      success: false,
      message: "User ID is required and must be a valid number.",
    });
  }

  // SQL query to insert the book into the 'favourites' table
  const insertQuery = "INSERT INTO favourite_books (googlebookId, member_id) VALUES (?, ?)";

  // Execute the query using callback-based interface
  connection.query(insertQuery, [googlebookId, memberId], (err, results) => {
    if (err) {
      console.error("Error adding book to favourites:", {
        error: err.message,
        googlebookId,
        memberId,
      });
      return res.status(500).json({
        success: false,
        message: "An error occurred while adding the book to favourites. Please try again later.",
      });
    }

    console.log("Book added to favourites with ID:", results.insertId);

    return res.status(200).json({
      success: true,
      message: "Book successfully added to your favourites!",
    });
  });
});

export default searchBookshelf;  