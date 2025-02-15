import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2
import Header from './Header';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { email, password });
      console.log(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
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

                  </div>
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="type-1" />
                      <label htmlFor="type-1">Remember Me</label>
                    </div>
                  </div>
                  <button type="submit" className="rts-btn btn-primary">
                    Login
                  </button>
                  <div className="google-apple-wrapper">
                    <div className="google">
                      <img src="assets/images/contact/06.png" alt="contact" />
                    </div>
                    <div className="google">
                      <img src="assets/images/contact/07.png" alt="contact" />
                    </div>
                    <div className="google">
                      <img src="/assets/images/auth/faceid.png" width={24}  alt="faceid" />
                    </div>
                  </div>
                  <p>Don't Have an account? <Link to="/register">Register</Link></p>
                  <p>Forget Your Password ? <a href="registration.html">Change it </a></p>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-thumbnail-login-p mt--1">
              <img src="assets/images/auth/login2.png" width={600}  alt="login-form" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
