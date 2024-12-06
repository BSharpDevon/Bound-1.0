//Search Bar:
//Integrate Google API for book search.
//Allow users to search for a book, and upon selection, add it to their library.

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