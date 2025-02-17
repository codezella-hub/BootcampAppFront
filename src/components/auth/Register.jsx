import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2
import Header from './Header';
import { Link } from 'react-router-dom';

export default function Register() {


  return (
    <>
      <Header />
      <div className="login-registration-wrapper">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="login-page-form-area">
                <h4 className="title">Sign Up to Your Account👋</h4>
                <form onSubmit={handleSubmit}>
                  <div className="half-input-wrapper">
                    <div className="single-input-wrapper">
                      <label htmlFor="fullName">Full Name</label>
                      <input id="fullName" type="text" placeholder="Enter Full Name" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className="single-input-wrapper">
                      <label htmlFor="birthOfDate">Date Of Birth</label>
                      <input id="birthOfDate" type="date" placeholder="Enter Your Birth" value={formData.birthOfDate} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="half-input-wrapper">
                    <div className="single-input-wrapper">
                      <label htmlFor="cin">CIN</label>
                      <input id="cin" type="text" placeholder="Enter Your CIN" value={formData.cin} onChange={handleChange} required />
                    </div>
                    <div className="single-input-wrapper">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input id="phoneNumber" type="text" placeholder="Enter Your Phone" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="single-input-wrapper">
                    <label htmlFor="email">Your Email</label>
                    <input id="email" type="text" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="single-input-wrapper">
                    <label htmlFor="password">Your Password</label>
                    <input id="password" type="password" placeholder="Enter Your Password" value={formData.password} onChange={handleChange} required />
                  </div>
                  <div className="single-input-wrapper">
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" onChange={handleFileChange} required />
                  </div>
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="terms" required />
                      <label htmlFor="terms">Accept the Terms and Privacy Policy</label>
                    </div>
                  </div>
                  <button type="submit" className="rts-btn btn-primary">Register</button>
                  <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-thumbnail-login-p mt--50">
                <img src="assets/images/auth/sp2.png" width={900} height={600} alt="login-form" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
