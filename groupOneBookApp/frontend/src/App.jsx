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
  const [loading, setLoading] = useState(true);  // Loading state for waiting for memberId

  useEffect(() => {
    // Debugging: Log when the app is checking localStorage
    console.log("Checking localStorage for memberId...");
    
    // Check if memberId exists in localStorage
    const storedMemberId = localStorage.getItem('memberId');
    
    if (storedMemberId) {
      console.log("Found memberId in localStorage:", storedMemberId);
      setMemberId(storedMemberId);  // Set memberId from localStorage
    } else {
      console.log("No memberId found in localStorage.");
    }
    
    // After checking localStorage, set loading to false
    setLoading(false);
  }, []);

  // Debugging: Log the current memberId and loading state
  console.log("App loading:", loading);
  console.log("Current memberId:", memberId);

  if (loading) {
    return <div>Loading...</div>;  // Wait until loading is false
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Debugging: Log which route is being evaluated */}
          <Route 
            path="/" 
            element={memberId ? (
              <>
                {console.log("Redirecting to /homepage")}
                <Navigate to="/homepage" />
              </>
            ) : <AuthPage />} 
          />

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
            path="/test-book-search"
            element={memberId ? <BookSearch /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;