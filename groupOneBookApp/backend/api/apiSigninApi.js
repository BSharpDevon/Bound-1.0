// Imports built-in and third-party libraries
import axios from 'axios'; // For making HTTP requests
import express from 'express'; // For building the web server
import bcrypt from 'bcrypt'; // For password hashing
import cors from 'cors'; // For handling cross-origin requests
import mysql from 'mysql2/promise'; // For promise-compatible database communication

// Create an instance of Axios for API requests
export default axios.create({
  baseURL: "http://localhost:8000", // Default base URL for the backend
});

// Initialise the Express application
const sqlDBApi = express();

// Set up CORS middleware
sqlDBApi.use(cors());

// Set up middleware to parse JSON requests
sqlDBApi.use(express.json());

// Configure the MySQL connection pool using promise-based API
const pool = mysql.createPool({
  host: process.env.DB_HOST,          // Database server address
  user: process.env.DB_USER,          // Database username
  password: process.env.DB_PASSWORD,  // Database password
  database: 'bound_db',               // Database name
  waitForConnections: true,           // Wait if all connections are busy
  connectionLimit: 10,                // Maximum number of connections
  queueLimit: 0,                      // No limit on queued requests
});

// Sign up endpoint
sqlDBApi.post("/bound/signup", async (req, res) => {
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

// Login endpoint
sqlDBApi.post("/bound/login", async (req, res) => {
  const { email, password } = req.body;

  try {
      // 1. Query the database to find the user by their email
      const [memberResultsFound] = await pool.query("SELECT * FROM members WHERE email = ?", [email]);

      // 2. Check if the user exists
      if (memberResultsFound.length === 0) {
          console.log(`Login attempt failed for email: ${email} - User not found`);
          return res.status(404).json({ success: false, message: "User not found" });
      }

      const user = memberResultsFound[0];

      // 3. Compare the provided password with the stored (hashed) password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          console.log(`Login attempt failed for email: ${email} - Invalid password`);
          return res.status(401).json({ success: false, message: "Invalid password" });
      }

      console.log(`Login successful for email: ${email}`);
      return res.status(200).json({
          success: true,
          message: "Login successful",
          user: { email: user.email, id: user.id },
      });
  } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
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

// Call the database connection test
testDatabaseConnection();

// Export the app to be used elsewhere (like in `server.js`)
export default sqlDBApi;