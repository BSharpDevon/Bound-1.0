import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../src/assets/images/logo.svg';
import menuicon from '../src/assets/images/menu-icon.svg';
import Footer from '../src/components/footer.jsx';
import { useDispatch } from 'react-redux';
import { setMemberId } from '../src/Redux/slices/userSlice.js';
import { motion, AnimatePresence } from 'framer-motion';

// Import book covers
import cover1 from '../src/assets/images/book-cover-1.jpg';
import cover2 from '../src/assets/images/book-cover-2.jpg';
import cover3 from '../src/assets/images/book-cover-3.jpg';
import cover4 from '../src/assets/images/book-cover-4.jpg';
import cover5 from '../src/assets/images/book-cover-5.jpg';
import cover6 from '../src/assets/images/book-cover-6.jpg';
import cover7 from '../src/assets/images/book-cover-7.jpg';
import cover8 from '../src/assets/images/book-cover-8.jpg';
import cover9 from '../src/assets/images/book-cover-9.jpg';
import cover10 from '../src/assets/images/book-cover-10.jpg';
import cover11 from '../src/assets/images/book-cover-11.jpg';
import cover12 from '../src/assets/images/book-cover-12.jpg';
import cover13 from '../src/assets/images/book-cover-13.jpg';
import cover14 from '../src/assets/images/book-cover-14.jpg';
import cover15 from '../src/assets/images/book-cover-15.jpg';
import cover16 from '../src/assets/images/book-cover-16.jpg';
import cover17 from '../src/assets/images/book-cover-17.jpg';
import cover18 from '../src/assets/images/book-cover-18.jpg';
import cover19 from '../src/assets/images/book-cover-19.jpg';
import cover20 from '../src/assets/images/book-cover-20.jpg';
import cover21 from '../src/assets/images/book-cover-21.jpg';
import cover22 from '../src/assets/images/book-cover-22.jpg';
import cover23 from '../src/assets/images/book-cover-23.jpg';
import cover24 from '../src/assets/images/book-cover-24.jpg';

import 'boxicons/css/boxicons.min.css';

const bookCovers = [
  cover1, cover2, cover3, cover4, cover5, cover6,
  cover7, cover8, cover9, cover10, cover11, cover12,
  cover13, cover14, cover15, cover16, cover17, cover18,
  cover19, cover20, cover21, cover22, cover23, cover24,
];

function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSignIn, setEmailSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [isChecked, setIsChecked] = useState(false);

const numColumns = 8;
const columns = Array.from({ length: numColumns }, () => []);
bookCovers.forEach((cover, i) => {
  columns[i % numColumns].push(cover);
});

  const signInBtn = async () => {
    if (!emailSignIn || !passwordSignIn) {
      alert('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:8000/login-page/login', {
        email: emailSignIn,
        password: passwordSignIn,
      });

      const { success, memberId, email, fullName } = res.data;
      if (success) {
        dispatch(setMemberId({ memberId, email, fullName }));
        navigate('/homepage');
      } else {
        alert('Invalid credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const signUpBtn = async () => {
    if (!fullName || !emailSignUp || !passwordSignUp || !isChecked) {
      alert('All fields are required, and you must accept the privacy policy.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailSignUp)) {
      alert('Enter a valid email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:8000/login-page/signup', {
        fullName,
        email: emailSignUp,
        password: passwordSignUp,
        privacyAccepted: isChecked,
      });

      const { success, memberId, user } = res.data;
      if (success && user) {
        dispatch(setMemberId({ memberId, email: user.email, fullName: user.fullName }));
        navigate('/favourite-books', { state: { fullName: user.fullName } });
      } else {
        alert(res.data.message || 'Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Something went wrong. Try again.');
    } finally {
      setIsSubmitting(false);
    }
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


  return (
    <div className="auth-page">
      {/* Background animated book masonry */}
      <div className="background-masonry">
  {columns.map((column, colIdx) => (
    <div className="scrolling-column" key={colIdx}>
      <div
        className="scrolling-content"
        style={{ animationDelay: `${colIdx * 2}s` }}
      >
        {column.concat(column).map((cover, i) => (
          <img key={i} src={cover} alt={`book-${i}`} className="masonry-tile" />
        ))}
      </div>
    </div>
  ))}
</div>


      

      <div className="masonry-spotlight" id="spotlight"></div>

      <div className="sparkle-overlay">
  {[...Array(20)].map((_, i) => (
    <div key={i} className="sparkle" style={{ animationDelay: `${Math.random() * 10}s` }} />
  ))}
</div>


      {/* Top bar */}
      <div className="login">
        <img id="menu-icon" src={menuicon} alt="menu icon" />
        <button className="auth-tab-button" onClick={() => setIsSignUp(prev => !prev)}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </div>

      {/* Main auth form */}
      <div className="content-overlay">
        <div className="header-section">
          <div className="intro-section">
            <img id="logo" src={logo} alt="Bound Logo" />
            <p className="intro-message">The best way to find books you'll love.</p>

            <AnimatePresence mode="wait">
              <motion.div
                key={isSignUp ? 'signup' : 'signin'}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ overflow: 'hidden' }}
              >
                <form onSubmit={(e) => e.preventDefault()}>
                  {isSignUp ? (
                    <>
                      <div className="input-wrapper">
                        <i className="bx bx-user"></i>
                        <input
                          type="text"
                          value={fullName}
                          placeholder="Username"
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="input-wrapper">
                        <i className="bx bx-at"></i>
                        <input
                          type="email"
                          value={emailSignUp}
                          placeholder="Email address"
                          onChange={(e) => setEmailSignUp(e.target.value)}
                        />
                      </div>
                      <div className="input-wrapper">
                        <i className="bx bx-key"></i>
                        <input
                          type="password"
                          value={passwordSignUp}
                          placeholder="Password"
                          onChange={(e) => setPasswordSignUp(e.target.value)}
                        />
                      </div>
                      <label id="privacyPolicy">
                        <input
                          id="checkbox"
                          type="checkbox"
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        I agree to Bound's Terms of Service and Privacy Policy.
                      </label>
                      <input
                        id="auth-page-submit-button"
                        type="button"
                        value="Sign Up"
                        onClick={signUpBtn}
                        disabled={isSubmitting || !isChecked}
                      />
                    </>
                  ) : (
                    <>
                      <div className="input-wrapper">
                        <i className="bx bx-at"></i>
                        <input
                          type="email"
                          value={emailSignIn}
                          placeholder="Email address"
                          onChange={(e) => setEmailSignIn(e.target.value)}
                        />
                      </div>
                      <div className="input-wrapper">
                        <i className="bx bx-lock"></i>
                        <input
                          type="password"
                          value={passwordSignIn}
                          placeholder="Password"
                          onChange={(e) => setPasswordSignIn(e.target.value)}
                        />
                      </div>
                      <input
                        id="auth-page-submit-button"
                        type="button"
                        value="Sign In"
                        onClick={signInBtn}
                        disabled={isSubmitting}
                      />
                    </>
                  )}
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
