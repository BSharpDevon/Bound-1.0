import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../src/components/imageCarousel.jsx';
import axios from 'axios';
import logo from '../src/assets/images/logo.svg';
import group from '../src/assets/images/group2.svg';
import Footer from '../src/components/footer.jsx';
import { useDispatch } from 'react-redux';
import { setMemberId } from '../src/Redux/slices/userSlice.js';

function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <div id="girl-image">
          <img id="girl" src={group} alt="Woman reading a book" />
        </div>

        <div className="intro-section">
          <div id="introMessage">
            <h1>
              Let Your <span className="highlight">Friends</span> Find Your Next Best Book
            </h1>
            <p>
              Bound searches millions of titles to match your excellent (and probably chaotic) tastes.
              Sign up to get your first recommendation!
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

      {/* Carousel of dreams */}
      <div className="carousel-bottom">
        <Carousel />
      </div>

      <Footer />
    </div>
  );
}

export default AuthPage;