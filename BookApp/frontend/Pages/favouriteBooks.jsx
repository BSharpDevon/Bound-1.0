/* BookSearch.jsx */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import logo from "../src/assets/images/logo.svg";
import Footer from "../src/components/footer.jsx";

const BookSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fullName = useSelector((state) => state.user.fullName);
  const memberId = useSelector((state) => state.user.memberId);

  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Search for books via backend
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a book title.");
      return;
    }
    setLoading(true);
    setError("");
    setBooks([]);
    try {
      const { data } = await axios.get(
        "http://localhost:8000/search-bookshelf/search",
        { params: { searchRequest: searchTerm } }
      );
      if (data.success) setBooks(data.books);
      else setError(data.message || "Search failed.");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Construct best available thumbnail URL (or fallback to content endpoint)
  const getThumbnailUrl = (book) => {
    const link =
      book.imageLinks?.extraLarge ??
      book.imageLinks?.large ??
      book.imageLinks?.medium ??
      book.imageLinks?.thumbnail ??
      null;
    if (link) return link;
    return `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=2&source=gbs_api`;
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSearchTerm(book.title);
  };

  const handleSubmit = async () => {
    if (!memberId) {
      alert("You must be logged in to add a book to your favourites.");
      return;
    }
    if (!selectedBook) {
      alert("Please select a book to continue.");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8000/search-bookshelf/favouriteBooks",
        {
          googlebookId: selectedBook.id,
          memberId,
        }
      );
      if (data.success) {
        setMessage("Book successfully added to your favourites!");
        setTimeout(() => navigate("/homepage"), 1500);
      } else {
        setError(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while submitting. Please try again.");
    }
  };

  return (
    <div id="favouriteBooksContent">
      <h2>Build Your Bookshelf</h2>
      <p className="favouriteBooksMessage">
        Search for a book and start filling your shelf.
      </p>

      <div className="book-search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Title, Author, ISBN..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())
              )
            }
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loading}>
            SEARCH
          </button>
          <button onClick={handleSubmit} disabled={!selectedBook || loading}>
            CONTINUE
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <div className="book-results">
          <div className="book-shelf">
            {books.map((book) => {
              const thumbnailUrl = getThumbnailUrl(book);
              return (
                <div
                  key={book.id}
                  className={`book${
                    selectedBook?.id === book.id ? " selected" : ""
                  }`}
                  style={{ backgroundImage: `url(${thumbnailUrl})` }}
                  onClick={() => handleBookSelect(book)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleBookSelect(book)
                  }
                >
                  <div
                    className="add-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBook(book);
                      handleSubmit();
                    }}
                  >
                    <i className='bx bx-book-add'></i>
                  </div>

                  {selectedBook?.id === book.id && (
                    <div className="book-label">
                      <strong className="book-title">{book.title}</strong>
                      <span className="book-author">
                        {book.authors.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookSearch;