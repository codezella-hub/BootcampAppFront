import  { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  
import Header from './Header';
import { Link, useParams } from 'react-router-dom';

function ResetPassword() {
    const { token } = useParams(); // Récupération du token de l'URL
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:3000/api/reset-password/${token}`, { password });
            
            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
            });

            setPassword('');
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        } finally {
            setLoading(false);
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
                                <h4 className="title">Set Your New Password</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="password">New Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter Your New Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="rts-btn btn-primary" disabled={loading}>
                                        {loading ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                    <p>Remembered your password? <Link to="/login">Sign In</Link></p>
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

export default ResetPassword;
