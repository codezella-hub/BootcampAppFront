import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [errorList, setError] = useState({});
    const [registerInput, setRegister] = useState({
        firstname: '',
        lastname: '',
        age: '',
        birthdayDate: '',
        email: '',
        password: '',
        phoneNumber: '',
        gender: '',
        role: '', // Champ pour le rôle
    });
    

    // Handle input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setRegister((prevState) => ({ ...prevState, [name]: value }));

        // Remove error border once user starts typing
        if (errorList[name]) {
            setError((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };



    // Submit registration data
    const registerSubmit = (e) => {
        e.preventDefault();

        // Create JSON object with registration data
        const jsonData = {
            ...registerInput,
          
        };

        console.log('JSON Data:', jsonData); // Log JSON data for debugging

        // Send data to the backend
        axios.post('http://localhost:3000/api/register', jsonData, {
            headers: {
                "Content-Type": "application/json", // Set content type to JSON
            },
        })
        .then((res) => {
            if (res.data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                }).then(() => {
                    navigate('/verify-email'); // Redirect to login on success
                });
            }
        })
        .catch((error) => {
            console.error('Error response:', error.response);
            if (error.response && error.response.data.message) {
                const errorObj = { general: error.response.data.message };
                setError(errorObj);
                Swal.fire({
                    title: 'Registration Failed!',
                    html: errorObj.general,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33',
                });
            } else if (error.response && error.response.data.errors) {
                const errorObj = {};
                error.response.data.errors.forEach((err) => {
                    if (err.includes("firstname")) errorObj.firstname = err;
                    if (err.includes("lastname")) errorObj.lastname = err;
                    if (err.includes("age")) errorObj.age = err;
                    if (err.includes("birthdayDate")) errorObj.birthdayDate = err;
                    if (err.includes("email")) errorObj.email = err;
                    if (err.includes("password")) errorObj.password = err;
                    if (err.includes("phoneNumber")) errorObj.phoneNumber = err;
                    if (err.includes("gender")) errorObj.gender = err;
                    if (err.includes("role")) errorObj.role = err; // Gestion des erreurs pour le rôle
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
                                            <label htmlFor="firstname">First Name</label>
                                            <input
                                                id="firstname"
                                                type="text"
                                                placeholder="Enter First Name"
                                                name="firstname"
                                                onChange={handleInput}
                                                value={registerInput.firstname}
                                                required
                                                style={{ border: errorList.firstname ? '2px solid red' : '' }}
                                            />
                                        </div>
                                        <div className="single-input-wrapper">
                                            <label htmlFor="lastname">Last Name</label>
                                            <input
                                                id="lastname"
                                                type="text"
                                                placeholder="Enter Last Name"
                                                name="lastname"
                                                onChange={handleInput}
                                                value={registerInput.lastname}
                                                required
                                                style={{ border: errorList.lastname ? '2px solid red' : '' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="half-input-wrapper">
                                        <div className="single-input-wrapper">
                                            <label htmlFor="age">Age</label>
                                            <input
                                                id="age"
                                                type="number"
                                                placeholder="Enter Your Age"
                                                name="age"
                                                onChange={handleInput}
                                                value={registerInput.age}
                                                required
                                                style={{ border: errorList.age ? '2px solid red' : '' }}
                                            />
                                        </div>
                                        <div className="single-input-wrapper">
                                            <label htmlFor="birthdayDate">Date Of Birth</label>
                                            <input
                                                id="birthdayDate"
                                                type="date"
                                                name="birthdayDate"
                                                onChange={handleInput}
                                                value={registerInput.birthdayDate}
                                                required
                                                style={{ border: errorList.birthdayDate ? '2px solid red' : '' }}
                                            />
                                        </div>
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
                                            style={{ border: errorList.phoneNumber ? '2px solid red' : '' }}
                                        />
                                    </div>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="email">Your Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter Your Email"
                                            name="email"
                                            onChange={handleInput}
                                            value={registerInput.email}
                                            required
                                            style={{ border: errorList.email ? '2px solid red' : '' }}
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
                                            style={{ border: errorList.password ? '2px solid red' : '' }}
                                        />
                                    </div>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="gender">Gender</label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            onChange={handleInput}
                                            value={registerInput.gender}
                                            required
                                            style={{ border: errorList.gender ? '2px solid red' : '' }}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="role">Role</label>
                                        <select
                                            id="role"
                                            name="role"
                                            onChange={handleInput}
                                            value={registerInput.role}
                                            required
                                            style={{ border: errorList.role ? '2px solid red' : '' }} // Validation pour le rôle
                                        >
                                            <option value="">Select Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
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
                    </div>
                </div>
            </div>
        </>
    );
}
