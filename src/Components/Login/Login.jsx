import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login', formData);

      setMessage(res.data.msg);

      // If login is successful, redirect to dashboard
      if (res.status === 200) {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.msg);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {/* Forgot password link */}
        <a href="/forgotpass" className="forgot-password">Forgot Password?</a>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
