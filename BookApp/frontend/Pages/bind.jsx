import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/images/logo.svg";
import Modal from "../src/components/Modal";

function BindPage() {
  const navigate = useNavigate();

  // Nav state
  const [activeNav, setActiveNav] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bind state
  const [isBindComplete, setIsBindComplete] = useState(false);

  // Dummy users (not yet used in this snippet, but kept here for context)
  const users = [
    { firstName: "Jeveria", id: 1, email: "jeveria@cfg.com" },
    { firstName: "Beth", id: 2, email: "beth@cfg.com" },
    { firstName: "Steph", id: 3, email: "steph@cfg.com" },
    { firstName: "Jenni", id: 4, email: "jenni@cfg.com" },
    { firstName: "Lydia", id: 5, email: "lydia@cfg.com" },
  ];

  // Your list of “bind” books
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
      title: "Hamnet",
      author: "Maggie O'Farrell",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1574943819i/43890641.jpg",
    },
    {
      title: "Never After",
      author: "Stephanie Garber",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1716011416i/59808071.jpg",
    },
  ];

  // Mock user data (used when bind completes)
  const firstNameInitial = "L";
  const userOneName = "Name1";
  const userTwoName = "Name2";
  const bookTitle = "A Court of Thorns and Roses";
  const bookAuthor = "Sarah J. Maas";

  // Stub for selecting a friend
  const selectFriend = () => {};

  // Handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const bookShop = () => {
    window.location.href = "https://bookshop.org/";
  };

  const returnBtn = () => {
    navigate("/homepage");
  };

  return (
    <div className="homepage">
      {/* Sidebar navigation */}
      <aside className="sidebar">
          <img id="logo" src={logo} alt="Bound Logo" />
          <nav className="shelf-nav">
            <ul>

              <li>
                <a
                  href="#home"
                  className={activeNav === "home" ? "active" : ""}
                  onClick={() => setActiveNav("home")}
                >
                  <span>HOME</span>
                </a>
              </li>
              <li>
                <button id="friends-nav"
                  className={`nav-link ${
                    activeNav === "friends" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveNav("friends");
                    // Only open the generic modal if no book is selected
                    if (!selectedBook) setIsModalOpen(true);
                  }}
                >
                  <span>FRIENDS</span>
                </button>
              </li>
              <li>
                <a id="bind-nav"
                  href="/bind"
                  className={activeNav === "binds" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav("binds");
                    navigate("/bind");
                  }}
                >
                  <span>BINDS</span>
                </a>
              </li>
              
              <li>
                <a id="bookshelf-nav" href="#bookshelf"
                  className={activeNav === "bookshelf" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav("bookshelf");
                    navigate("/favourite-books");
                  }}
                >
                  <span>BOOKSHELF</span>
                </a>
              </li>
              <li>
                <button id="about-nav"
                  className={`nav-link ${
                    activeNav === "about" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveNav("about");
                    // Only open the generic modal if no book is selected
                    if (!selectedBook) setIsModalOpen(true);
                  }}
                >
                  <span>ABOUT</span>
                </button>
              </li>
              <li>
                <a href="#logout">
                  <span>LOG OUT</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

      {/* Main content */}
      {isBindComplete ? (
        <div className={`bind-content ${isBindComplete ? "fade-in" : ""}`}>
          <div className="bind-copy"></div>
          <div className="book-container">
            <img
              className="book-cover"
              src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620324329i/50659467.jpg"
              alt="Book Cover"
            />
          </div>
          <div className="metaData">
            <h1 className="bind-header">
              {userOneName} & {userTwoName}
            </h1>
            <p className="bind-description">
              The book that binds you two together is <b>{bookTitle}</b> by{" "}
              <b>{bookAuthor}</b>. And we've found the link just for you!
            </p>
            <button className="action-button" onClick={bookShop}>
              BUY ON BOOKSHOP.ORG
            </button>
            <button className="action-button" onClick={bookShop}>
              <i className="bx bx-share" /> SHARE
            </button>
            <div className="subtext">
              To support Bound, consider purchasing books through our affiliate
              links.
            </div>
          </div>
        </div>
      ) : (
        <div className="bind-content">
          <h2 className="bind-header">Your Binds</h2>

          {/* GRID OF BOOK CARDS */}
          <div className="grid-container" >
            {books.map((book, index) => (
              <div className="book-card" key={index}>
                <img
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  className="book-cover-image"
                />
                <p
                  style={{
                    color: "white",
                    margin: 5,
                  }}
                >
                  {book.title}
                </p>
                <p
                  style={{
                    color: "#DEA262",
                    margin: 0,
                  }}
                >
                  {book.author}
                </p>
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS (outside the map) */}
          <div className="bind-buttons">
            <button
              id="signUpButtonHomepage"
              onClick={() => selectFriend(true)}
            >
              SELECT FRIEND
            </button>
            <button
              id="signUpButtonHomepage"
              onClick={() => setIsBindComplete(true)}
            >
              START BIND
            </button>
          </div>
        </div>
      )}

      {/* Modal using original component */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {activeNav === "friends" && (
            <div>
              <h2>Invite a Friend</h2>
              {/* Original friends modal content here */}
            </div>
          )}
          {activeNav === "about" && (
            <div>
              <h2>About This App</h2>
              {/* Original about modal content here */}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default BindPage;