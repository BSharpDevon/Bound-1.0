import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/images/logo.svg";
import Modal from "../src/components/Modal.jsx";
import "boxicons/css/boxicons.min.css";
import HeroCarousel from "../src/components/HeroCarousel.jsx";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [userLibrary, setUserLibrary] = useState([]);
  const [userBinds, setUserBinds] = useState([]);
  const [activeNav, setActiveNav] = useState("home");
  const [searchUserEmail, setSearchUserEmail] = useState("");

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
    { firstName: "Lydia", id: 5, email: "lydia@cfg.com" },
  ];

  const books = [
    {
      title: "Fairy Tale",
      author: "Stephen King",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647789287i/60177373.jpg",
    },
    {
      title: "Never After",
      author: "Stephanie Garber",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1716011416i/59808071.jpg",
    },
    {
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg",
    },
    {
      title: "A Court of Mist and Fury",
      author: "Sarah J. Maas",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620325671i/50659468.jpg",
    },
  
    {
      title: "Never After",
      author: "Stephanie Garber",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1716011416i/59808071.jpg",
    },
    {
      title: "Hamnet",
      author: "Maggie O'Farrell",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1574943819i/43890641.jpg",
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

  const addBooks = () => {
    navigate("/favourite-books");
  };

  // Handler to open/close the book modal
  const openBookModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };
  const closeBookModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  return (
    <div className="homepage">
      {isModalOpen && selectedBook && (
        <Modal onClose={closeBookModal}>
          <div
            className="book-modal-content"
            style={{ textAlign: "center", position: "relative" }}
          >

            <button class="modal-close"
              onClick={closeBookModal}
            >
              &times;
            </button>

            {/* Cover Image */}
            <img id="modal-cover-image"
              src={selectedBook.cover}
              alt={`Cover of ${selectedBook.title}`}
              style={{
                Width: "400px",
                Height: "600px",
                marginBottom: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                borderRadius: "4px",
              }}
            />

            <div id="book-modal-metadata">

            {/* Title + Author */}
            <h3 style={{ margin: "0.5rem 0", fontFamily: "IMFellEnglish" }}>
              {selectedBook.title}
            </h3>
            <p style={{ fontFamily: "IMFellEnglish", color: "#DEA262" }}>
              by {selectedBook.author}
            </p>
            </div>
          </div>
        </Modal>
      )}

      {/* ==== EXISTING FRIENDS/ABOUT MODAL LOGIC ==== */}
      {isModalOpen && !selectedBook && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {activeNav === "friends" ? (
            <>
              <h2>Friends</h2>
              <input
                className="friend-search-input"
                type="text"
                placeholder="Search users by name"
                value={searchUserEmail}
                onChange={handleInputChange}
              />
              <div className="friends-buttons-container">
                <button
                  id="friends-buttons"
                  onClick={() => handleAddFriend(/* … */)}
                >
                  <i className="bx bx-user-search"></i> SEARCH
                </button>
                <button
                  id="friends-buttons"
                  onClick={() => handleAddFriend(/* … */)}
                >
                  <i className="bx bx-user-plus"></i> ADD
                </button>
              </div>
              <div className="search-results">
                {filteredUsers.map((user) => (
                  <div className="name-add" key={user.id}>
                    <p className="first-name">{user.firstName}</p>
                  </div>
                ))}
              </div>
            </>
          ) : activeNav === "about" ? (
            <>
              <h2 className="modalHeading">Team Bound</h2>
              <p className="modalCopy">
                Bound is an independent, female-led platform built to help readers find books through connection.
              </p>
              <div id="about-modal-site-authors">
              <a href="https://www.linkedin.com/in/jennifer-rose-scott/">
                Jennifer Scott <i className="bx bx-caret-right"></i>
              </a>
              <a href="https://www.linkedin.com/in/beth-sharp/">
                Beth Sharp <i className="bx bx-caret-right"></i>
              </a>
              <a href="https://www.linkedin.com/in/lydia-ibrahim2024/">
                Lydia Ibrahim <i className="bx bx-caret-right"></i>
              </a>
              </div>
              <div className="subtext">
                Purchasing books through affiliate links supports Team Bound.
              </div>
            </>
          ) : null}
        </Modal>
      )}

      {/* ==== HEADER, SIDEBAR, HERO, ETC. ==== */}
      <div className="homepage-header">{/* your header (logo, nav) */}</div>

      <div className="homepage-content">
        <aside>
          <img id="logo" src={logo} alt="Bound Logo" />
          <nav>
            <ul>
                            <li className="nav-search">
                <div className="search-input-wrapper">
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </li>
              <li>
                <a
                  href="#home"
                  className={activeNav === "home" ? "active" : ""}
                  onClick={() => setActiveNav("home")}
                >
                  <i className="bx bx-home" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <button
                  className={`nav-link ${
                    activeNav === "friends" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveNav("friends");
                    // Only open the generic modal if no book is selected
                    if (!selectedBook) setIsModalOpen(true);
                  }}
                >
                  <i className="bx bx-group" />
                  <span>Friends</span>
                </button>
              </li>
              <li>
                <a
                  href="/bind"
                  className={activeNav === "binds" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav("binds");
                    navigate("/bind");
                  }}
                >
                  <i className="bx bx-link" />
                  <span>Binds</span>
                </a>
              </li>
              <li>
                <a
                  href="#bookshelf"
                  className={activeNav === "bookshelf" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav("bookshelf");
                    navigate("/favourite-books");
                  }}
                >
                  <i className="bx bx-book-alt"></i>
                  <span>Bookshelf</span>
                </a>
              </li>
              <li>
                <button
                  className={`nav-link ${
                    activeNav === "about" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveNav("about");
                    // Only open the generic modal if no book is selected
                    if (!selectedBook) setIsModalOpen(true);
                  }}
                >
                  <i className="bx bx-donate-heart"></i>
                  <span>About</span>
                </button>
              </li>

              <li>
                <a href="#logout">
                  <i className="bx bx-door-open"></i>
                  <span>Log Out</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="user-library-binds">
          <HeroCarousel />

          <h3>Your bookshelf</h3>
          <div className="grid-container">
            {books.map((book, index) => (
              <div
                className="book-card"
                key={index}
                onClick={() => openBookModal(book)}
                style={{ cursor: "pointer" }}
              >
                <img src={book.cover} alt={`Cover of ${book.title}`} />
                <h3
                  style={{
                    fontFamily: "IMFellEnglish",
                    fontSize: "1.3em",
                    color: "white",
                    margin: 5,
                  }}
                >
                  {book.title}
                </h3>
                <p
                  style={{
                    fontFamily: "IMFellEnglish",
                    fontSize: "1.0em",
                    color: "#DEA262",
                    margin: "0px",
                  }}
                >
                  {book.author}
                </p>
              </div>
            ))}
          </div>

          <h3>Top books today</h3>
          <div className="grid-container">
            {books.map((book, index) => (
              <div
                className="book-card"
                key={index}
                onClick={() => openBookModal(book)}
                style={{ cursor: "pointer" }}
              >
                <img src={book.cover} alt={`Cover of ${book.title}`} />
                <h3
                  style={{
                    fontFamily: "IMFellEnglish",
                    fontSize: "1.3em",
                    color: "white",
                    margin: 5,
                  }}
                >
                  {book.title}
                </h3>
                <p
                  style={{
                    fontFamily: "IMFellEnglish",
                    fontSize: "1.0em",
                    color: "grey",
                    margin: 0,
                  }}
                >
                  {book.author}
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
        <div className="fade-bottom" />
    </div>
  );
}

export default HomePage;