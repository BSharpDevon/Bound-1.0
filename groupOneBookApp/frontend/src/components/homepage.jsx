import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [userLibrary, setUserLibrary] = useState([]);  // Local state for user's library
  const [userBinds, setUserBinds] = useState([]);  // Local state for user's binds
  const navigate = useNavigate();

  // Fetch books from API based on search query
  const searchBooks = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`https://api.example.com/books?search=${query}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Handle the change in the search bar
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    searchBooks(event.target.value);
  };

  // Function to handle adding book to library
  const handleAddToLibrary = (book) => {
    setUserLibrary((prevLibrary) => [...prevLibrary, book]);  // Add the book to the library
  };

  // Function to navigate to the "Start Bind" page
  const startBind = () => {
    if (!selectedBook) {
      alert("Please select a book to start a bind.");
      return;
    }

    // Navigate to the start bind page with the selected book
    navigate("/start-bind", { state: { book: selectedBook } });
  };

  return (
    <div className="homepage">
      {/* Logo Section */}
      <div className="logo">
        <img src="placeholder-logo.png" alt="Logo" width="150" height="150" />
      </div>

      {/* Search Bar Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="What do you want to read?"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="search-results">
          {searchResults.map((book, index) => (
            <div
              key={index}
              className="search-result-item"
              onClick={() => handleAddToLibrary(book)}  // Add to library on click
            >
              <img src={book.cover} alt={book.title} width="50" height="75" />
              <p>{book.title}</p>
              <p>{book.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User's Library Section */}
      <div className="user-library">
        <h2>Your Library</h2>
        <div className="library-books">
          {userLibrary.map((book, index) => (
            <div key={index} className="library-book">
              <img src={book.cover} alt={book.title} width="50" height="75" />
              <p>{book.title}</p>
              <p>{book.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User's Binds Section */}
      <div className="user-binds">
        <h2>Your Binds</h2>
        <div className="binds">
          {userBinds.map((bind, index) => (
            <div key={index} className="bind-item">
              <img src={bind.bookCover} alt={bind.bookTitle} width="50" height="75" />
              <p>Bind with {bind.fullName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Start New Bind Section */}
      <div className="start-bind">
        <button onClick={startBind}>Start a New Bind</button>
      </div>
    </div>
  );
}

export default HomePage;