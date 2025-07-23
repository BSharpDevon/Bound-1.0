import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../src/components/modal.jsx';
import FriendsModal from '../src/components/FriendsModal.jsx';
import 'boxicons/css/boxicons.min.css';
import HeroCarousel from '../src/components/heroCarousel.jsx';
import instagram from '../src/assets/images/instagram.svg.webp';
import discord from '../src/assets/images/discord.svg';
import logo from '../src/assets/images/logo.svg';
import Sidebar from '../src/components/Sidebar.jsx';

/**
 * HomePage Component
 * ------------------
 * Main landing page combining header, sidebar, hero carousel,
 * book browsing/binding, FriendsModal, About modal, and toast.
 */
function HomePage() {
  // ---------- State Hooks ----------
  const [searchQuery, setSearchQuery] = useState('');           // Book search input
  const [isModalOpen, setIsModalOpen] = useState(false);        // Generic modal visibility
  const [searchResults, setSearchResults] = useState([]);       // API book search results
  const [selectedBook, setSelectedBook] = useState(null);       // Currently selected book
  const [userLibrary, setUserLibrary] = useState([]);           // User's library
  const [userBinds, setUserBinds] = useState([]);               // User's friends (binds)
  const [activeNav, setActiveNav] = useState('home');           // Active navigation tab
  const [searchUserEmail, setSearchUserEmail] = useState('');   // Friends search input
  const [toastMessage, setToastMessage] = useState('');         // Toast notification text
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);      // Sidebar drawer state

  // Redux state & navigation
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Log current user for debugging
  useEffect(() => {
    console.log('Current user state:', user);
  }, [user]);

  // Toggle sidebar drawer visibility
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  // Debounce helper for API calls
  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };
  const debouncedSearchBooks = useRef(debounce((q) => searchBooks(q), 300));

  // Dummy users and books data (replace with real API data)
  const users = [
    { firstName: 'Jeveria', id: 1, email: 'jeveria@cfg.com' },
    { firstName: 'Beth', id: 2, email: 'beth@cfg.com' },
    { firstName: 'Steph', id: 3, email: 'steph@cfg.com' },
    { firstName: 'Jenni', id: 4, email: 'jenni@cfg.com' },
    { firstName: 'Lydia', id: 5, email: 'lydia@cfg.com' },
  ];
  const books = [
    { title: 'Fairy Tale', author: 'Stephen King', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647789287i/60177373.jpg' },
    { title: 'Never After', author: 'Stephanie Garber', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1716011416i/59808071.jpg' },
    { title: 'Klara and the Sun', author: 'Kazuo Ishiguro', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg' },
    { title: 'A Court of Mist and Fury', author: 'Sarah J. Maas', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620325671i/50659468.jpg' },
    { title: 'Hamnet', author: "Maggie O'Farrell", cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1574943819i/43890641.jpg' },
  ];

  // Filter friends list by search email
  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(searchUserEmail.toLowerCase())
  );

  /**
   * searchBooks
   * Fetches books matching the search query from an external API.
   * Updates `searchResults` state.
   */
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
      console.error('Error fetching books:', error);
    }
  };

  // Handlers for inputs
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearchBooks.current(e.target.value);
  };
  const handleInputChange = (e) => setSearchUserEmail(e.target.value);

  /**
   * handleAddToLibrary
   * Adds a book to the user's library if not already added.
   */
  const handleAddToLibrary = (book) => {
    setUserLibrary((prev) =>
      prev.some((b) => b.title === book.title)
        ? (alert(`${book.title} is already in your library.`), prev)
        : [...prev, book]
    );
  };

  /**
   * handleAddFriend
   * Adds a user to the binds list if not already a friend.
   */
  const handleAddFriend = (friend) => {
    setUserBinds((prev) =>
      prev.some((f) => f.email === friend.email)
        ? (alert(`${friend.firstName} is already your friend.`), prev)
        : [...prev, friend]
    );
  };

  // Open and close book detail modal
  const openBookModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };
  const closeBookModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  /**
   * showToast
   * Displays a temporary toast notification with the given message.
   */
  const showToast = (message, duration = 5000) => {
    setToastMessage(message);
    const toast = document.getElementById('toast');
    toast?.classList.add('show');
    setTimeout(() => toast?.classList.remove('show'), duration);
  };

  // Display welcome toast once on mount
  useEffect(() => {
    showToast('Welcome! Add your first friend to start binding.');
  }, []);

  return (
    <div className="homepage">
      {/* Book Detail Modal */}
      {isModalOpen && selectedBook && (
        <Modal onClose={closeBookModal}>
          <div className="book-modal-content" style={{ textAlign: 'center', position: 'relative' }}>
            <img id="modal-cover-image" src={selectedBook.cover} alt={`Cover of ${selectedBook.title}`} style={{ marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', borderRadius: '4px' }} />
            <div id="book-modal-metadata">
              <h3 style={{ margin: '0.5rem 0', fontFamily: 'Garamond' }}>{selectedBook.title}</h3>
              <p style={{ fontFamily: 'Libre' }}>{selectedBook.author}</p>
              <p><i className="bx bxs-hot" /> Seen in 500 binds</p>
              <button className="carousel-cta">Buy on Bookshop</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Friends Modal */}
      <FriendsModal
        isOpen={isModalOpen && !selectedBook}
        onClose={() => setIsModalOpen(false)}
        activeNav={activeNav}
        searchUserEmail={searchUserEmail}
        onSearchChange={handleInputChange}
        onAddFriend={handleAddFriend}
        filteredUsers={filteredUsers}
      />

      {/* About Modal */}
      {isModalOpen && !selectedBook && activeNav === 'about' && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="modalHeading">Team Bound</h2>
          <p className="modalCopy">Bound features millions of books from around the world, and helps you find new favourites through your real-life connections.</p>
          <div id="about-modal-site-authors">
            <a href="https://www.linkedin.com/in/jennifer-rose-scott/">Jenni Scott - Developer<i className="bx bx-caret-right" /></a>
            <a href="https://www.linkedin.com/in/beth-sharp/">Beth Sharp - Developer<i className="bx bx-caret-right" /></a>
            <a href="https://www.linkedin.com/in/lydia-ibrahim2024/">Lydia Hess - Developer<i className="bx bx-caret-right" /></a>
          </div>
          <div className="subtext">Purchasing books through affiliate links supports Team Bound.</div>
        </Modal>
      )}

      {/* HEADER & SIDEBAR */}
      <header className="homepage-header">{/* Logo and top nav */}</header>
      <aside className="sidebar">
        <div className="logo"><img id="logo" src={logo} width="32" height="32" alt="Logo" /></div>
        <button className="nav-button" onClick={toggleDrawer}><div className="nav-button__lines"><span className="nav-button__line" /><span className="nav-button__line" /><span className="nav-button__line" /></div></button>
        <div className="sidebar-bottom"><button id="about-bound-button">INSTAGRAM</button></div>
      </aside>

      {/* NAV DRAWER */}
      <nav className={`nav-project-drawer ${isDrawerOpen ? 'active' : ''}`}>
        <ul>
          <li><button className={activeNav === 'home' ? 'active' : ''} onClick={() => setActiveNav('home')}>HOME</button></li>
          <hr />
          <li><button className={activeNav === 'friends' ? 'active' : ''} onClick={() => {setActiveNav('friends'); if (!selectedBook) setIsModalOpen(true);}}>FRIENDS</button></li>
          <hr />
          <li><button className={activeNav === 'binds' ? 'active' : ''} onClick={() => navigate('/bind')}>BINDS</button></li>
          <hr />
          <li><button className={activeNav === 'bookshelf' ? 'active' : ''} onClick={() => navigate('/favourite-books')}>BOOKSHELF</button></li>
          <hr />
          <li><button className={activeNav === 'about' ? 'active' : ''} onClick={() => {setActiveNav('about'); if (!selectedBook) setIsModalOpen(true);}}>ABOUT</button></li>
        </ul>
      </nav>

      {/* MAIN CONTENT */}
      <main id="homepage-content">
        <HeroCarousel />
        <section className="user-library-binds">
          <div id="toast" className="toast">{toastMessage}</div>
          <h3>Your Bookshelf</h3>
          <hr />
          <div className="grid-container">
            {books.map((book, idx) => (
              <div key={idx} className="book-card" onClick={() => openBookModal(book)} style={{ cursor: 'pointer' }}>
                <img src={book.cover} alt={`Cover of ${book.title}`} />
                <h3 style={{ fontFamily: 'Libre', fontSize: '15px', margin: '5px' }}>{book.title}</h3>
                <p style={{ color: '#DEA262', fontFamily: 'Libre', fontSize: '15px', margin: '5px' }}>{book.author}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
