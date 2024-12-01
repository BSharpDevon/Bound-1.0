// src/components/signIn.jsx
import React, {useState} from 'react';
import axios from 'axios';

function SignIn(){

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password ''
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // This Function is connected to the email text box
  // Tells SQL to check if it matches records
  function loginUser(event) {
    // Set the username from the input box
    setEmail(event.target.value);
  
    // Fetch the data when the username changes
    axios.get('https://bound/login')  // GET fetches the username
      .then(res => {
        // Sets the response to below const
        const user = res.data.content;  // Example: { content: [{ email: 'john' }, { username: 'jane' }] }
  
        // Check if the username exists in the response
        const emailFound = user.some(user => user.email === email);
  
        if (emailFound) {
          console.log(`User: ${email} found`);
        } else {
          console.log(`User: ${email} not found`);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }






  function loginPassword(event){
   setPassword(event.target.value); 
  }++


  // Example of how to call axios for button function -- change the port number to backend port number
  function login(event){
    // onClick(axios.get("http://127.0.0.1:5000/fetchBooks").then(........));
    
    });

    const checkDetails = (e) => {
      const { username, value } = e.target;
      setFormData({
        ...formData,
        [username]: value,
      });
    
  }

// function to create an account
  function signUpBtn(event){
    onClick();
  }

// function to take us to the sign in page
function signInBtn(event){
  onClick();
}

  return (<div>
            <h1>Welcome to Bound</h1>

            <p>Find books to read and share with friends.</p>

            <label>
              Username: 
                <input
                  type="text" 
                  value={username} 
                  placeholder={"Enter your username"}
                  onChange={username}
                />
            </label>

            <br />
            
            <label>
              Password:
                <input 
                  type="password" 
                  value={password} 
                  placeholder={"Enter your password"}
                  onChange={loginPassword}
                />
            </label>

            <br />

            <label>
              <input
                name="Login"
                type="button"
                value="Login"
                onClick={loginUser}
              />
            </label>

            <label>
              <input
              name="signUp"
              type="button"
              value="Sign up"
              onClick={signUpBtn}
              />
            </label>

          </div>);
};

export default SignIn;