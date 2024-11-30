// src/components/signIn.jsx
import React, {useState} from 'react';

function SignIn(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // This Function is connected to the username box - needs to be written
  function loginUser(event){
      setUsername(event.target.value); 
  }

  function loginPassword(event){
   setPassword(event.target.value); 
  }

  // Example of how to call axios for button function -- change the port number to backend port number
  function login(event){
    // onClick(axios.get("http://127.0.0.1:5000/fetchBooks").then(........));
    const [formData, setFormData] = useState({
      name: '',
      email: '',
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
                onClick={login}
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

export default signIn;