// src/components/signUp.jsx
import {useState} from 'react';

// Setting the values to blank
function SignUpPage(){
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

// These Functions set the new values to state variables
function loginName(event){
    setFullName(event.target.value); 
}

// Email validation function
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email); // Basic regex validation for email format
}

function loginEmail(event) {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    // statement to validate if email is correct format 
    if (!validateEmail(inputEmail)) {
    console.log("Invalid email format");
    }
}

function loginPassword(event){
setPassword(event.target.value); 
}

function privacyCheckbox(event){
    setIsChecked(event.target.checked); 
}

function signUp() {
    if (!fullName || !email || !password || !isChecked) {
    alert("Please fill in all fields and accept the privacy policy to continue");
    return;
    }
    // Code to be edited to submit the data to the API
    console.log({ fullName, email, password });
}

  // Basic HTML, creating buttons etc
    return (<div>
            {/* Lydia / Emma - Main logo image to be inserted here */}
            <img src="LOGO IMG NAME" alt="This is the Bound logo" width="500" height="600" />

            <p> - YOUR NEXT BEST CHAPTER - </p>

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

export default SignUpPage;