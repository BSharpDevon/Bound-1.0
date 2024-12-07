// This file includes the logic for searching friends and binding books.
const db = require('./db');


// Search for friends by name (excluding self)
async function searchFriends(userId, searchQuery) {
   const query = `SELECT * FROM members WHERE full_name LIKE ? AND member_id != ?`;
   try {
       const [results] = await db.execute(query, [`%${searchQuery}%`, userId]);
       return { status: 200, data: results };
   } catch (error) {
       console.error('Error searching for friends:', error);
       return { status: 500, message: 'Error searching for friends.' };
   }
}


// Bind a book with a friend
async function bindBooks(userId, friendId, bookId) {
   const query = `INSERT INTO bind_books (member_id, friend_id, book_id) VALUES (?, ?, ?)`;
   try {
       await db.execute(query, [userId, friendId, bookId]);
       return { status: 200, message: 'Book successfully bound.' };
   } catch (error) {
       console.error('Error binding book:', error);
       return { status: 500, message: 'Error binding book.' };
   }
}


module.exports = { searchFriends, bindBooks };