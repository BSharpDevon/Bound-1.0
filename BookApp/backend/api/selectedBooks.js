import express from 'express';
import pool from './connection.js'; // Importing the connection SQL pool
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';  // Import cors to handle cross-origin requests

dotenv.config();  // Load environment variables

const app = express();
app.use(bodyParser.json());  // Middleware to parse JSON
app.use(cors());  // Allow cross-origin requests

const router = express.Router();

// Route to handle adding books to favourites
router.post("/favouriteBooks", async (req, res) => {
  console.log("Incoming body:", req.body);
  console.log("googlebookId received:", req.body.googlebookId);
  console.log("memberId received:", req.body.memberId);

  const { googlebookId, memberId } = req.body;  // Extract googlebookId and memberId from request body

  // Check if both googlebookId and memberId are provided
  if (!googlebookId || !memberId) {
    return res.status(400).json({ error: "Missing googlebookId or memberId" });
  }

  try {
    // Check if the book is already a favourite
    const [results] = await pool.query("SELECT * FROM favourite_books WHERE member_id = ? AND googlebookId = ?", [memberId, googlebookId]);

    if (results.length > 0) {  // If the book is already a favourite
      return res.status(409).json({
        success: false,
        message: "Book already a favourite",
      });
    }

    // Insert the book as a favourite
    const [insertResult] = await pool.query("INSERT INTO favourite_books (member_id, googlebookId) VALUES (?, ?)", [memberId, googlebookId]);

    return res.status(201).json({
      success: true,
      message: "Book added to favourites",
      favouriteId: insertResult.insertId, // Return the inserted record's ID
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
});

app.use("/search-bookshelf", router);

// commented out the below as was causing conflicts with server.js and not allowing backend to run 
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default router;  // Export the router
