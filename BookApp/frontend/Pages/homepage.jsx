import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import Modal from "../src/components/Modal.jsx";
import "boxicons/css/boxicons.min.css";
import HeroCarousel from "../src/components/HeroCarousel.jsx";
import logo from '../src/assets/images/logo.svg';
import FriendsModal from "../src/components/FriendsModal.jsx";

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

  const [showFullBio, setShowFullBio] = useState(false);


  const handleToggle = () => {
    setFlickerOn((prev) => !prev);
  };

useEffect(() => {
  const spotlight = document.getElementById('spotlight');

  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    spotlight.style.background = `radial-gradient(
      circle at ${x}px ${y}px,
      rgba(255, 215, 128, 0.15) 0%,
      rgba(0, 0, 0, 0.85) 60%
    )`;
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);

useEffect(() => {
  const sparkles = document.querySelectorAll('.sparkle');
  sparkles.forEach(sparkle => {
    sparkle.style.setProperty('--rand-x', Math.random());
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
  });
}, []);

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
    { firstName: "Beth213", id: 2, email: "beth@cfg.com" },
    { firstName: "JenniRose", id: 4, email: "jenni@cfg.com" },
    { firstName: "LydiaIbbi", id: 5, email: "lydia@cfg.com" },
  ];

  const books = [
    {
      title: "Fairy Tale",
      author: "Stephen King",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647789287i/60177373.jpg",
        genre: "Fantasy",
        bio: "Legendary storyteller Stephen King goes into the deepest well of his imagination in this spellbinding novel about a seventeen-year-old boy who inherits the keys to a parallel world where good and evil are at war, and the stakes could not be higher - for their world or ours."

    },
    {
      title: "Never After",
      author: "Stephanie Garber",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1716011416i/59808071.jpg",
      genre: "Fantasy",
      bio: "She belongs to the crown. Prince Tristan Faasa was never destined for the throne. That was always his brother, Michael. The same brother responsible for both Tristan's tormented childhood and the scar that mars his face. When their father dies, Michael is set to assume the throne, and Tristan is set to steal it."
    },

    {
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg", 
        genre: "Dystopian",
        bio: "From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse, and of those who pass on the street outside. She remains hopeful that a customer will soon choose her, but when the possibility emerges that her circumstances may change forever, Klara is warned not to invest too much in the promises of humans."
    },
    
    {
      title: "A Court of Mist and Fury",
      author: "Sarah J. Maas",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620325671i/50659468.jpg",
    genre: "Fantasy",
    bio: "The seductive and stunning #1 New York Times bestselling sequel to Sarah J. Maas's spellbinding A Court of Thorns and Roses. Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people."
  },
  
    {
      title: "The Wedding People",
      author: "Alison Espach",
      cover:
        "https://m.media-amazon.com/images/I/91EReeJwIjL._SL1500_.jpg",
    genre: "Indie Comedy",
    bio: "It’s a beautiful day in Newport, Rhode Island, when Phoebe Stone arrives at the grand Cornwall Inn wearing a green dress and gold heels, not a bag in sight, alone. She's immediately mistaken by everyone in the lobby for one of the wedding people, but she’s actually the only guest at the Cornwall who isn’t here for the big event."
  },
    {
      title: "Hamnet",
      author: "Maggie O'Farrell",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1574943819i/43890641.jpg",
    genre: "Historical",
    bio: "Drawing on Maggie O'Farrell's long-term fascination with the little-known story behind Shakespeare's most enigmatic play, Hamnet is a luminous portrait of a marriage, at its heart the loss of a beloved child."
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


      <div className="sparkle-overlay">
  {Array.from({ length: 60 }).map((_, i) => (
    <div key={i} className="sparkle"></div>
  ))}
</div>
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
            <p style={{ fontFamily: "Libre", color: "#DEA262",}}>
            <b>{selectedBook.genre}</b>
            </p>
            <h3 style={{ margin: "0.5rem 0", fontSize: "40px", fontFamily: 'Garamond', color: "white"}}>
              {selectedBook.title}
            </h3>
            <p style={{ fontFamily: "Libre", color: "white", marginTop: "-4px"}}>
            by <b>{selectedBook.author}</b>
            </p>

            {selectedBook.bio && (
  <p style={{ fontFamily: "Libre", color: "white", margin: "1rem 0" }}>
    {showFullBio ? selectedBook.bio : `${selectedBook.bio.slice(0, 200)}... `}
    {selectedBook.bio.length > 200 && (
      <span
        onClick={() => setShowFullBio(!showFullBio)}
        style={{ 
          color: "#DEA262", 
          textDecoration: "none", 
          marginLeft: "5px", 
          cursor: "pointer" 
        }}
      >
        {showFullBio ? "See less ‹" : "See more ›"}
      </span>
    )}
  </p>
)}

            <button className="carousel-cta">Buy Now</button>
            </div>
          </div>
        </Modal>
      )}      
    

