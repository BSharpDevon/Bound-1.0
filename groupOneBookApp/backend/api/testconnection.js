import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./connection.js";
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'

var app = express();

app.use(bodyParser.json())
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

app.post("/signup", (req, res) => {
    const { email, fullName, password, privacyAccepted } = req.body
    if (!email || !fullName || !password || !privacyAccepted) {
        return res.status(400).json({
            success: false,
            message: "All fields are required, and privacy must be accepted.",
        });
    }
    try {
        // Step 1: Look in the database to see if someone already signed up with this email.
        const sql = "SELECT * FROM members WHERE email = ?";
        pool.query(sql, [email], (err, members) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }
            if (members.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "Email is already registered.",
                });
            }
        });
      // Step 2: Hash the password
        const saltRounds = 10
        function hashThePassword(thePassword){
            const hash = bcrypt.hashSync(thePassword, saltRounds);
            return hash
        }
      // Step 3: Add the new user to the database
        const theQuery = "INSERT INTO members (email, full_name, password) VALUES (?, ?, ?)";
        pool.query(theQuery,
            [email, fullName, hashThePassword(password)],
            (err, result) => {
                if (err) {
                    console.error("Error creating new member: ", err.message);
                    return res.status(500).json({error:"Database error"});
                }
                return res.status(201).json({
                    success: true,
                    member_id: result.insertId,
                    message: `New member added: ${email}`,
                    user: { fullName, email }, // Returning new members' details
                });
            }
        )
    } catch (error) {
        console.error("Error during signup:", error); // Logging for the error
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message, // Send the error message for debugging
        });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Query the database to find the user by their email
        const sql = "SELECT * FROM members WHERE email = ?"
        pool.query(sql, [email], (err, members) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }
            // 2. Check if the user exists
        if (members.length === 0) {
            console.log(`Login attempt failed for email: ${email} - User not found`);
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const user= members[0]
        const hash= members[0].password
        function comparePassword(password, hash) {
            bcrypt.compare(password, hash, function(err, result) {
                return result
            });
        }
        if (comparePassword(password, hash) === false) {
            console.log(`Login attempt failed for email: ${email} - Invalid password`);
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        console.log(`Login successful for email: ${email}`);
        return res.status(200).json({
            success: true,
            member_id: user.member_id,
            message: "Login successful",
            user: { email: user.email, id: user.id },
        });
        // After successful login (in your /login route handler)
        localStorage.setItem('member_id', response.data.member_id); // Storing the member_id
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

//   // Test the database connection
//   const testDatabaseConnection = async () => {
//       try {
//           const connection = await pool.getConnection();
//           console.log('Connected to database.');
//           connection.release(); // Release the connection back to the pool.
//       } catch (err) {
//           console.error('Database connection failed: ' + err.stack);
//       }
//   };

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});