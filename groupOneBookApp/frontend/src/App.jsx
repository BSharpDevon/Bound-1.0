import React from 'react';                      // Import the React library, necessary for JSX to work
import HomePage from './components/HomePage';   // Import the HomePage component
import './App.css';                             // Import the CSS file

function App() {    // Define the App component as a functional component
  return (          // Returns what should be rendered
   <div className="App">  
     <HomePage /> {/* Render HomePage component inside the App */}
   </div>
 );
};

export default App;     // Export the App component so it can be used in other files