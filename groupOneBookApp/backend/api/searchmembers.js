import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./connection.js";
import bodyParser from 'body-parser';


//Initialise the Express application
const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());



app.get("/search-members", (req,res) => {

    const { email } = req.query; // Extract email from query parameters
    if (!email) {
        return res.status(400).json({ error: "we need an email" });
    }
    const sql = "SELECT * FROM members WHERE email LIKE ? "
    pool.query(sql, [`%${email}`], (err, results) => {
        if (err) {
            console.error("error fetching members", err.message)
            return res.status(500).json({error: "error searching for friends"})
        }
        res.json(results);
    });
});


//   // Test the database connection
//   const testDatabaseConnection = async () => {
//     try {
//         const connection = await pool.getConnection();
//         console.log('Connected to database.');
//         connection.release(); // Release the connection back to the pool.
//     } catch (err) {
//         console.error('Database connection failed: ',err.stack);
//     }
// };

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
   
});