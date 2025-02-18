import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';

function ForgetPassword() {

    return (
        <>
            <Header />
            <div className="login-registration-wrapper">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-lg-6">
                            <div className="login-page-form-area">
                                <h4 className="title">Reset Your Password</h4>
                                <form >
                                    <div className="single-input-wrapper">
                                        <label htmlFor="email">Your Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter Your Email"
                                            required
                                        />

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
                                            <img src="/assets/images/auth/faceid.png" width={24} alt="faceid" />
                                        </div>
                                    </div>
                                    <p>Already Have an account? <Link to="/register">Sign In</Link></p>
                                    <p>Don't Have an account? <a href="registration.html">Sign Up</a></p>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-thumbnail-login-p mt--1">
                                <img src="assets/images/auth/rp.png" width={600} alt="login-form" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword