import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../src/assets/images/logo.svg';
import group from '../src/assets/images/authPage-image.png';
import Footer from '../src/components/footer.jsx';
import { useDispatch } from 'react-redux';
import { setMemberId } from '../src/Redux/slices/userSlice.js';
import { motion, AnimatePresence } from 'framer-motion';

function RotatingText({ messages, interval = 3000 }) {
  const [current, setCurrent] = useState(0);

useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % messages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [messages.length, interval]);

    return (
    <div style={{ position: 'relative', height: '1.5em'}}>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', width: '100%' }}
        >
          {messages[current]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const demoLines = [
  "Beth and Jake were recommended The Great Gatsby.",
  "Alicia and Jenni are now reading The Little Prince.",
  "Eve and Frank found The Hobbit together."
];

  // State to keep track of Sign In inputs
  const [emailSignIn, setEmailSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for Sign Up
  const [fullName, setFullName] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  // 👋 Function to sign the user in like a bouncer checking the guest list
  const signInBtn = async () => {
    if (!emailSignIn || !passwordSignIn) {
      alert('Oi! Email and password, please.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8000/login-page/login', {
        email: emailSignIn,
        password: passwordSignIn,
      });

      console.log('Login response:', response.data);

      const { success, memberId, email } = response.data;

      if (success) {
        dispatch(setMemberId({ memberId, email, fullName: "User" })); // fullName not sent from login, so default for now
        navigate('/homepage');
      } else {
        alert('Invalid email or password. Try again!');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Login failed. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✨ Function to sign the user up and send them on their bookish way
  const signUpBtn = async () => {
    if (!fullName || !emailSignUp || !passwordSignUp || !isChecked) {
      alert('All fields please! And don’t forget the Privacy checkbox.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailSignUp)) {
      alert('Please enter a valid email.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8000/login-page/signup', {
        fullName,
        email: emailSignUp,
        password: passwordSignUp,
        privacyAccepted: isChecked,
      });

      console.log('Signup response:', response.data);

      const { success, memberId, user } = response.data;

      if (success && user) {
        const { email, fullName } = user;
        dispatch(setMemberId({ memberId, email, fullName }));
        navigate('/favourite-books', { state: { fullName } });
      } else {
        alert(response.data.message || 'Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      alert('Sign up failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Sign In Panel — for returning heroes */}
      <div className="login">
        <img id="logo" src={logo} alt="Bound Logo" />
        <form className="signin" onSubmit={(e) => e.preventDefault()}>
          <label>
            <input
              type="text"
              value={emailSignIn}
              placeholder="Email address"
              onChange={(e) => setEmailSignIn(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="password"
              value={passwordSignIn}
              placeholder="Password"
              onChange={(e) => setPasswordSignIn(e.target.value)}
            />
          </label>
          <br />
          <input
            id="signInButton"
            type="button"
            value="LOGIN"
            onClick={signInBtn}
            disabled={isSubmitting}
          />
        </form>
      </div>

      {/* Fun Book Vibes and Signup Panel */}
      <div className="header-section">
        <div id="hero-image-container">
          <img id="hero-image" src={group} alt="Woman reading a book" />
          <div className="my-rotator-wrapper">
  <RotatingText messages={demoLines} interval={3000} />
</div>

        </div>


        <div className="intro-section">
          <div id="introMessage">
            <h1>
              <span className="highlight">Bound.</span> The best way to find books you'll both love.
            </h1>
            <p>
              Reading with your partner or book club buddy? No more compromising — Bound searches through <span className="highlight">millions</span> of titles to find a book you'll both love!
            </p>

            <div className="signup">
              <form onSubmit={(e) => e.preventDefault()}>
                <label>
                  <input
                    type="text"
                    value={fullName}
                    placeholder="Full name"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  <input
                    type="email"
                    value={emailSignUp}
                    placeholder="Email address"
                    onChange={(e) => setEmailSignUp(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  <input
                    type="password"
                    value={passwordSignUp}
                    placeholder="Password"
                    onChange={(e) => setPasswordSignUp(e.target.value)}
                  />
                </label>
                <br />
                <label id="privacyPolicy">
                  <input
                    type="checkbox"
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  I solemnly swear I’ve read the <b>Privacy Policy</b>. Pinky promise.
                </label>
                <br />
                <input
                  id="signUpButton"
                  type="button"
                  value="SIGN UP"
                  onClick={signUpBtn}
                  disabled={isSubmitting}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AuthPage;