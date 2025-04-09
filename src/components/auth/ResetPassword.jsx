import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import './ResetPassword.css';

// Schéma de validation
const resetPasswordSchema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

function ResetPassword() {
    const { token } = useParams();
    const { resetPassword, isLoading } = useAuthStore();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data) => {
        try {
            const toastId = toast.loading('Resetting your password...', {
                position: "top-center",
                autoClose: false,
            });

            await resetPassword(token, data.password);

            toast.update(toastId, {
                render: 'Password reset successfully!',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });

            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Password reset failed', {
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
                                <h4 className="title">Set Your New Password</h4>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="password">New Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter Your New Password"
                                            {...register('password')}
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="single-input-wrapper">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Your Password"
                                            {...register('confirmPassword')}
                                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                        />
                                        {errors.confirmPassword && (
                                            <div className="invalid-feedback">
                                                {errors.confirmPassword.message}
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
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Resetting...
                                            </>
                                        ) : (
                                            'Reset Password'
                                        )}
                                    </button>
                                    <ToastContainer />
                                    <p className="mt-3">
                                        Remembered your password? <Link to="/login">Sign In</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-thumbnail-login-p mt--1">
                                <img
                                    src="assets/images/auth/rp.png"
                                    width={600}
                                    alt="Password reset"
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

export default ResetPassword;