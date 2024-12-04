import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import bindimage from '../assets/images/bind-image.svg';
import Footer from './footer.jsx';

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
  setUserLibrary((prevLibrary) => {
    // Check if the book is already in the library
    if (prevLibrary.some((b) => b.id === book.id)) {
      alert(`${book.title} is already in your library.`);
      return prevLibrary;
    }
    // Add the book to the library
    return [...prevLibrary, book];
  });
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

      <div className="homepage-header">
      {/* Logo Section */}
      <div className="homepage-logo">
      <img id="logo" src={logo} alt="Bound Logo" />
      </div>

      {/* Search Bar Section */}
      <div className="search-bar">
        <input className='search-input'
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

      </div>

      <div class="homepage-content">

      <div class="homepage-sidebar">

      {/* User's Library Section */}
      <div className="user-library">
        <h2 id="homepage-subheadings">Your Friends</h2>
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
        <h2 id="homepage-subheadings">Your Binds</h2>
        <img src={bindimage}/>
        <div className="binds">
          {userBinds.map((bind, index) => (
            <div key={index} className="bind-item">
              <img src={bind.bookCover} alt={bind.bookTitle} width="50" height="75" />
              <p>Bind with {bind.fullName}</p>
            </div>
          ))}
        </div>

              <div className="start-bind">
        <button id="signUpButton" onClick={startBind}>START NEW BIND</button>
      </div>

      </div>
      </div>

      <div class="central-panel">
        <h2 id="homepage-subheadings">Your Library</h2>
      </div>

      </div>

      <Footer/>

    </div>
  );
}

export default HomePage;