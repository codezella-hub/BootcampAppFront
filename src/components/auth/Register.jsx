import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [errorlist, setError] = useState({});
    const [registerInput, setRegister] = useState({
        fullName: '',
        birthOfDate: '',
        cin: '',
        phoneNumber: '',
        email: '',
        password: '',
    });
    const [picture, setPicture] = useState(null);
    const [imageName, setImageName] = useState(""); // Store selected image name
    const [imagePreview, setImagePreview] = useState("assets/images/dashboard/05.png"); // Default image

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });

        // Remove error border once user starts typing
        if (errorlist[e.target.name]) {
            setError((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[e.target.name];
                return newErrors;
            });
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture({ image: file });
            setImageName(file.name); // Store the selected image name
            setImagePreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullName', registerInput.fullName);
        formData.append('birthOfDate', registerInput.birthOfDate);
        formData.append('cin', registerInput.cin);
        formData.append('phoneNumber', registerInput.phoneNumber);
        formData.append('email', registerInput.email);
        formData.append('password', registerInput.password);
        formData.append('image', picture?.image);


        axios.post(`/api/register`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
        }).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                }).then(() => {
                    navigate('/login');
                });
            }
        }).catch(error => {
            if (error.response && error.response.data.errors) {
                const errorObj = {};
                error.response.data.errors.forEach(err => {
                    if (err.includes("Full name")) errorObj.fullName = err;
                    if (err.includes("Birth date")) errorObj.birthOfDate = err;
                    if (err.includes("CIN")) errorObj.cin = err;
                    if (err.includes("Phone number")) errorObj.phoneNumber = err;
                    if (err.includes("Email")) errorObj.email = err;
                    if (err.includes("Password")) errorObj.password = err;
                });

                setError(errorObj);

                Swal.fire({
                    title: 'Registration Failed!',
                    html: Object.values(errorObj).join('<br>'),
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33',
                });
            }
        });

    };

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
                                            <input
                                                id="fullName"
                                                type="text"
                                                placeholder="Enter Full Name"
                                                name="fullName"
                                                onChange={handleInput}
                                                value={registerInput.fullName}
                                                required
                                                style={{ border: errorlist.fullName ? '2px solid red' : '' }}
                                            />
                                        </div>
                                        <div className="single-input-wrapper">
                                            <label htmlFor="birthOfDate">Date Of Birth</label>
                                            <input
                                                id="birthOfDate"
                                                type="date"
                                                placeholder="Enter Your Date"
                                                name="birthOfDate"
                                                onChange={handleInput}
                                                value={registerInput.birthOfDate}
                                                required
                                                style={{ border: errorlist.birthOfDate ? '2px solid red' : '' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="half-input-wrapper">
                                        <div className="single-input-wrapper">
                                            <label htmlFor="cin">CIN</label>
                                            <input
                                                id="cin"
                                                type="text"
                                                placeholder="Enter Your Cin"
                                                name="cin"
                                                onChange={handleInput}
                                                value={registerInput.cin}
                                                required
                                                style={{ border: errorlist.cin ? '2px solid red' : '' }}
                                            />
                                        </div>
                                        <div className="single-input-wrapper">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <input
                                                id="phoneNumber"
                                                type="text"
                                                placeholder="Enter Your Phone"
                                                name="phoneNumber"
                                                onChange={handleInput}
                                                value={registerInput.phoneNumber}
                                                required
                                                style={{ border: errorlist.phoneNumber ? '2px solid red' : '' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="email">Your Email</label>
                                        <input
                                            id="email"
                                            type="text"
                                            placeholder="Enter Your Email"
                                            name="email"
                                            onChange={handleInput}
                                            value={registerInput.email}
                                            required
                                            style={{ border: errorlist.email ? '2px solid red' : '' }}
                                        />
                                    </div>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="password">Your Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter Your Password"
                                            name="password"
                                            onChange={handleInput}
                                            value={registerInput.password}
                                            required
                                            style={{ border: errorlist.password ? '2px solid red' : '' }}
                                        />
                                    </div>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="image">Image</label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={handleImage}
                                            style={{ display: "none" }}
                                        />
                                        <div className="course-thumbnail-upload-area">
                                            <div className="thumbnail-area">
                                                <img src={imagePreview} alt="Selected" />
                                            </div>
                                            <div className="information">
                                                <div className="input-file-type-btn">
                                                    <button 
                                                        type="button"
                                                        className="rts-btn btn-primary"
                                                        id="custom-button"
                                                        onClick={() => document.getElementById("image").click()}
                                                    >
                                                        Pick Image
                                                    </button>
                                                    {imageName && <p>Selected Image: {imageName}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-checkbox-filter">
                                        <div className="check-box">
                                            <input type="checkbox" id="terms" />
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
