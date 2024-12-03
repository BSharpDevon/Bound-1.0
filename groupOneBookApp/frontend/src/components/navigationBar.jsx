import React, { useState } from 'react';
import '../index.css'; // Use global styles or create specific styles
import logo from '../assets/images/logo.svg'; // Adjust the path to your logo

const NavigationBar = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    // Add login logic here (e.g., API call)
  };

  return (
    <nav className="navbar">
      <form className="navbar-login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="navbar-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="navbar-input"
        />
        <button type="submit" className="button">
          LOGIN
        </button>
      </form>
    </nav>
  );
};

export default NavigationBar;
