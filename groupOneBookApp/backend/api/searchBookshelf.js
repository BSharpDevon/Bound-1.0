// Import the libraries we need
import express from 'express'; // For building the web server
import axios from 'axios'; // For making HTTP requests
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Create an Express app
const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
console.log("Line 16");
// Create a router
const searchBookshelf = express.Router();

console.log(process.env.GOOGLE_BOOKS_API_KEY);

searchBookshelf.get('/', (req, res)=>{
  res.status(200);
  res.send("Welcome to root URL of Server");
});

console.log("Line 27");

// search endpoint
searchBookshelf.get('/search', async (req, res) => {
  const { searchRequest } = req.query;
  console.log("Searching for request.");
  console.log("Line 22")
  // If the user didn't give us a search term, show an error message
  try {
    if (!searchRequest) {
      return res.status(400).json({
        success: false,
        message: "Please enter something in the search bar."
      });
    }
    console.log("Line 42");

    // The URL to ask Google Books for the search results, returns top 10 results.
    const maxResults = 10;
    const startIndex = req.query.startIndex || 0;
    const searchGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchRequest)}&key=${process.env.GOOGLE_BOOKS_API_KEY}&startIndex=${startIndex}&maxResults=${maxResults}`;

    // Ask Google Books for the books that match the search term (using axios)
    const searchResult = await axios.get(searchGoogleBooks);
    console.log("Line 39");
    // If no books were found, let the user know
    if (searchResult.data.totalItems === 0) {
      return res.status(404).json({
        success: false,
        message: "We couldn't find your book. Try something else!",
      });
    }

    // Simplify the data we got from Google Books into just the useful bits
    const books = searchResult.data.items.map((item) => ({
      id: item.id, // Each book has a unique ID
      title: item.volumeInfo.title, // The title of the book
      authors: item.volumeInfo.authors || ["Unknown Author"], // The book's authors (or "Unknown" if not listed)
      description: item.volumeInfo.description || "No description available.", // A short description of the book
      thumbnail:
        item.volumeInfo.imageLinks?.thumbnail || "No image available.", // A picture of the book's cover
      link: item.volumeInfo.infoLink, // A link to learn more about the book
    }));

    // Send the list of books back to the user
    return res.status(200).json({
      success: true,
      books,
    });

  } catch (error) {
    // If something goes wrong, show an error message
    console.error("Error fetching books from Google Books API:", error);
    return res.status(500).json({
      success: false,
      message: "Oops! Something went wrong while searching for books.",
      error: error.message,
    });
  }
});

// Use the router in the app
app.use('/', searchBookshelf);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

