import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/logo.svg";
import Footer from "./footer.jsx";
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import readingRoomAudio from '../assets/images/reading-room.mp3';


const BookSearch = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // State for success message
  const navigate = useNavigate();
  const fullName = useSelector((state) => state.user.fullName);
  const memberId = useSelector((state) => state.user.memberId); // Access the userId from Redux state

  const [isPlaying, setIsPlaying] = useState(false);

const toggleSound = () => {
  const audio = document.getElementById("ambientAudio");
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  setIsPlaying(!isPlaying);
};

const Typewriter = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <p>{displayedText}</p>;
};

useEffect(() => {
  const audio = document.getElementById("ambientAudio");
  if (audio) audio.volume = 0.25;
}, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
  
    // Convert to Title Case
    const titleCased = value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
    setSearchTerm(titleCased);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a book title.");
      return;
    }
    setLoading(true);
    setError("");
    setBooks([]); // Clear previous search results
    try {
      const response = await axios.get("http://localhost:8000/search-bookshelf/search", {
        params: { searchRequest: searchTerm },
      });
      const data = response.data;
      if (data.success) {
        setBooks(data.books);
      } else {
        setError(data.message || "Search failed.");
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again later.");
      console.error("Search Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to select a book
  const handleBookSelect = (book) => {
    setSelectedBook(book); // Update the selected book state
    setSearchTerm(book.title); // Update the input field with the selected book's title
  };

  // Function to add the selected book to favourites and navigate to homepage
  const handleSubmit = async () => {
    
    // error message if person isn't logged on for some reason.
    if (!memberId) {
      alert("You must be logged in to add a book to your favourites.");
      return;
    }

    if (!selectedBook) {
      alert("Please select a book to continue.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/search-bookshelf/favouriteBooks", {
        googlebookId: selectedBook.id, // Send the googlebookId (from selected book)
        memberId, // Retrieves user id from Redux store
      });
      console.log("Submission Response:", response.data);
      if (response.data.success) {
        setMessage("Book successfully added to your favourites!");
        // Optionally, you can navigate to the homepage after a short delay
        setTimeout(() => navigate("/homepage"), 1500);
      } else {
        setError(response.data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while submitting the book. Please try again.");
      console.error("Submission Error:", err);
    }
  };

  return (
    <div id="favouriteBooksContent">

      <img id="logo" src={logo} alt="Bound Logo" />
      <h2>Your bookshelf looks empty!</h2>
      <p className="favouriteBooksMessage">
        Add your favourite three books to your online library – these will be used to compare with friends.
      </p>
      <div className="book-search-container">
        <label>
          <input
            type="text"
            placeholder="Choose book"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button onClick={handleSearch} disabled={loading}>
            Search
          </button>
          <br />
          <button onClick={handleSubmit} disabled={!selectedBook || loading}>
            Submit
          </button>
        </label>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>} {/* Success message */}

        <div className="book-results">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                className={`book-display ${selectedBook?.id === book.id ? "selected" : ""}`}
                onClick={() => handleBookSelect(book)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => e.key === "Enter" && handleBookSelect(book)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  border: selectedBook?.id === book.id ? "2px solid blue" : "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <img src={book.thumbnail} alt={book.title} style={{ width: "100px" }} />
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
            !loading && <p>Make your first search to see books!</p>
          )}

<audio id="ambientAudio" loop>
  <source src={readingRoomAudio} type="audio/mpeg" />
</audio>
<button onClick={toggleSound} className="sound-toggle">
  {isPlaying ? "🔊 Ambient On" : "🔈 Ambient Off"}
</button>
        </div>
        
      </div>
      
      
      <Footer />
    </div>
  );
};

export default BookSearch;
