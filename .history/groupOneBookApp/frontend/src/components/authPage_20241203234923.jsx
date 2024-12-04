import { useState } from 'react';
import Carousel from "./imageCarousel";
import React from "react";
import axios from 'axios';
import logo from '../assets/images/logo.svg';
import girl from '../assets/images/girl.svg';

function AuthPage() {
  // State for Sign In
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");

  // State for Sign Up
  const [fullName, setFullName] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // SignIn Function
  const signInBtn = () => {
    if (!emailSignIn || !passwordSignIn) {
      console.log("Please enter both email and password");
      return;
    }

    axios
      .post('http://localhost:8000/bound/login', {
        email: emailSignIn,
        password: passwordSignIn,
      })
      .then((res) => {
        const loginSuccessful = res.data.success;
        if (loginSuccessful) {
          console.log(`User: ${emailSignIn} found and logged in successfully`);
          loadHomepage();
        } else {
          console.log(`Invalid email or password`);
        }
      })
      .catch((error) => {
        console.error(`Error during login:`, error);
      });
  };

  // SignUp Function
  const signUpBtn = () => {
    if (!fullName || !emailSignUp || !passwordSignUp || !isChecked) {
      alert("Please fill in all fields and accept the privacy policy to continue");
      return;
    }
    console.log({ fullName, emailSignUp, passwordSignUp });
  };

  // Function to redirect to homepage after successful login
  const loadHomepage = () => {
    window.location.href = "https://www.example.com"; // Update to the real homepage URL
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
              placeholder={"Email address"}
              onChange={(e) => setEmailSignIn(e.target.value)}
            />
          </label>
          <br />

          <label>
            <input
              type="password"
              value={passwordSignIn}
              placeholder={"Password"}
              onChange={(e) => setPasswordSignIn(e.target.value)}
            />
          </label>
          <br />

          <input id="signUpButton"
            name="Login"
            type="button"
            value="LOGIN"
            onClick={signInBtn}
          />
        </form>
      </div>

      {/* Welcome and Instructions */}
      <div class="header-section">
      
      <div id="girl-image"><img id="girl" src={girl} alt="Woman reading a book" /></div>
      
      <div className="intro-section">
        <div id="introMessage">
          <h1>Let Your Friends Find Your Next Best Book</h1>
          <p>
            Can't settle on what to read? Find out how your literary interests bind with friends and get a reading recommendation to enjoy together.
          </p>

          {/* SignUp Section */}
      <div className="signup">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            <input
              type="text"
              value={fullName}
              placeholder={"Full name"}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <br />

          <label>
            <input
              type="text"
              value={emailSignUp}
              placeholder={"Email address"}
              onChange={(e) => setEmailSignUp(e.target.value)}
            />
          </label>
          <br />

          <label>
            <input
              type="password"
              value={passwordSignUp}
              placeholder={"Password"}
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
            By signing up, you acknowledge that you have read our Privacy Policy.
          </label>
          <br />

          <input
            name="signUp"
            type="button"
            value="SIGN UP"
            onClick={signUpBtn}
            id="signUpButton"
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
    </div>
  );
}

export default AuthPage;
