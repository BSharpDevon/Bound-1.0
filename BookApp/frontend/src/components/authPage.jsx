import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './imageCarousel';
import axios from 'axios';
import logo from '../assets/images/logo.svg';
import group from '../assets/images/group2.svg';
import Footer from './footer.jsx';
import { useDispatch } from 'react-redux'; 
import { setMemberId } from '../Redux/slices/userSlice.js'; 

function AuthPage() { 
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false); 

  // State for Sign In
  const [emailSignIn, setEmailSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');

  // State for Sign Up
  const [localMemberId, setLocalMemberId] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [isChecked, setIsChecked] = useState(false); 

  // Sign In Function
  const signInBtn = async () => {
    if (!emailSignIn || !passwordSignIn) {
      alert('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8000/login-page/login', {
        email: emailSignIn,
        password: passwordSignIn,
      });

      const { success, memberId, email } = response.data;
      if (success) {
        dispatch(setMemberId({ memberId, email })); // ✅ Fixed Redux dispatch
        console.log("Redux store state after dispatch:", { memberId, email });
        navigate('/homepage'); 
      } else {
        alert('Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sign Up Function
  const signUpBtn = async () => {
    if (!fullName || !emailSignUp || !passwordSignUp || !isChecked) {
      alert('Please fill in all fields and accept the privacy policy to continue.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailSignUp)) {
      alert('Please enter a valid email address.');
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

      const { success, memberId, email } = response.data;
      if (success) {
        dispatch(setMemberId({ memberId, email })); // ✅ Fixed Redux dispatch
        console.log("Redux store state after dispatch (signup):", { memberId, email });
        navigate('/favourite-books', { state: { fullName } });
      } else {
        alert(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      alert('An error occurred while signing up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Sign In Section */}
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
            name="Login"
            type="button"
            value="LOGIN"
            onClick={signInBtn}
            disabled={isSubmitting}
          />
        </form>
      </div>

      {/* Welcome and Instructions */}
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
              Bound searches millions of titles to match you and your friend&apos;s unique tastes. 
              Sign up for a free book recommendation.
            </p>

            {/* Sign Up Section */}
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

                <input
                  name="signUp"
                  type="button"
                  value="SIGN UP"
                  onClick={signUpBtn}
                  id="signUpButton"
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
