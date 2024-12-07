// src/components/FavouriteBooksPage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/images/logo.svg';
import Footer from './footer.jsx';

function FavouriteBooksPage() {
  const location = useLocation();
  const { fullName } = location.state || {}; // Accessing fullName passed via state

  const [bookOne, setBookOne] = useState("");
  const [bookTwo, setBookTwo] = useState("");
  const [bookThree, setBookThree] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [counter, setCounter] = useState(0);

  const navigate = useNavigate();
  const debounceTimeout = useRef(null); // Reference to hold the timeout ID

  // Function to handle API search
  const searchBooks = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/search?searchRequest=${query}`);
      const data = await response.json();
      setSearchResults(data.books || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Debounce function to delay the API call
  const debounceSearch = (query) => {
    clearTimeout(debounceTimeout.current);  // Clear the previous timeout
    debounceTimeout.current = setTimeout(() => {
      searchBooks(query);  // Call the search after the debounce delay
    }, 500);  // Delay of 500ms (adjust as necessary)
  };

  // UseEffect to automatically trigger search when the book input fields change
  useEffect(() => {
    // Search for books whenever any of the inputs change (bookOne, bookTwo, or bookThree)
    if (bookOne || bookTwo || bookThree) {
      const query = bookOne || bookTwo || bookThree;
      debounceSearch(query);
    }
  }, [bookOne, bookTwo, bookThree]);  // Runs whenever bookOne, bookTwo, or bookThree changes

  // Handlers for input changes
  const handleBookOneChange = (event) => {
    setBookOne(event.target.value);
  };

  const handleBookTwoChange = (event) => {
    setBookTwo(event.target.value);
  };

  const handleBookThreeChange = (event) => {
    setBookThree(event.target.value);
  };

  // Counter logic
  const updateCounter = () => {
    const selectedBooks = [bookOne, bookTwo, bookThree].filter((book) => book.trim() !== "");
    setCounter(selectedBooks.length);
  };

  // Handler for the "I'm Finished" button
  const finished = async () => {
    const favouriteBooks = [bookOne, bookTwo, bookThree].filter((book) => book.trim() !== "");
    
    if (favouriteBooks.length === 0) {
      alert("Please add three books to add to your profile.");
      return;
    }

    try {
        await fetch("https://localhost/bound/user/favourites", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ favouriteBooks: [bookOne, bookTwo, bookThree] }),
          });
      navigate("/homepage");
    } catch (error) {
      console.error("Error saving favourite books:", error);
    }
  };

  return (
    <div id="favouriteBooksContent">
      <img id="logo" src={logo} alt="Bound Logo" />

      {/* Welcome Message */}
      <h2>WELCOME, {fullName}!</h2>
      <p className="favouriteBooksMessage">There&apos;s nothing like a good book. Search for your three favourite reads and save them to your library.</p>

      {/* Counter */}
      <div className="counter-container">
        <p className="count-display">{counter}/3</p>
      </div>

      {/* Book Search Inputs */}
      <label>
        <input
          type="text"
          value={bookOne}
          placeholder="Choose book"
          onChange={(e) => {
            handleBookOneChange(e);
            updateCounter();
          }}
        />
      </label>
      <br />

      <label>
        <input
          type="text"
          value={bookTwo}
          placeholder="Choose book"
          onChange={(e) => {
            handleBookTwoChange(e);
            updateCounter();
          }}
        />
      </label>
      <br />

      <label>
        <input
          type="text"
          value={bookThree}
          placeholder="Choose book"
          onChange={(e) => {
            handleBookThreeChange(e);
            updateCounter();
          }}
        />
      </label>
      <br />

      {/* Suggested Search Results */}
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((book, index) => {
              const title = book.volumeInfo.title || "No title available";
              const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No author available";
              
              return (
                <li key={index}>
                  <p><strong>{title}</strong></p>
                  <p>{authors}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No books available.</p>  // Fallback if no results are found
        )}
      </div>

      {/* "I'm Finished" Button */}
      <button onClick={finished}>I&apos;M FINISHED</button>

      <Footer />
    </div>
  );
}

export default FavouriteBooksPage;
