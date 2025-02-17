import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2
import Header from './Header';
import { Link } from 'react-router-dom';

export default function Register() {
  const [registerInput, setRegister] = useState({
    fullName: '',
    birthOfDate: '',
    cin: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const [picture, setPicture] = useState(null);
  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  }
  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  }

  const registerSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', registerInput.fullName);
    formData.append('birthOfDate', registerInput.birthOfDate);
    formData.append('cin', registerInput.cin);
    formData.append('phoneNumber', registerInput.phoneNumber);
    formData.append('email', registerInput.email);
    formData.append('password', registerInput.password);
    formData.append('image', picture.image);
    //console.log(formData);
    console.log(registerInput);
    console.log(picture);




  }


  return (
    <>
      <Header />
      <div className="login-registration-wrapper">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="login-page-form-area">
                <h4 className="title">Sign Up to Your Account👋</h4>
                <form onSubmit={registerSubmit}>
                  <div className="half-input-wrapper">
                    <div className="single-input-wrapper">
                      <label htmlFor="fullName">Full Name</label>
                      <input id="fullName" type="text" placeholder="Enter Full Name" name="fullName" onChange={handleInput} value={registerInput.fullName} required />
                    </div>
                    <div className="single-input-wrapper">
                      <label htmlFor="birthOfDate">Date Of Birth</label>
                      <input id="birthOfDate" type="date" placeholder="Enter Your Date" name="birthOfDate" onChange={handleInput} value={registerInput.birthOfDate} required />
                    </div>
                  </div>
                  <div className="half-input-wrapper">
                    <div className="single-input-wrapper">
                      <label htmlFor="cin">CIN</label>
                      <input id="cin" type="text" placeholder="Enter Your Cin" name="cin" onChange={handleInput} value={registerInput.cin} required /> 
                    </div>
                    <div className="single-input-wrapper">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input id="phoneNumber" type="text" placeholder="Enter Your Phone" name="phoneNumber" onChange={handleInput} value={registerInput.phoneNumber} required />
                    </div>
                  </div>
                  <div className="single-input-wrapper">
                    <label htmlFor="email">Your Email</label>
                    <input id="email" type="text"placeholder="Enter Your Email"  name="email" onChange={handleInput} value={registerInput.email} required />
                  </div>
                  <div className="single-input-wrapper">
                    <label htmlFor="password">Your Password</label>
                    <input id="password" type="password" placeholder="Enter Your Password" name="password" onChange={handleInput} value={registerInput.password} required />
                  </div>
                  <div className="single-input-wrapper">
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" placeholder="Pick Your Image" name="image" onChange={handleImage} />
                  </div>
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="terms"  />
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
