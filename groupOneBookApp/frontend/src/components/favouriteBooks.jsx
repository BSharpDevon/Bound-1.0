// src/components/FavouriteBooksPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.svg';
import Footer from './footer.jsx';

function FavouriteBooksPage({ fullName }) {
  const [bookOne, setBookOne] = useState("");
  const [bookTwo, setBookTwo] = useState("");
  const [bookThree, setBookThree] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [counter, setCounter] = useState(0);

  const navigate = useNavigate();

  // Function to handle API search
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

  // Handlers for input changes and search
  const handleBookOneChange = (event) => {
    setBookOne(event.target.value);
    searchBooks(event.target.value);
  };

  const handleBookTwoChange = (event) => {
    setBookTwo(event.target.value);
    searchBooks(event.target.value);
  };

  const handleBookThreeChange = (event) => {
    setBookThree(event.target.value);
    searchBooks(event.target.value);
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
      <p className="favouriteBooksMessage">There&aposs nothing like a good book. Search for your three favourite reads and save them to your library.</p>

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
        {searchResults.map((book, index) => (
          <div key={index}>{book.title}</div>
        ))}
      </div>

      {/* "I'm Finished" Button */}
      <button onClick={finished}>I&apos;M FINISHED</button>

      <Footer/>

    </div>
  );
}

FavouriteBooksPage.propTypes = {
    fullName: PropTypes.string.isRequired, // Ensuring fullName is a string and required
};

export default FavouriteBooksPage;