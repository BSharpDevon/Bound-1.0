// src/components/signIn.jsx
import React, {useState} from 'react';
import axios from 'axios';

function SignIn(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // This Function is connected to the email text box
  // Tells SQL to check if it matches records
  function loginBtn(e) {
  onClick(

      // Set the username from the input box
      setEmail(e.target.value);
  
      // Fetch the data when the username changes
      axios.get('http://localhost:8000/bound/login').then
        (res => { // fetches the username
          // Sets the response to below const
          const member = res.data.content;  // Example: { content: [{ email: 'john' }, { username: 'jane' }] }
  
          // Check if the username exists in the response
          const emailFound = member.some(member => member.email === email);
  
          if (emailFound) {
            console.log(`User: ${email} found`);
          } else {
            console.log(`User: ${email} not found`);
          }
        });
      
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    )};
                

// sets the email value entered into the email box
  function email(e){
    setEmail(e.target.value); 
   }

// sets the password value entered into the password box
  function password(e){
   setPassword(e.target.value); 
  }

  // // Example of how to call axios for button function -- change the port number to backend port number
  // function login(event){
  //   // onClick(axios.get("http://127.0.0.1:5000/fetchBooks").then(........));
    
  //   });

  //   const checkDetails = (e) => {
  //     const { username, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [username]: value,
  //     });
    
  // }

// function to create an account
  function signUpBtn(e){
    onClick();
  }


// This stops the form from refreshing the page when the login button is clicked
const stopFormPgRefresh = (e) => {
  e.preventDefault();
};

  return (<div>
            <h1>Welcome to Bound</h1>

            <p>Find books to read and share with friends.</p>

            <form onSubmit={stopFormPgRefresh}>
              
              <label>
                Email: 
                  <input
                    type="text" 
                    value={email} 
                    placeholder={"Enter your email address"}
                    onChange={email}
                  />
              </label>

              <br />
            
              <label>
                Password:
                  <input 
                    type="password" 
                    value={password} 
                    placeholder={"Enter your password"}
                    onChange={password}
                 />
              </label>

              <br />

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
          
          </div>);
};

export default SignIn;