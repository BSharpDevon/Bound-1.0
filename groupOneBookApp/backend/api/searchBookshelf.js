// Import the libraries we need
import express from 'express'; // For building the web server
import axios from 'axios'; // For making HTTP requests

// Router function helps create separate shelves for each section in an app
const searchBookshelf = express.Router();

// search endpoint
searchBookshelf.get('/search', async (req, res) => {
  const { searchRequest } = req.query;

  // If the user didn't give us a search term, show an error message
  try {
    if (!searchRequest) {
      return res.status(400).json({
        success: false,
        message: "Please enter something in the search bar."
      });
    }

    // The URL to ask Google Books for the search results, returns top 10 results.
    const maxResults = 10;
    const startIndex = req.query.startIndex || 0;
    const searchGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchRequest)}&key=${process.env.GOOGLE_BOOKS_API_KEY}&startIndex=${startIndex}&maxResults=${maxResults}`;

    // Ask Google Books for the books that match the search term (using axios)
    const searchResult = await axios.get(searchGoogleBooks);

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

// Export the shelf module so it can be used in our main app
export default searchBookshelf;