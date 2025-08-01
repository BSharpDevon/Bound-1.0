import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../Pages/authPage";
import BookSearch from "../Pages/favouriteBooks";
import HomePage from "../Pages/homepage";
import Bind from "../Pages/bind";
import News from "../Pages/news";

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
          <Route path="/news" element={<News/>} />

          {/* Catch-all Route: Redirect unknown paths to AuthPage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
