import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "./imageCarousel";
import axios from 'axios';
import logo from '../assets/images/logo.svg';
import group from '../assets/images/group2.svg';
import Footer from './footer.jsx';

function AuthPage() {
  // State for Sign In
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  // State for Sign Up
  const [fullName, setFullName] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [isChecked, setIsChecked] = useState(false); // set checkbox default to 

 // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // SignIn Function
  const signInBtn = async () => {
    if (!emailSignIn || !passwordSignIn) {
      console.log("Please enter both email and password");
      return;
    }

    setIsSubmitting(true); // Disable submission during API call

    try {
      const response = await axios.post("http://localhost:8000/bound/login", {
        email: emailSignIn,
        password: passwordSignIn,
      });

      const { success } = response.data;
      if (success) {
        console.log(`User: ${emailSignIn} logged in successfully`);
        navigate("/homepage"); // Redirect to homepage
      } else {
        console.log("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    } finally {
      setIsSubmitting(false); // Re-enable submission
    }
  };

  // SignUp Function
  const signUpBtn = async () => {
    if (!fullName || !emailSignUp || !passwordSignUp || !isChecked) {
      alert("Please fill in all fields and accept the privacy policy to continue");
      return;
    }
  
 // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailSignUp)) {
      alert("Please enter a valid email address.");
      return;
  }

    setIsSubmitting(true); // Disable submission during API call
  
    try {
      const response = await axios.post("http://localhost:8000/bound/signup", {
        fullName,
        email: emailSignUp,
        password: passwordSignUp,
        privacyAccepted: isChecked,
      });
  
      const { success } = response.data;
      if (success) {
        console.log("User registered successfully!");
        navigate("/favourite-books", { state: { fullName } });
      } else {
        console.error("Signup failed: ", response.data.message || "Unknown error");
        alert(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("An error occurred while signing up. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable submission
    }
  };

  return (
    <div className="auth-page">

      {/* SignIn Section */}
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

          <input id="signInButton"
            name="Login"
            type="button"
            value="LOGIN"
            onClick={signInBtn} disabled={isSubmitting}
          />
        </form>
      </div>

      {/* Welcome and Instructions */}
      <div className="header-section">
      
      <div id="girl-image"><img id="girl" src={group} alt="Woman reading a book" /></div>
      
      <div className="intro-section">
        <div id="introMessage">
          <h1>Let Your <span className="highlight">Friends</span> Find Your Next Best Book</h1>
          <p>Bound searches millions of titles to match you and your friend&apos;s unique tastes. Sign up for a free book recommendation.</p>
          
          
          {/* SignUp Section */}
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
              name="PrivacyCheckbox"
              type="checkbox"
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            By signing up, you acknowledge that you have read our <b>Privacy Policy</b>.
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

      {/* Carousel Section at the Bottom */}
      <div className="carousel-bottom">
        <Carousel />
      </div>

      <Footer/>

    </div>
  );
}

export default AuthPage;
