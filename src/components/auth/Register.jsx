import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { ToastContainer,toast } from 'react-toastify';
import { useState } from 'react';
import './register.css';

const registerSchema = z.object({
    firstname: z.string().min(2, 'First name must be at least 2 characters'),
    lastname: z.string().min(2, 'Last name must be at least 2 characters'),
    age: z.number().min(18, 'You must be at least 18 years old').max(120),
    birthdayDate: z.string().refine(val => !isNaN(new Date(val).getTime()), {
        message: 'Invalid date format',
    }),
    phoneNumber: z.string().min(8, 'Phone number must be at least 10 digits'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    gender: z.enum(['male', 'female']),
    role: z.enum(['admin', 'user']),
    terms: z.literal(true, {
        errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
});

export default function Register() {
    const navigate = useNavigate();
    const [touchedFields, setTouchedFields] = useState({});
    const { signup, isLoading } = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        trigger,
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onBlur',
    });

    const handleBlur = async (fieldName) => {
        await trigger(fieldName);
        setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    };

    const getInputClass = (fieldName) => {
        const isTouched = touchedFields[fieldName];
        const hasError = errors[fieldName];

        if (!isTouched) return '';
        return hasError ? 'is-invalid border-danger' : 'is-valid border-success';
    };

    const onSubmit = async (data) => {
        try {
            const toastId = toast.loading('Processing your registration...', {
                position: "top-center",
                autoClose: false,
                closeButton: false,
            });

            await signup(data);

            toast.update(toastId, {
                render: 'Registration successful!',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
                hideProgressBar: false,
            });

            // Redirection après un délai pour laisser voir le message
            setTimeout(() => navigate('/verify-email', { state: { email: data.email } }), 1500);

        } catch (error) {
            toast.dismiss(); // Ferme tous les toasts existants

            toast.error(error.response?.data?.message || 'Registration failed', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style: {
                    border: '1px solid #dc3545',
                    backgroundColor: '#f8d7da',
                    color: '#721c24'
                }
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
                                <h4 className="title">Sign Up to Your Account👋</h4>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Ligne 1: Prénom + Nom */}
                                    <div className="half-input-wrapper">
                                        <div className="single-input-wrapper">
                                            <label htmlFor="firstname">First Name</label>
                                            <input
                                                id="firstname"
                                                type="text"
                                                placeholder="Enter First Name"
                                                {...register('firstname')}
                                                className={`form-control ${getInputClass('firstname')}`}
                                                onBlur={() => handleBlur('firstname')}
                                            />
                                            {errors.firstname && (
                                                <div className="invalid-feedback">
                                                    {errors.firstname.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="single-input-wrapper">
                                            <label htmlFor="lastname">Last Name</label>
                                            <input
                                                id="lastname"
                                                type="text"
                                                placeholder="Enter Last Name"
                                                {...register('lastname')}
                                                className={`form-control ${getInputClass('lastname')}`}
                                                onBlur={() => handleBlur('lastname')}
                                            />
                                            {errors.lastname && (
                                                <div className="invalid-feedback">
                                                    {errors.lastname.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Ligne 2: Age + Date de naissance */}
                                    <div className="half-input-wrapper">
                                        <div className="single-input-wrapper">
                                            <label htmlFor="age">Age</label>
                                            <input
                                                id="age"
                                                type="number"
                                                placeholder="Enter Your Age"
                                                {...register('age', { valueAsNumber: true })}
                                                className={`form-control ${getInputClass('age')}`}
                                                onBlur={() => handleBlur('age')}
                                            />
                                            {errors.age && (
                                                <div className="invalid-feedback">
                                                    {errors.age.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="single-input-wrapper">
                                            <label htmlFor="birthdayDate">Date Of Birth</label>
                                            <input
                                                id="birthdayDate"
                                                type="date"
                                                {...register('birthdayDate')}
                                                className={`form-control ${getInputClass('birthdayDate')}`}
                                                onBlur={() => handleBlur('birthdayDate')}
                                            />
                                            {errors.birthdayDate && (
                                                <div className="invalid-feedback">
                                                    {errors.birthdayDate.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Ligne 3: Téléphone + Email */}
                                    <div className="half-input-wrapper">
                                        <div className="single-input-wrapper">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <input
                                                id="phoneNumber"
                                                type="text"
                                                placeholder="Enter Your Phone"
                                                {...register('phoneNumber')}
                                                className={`form-control ${getInputClass('phoneNumber')}`}
                                                onBlur={() => handleBlur('phoneNumber')}
                                            />
                                            {errors.phoneNumber && (
                                                <div className="invalid-feedback">
                                                    {errors.phoneNumber.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="single-input-wrapper">
                                            <label htmlFor="email">Your Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="Enter Your Email"
                                                {...register('email')}
                                                className={`form-control ${getInputClass('email')}`}
                                                onBlur={() => handleBlur('email')}
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">
                                                    {errors.email.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mot de passe */}
                                    <div className="single-input-wrapper">
                                        <label htmlFor="password">Your Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter Your Password"
                                            {...register('password')}
                                            className={`form-control ${getInputClass('password')}`}
                                            onBlur={() => handleBlur('password')}
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">
                                                {errors.password.message}
                                            </div>
                                        )}
                                    </div>

                                    {/* Ligne 4: Genre + Rôle */}
                                    <div className="half-input-wrapper">
                                        <div className="single-input-wrapper">
                                            <label htmlFor="gender">Gender</label>
                                            <select
                                                id="gender"
                                                {...register('gender')}
                                                className={`form-control ${getInputClass('gender')}`}
                                                onBlur={() => handleBlur('gender')}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            {errors.gender && (
                                                <div className="invalid-feedback">
                                                    {errors.gender.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="single-input-wrapper">
                                            <label htmlFor="role">Role</label>
                                            <select
                                                id="role"
                                                {...register('role')}
                                                className={`form-control ${getInputClass('role')}`}
                                                onBlur={() => handleBlur('role')}
                                            >
                                                <option value="">Select Role</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                            {errors.role && (
                                                <div className="invalid-feedback">
                                                    {errors.role.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Checkbox */}
                                    <div className="single-checkbox-filter">
                                        <div className="check-box">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                {...register('terms')}
                                                className={errors.terms ? 'is-invalid' : ''}
                                                onBlur={() => handleBlur('terms')}
                                            />
                                            <label htmlFor="terms">
                                                Accept the Terms and Privacy Policy
                                            </label>
                                            {errors.terms && (
                                                <div className="invalid-feedback d-block">
                                                    {errors.terms.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bouton */}
                                    <button
                                        type="submit"
                                        className="rts-btn btn-primary"

                                    >
                                        {isLoading ? 'Registering...' : 'Register'}
                                    </button>
                                    <ToastContainer/>
                                    <p>
                                        Already have an account? <Link to="/login">Login</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-thumbnail-login-p mt--1">
                                <img
                                    src="assets/images/auth/login2.png"
                                    width={600}
                                    alt="login-form"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}