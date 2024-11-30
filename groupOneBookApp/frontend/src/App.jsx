import React from 'react';                      // Import the React library, necessary for JSX to work
import signIn from './components/signIn';   // Import the signIn component
import signUp from './components/signUp';   // Import the SignUp component
import './App.css';                             // Import the CSS file

function App() {    // Define the App component as a functional component
  return (          // Returns what should be rendered
   <div className="App">  
     <HomePage /> {/* Render HomePage component inside the App */}
   </div>
 );
};

export default App;     // Export the App component so it can be used in other files