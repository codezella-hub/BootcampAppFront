import React, { useState } from 'react';
import axios from 'axios';
import Header from './header'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setError({ email: '', password: '' });

    try {
      console.log('Sending login request with:', { email, password });
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      console.log('Login response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/student/enroll-course'; // Redirect to dashboard
      }
    } catch (err) {
      console.error('Login error:', err);

      if (err.response && err.response.data.errors) {
        // Set error messages from the backend response
        setError(err.response.data.errors);
      } else {
        // Generic error message for other errors
        setError({ email: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <>
        <Header />
    <div className="login-registration-wrapper">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="login-page-form-area">
              <h4 className="title">Login to Your Account👋</h4>
              <form onSubmit={handleSubmit}>
                <div className="single-input-wrapper">
                  <label htmlFor="email">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {error.email && <p className="error-message">{error.email}</p>}
                </div>
                <div className="single-input-wrapper">
                  <label htmlFor="password">Your Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {error.password && <p className="error-message">{error.password}</p>}
                </div>
                <div className="single-checkbox-filter">
                  <div className="check-box">
                    <input type="checkbox" id="type-1" />
                    <label htmlFor="type-1">Remember Me</label>
                    <br />
                  </div>
                </div>
                <button type="submit" className="rts-btn btn-primary">
                  Login
                </button>
<div>
  <div className="google-apple-wrapper">
    <div className="google">
      <img src="assets/images/contact/06.png" alt="contact" />
    </div>
    <div className="google">
      <img src="assets/images/contact/07.png" alt="contact" />
    </div>
  </div>
  <p>Don't Have an account? <a href="registration.html">Registration</a></p>
</div>

              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-thumbnail-login-p mt--100">
              <img
                src="assets/images/banner/login-bg.png"
                width={600}
                height={495}
                alt="login-form"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
}
