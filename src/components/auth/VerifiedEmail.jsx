import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Header  from '../student/Header';
const VerifiedEmail = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setOtp(e.target.value);
        setError(''); // Clear error message on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate OTP input
        if (!otp) {
            setError('Please enter the OTP code.');
            return;
        }

        const jsonData = {
            "code": otp
        };

        try {
            const response = await axios.post('http://localhost:3000/api/verify-email', jsonData);
            if (response.data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your email has been verified.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/login'); // Redirect to home or another page after successful verification
                });
            } else {
                setError('Invalid OTP code. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError('An error occurred while verifying the OTP. Please try again later.');
        }
    };

    return (
        <>
        <Header></Header>
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="bg-white p-5 rounded shadow" style={{ width: '400px' }}>
                <h2 className="text-center mb-4" style={{ color: '#553CDF' }}>Verify Your Email</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="otp">Enter OTP Code:</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your OTP code"
                            className="form-control"
                            style={{ borderColor: '#553CDF' }} // Bordure du champ
                        />
                        {error && <p className="text-danger mt-2">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            backgroundColor: '#553CDF',
                            color: 'white',
                            width: '100%',
                            height: '40px',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Verify
                    </button>
                </form>
            </div>
            <div className="col-lg-6">
              <div className="contact-thumbnail-login-p mt--1">
                <img src="assets/images/auth/login2.png" width={600} alt="login-form" />
              </div>
            </div>
        </div>
        </>
    );
};

export default VerifiedEmail;
