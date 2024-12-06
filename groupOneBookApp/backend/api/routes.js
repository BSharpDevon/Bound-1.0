// Below shows the routes for the features : (searching friends and binding books).
const express = require('express');
const { searchFriends, bindBooks } = require('./friendsController');

const router = express.Router();

// Route to search for friends
router.get('/api/search-friends', async (req, res) => {
    const { userId, query } = req.query;
    const result = await searchFriends(userId, query);

    if (result.status === 200) {
        res.status(200).json(result.data);
    } else {
        res.status(result.status).json({ message: result.message });
    }
});

// Route to bind books with a friend
router.post('/api/bind-books', async (req, res) => {
    const { userId, friendId, bookId } = req.body;
    const result = await bindBooks(userId, friendId, bookId);

    if (result.status === 200) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.status).json({ message: result.message });
    }
});

module.exports = router;
