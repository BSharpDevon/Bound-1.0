import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./connection.js";

var app = express();
app.use(cors());

app.get("/members", (req, res) => {
    const sql = "SELECT * FROM members";

    pool.query(sql, (err, results) => {
        if (err) {
        console.error("Error fetching members", err.message);
        return res.status(500).json({ error: "Database error" });
        }
        res.send(results)
    });
});

// Sign up endpoint
app.post("/signup", async (req, res) => {
    const { email, fullName, password, privacyAccepted } = req.body;
  
    if (!email || !fullName || !password || !privacyAccepted) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, and privacy must be accepted.",
      });
    }
    
    try {
      // Step 1: Look in the database to see if someone already signed up with this email.
      const [searchMembers] = await pool.query("SELECT * FROM members WHERE email = ?", [email]);
  
      if (searchMembers.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered.",
        });
      }
  
      // Step 2: Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Step 3: Add the new user to the database
      const [newUserResult] = await pool.query(
        "INSERT INTO members (email, full_name, password) VALUES (?, ?, ?)",
        [email, fullName, hashedPassword]
      );
  
      // Step 4: Respond with success and the user details
      return res.status(201).json({
        success: true,
        message: "New member added",
        user: { fullName, email }, // Returning new members' details
      });
  
    } catch (error) {
      console.error("Error during signup:", error); // Logging for the error
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message, // Send the error message for debugging
      });
    }
  });

app.listen(process.env.PORT, function (req, res) {
    console.log("Server Started!");
});