/* BookSearch.jsx */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const BookSearch = () => {
  const navigate = useNavigate();
  const memberId = useSelector((state) => state.user.memberId);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [shelfBooks, setShelfBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: searchTerm,
            maxResults: 20,
          },
        }
      );
      const books = response.data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        imageLinks: item.volumeInfo.imageLinks || {},
      }));
      setResults(books);
    } catch (err) {
      console.error(err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (book) => {
    if (!memberId) {
      alert("Please log in to add books.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8000/search-bookshelf/favouriteBooks",
        { googlebookId: book.id, memberId }
      );
      setShelfBooks((prev) => [...prev, book]);
      setMessage(`Added \"${book.title}\" to your shelf.`);
      setResults([]);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
      setError("Failed to add book. Please try again.");
    }
  };

  const getThumbnail = (book) =>
    book.imageLinks.thumbnail ||
    `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=2`;

  return (
    <div id="favouriteBooksContent">
      <div
      <button ClassName="homeButton">
            < i class='bx  bx-home-alt'  ></i> HOME
          </button>
      <h2>Build Your Bookshelf</h2>
      <p className="favouriteBooksMessage">
        Search and add books to your shelf.
      </p>

      <div className="book-search-container" ref={wrapperRef}>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Title, Author, ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loading}>
            SEARCH
          </button>

          {results.length > 0 && (
            <ul className="search-dropdown">
              {results.map((book) => (
                <li key={book.id} className="dropdown-item">
                  <img src={getThumbnail(book)} alt={book.title} />
                  <span className="title">{book.title}</span>
                  <button
                    onClick={() => handleAdd(book)}
                    className="add-btn"
                  >
                    + Add
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <div className="book-results">
          <div className="book-shelf">
            {shelfBooks.map((book) => (
              <div
                key={book.id}
                className="book"
                style={{ backgroundImage: `url(${getThumbnail(book)})` }}
              />
            ))}
            {shelfBooks.length === 0 && (
              <p className="empty-message">Your shelf is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;