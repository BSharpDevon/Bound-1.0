import { useState } from 'react';
import axios from 'axios';

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
  const signInBtn = (e) => {
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
  const signUpBtn = (e) => {
    if (!fullName || !emailSignUp || !passwordSignUp || !isChecked) {
      alert("Please fill in all fields and accept the privacy policy to continue");
      return;
    }
    console.log({ fullName, emailSignUp, passwordSignUp });
    // Add code to handle sign up here (e.g., API call)
  };

  // Function to redirect to homepage after successful login
  const loadHomepage = () => {
    window.location.href = "https://www.example.com"; // Update to the real homepage URL
  };

  return (
    <div>
      {/* Welcome and Instructions */}
      <h1>Welcome to Bound</h1>
      <p>Find books to read and share with friends.</p>

      {/* SignIn Section */}
      <div>
        <h2>Sign In</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Email:
            <input
              type="text"
              value={emailSignIn}
              placeholder={"Enter your email address"}
              onChange={(e) => setEmailSignIn(e.target.value)}
            />
          </label>
          <br />

          <label>
            Password:
            <input
              type="password"
              value={passwordSignIn}
              placeholder={"Enter your password"}
              onChange={(e) => setPasswordSignIn(e.target.value)}
            />
          </label>
          <br />

          <input
            name="Login"
            type="button"
            value="Login"
            onClick={signInBtn}
          />
        </form>
      </div>

      <hr />

      {/* SignUp Section */}
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Full Name:
            <input
              type="text"
              value={fullName}
              placeholder={"Enter your full name"}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <br />

          <label>
            Email:
            <input
              type="text"
              value={emailSignUp}
              placeholder={"Enter your email"}
              onChange={(e) => setEmailSignUp(e.target.value)}
            />
          </label>
          <br />

          <label>
            Password:
            <input
              type="password"
              value={passwordSignUp}
              placeholder={"Enter your password"}
              onChange={(e) => setPasswordSignUp(e.target.value)}
            />
          </label>
          <br />

          <label>
            <input
              name="PrivacyCheckbox"
              type="checkbox"
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            By continuing, you accept our privacy policy
          </label>
          <br />

          <input
            name="signUp"
            type="button"
            value="Sign Up"
            onClick={signUpBtn}
          />
        </form>
      </div>
    </div>
  );
}

export default AuthPage;