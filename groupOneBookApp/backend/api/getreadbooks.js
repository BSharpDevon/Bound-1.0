// // Import necessary modules
// const express = require('express');
// const { getReadBooks } = require('./readBooksController'); // Import the function you created for getting read books

// const router = express.Router();

// // Define the route for getting read books
// router.get('/api/read-books', async (req, res) => {
//     const result = await getReadBooks();

//     // Send the result to the frontend based on the status code
//     if (result.status === 200) {
//         res.status(200).json(result.data); // Send the books data if found
//     } else {
//         res.status(result.status).json({ message: result.message }); // Send an error message if no books found
//     }
// });


// // Import the db connection from db.js (where the MySQL connection is configured)
// const db = require('./db');

// // Export the router to use in the main app
// module.exports = router;

// // Function to retrieve books with a "read" status
// async function getReadBooks() {
//     const query = 'SELECT * FROM books WHERE status = "read"';
//     try {
//         // Execute the query to fetch books with a "read" status
//         const [results] = await db.execute(query);

//         // If no books are found, return a 400 status (Bad Request)
//         if (results.length === 0) {
//             return {
//                 status: 400,
//                 message: 'No read books found',
//             };
//         }

//         // Return the results with a 200 status (OK) if the query is successful
//         return {
//             status: 200,
//             data: results,  // Array of read books
//         };
//     } catch (error) {
//         // Log the error to the console for debugging purposes
//         console.error('Error fetching read books:', error);

//         // Return a 500 status (Server Error) if there's a database error
//         return {
//             status: 500,
//             message: 'Internal server error, please try again later.',
//             error: error.message,  // Include the error message for further diagnostics
//         };
//     }
// }

// // Export the function to use in other parts of the project (e.g., route handlers or controllers)
// module.exports = {
//     getReadBooks,
// };
