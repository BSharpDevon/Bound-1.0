// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import pool from "./connection.js";
// import bodyParser from 'body-parser';


// //Initialise the Express application
// const app = express();
// app.use(bodyParser.json())
// app.use(cors());
// app.use(express.json());



// app.post("/add-friend", (req,res) => {

//     const { friendEmail } = req.body; // Extract email from query parameters
//     if (!friendEmail) {
//         return res.status(400).json({ error: "we need an email" });
//     }

//     const checkMembersQuery = 
//     "SELECT email FROM  members where email IN (?,?)"
//      db.query(checkMemberQuery, [friendEmail], (err, results) => {
//             if (err) {
//                 console.error ("error checking database", err);
//             return res.status(500).json({error: "database error"});
//         }
//             if (results.length<2) {
//                 return res.status(404).json({ error: "one or both users not found"})
//             }

//             const insertFriendshipQuery = `
//             INSERT INTO friendships (user_id, friend_id) 
//             VALUES (?, ?), (?, ?)
//         `;
//         db.query(insertFriendshipQuery, [friend1_email, friend2_id,], err => {
//             if (err) {
//                 console.error('Error inserting friendship:', err);
//                 return res.status(500).json({ error: 'Database error' });
//             }

//             // Return both user details
//             res.json({ message: 'Friend added successfully', users: results });
//         });
//     });
// });




// //   // Test the database connection
// //   const testDatabaseConnection = async () => {
// //     try {
// //         const connection = await pool.getConnection();
// //         console.log('Connected to database.');
// //         connection.release(); // Release the connection back to the pool.
// //     } catch (err) {
// //         console.error('Database connection failed: ',err.stack);
// //     }
// // };



// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}!`);

// }); 