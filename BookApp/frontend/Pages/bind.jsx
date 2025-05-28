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

  // Mock user data
  const firstNameInitial = "L";
  const userOneName = "Name1";
  const userTwoName = "Name2";
  const bookTitle = "A Court of Thorns and Roses";
  const bookAuthor = "Sarah J. Maas";

  // Select a friend (stub)
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
      <aside>
        <img id="logo" src={logo} alt="Bound Logo" />
        <nav>
          <ul>
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
                className={`nav-link ${activeNav === "friends" ? "active" : ""}`}
                onClick={() => {
                  setActiveNav("friends");
                  setIsModalOpen(true);
                }}
              >
                <i className="bx bx-group" />
                <span>Friends</span>
              </button>
            </li>
            <li>
              <a
                href="#binds"
                className={activeNav === "binds" ? "active" : ""}
                onClick={() => setActiveNav("binds")}
              >
                <i className="bx bx-link" />
                <span>Binds</span>
              </a>
            </li>
            <li>
              <a
                href="#bookshelf"
                className={activeNav === "bookshelf" ? "active" : ""}
                onClick={() => setActiveNav("bookshelf")}
              >
                <i className="bx bx-book-alt" />
                <span>Bookshelf</span>
              </a>
            </li>
            <li>
              <button
                className={`nav-link ${activeNav === "about" ? "active" : ""}`}
                onClick={() => {
                  setActiveNav("about");
                  setIsModalOpen(true);
                }}
              >
                <i className="bx bx-donate-heart" />
                <span>About</span>
              </button>
            </li>
            <li className="nav-search">
              <div className="search-input-wrapper">
                <i className="bx bx-search" />
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
              <a href="#logout">
                <i className="bx bx-door-open" />
                <span>Log Out</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
        {isBindComplete ? (
          <div className={`bind-content ${isBindComplete ? "fade-in" : ""}`}>
            <h1 className="bind-header">
              {userOneName} & {userTwoName}
            </h1>
            <h3 className="book-title">Your Next Chapter Awaits</h3>
            <div className="book-container">
              <img
                className="book-cover"
                src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620324329i/50659467.jpg"
                alt="Book Cover"
              />
            </div>
            <p className="bind-description">
              The book that binds you two together is <b>{bookTitle}</b> by <b>{bookAuthor}</b>. And we've found the link just for you!
            </p>
            <button className="action-button" onClick={bookShop}>
              BUY ON BOOKSHOP.ORG
            </button>
            <button onClick={returnBtn}>BACK TO HOME</button>
          </div>
        ) : (
          <div className="bind-content">
            <h2 className="bind-header">
              Get ready for a story as unique as the two of you
            </h2>
            <p>
              See how your literary taste matches, and get a book recommendation you can both dive into.
            </p>
            <div className="circle-container">
              <div className="circle initials-circle">{firstNameInitial}</div>
              <div className="circle plus-circle">+</div>
            </div>
            <div className="bind-buttons">
            <button id="signUpButtonHomepage" onClick={() => selectFriend(true)}>
              SELECT FRIEND
            </button>
            <button id="signUpButtonHomepage" onClick={() => setIsBindComplete(true)}>
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
