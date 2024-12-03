import {useState} from 'react';
import SignUpPage from './components/signUp'; 
import AuthPage from './components/authPage';  // Import the SignUp component
import './App.css';                             // Import the CSS file

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