{isModalOpen && !selectedBook && (
  <>
    {activeNav === "friends" && (
      <FriendsModal
        isOpen={true}
        onClose={() => setIsModalOpen(false)}
        searchUserEmail={searchUserEmail}
        handleInputChange={handleInputChange}
        handleAddFriend={handleAddFriend}
        filteredUsers={filteredUsers}
      />
    )}
    
    {activeNav ==="Support" && (
      <Modal onClose={() => setIsModalOpen(false)}>
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
            Lydia Hess - Developer<i className="bx bx-caret-right"></i>
          </a>
        </div>
        <div className="subtext">
          Purchasing books through affiliate links supports Team Bound.
        </div>
      </Modal>
    )}
  </>
)}
      <div className="homepage-header">{/* your header (logo, nav) */}</div>

      <div className="homepage-content" style={{ zIndex: 5, position: "relative" }}>
        <div className="profile">
          <h1>LydiaIbbi</h1>
          <div id="profile-info">
          <p>100 Books</p>
          <p>16 Binds</p>
          </div>
          <hr></hr>
          <div className="copy-news-article-details">
          <p id="copy-news-article-date">25th July 2025</p>
          <h3 id="copy-news-article-title">The first chapter...</h3>
          <p>This week's update: Launching Bound!</p>
          <p id="copy-news-article-link"><b>Read More</b></p>
          </div>
        </div>
        <aside className="sidebar">
      <div class="logo">
        <img id="logo" src={logo} width="32px" height="32px"></img>
      </div>
      <ul>
          <li class="nav-project-drawer-item">
            <a href="#home"
                  className={activeNav === "home" ? "active" : ""}
                  onClick={() => setActiveNav("home")}
                >
            <div class="nav-project-drawer-item-title">Home</div></a>
          </li>
          <hr></hr>
          <li class="nav-project-drawer-item">
            <a id="news-nav" href="#news"
  className={activeNav === "news" ? "active" : ""}
  onClick={(e) => {
    e.preventDefault();
    setActiveNav("news");
    navigate("/news");
  }}
>
  <div className="nav-project-drawer-item-title">News</div>
</a>
          </li>
          <hr></hr>
          <li class="nav-project-drawer-item">
            <a id="bookshelf-nav" href="#bookshelf"
                  className={activeNav === "bookshelf" ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav("bind");
                    navigate("/bind");
                  }}
                >
            <div class="nav-project-drawer-item-title">My Binds</div>
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
            <div class="nav-project-drawer-item-title">My Books</div>
          </a>
          </li>
              <hr></hr>
          <li>
  <button
    id="nav-link"
    className={`nav-link ${activeNav === "friends" ? "active" : ""}`}
    onClick={() => {
      setActiveNav("friends");
      if (!selectedBook) setIsModalOpen(true);
    }}
  >
    <div className="nav-project-drawer-item-title">
      <i className="bx bx-group" style={{ color: "#ffffff" }}></i>
    </div>
  </button>
</li>
          <hr></hr>
          <li class="nav-project-drawer-item">
            <button id="nav-link"
                  className={`nav-link ${
                    activeNav === "Support" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveNav("Support");
                    // Only open the generic modal if no book is selected
                    if (!selectedBook) setIsModalOpen(true);
                  }}
                >
            <i className="bx bx-donate-heart" style={{ color: "#ffffff" }}></i>
          </button>
          </li>
        </ul>
        </aside>

        <div id="homepage-content">
        <HeroCarousel />
        <div className="user-library-binds">

          <div id="toast" className="toast">
  {toastMessage}
</div>
          
          <h3 id="bookshelf-title">Your Bookshelf</h3>
          <div className="grid-container">
            {books.map((book, index) => (
              <div
                className="book-card"
                key={index}
                onClick={() => openBookModal(book)}
                style={{ cursor: "pointer" }}
              >
                <p
                  style={{
                    fontFamily: 'Libre',
                    fontSize: "15px",
                    color: "#DEA262",
                    margin: "5px",
                  }}
                >
                  {book.genre}
                </p>
                <img src={book.cover} alt={`Cover of ${book.title}`} />
              </div>
            ))}
          </div>

          <h3 id="bookshelf-title">Top Books Today</h3>
          <div className="grid-container">
            {books.map((book, index) => (
              <div
                className="book-card"
                key={index}
                onClick={() => openBookModal(book)}
                style={{ cursor: "pointer" }}
              >
                <p
                  style={{
                    fontFamily: 'Libre',
                    fontSize: "15px",
                    color: "#DEA262",
                    margin: "5px",
                  }}
                >
                  {book.genre}
                </p>
                <img src={book.cover} alt={`Cover of ${book.title}`} />
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