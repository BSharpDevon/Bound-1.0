import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/authPage";
import FavouriteBooksPage from "./components/favouriteBooks";
import HomePage from "./components/homepage";
import Bind from "./components/bind";
import BookSearch from "./components/testBookSearch";

import "./App.css";

function App() {
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    // Check if memberId is in localStorage on app load
    const storedMemberId = localStorage.getItem('memberId');
    if (storedMemberId) {
      setMemberId(storedMemberId);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for AuthPage is available only if memberId is not set */}
          <Route path="/" element={memberId ? <Navigate to="/homepage" /> : <AuthPage />} />

          {/* Only allow access to pages that require memberId if it's found */}
          <Route
            path="/favourite-books"
            element={memberId ? <FavouriteBooksPage /> : <Navigate to="/" />}
          />
          <Route
            path="/homepage"
            element={memberId ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/bind"
            element={memberId ? <Bind /> : <Navigate to="/" />}
          />
          <Route
            path="/testBookSearch"
            element={memberId ? <BookSearch /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
