import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Register.css';

export default function Register() {
  const navigate = useNavigate(); 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = async () => {
   
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7117/api/User', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      console.log('Response from the server:', response);

      navigate('/signIn');


    } catch (error) {
      console.error('Error registering:', error.message);

      setErrorMessage('A user with that email address already exists.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form">
        <h2>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label className="form-label">
          First Name:
          <input
            type="text"
            className="form-input"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <br />
        <label className="form-label">
          Last Name:
          <input
            type="text"
            className="form-input"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </label>
        <br />
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
        <button type="button" className="form-button" onClick={handleRegisterClick}>
          Register
        </button>
      </form>
    </div>
  );
}
