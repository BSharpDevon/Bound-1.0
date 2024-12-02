import SignIn from './components/signIn';   // Import the signIn component
import SignUpPage from './components/signUp';   // Import the SignUp component
import './App.css';                             // Import the CSS file

function App() {    // Define the App component as a functional component
  return (          // Returns what should be rendered
   <div className="App">  
     <SignIn />
     <SignUpPage />
   </div>
 );
};

export default App;     // Export the App component so it can be used in other files