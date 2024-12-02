// src/components/signIn.jsx
import {useState} from 'react';
import axios from 'axios';

function SignIn(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // This Function is connected to the email text box
  // Tells SQL to check if it matches records

  // Login function, happens after clicking login button:
  const loginBtn = (e) => {
    e.preventDefault(); // Prevent default (reloading the page when button is clicked.)

  // Validate input
    if (!email || !password) {
      console.log("Please enter both email and password");
      return;
    }
  
    // Fetches the email and password data
    axios
      .post('http://localhost:8000/bound/login', {
        email: email,
        password: password,
      })
      .then((res) => { // fetches the username
        // API checks details and if they match responds with success.
        const loginSuccessful = res.data.success;
        if (loginSuccessful) {
            console.log(`User: ${email} found and logged in successfully`);
            loadHomepage();
        } else {
            console.log(`Invalid email or password`);
          }
      })              
      // An error message if the database can't get the user 
      .catch(error => {
        console.error(`Error during login:`, error);
      });
  }

    // Jenny/Jeveria: Function needed to load homepage
    const loadHomepage = () => {
      window.location.href = "https://www.example.com";
    };
  

  // function to create an account
  function signUpBtn(e){
    console.log("Sign up button clicked");
    // Add sign-up logic here - on click
  }

  return (
    <div>
      <h1>Welcome to Bound</h1>
      <p>Find books to read and share with friends.</p>

      <form onSubmit={(e) => e.preventDefault()}>     
        <label>
          Email: 
          <input
            type="text" 
            value={email} 
            placeholder={"Enter your email address"}
            onChange={(e) => setEmail(e.target.value)}
            />
        </label>
        <br/>
            
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            placeholder={"Enter your password"}
            onChange={(e) => setPassword(e.target.value)}
            />
        </label>
        <br/>

        <input
          name="Login"
          type="button"
          value="Login"
          onClick={loginBtn}
        />

        <input
          name="signUp"
          type="button"
          value="Sign up"
          onClick={signUpBtn}
        />
      </form>
    </div>
  );
}

export default SignIn;