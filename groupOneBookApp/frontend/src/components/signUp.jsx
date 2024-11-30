// src/components/signUp.jsx
import React, {useState} from 'react';

// Setting the values to blank
function signUpPage(){

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // These Functions set the new values to each of the above const
  function loginName(event){
      setFullName(event.target.value); 
  }

  function loginEmail(event){
    setEmail(event.target.value); 
   }

  function loginPassword(event){
   setPassword(event.target.value); 
  }

  function privacyCheckbox(event){
    setIsChecked(event.target.checked); 
   }

  // Basic HTML, creating buttons etc
  return (<div>
            {/* Lydia / Emma - Main logo image to be inserted here */}
            <img src="LOGO IMG NAME" alt="This is the Bound logo" width="500" height="600">

            <p>- YOUR NEXT BEST CHAPTER -</p>

            <p> Sign Up </p>

            <label>
              Full name: 
                <input
                  type="text" 
                  value={fullName} 
                  placeholder={"Enter your full name"}
                  onChange={loginName}
                />
            </label>

            <br />
            
            <label>
              Email:
                <input 
                  type="text" 
                  value={email} 
                  placeholder={"Enter your email"}
                  onChange={loginEmail}
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
                name="PrivacyCheckbox"
                type="checkbox"
                onChange={privacyCheckbox}

              />
            </label>

            <label>
              <input
                name="signUp"
                type="button"
                value="Sign up"
                onClick={signUp}
              />
              By continuing you accept our privacy policy
            </label>

            {/* Jenni / Jeveria - add URL once created */}
            <p>Already have an account? <a href="url">Sign In</a></p>

          </div>);
}

export default signUpPage;