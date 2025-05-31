/* BookSearch.jsx */
import React, { useState, useRef, useEffect, useCallback } from "react";
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

  // AbortController ref to cancel in-flight requests
  const abortCtrlRef = useRef(null);

  // Click-outside clears dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search effect
  useEffect(() => {
    // Clear results if input empty
    if (!searchTerm.trim()) {
      setResults([]);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    // Cancel previous request
    if (abortCtrlRef.current) {
      abortCtrlRef.current.abort();
    }
    const controller = new AbortController();
    abortCtrlRef.current = controller;

    const timeoutId = setTimeout(async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes",
          {
            params: { q: searchTerm, maxResults: 20 },
            signal: controller.signal,
          }
        );
        const books = (response.data.items || []).map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          imageLinks: item.volumeInfo.imageLinks || {},
        }));
        setResults(books);
      } catch (err) {
        if (axios.isCancel(err)) {
          // request was aborted — no need to set error
        } else {
          console.error(err);
          setError("Search failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm]);

  const handleAdd = useCallback(
    async (book) => {
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
        setMessage(`Added "${book.title}" to your shelf.`);
        setResults([]);
        setSearchTerm("");
      } catch (err) {
        console.error(err);
        setError("Failed to add book. Please try again.");
      }
    },
    [memberId]
  );

  const getThumbnail = (book) =>
    book.imageLinks.thumbnail ||
    `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=2`;

  return (
    <div id="favouriteBooksContent">
      <div id="favouriteBooksHeader">
      <button onClick={() => navigate("/homepage")} className="homeButton" >
        <i className="bx bx-home-alt"></i> HOME
      </button>
      </div>
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
            // no more Enter key trigger
          />

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