import axios from 'axios';
export default axios.create({
    baseURL: "http://localhost:8000",  
    // Use port 8000 - the one being listened to on backend.
    // This is the default URL for our app
  });

// Imports the express library, which is one of the installed dependencies.
// It's a special tool to build a web server and lets us communicate with users' computers.
const express = require('express');
// Creates a variable which represents the Express app. 
// We can use this to build our web server and handle requests (explained below).
const app = express();

// Use bcrypt for password hashing
const bcrypt = require("bcrypt"); 

// Creates a variable which represents the cors app.
const cors = require('cors');
app.use(cors());

// This connects the MySQL library to the JavaScript file.
// It is also one of the installed dependencies.
const mysql = require('mysql2');

// This loads the dotenv library, which helps us use settings stored in a .env file.
// These settings include important information like passwords and API keys without showing them in our code.
require('dotenv').config({ path: './passwords.env' }); 

// This sets up a connection pool for MySQL, which is like having a group of helpers ready to talk to the database.
// It allows our app to handle multiple requests at once without making a new connection each time.
const pool = mysql.createPool({
    host: process.env.DB_HOST,          // The MySQL server address - linking to the env file.
    user: process.env.DB_USER,          // The MySQL server username - (connects to the MySQL server through the linked env file).
    password: process.env.DB_PASSWORD,  // The MySQL user password - this is safe in the .env file.
    database: 'bound_db',               // The name of the MySQL database we want to use.
    waitForConnections: true,           // This waits for a free connection if all are busy.
    connectionLimit: 10,                // The maximum number of connections we can have at the same time.
    queueLimit: 0,                      // There's no limit on how many requests can wait for a connection.
});

// A constant named `PORT`, which sets the number 8000 as the place where our server will listen for requests.
// It’s like giving our server a specific door to wait for visitors to come in.
const PORT = 8000;

// This sets up middleware to read and understand JSON data sent by the client.
// It makes it easy for our server to get the information from the client in a format it can use.
app.use(express.json());

// Set up a route (a path where we handle login requests):
app.post('bound/login', (req, res) => {
    // Pull the email and password from the request body (what the user typed):
    const { email, password } = req.body;


//Another end point to test for log in button: 

// Login endpoint
app.post("/bound/login", async (req, res) => {
    // Extract the email and password from the request body
    const { email, password } = req.body;
  
    try {
      // 1. Query the database to find the user by their email
      const userQuery = "SELECT * FROM users WHERE email = $1";
      const userResult = await pool.query(userQuery, [email]);
  
      // 2. Check if the user exists
      if (userResult.rows.length === 0) {
        // If no user is found, send a 404 response with a message
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // 3. Retrieve the user details from the query result
      const user = userResult.rows[0];
  
      // 4. Compare the provided password with the stored (hashed) password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      // 5. If the password is incorrect, send a 401 Unauthorized response
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid password" });
      }
  
      // 6. If everything checks out, send a success response with the user's details
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: { email: user.email, id: user.id }, // Example of returning user info
      });
    } catch (error) {
      // 7. Handle any errors that occur during the process
      console.error("Error during login:", error);
      // Send a 500 Internal Server Error response if an error occurs
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });


    //First attempt to connect Login button email and password
    // // SQL query to find the user in the database by their email:
    // const findMember = 'SELECT * FROM members WHERE email = ?';

    // // Ask the database if there’s a match for this email
    // pool.query(findMember, [email], (err, results) => {
    //     // If something goes wrong with the database it will print below error:
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).json({ message: 'Database error' });
    //     }

    //     // If no user is found, send back a "not found" message:
    //     if (results.length === 0) {
    //         return res.status(404).json({ message: 'Email not found' });
    //     }

    //     // Take the first result (the user we found)
    //     const boundMember= results[0];

    //     // Check if the password matches the one in the database
    //     bcrypt.compare(password, boundMember.password, (bcryptErr, isMatch) => {
    //         // If there’s an error checking the password, let us know
    //         if (bcryptErr) {
    //             return res.status(500).json({ message: 'Error verifying password' });
    //         }

    //         // If the password doesn’t match, send back an "invalid" message
    //         if (!isMatch) {
    //             return res.status(401).json({ message: 'Invalid email or password' });
    //         }

    //         // If everything is good, send back a success message and user details
    //         res.status(200).json({ message: 'Login successful', boundMember });
//         });
//     });
});


//Example hashing function for registration endpoint: 

// const bcrypt = require("bcrypt");

// app.post("/register", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert the user into the database
//     const insertQuery = "INSERT INTO users (email, password) VALUES ($1, $2)";
//     await pool.query(insertQuery, [email, hashedPassword]);

//     res.status(201).json({ success: true, message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });



// Tests the connect to SQL
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
    connection.release(); // Release the connection back to the pool.
});

// This line makes our server listen for incoming requests on the port we specified at the start (8000).
// It logs a message to the console when the server is running, so we know it’s working.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
