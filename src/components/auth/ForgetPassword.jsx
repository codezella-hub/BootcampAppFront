import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/forget-password', { email });
            
            // Affiche le message de succès
            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                // Redirection vers la page de vérification de l'email
                navigate('/check-your-email'); // Change cette route si nécessaire
            });

            setEmail('');
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
                                <h4 className="title">Reset Your Password</h4>
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
                                    <button type="submit" className="rts-btn btn-primary" disabled={loading}>
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                    <p>Already Have an account? <Link to="/login">Sign In</Link></p>
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

export default ForgetPassword;
