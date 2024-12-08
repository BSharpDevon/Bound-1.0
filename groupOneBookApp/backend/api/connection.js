import mysql from 'mysql2/promise';  // Use the promise-based version
import 'dotenv/config'
import express from 'express'

const app = express();
app.use(express.json());

// Create a promise-based MySQL connection pool
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
});

export default pool;