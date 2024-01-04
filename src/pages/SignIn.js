import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css';

function SignIn({ onSignIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignInClick = async () => {

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7117/SignIn', {
        email: email,
        password: password,
      });


      const userId = response.data;
      onSignIn(userId);

      navigate('/home');
    } catch (error) {
      console.error('Error signing in:', error.message);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-form">
        <h2>Sign In to Access Your Personal Dictionary</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label className="form-label">
          Email:
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignInClick} className="form-button">
          Sign In
        </button>
        <br></br>
        <Link to="/register">Create a new Account</Link>
      </form>
    </div>
  );
}

export default SignIn;
