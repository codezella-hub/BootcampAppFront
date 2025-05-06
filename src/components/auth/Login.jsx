import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import Header from "./Header.jsx";
import { useAuthStore } from '../../store/authStore.js';
import { ToastContainer,toast } from 'react-toastify';
import { useState } from 'react';
import './login.css';

// Schéma de validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [touchedFields, setTouchedFields] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });
  const google = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };
  const github = () => {
    window.open("http://localhost:3000/auth/github", "_self");
  };
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
      const toastId = toast.loading('Signing in...', {
        position: "top-center"
      });

     const result= await login(data.email, data.password);
      if (result?.requires2FA) {
        toast.dismiss(toastId);
        navigate('/verify-two-factor'); // Redirection vers la page de vérification
        return;
      }
      toast.update(toastId, {
        render: 'Login successful!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.', {
        position: "top-center",
        autoClose: 5000,
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
                  <h4 className="title">Login to Your Account 👋</h4>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

                    <div className="single-input-wrapper">
                      <label htmlFor="password">Your Password</label>
                      <input
                          id="password"
                          type="password"
                          placeholder="Password"
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

                    <div className="single-checkbox-filter">
                      <div className="check-box">
                        <input
                            type="checkbox"
                            id="remember-me"
                            {...register('rememberMe')}
                        />
                        <label htmlFor="remember-me">Remember Me</label>
                      </div>
                    </div>

                    <button
                        type="submit"
                        className="rts-btn btn-primary"
                        disabled={isLoading || !isValid}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <ToastContainer/>
                    <div className="google-apple-wrapper">
                      <div className="google" onClick={google}>
                        <img src="assets/images/contact/06.png" alt="Google" />

                      </div>
                      <div className="google" onClick={github}>

                        <img
                            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            alt="GitHub"
                            style={{width: "30px", height: "30px"}} // ajuste selon le besoin
                        /> Github
                      </div>
                      <div className="google">
                        <img src="/assets/images/auth/faceid.png" width={24} alt="FaceID"/>
                      </div>
                    </div>

                    <p>
                      Don't Have an account? <Link to="/register">Register</Link>
                    </p>
                    <p>
                      Forgot Your Password? <Link to="/forgot-password">Change it</Link>
                    </p>
                  </form>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="contact-thumbnail-login-p mt--1">
                  <img src="assets/images/auth/login2.png" width={600} alt="login" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}