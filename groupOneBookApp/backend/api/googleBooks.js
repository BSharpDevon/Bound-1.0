// Import the Axios library so we can use it to make requests to the Google Books API
import axios from 'axios';

// Create a special version of Axios just for talking to the Google Books API
const googleBooksApi = axios.create({
  // This is the address where the Google Books API lives
  baseURL: 'https://www.googleapis.com/books/v1',
  
  // These are default settings, like the API key, so every request has it
  params: {
    key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY, // Fetches the API key from .env file
  },
});

// By exporting this "special Axios" setup, we make it reusable in other parts of the app.
// It lets us send requests to the Google Books API without redoing the setup each time.
// For example, in another file, we can import it and use it like this:
// import googleBooksApi from './api/googleBooksApi';
// googleBooksApi.get('/volumes?q=searchTerm') will send a request to Google Books.
export default googleBooksApi;

//Below we can start writing calls to the API for info and set variables that we can export to React.



// This code is for the integration of Google API for book search
const axios = require('axios');

async function searchBooks(query) {
    const apiKey = AIzaSyCNu_yweFwkOR34yCQnTX73rI_koG-FvdQ;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        return {
            status: 200,
            data: response.data.items, // Books search results
        };
    } catch (error) {
        console.error('Error fetching books from Google API:', error);
        return {
            status: 500,
            message: 'Error fetching books from Google API.',
        };
    }
}
//Route for searching books:

router.get('/api/search-books', async (req, res) => {
    const { query } = req.query; // Query parameter for the book search term
    const result = await searchBooks(query);

    if (result.status === 200) {
        res.status(200).json(result.data); // Return the search results
    } else {
        res.status(result.status).json({ message: result.message }); // Error response
    }
});