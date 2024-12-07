import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/logo.svg";
import Footer from "./footer.jsx";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [memberId, setMemberId] = useState(null); // State for memberId
  const navigate = useNavigate();

  // Check localStorage for memberId
  useEffect(() => {
    const storedMemberId = localStorage.getItem("memberId");
    if (storedMemberId) {
      setMemberId(storedMemberId);
    } else {
      alert("No member ID found. Please log in again.");
      navigate("/"); // Redirect to login page if no memberId
    }
  }, [navigate]);

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  console.log('Searching for books for member ID:', memberId);

  const handleSearch = async () => {
    if (!searchTerm) {
      alert("Please enter a book title.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:8000/search?searchRequest=${encodeURIComponent(searchTerm)}`
      );
      const data = response.data;

      if (data.success) {
        setBooks(data.books);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch books, please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to select a book
  const handleBookSelect = (book) => {
    setSelectedBook(book); // Update the selected book state
    setSearchTerm(book.title); // Update the input field with the selected book's title
  };

  const handleSubmit = async () => {
    if (!selectedBook) {
      alert("Please select a book to continue.");
      return;
    }

    if (!memberId) {
      alert("No member ID found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/selectedBooks", {
        memberId, // Send the memberId from localStorage
        id: selectedBook.id,
      });

      if (response.data.success) {
        console.log("Books selected!");
        navigate("/homepage");
      } else {
        alert(response.data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during selection:", err.message);
      alert("An error occurred while submitting books. Please try again.");
    }
  };

  return (
    <div id="favouriteBooksContent">
      <img id="logo" src={logo} alt="Bound Logo" />

      <h2>WELCOME!</h2>
      <p className="favouriteBooksMessage">
        There&apos;s nothing like a good book. Search for your three favourite
        reads and save them to your library.
      </p>

      <div className="book-search-container">
        <label>
          <input
            type="text"
            placeholder="Choose book"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </label>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="book-results">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                className={`book-card ${selectedBook?.id === book.id ? "selected" : ""}`}
                onClick={() => handleBookSelect(book)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => e.key === "Enter" && handleBookSelect(book)}
                style={{ cursor: "pointer", marginBottom: "10px" }}
              >
                <img src={book.thumbnail} alt={book.title} />
                <h2>{book.title}</h2>
                <p>
                  <strong>Authors:</strong> {book.authors.join(", ")}
                </p>
                <p>{book.description}</p>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  More info
                </a>
              </div>
            ))
          ) : (
            !loading && <p>No books found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookSearch;
