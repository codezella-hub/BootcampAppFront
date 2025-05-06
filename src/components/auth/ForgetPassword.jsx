import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import './ForgetPassword.css';

// Schéma de validation
const forgetPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

function ForgetPassword() {
    const navigate = useNavigate();
    const { forgotPassword, isLoading } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgetPasswordSchema),
    });

    const onSubmit = async (data) => {
        try {
            const toastId = toast.loading('sending forget password email ...', {
                position: "top-center",
                autoClose: false,
                closeButton: false,
            });

            await forgotPassword(data.email);

            toast.update(toastId, {
                render: 'Password reset link sent! Check your email',
                type: 'success',
                isLoading: false,
                autoClose: 5000,
            });

            setTimeout(() => navigate('/check-your-email'), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset link. Please try again.', {
                position: "top-center",
                autoClose: 5000,
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
                                <h4 className="title">Reset Your Password</h4>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your registered email"
                                            {...register('email')}
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email.message}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="rts-btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Reset Link'
                                        )}
                                    </button>
                                    <div className="mt-3 text-center">
                                        <Link to="/login" className="text-decoration-none">
                                            Back to Sign In
                                        </Link>
                                    </div>
                                </form>
                                <ToastContainer />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-thumbnail-login-p mt--1">
                                <img
                                    src="assets/images/auth/rp.png"
                                    width={600}
                                    alt="Password reset illustration"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;