// src/components/HomePage.jsx
import React, {useState} from 'react';

function HomePage(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // This Function is connected to the username box - needs to be written
  function loginUser(event){
      setUsername(event.target.value); 
  }

  function loginPassword(event){
    setPassword(event.target.value); 
}

  return (<div>
            <h1>Welcome to Bound</h1>

            <p>Find books to read and share with friends.</p>

            <p>Username:</p>
            <input 
              type="text" 
              value={username} 
              placeholder={"Enter your username"}
              onChange={loginUser}/>

            <p>Password:</p>
            <input 
              type="password" 
              value={password} 
              placeholder={"Enter your password"}
              onChange={loginPassword}
              />

          </div>);

          // PUT IN THE BUTTONS
};

export default HomePage;