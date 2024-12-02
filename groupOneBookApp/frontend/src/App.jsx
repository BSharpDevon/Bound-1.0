import {useState} from 'react';
import SignUpPage from './components/signUp';   // Import the SignUp component
import SignIn from './components/signIn';   // Import the signIn component
import './App.css';                             // Import the CSS file

function App() {    // Define the App component as a functional component
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between SignUp and SignIn

  return (          // Returns what should be rendered
    <div className="App">
      {isSignUp ? (
        <SignUpPage setIsSignUp={setIsSignUp} /> 
      ) : (
        <SignIn setIsSignUp={setIsSignUp} />
      )}
    </div>
  );
};

export default App;     // Export the App component so it can be used in other files