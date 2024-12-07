// selectedBooks.js
import express from 'express';
import pool from './connection.js'; // Correct import for connection pool

const router = express.Router(); // Define the route handler

router.post("/", (req, res) => {
  const { googlebookId, memberId } = req.body;

  if (!googlebookId || !memberId) {
    return res.status(400).json({ error: "Missing googlebookId or memberId" });
  }

  const checkSql = "SELECT * FROM favourite_books WHERE member_id = ? AND googlebookId = ?";
  
  pool.query(checkSql, [memberId, googlebookId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error during check" });
    }

    // If the book is already a favourite
    if (results.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Book already a favourite",
      });
    }

    const insertSql = "INSERT INTO favourite_books (member_id, googlebookId) VALUES (?, ?)";
    pool.query(insertSql, [memberId, googlebookId], (err, insertResult) => {
      if (err) {
        return res.status(500).json({ error: "Database error during insert" });
      }

      return res.status(201).json({
        success: true,
        message: "Book added to favourites",
        favouriteId: insertResult.insertId,
      });
    });
  });
});

export default router;
