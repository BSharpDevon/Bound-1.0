import express from "express"; // Import the Express framework for creating the router and defining routes.
import "dotenv/config"; // Automatically loads environment variables from a .env file into process.env.
import pool from "./connection.js"; // Import the MySQL connection pool for database queries.
import bcrypt from "bcrypt"; // Import bcrypt for hashing and comparing passwords securely.

const router = express.Router(); // Create a new router instance to handle user-related routes.

// GET /members - Fetch all members test
router.get("/members", async (req, res) => {
    try {
        const [membersList] = await pool.promise().query("SELECT * FROM members"); 
        // Query the database to fetch all rows from the 'members' table.
        res.send(membersList); 
        // Send the query results back to the client as the response.
    } catch (err) {
        console.error("Error fetching members:", err.message); 
        // Log any errors that occur while querying the database.
        res.status(500).json({ error: "Database error" }); 
        // Respond with a 500 status code and an error message if a database error occurs.
    }
});

// POST /signup - User Registration
router.post("/signup", async (req, res) => {
    const { email, fullName, password, privacyAccepted } = req.body; 
    // Destructure the request body to extract the email, full name, password, and privacy agreement.
    
    if (!email || !fullName || !password || !privacyAccepted) {
        // Check if all required fields are provided.
        return res.status(400).json({
            success: false,
            message: "All fields are required, and privacy must be accepted.",
        });
    }

    try {
        // Step 1: Check if the email is already registered
        const [members] = await pool.promise().query(
            "SELECT * FROM members WHERE email = ?",
            [email]
        ); 
        // Query the database to see if the email already exists.

        if (members.length > 0) {
            // If a user with the same email exists, return a 409 (Conflict) response.
            return res.status(409).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        // Step 2: Hash the password
        const saltRounds = 10; 
        // Define the number of salt rounds for bcrypt hashing.
        const hashedPassword = bcrypt.hashSync(password, saltRounds); 
        // Hash the password synchronously.

        // Step 3: Insert the new user into the database
        const [result] = await pool.promise().query(
            "INSERT INTO members (email, full_name, password) VALUES (?, ?, ?)",
            [email, fullName, hashedPassword]
        ); 
        // Insert the new member's data into the database.

        const member_id = result.insertId; 
        // Retrieve the ID of the newly inserted member.

        res.status(201).json({
            success: true,
            message: `New member added: ${email}`,
            member_id, // Include the new member's ID in the response.
            user: { fullName, email }, // Return the new user's details in the response.
        });
    } catch (err) {
        console.error("Error during signup:", err.message); 
        // Log any errors that occur during the signup process.
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});

// POST /login - User Authentication
router.post("/login", async (req, res) => {
    const { email, password } = req.body; 
    // Extract the email and password from the request body.

    try {
        const [members] = await pool.promise().query(
            "SELECT * FROM members WHERE email = ?",
            [email]
        ); 
        // Query the database to find the user with the provided email.

        if (members.length === 0) {
            // If no user with the provided email is found, return a 404 (Not Found) response.
            console.log(`Login attempt failed for email: ${email} - User not found`);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const user = members[0]; 
        // Get the first (and only) result from the query.

        const isPasswordValid = await bcrypt.compare(password, user.password); 
        // Compare the provided password with the hashed password stored in the database.

        if (!isPasswordValid) {
            // If the password is invalid, return a 401 (Unauthorized) response.
            console.log(`Login attempt failed for email: ${email} - Invalid password`);
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        console.log(`Login successful for email: ${email}`); 
        // Log successful login attempts for debugging.
        res.status(200).json({
            success: true,
            message: "Login successful",
            member_id: user.id, 
            email: user.email,
        }); // Returns basic info 
        
    } catch (err) {
        console.error("Error during login:", err.message); 
        // Log any errors that occur during the login process.
        res.status(500).json({ success: false, message: "Internal server error" }); 
        // Return a 500 (Internal Server Error) response if something goes wrong.
    }
});

export default router; 
// Export the router so it can be used in other parts of the application, such as in server.js.