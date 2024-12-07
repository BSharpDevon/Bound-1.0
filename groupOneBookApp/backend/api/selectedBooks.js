import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./connection.js";
import bodyParser from 'body-parser'

var app = express();
app.use(bodyParser.json())
app.use(cors());

app.post("/selectedBooks", (req, res) => {
    const { googlebookId, member_id } = req.body;

    // Validate the input
    if (!googlebookId || !member_id) {
        return res.status(400).json({ error: "Missing googlebookId or member_id" });
    }

    try {
        // 1. Query to check if the book is already a favourite for the member
        const checkSql = "SELECT * FROM favourite_books WHERE member_id = ? AND googlebookId = ?";
        pool.query(checkSql, [member_id, googlebookId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database error during check" });
            }

            // If the book is already a favourite
            if (results.length > 0) {
                return res.status(409).json({ success: false, message: "Book already a favourite" });
            }

            // 2. Insert the book into the favourite_books table
            const insertSql = "INSERT INTO favourite_books (member_id, googlebookId) VALUES (?, ?)";
            pool.query(insertSql, [member_id, googlebookId], (err, insertResult) => {
                if (err) {
                    return res.status(500).json({ error: "Database error during insert" });
                }

                // Success response
                return res.status(201).json({ success: true, message: "Book added to favourites", favouriteId: insertResult.insertId });
            });
        });
    } catch (err) {
        return res.status(500).json({ error: "Unexpected error" });
    }
});

  // Test the database connection
  const testDatabaseConnection = async () => {
      try {
          const connection = await pool.getConnection();
          console.log('Connected to database.');
          connection.release(); // Release the connection back to the pool.
      } catch (err) {
          console.error('Database connection failed: ' + err.stack);
      }
  };

app.listen(process.env.PORT, function (req, res) {
    console.log("Server Started!");
});