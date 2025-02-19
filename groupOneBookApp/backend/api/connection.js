import mysql from 'mysql2'; // Use the callback-based version
import 'dotenv/config';

// Create a callback-based MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Connection: Database connection failed: ' + err.stack);
    } else {
        console.log('Connection: Connected to database.');
        connection.release(); // Release the connection back to the pool
    }
});

// Export the pool for use in other modules
export default pool;
