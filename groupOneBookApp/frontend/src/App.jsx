import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import AuthPage from './components/authPage';
import FavouriteBooksPage from './components/favouriteBooks'; // Add this import
import HomePage from './components/homepage'; // Add your homepage component
import Bind from './components/bind';
import './App.css';

// function to nevigate through the pages of the website
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} /> {/* Authentication page */}
          <Route path="/favourite-books" element={<FavouriteBooksPage />} /> {/* FavouriteBooksPage */}
          <Route path="/homepage" element={<HomePage />} /> {/* Homepage */}
          <Route path="/bind" element={<Bind />} /> {/* Bind page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;     // Export the App component so it can be used in other files