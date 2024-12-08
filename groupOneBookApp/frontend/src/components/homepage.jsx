import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import bindimage from "../assets/images/bind-image.svg";
import Logout from "./logout.jsx";
import Footer from "./footer.jsx";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [userLibrary, setUserLibrary] = useState([]); // User's library state
  const [userBinds, setUserBinds] = useState([]); // User's binds state
  const [searchUserEmail, setSearchUserEmail] = useState(""); // Friend search state

  const navigate = useNavigate();

  // Debounce function for search
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearchBooks = useRef(
    debounce((query) => searchBooks(query), 300)
  );

  // Dummy users
  const users = [
    { firstName: "Jeveria", id: 1, email: "jeveria@cfg.com" },
    { firstName: "Beth", id: 2, email: "beth@cfg.com" },
    { firstName: "Steph", id: 3, email: "steph@cfg.com" },
    { firstName: "Jenni", id: 4, email: "jenni@cfg.com" },
  ];

const books = [
  {
    title: "Fairy Tale",
    author: "Stephen King",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647789287i/60177373.jpg",
  },
  {
    title: "Never After",
    author: "Stephanie Garber",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1716011416i/59808071.jpg",
  },
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg",
  },
  {
    title: "A Court of Mist and Fury",
    author: "Sarah J. Maas",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620325671i/50659468.jpg",
  },
  {
    title: "Hamnet",
    author: "Maggie O'Farrell",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1574943819i/43890641.jpg",
  },
];


  // Filter friends
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchUserEmail.toLowerCase())
  );

  // Simulated searchBooks function (replace with API if needed)
  const searchBooks = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.example.com/books?search=${query}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Event handlers
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    debouncedSearchBooks.current(event.target.value);
  };

  const handleInputChange = (e) => {
    setSearchUserEmail(e.target.value);
  };

  const handleAddToLibrary = (book) => {
    setUserLibrary((prevLibrary) => {
      if (prevLibrary.some((b) => b.title === book.title)) {
        alert(`${book.title} is already in your library.`);
        return prevLibrary;
      }
      return [...prevLibrary, book];
    });
  };

  const handleAddFriend = (user) => {
    setUserBinds((prevBinds) => {
      if (prevBinds.some((bind) => bind.email === user.email)) {
        alert(`${user.firstName} is already your friend.`);
        return prevBinds;
      }
      return [...prevBinds, user];
    });
  };

  const startBind = () => {
    navigate("/bind", { state: { book: selectedBook } });
  };

  return (
    <div className="homepage">
      {/* Header Section */}
      <div className="homepage-header">
        <div className="homepage-logo">
          <img id="logo" src={logo} alt="Bound Logo" />
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="search-results">
            {searchResults.map((book, index) => (
              <div
                key={index}
                className="search-result-item"
                onClick={() => handleAddToLibrary(book)}
              >
                <img
                  src={book.cover || "default-cover.png"}
                  alt={book.title || "No Title"}
                  width="50"
                  height="75"
                />
                <p>{book.title || "Unknown Title"}</p>
                <p>{book.author || "Unknown Author"}</p>
              </div>
            ))}
          </div>
        </div>
        <Logout />
      </div>

      {/* Content Section */}
      <div className="homepage-content">
        {/* Sidebar Section */}
        <div className="homepage-sidebar">
          {/* Friends Section */}
          <div className="user-friends">
            <h2>Your Friends</h2>

            <input
              className="friend-search-input"
              type="text"
              placeholder="Search users by name"
              value={searchUserEmail}
              onChange={handleInputChange}
            />

            <div className="friends-buttons-container">
              <button id="friends-buttons" onClick={() => handleAddFriend(user)}>SEARCH</button>
              <button id="friends-buttons"onClick={() => handleAddFriend(user)}>ADD</button>
            </div>
            
            <div className="search-results">
              {filteredUsers.map((user) => (
                <div className="name-add" key={user.id}>
                  <p className="first-name">{user.firstName}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Binds Section */}
          <div className="user-binds">
            <h2>Start New Bind</h2>
            <img id="bind-image" src={bindimage} alt="Bind Illustration" />
            <div className="binds">
              {userBinds.map((bind, index) => (
                <div key={index} className="bind-item">
                </div>
              ))}
            </div>
            <button id="signUpButtonHomepage" onClick={startBind}>
              START
            </button>
          </div>
        </div>
        
        <div className="user-library-binds">
          <h2>Your library</h2>
          <div className="grid-container">
            {books.map((book, index) => (
  <div className="book-card" key={index}>
    <img src={book.cover} alt={`Cover of ${book.title}`} />
    <h3 style={{fontFamily: 'IMFellEnglish', fontSize: '1.3em', color: 'white', margin: 5}}>{book.title}</h3>
    <p style={{fontFamily: 'Josefin Sans', fontSize: '1.0em', color: 'grey', margin: 0}}>{book.author}</p>
    
  </div>
))}
          </div>
          <h2>Your Binds</h2>
          <div className="grid-container">
            {books.map((book, index) => (
  <div className="book-card" key={index}>
    <img src={book.cover} alt={`Cover of ${book.title}`} />
    <h3 style={{fontFamily: 'IMFellEnglish', fontSize: '1.3em', color: 'white', margin: 5}}>{book.title}</h3>
    <p style={{fontFamily: 'Josefin Sans', fontSize: '1.0em', color: 'grey', margin: 0}}>{book.author}</p>
    
  </div>
))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
