import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/authPage";
import BookSearch from "./pages/favouriteBooks";
import HomePage from "./pages/homepage";
import Bind from "./pages/bind";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Root Route */}
          <Route path="/" element={<AuthPage />} />

          {/* Other Routes */}
          <Route path="/favourite-books" element={<BookSearch />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/bind" element={<Bind />} />

          {/* Catch-all Route: Redirect unknown paths to AuthPage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
