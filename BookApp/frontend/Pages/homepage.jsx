import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import Modal from "../src/components/Modal.jsx";
import "boxicons/css/boxicons.min.css";
import HeroCarousel from "../src/components/HeroCarousel.jsx";
import instagram from '../src/assets/images/instagram.svg.webp';
import discord from '../src/assets/images/discord.svg';
import logo from '../src/assets/images/logo.svg';
import Sidebar from "../src/components/Sidebar.jsx";


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

  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log('Current user state:', user);
  }, [user]);

  const [flickerOn, setFlickerOn] = useState(false);

  const handleToggle = () => {
    setFlickerOn((prev) => !prev);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

const toggleDrawer = () => {
  setIsDrawerOpen((prev) => !prev);
};

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


  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message, duration = 10000) => {
  setToastMessage(message);
  const toast = document.getElementById('toast');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    setToastMessage("");
  }, duration);
};

useEffect(() => {
  showToast("Welcome, Lydia! Add your first friend to start a bind.");
}, []);

  return (
    <div className="homepage">
      {isModalOpen && selectedBook && (
        <Modal onClose={closeBookModal}>
          <div
            className="book-modal-content"
            style={{ textAlign: "center", position: "relative" }}
          >

            {/* Cover Image */}
            <img id="modal-cover-image"
              src={selectedBook.cover}
              alt={`Cover of ${selectedBook.title}`}
              style={{
                marginBottom: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                borderRadius: "4px",
              }}
            />

            <div id="book-modal-metadata">

            {/* Title + Author */}
            <h3 style={{ margin: "0.5rem 0", fontFamily: 'Garamond' }}>
              {selectedBook.title}
            </h3>
            <p style={{ fontFamily: "Libre"}}>
            {selectedBook.author}
            </p>
            <p>< i class='bx  bxs-hot'  ></i> Seen in 500 binds</p>
            <button className="carousel-cta">Buy on Bookshop</button>
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
                Bound features millions of books from around the world, and helps you find new favourites through your real-life connections.
              </p>
              <div id="about-modal-site-authors">
              <a href="https://www.linkedin.com/in/jennifer-rose-scott/">
                Jenni Scott - Developer<i className="bx bx-caret-right"></i>
              </a>
              <a href="https://www.linkedin.com/in/beth-sharp/">
                Beth Sharp - Developer<i className="bx bx-caret-right"></i>
              </a>
              <a href="https://www.linkedin.com/in/lydia-ibrahim2024/">
                Lydia Hess - Developer <i className="bx bx-caret-right"></i>
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
        <aside className="sidebar">
      <div class="logo">
        <img id="logo" src={logo} width="32px" height="32px"></img>
      </div>
          <button class="nav-button" onClick={toggleDrawer}>
            <div class="nav-button__lines">
              <span class="nav-button__line"></span>
              <span class="nav-button__line"></span>
              <span class="nav-button__line"></span>
            </div>
          </button>
          <div className="sidebar-bottom">

            <button id="about-bound-button">INSTAGRAM</button>
          </div>
        </aside>

      <div className={`nav-project-drawer ${isDrawerOpen ? 'active' : ''}`}>
        <ul>
          <li class="nav-project-drawer-item">
            <a href="#home"
                  className={activeNav === "home" ? "active" : ""}
                  onClick={() => setActiveNav("home")}
                >
            <div class="nav-project-drawer-item-image"></div>
            <div class="nav-project-drawer-item-title">HOME</div></a>
          </li>
          <hr></hr>
          <li>
                <button id="nav-link"
                  className={`nav-link ${
                    activeNav === "friends" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveNav("friends");
                    // Only open the generic modal if no book is selected
                    if (!selectedBook) setIsModalOpen(true);
                  }}
                ><div class="nav-project-drawer-item-title">FRIENDS</div>
                </button>
              </li>
          <hr></hr>
          <li class="nav-project-drawer-item">
            <a id="bookshelf-nav" href="#bookshelf"
                  className={activeNav === "bookshelf" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav("bookshelf");
                    navigate("/bind");
                  }}
                >
            <div class="nav-project-drawer-item-image"></div>
            <div class="nav-project-drawer-item-title">BINDS</div>
          </a>
          </li>
          <hr></hr>
          <li class="nav-project-drawer-item">
            <a id="bookshelf-nav" href="#bookshelf"
                  className={activeNav === "bookshelf" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav("bookshelf");
                    navigate("/favourite-books");
                  }}
                >
            <div class="nav-project-drawer-item-image"></div>
            <div class="nav-project-drawer-item-title">BOOKSHELF</div>
          </a>
          </li>
          <hr></hr>
          <li class="nav-project-drawer-item">
            <button id="nav-link"
                  className={`nav-link ${
                    activeNav === "about" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveNav("about");
                    // Only open the generic modal if no book is selected
                    if (!selectedBook) setIsModalOpen(true);
                  }}
                >
            <div class="nav-project-drawer-item-image"></div>
            <div class="nav-project-drawer-item-title">ABOUT</div>
          </button>
          </li>
          <hr></hr>
        </ul>
      </div>

        <div id="homepage-content">
        <HeroCarousel />
        <div className="user-library-binds">

          <div id="toast" className="toast">
  {toastMessage}
</div>

          <h3>Your Bookshelf</h3>
          <hr></hr>
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
                    fontFamily: 'Libre',
                    fontSize: "15px",
                    margin: "5px",
                  }}
                >
                  {book.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Libre',
                    fontSize: "15px",
                    color: "#DEA262",
                    margin: "5px",
                  }}
                >
                  {book.author}
                </p>
              </div>
            ))}
          </div>

          <h3>Top Books Today</h3>
          <hr></hr>
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
                    fontFamily: 'Libre',
                    fontSize: "15px",
                    margin: 5,
                  }}
                >
                  {book.title}
                </h3>
                <p
                  style={{
                    color: "rgb(222, 162, 98)",
                    fontFamily: 'Libre',
                    fontSize: "15px",
                    margin: "5px",
                  }}
                >
                  {book.author}
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      </div>
        <div className="fade-bottom" />
    </div>
  );
}

export default HomePage;