import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error messages
    setError({ email: '', password: '' });
    try {
      console.log('Sending login request with:', { email, password });
      const response = await axios.post('/api/login', { email, password });
      console.log('Login response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
        // Show success alert
       /* Swal.fire({
          title: 'Success!',
          text: 'You are now logged in.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          background: '#f4f4f4',
          backdrop: 'rgba(0,0,0,0.4)',
        }).then(() => {
          window.location.href = '/student/enroll-course'; // Redirect after clicking OK
        });*/
      // 🔥 Delay navigation for 3 seconds (3000ms)
      setTimeout(() => {
        //navigate('/student/enroll-course'); 
        window.location.href = '/student/enroll-course'; 
      }, 3000);
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data.errors) {
        setError(err.response.data.errors);
      } else {
        setError({ email: 'An error occurred. Please try again.' });
      }
      // Show error alert
      Swal.fire({
        title: 'Login Failed!',
        text: 'Invalid email or password. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        background: '#f4f4f4',
        backdrop: 'rgba(0,0,0,0.4)',
        height: '500px',
        width: '500px',
      });
      
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
