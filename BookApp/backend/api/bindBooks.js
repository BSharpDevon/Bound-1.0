// // Bind a book with a friend
// async function bindBooks(memberId, friendId, bookId) {
//     const query = `INSERT INTO bind_books (member_id, friend_id, book_id) VALUES (?, ?, ?)`;
//     try {
//         await db.execute(query, [memberId, friendId, bookId]);
//         return { status: 200, message: 'Book successfully bound.' };
//     } catch (error) {
//         console.error('Error binding book:', error);
//         return { status: 500, message: 'Error binding book.' };
//     }
// }
// //app.listen(PORT , () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//     //});
    
// module.exports = {bindBooks };