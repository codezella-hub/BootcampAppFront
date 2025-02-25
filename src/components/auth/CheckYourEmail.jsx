import Header from './Header';
import { Link } from 'react-router-dom';

function CheckYourEmail() {
    return (
        <>
            <Header />
            <div className="login-registration-wrapper">
                <div className="container">
                    <div className="row g-0 justify-content-center align-items-center vh-100">
                        <div className="col-lg-6">
                            <div className="login-page-form-area text-center">
                                <h4 className="title mb-4">Check Your Email</h4>
                                <p>
                                    We have sent a password reset link to your email. Please check your inbox (and spam folder) to reset your password.
                                </p>
                                <p className="mt-3">
                                    If you don't receive the email, you can <Link to="/ForgetPassword">try again</Link>.
                                </p>
                                <Link to="/login" className="rts-btn btn-primary mt-4">
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-lg-flex justify-content-center">
                            <div className="contact-thumbnail-login-p">
                                <img src="assets/images/auth/rp.png" className="img-fluid" alt="check-your-email" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckYourEmail;
