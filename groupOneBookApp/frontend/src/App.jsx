import {useState} from 'react';
import SignUpPage from './components/signUp'; 
import AuthPage from './components/authPage';
import './index.css'; 
     

function App() {
  return (
    <div className="App">
      <AuthPage /> 
    </div>
  );
}

export default App;     // Export the App component so it can be used in other files

