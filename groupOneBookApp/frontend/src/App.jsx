import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/authPage';
import FavouriteBooksPage from './components/favouriteBooks';
import HomePage from './components/homepage';
import Bind from './components/bind';
import './App.css';

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

export default App;
