// Import the libraries we need
import express from 'express'; // For defining API routes
import pool from './connection.js'; // Importing the connection SQL pool

// Create a router for API endpoints
const router = express.Router();

// Endpoint: Add a friend 
router.post('/addFriend', async (req, res) => {
  // Extract the friend's email sent over from frontend
  const { friendsEmail } = req.body;

  // Check if the email was provided
  if (!friendsEmail) {
    return res.status(400).json({ error: "Please enter your friend's email address" });
  }

  try {
    // 1. Check if already added as a friend
    const [existing] = await pool.query(
      'SELECT 1 FROM friends WHERE friends_email = ?',
      [friendsEmail]
    );
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: `${friendsEmail} is already your friend`,
      });
    }

    // 2. Look up the member_id for that email
    const [memberRows] = await pool.query(
      'SELECT member_id FROM members WHERE email = ?',
      [friendsEmail]
    );
    // If no matching member, return 404
    if (memberRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No user found with email ${friendsEmail}`,
      });
    }
    // Get friend's Id
    const friendId = memberRows[0].member_id;

    // 3. Add friend into SQL table
    await pool.query(
      'INSERT INTO friends (friends_email, friend_id) VALUES (?, ?)',
      [friendsEmail, friendId]
    );

    // Sucess message for friend
    return res.status(201).json({
      success: true,
      message: `${friendsEmail} is now your friend!`,
    });
    // error message if friend couldn't be added
  } catch (err) {
    console.error('Error in /addFriend:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while adding friend. Please try again.',
    });
  }
});

// Endpoint: Get friends list 
router.get('/friends', async (req, res) => {
  try {
    // Fetch all friends
    const [rows] = await pool.query(
      'SELECT friend_id, friends_email FROM friends'
    );
// success message 
    return res.json({
      success: true,
      friends: rows
    });
// error message if no friends can be found
  } catch (err) {
    console.error('Error in /friends:', err);
    return res.status(500).json({
      success: false,
      message: 'Could not fetch friends. Please try again.'
    });
  }
});

export default router;