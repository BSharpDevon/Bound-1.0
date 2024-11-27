// Imports the express library, which is one of the installed dependencies.
// It's a special tool to build a web server and lets us communicate with users' computers.
const express = require('express');
// Creates a variable which represents the Express app. 
// We can use this to build our web server and handle requests (explained below).
const app = express();

// Creates a variable which represents the cors app.
const cors = require('cors');
app.use(cors());

// This connects the MySQL library to the JavaScript file.
// It is also one of the installed dependencies.
const mysql = require('mysql2');

// Get all items
app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// This loads the dotenv library, which helps us use settings stored in a .env file.
// These settings include important information like passwords and API keys without showing them in our code.
require('dotenv').config();

// This sets up a connection pool for MySQL, which is like having a group of helpers ready to talk to the database.
// It allows our app to handle multiple requests at once without making a new connection each time.
const pool = mysql.createPool({
    host: process.env.DB_HOST,          // The MySQL server address - linking to the env file.
    user: process.env.DB_USER,          // The MySQL server username - (connects to the MySQL server through the linked env file).
    password: process.env.DB_PASSWORD,  // The MySQL user password - this is safe in the .env file.
    database: 'bound_db',          // The name of the MySQL database we want to use.
    waitForConnections: true,            // This waits for a free connection if all are busy.
    connectionLimit: 10,                 // The maximum number of connections we can have at the same time.
    queueLimit: 0,                       // There's no limit on how many requests can wait for a connection.
});

// A constant named `PORT`, which sets the number 8000 as the place where our server will listen for requests.
// It’s like giving our server a specific door to wait for visitors to come in.
const PORT = 8000;

// This sets up middleware to read and understand JSON data sent by the client.
// It makes it easy for our server to get the information from the client in a format it can use.
app.use(express.json());



db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});


// This line makes our server listen for incoming requests on the port we specified at the start (8000).
// It logs a message to the console when the server is running, so we know it’s working.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});