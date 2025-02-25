import  { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../services/authService';

export default function Login() {
  const navigate = useNavigate(); // ✅ Correction : Ajout des parenthèses
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: '', password: '' });

    try {
      console.log('Sending login request with:', { email, password });
      const response = await axios.post('http://localhost:3000/api/login', { email, password });

      console.log('Login response:', response.data);
      if (response.data.success) {
        setUser(response.data.user._id, response.data.user.role);
        // ✅ Afficher l'alerte de succès
        Swal.fire({
          title: 'Success!',
          text: 'You are now logged in.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });

        // ✅ Redirection après 2 secondes
        setTimeout(() => {
          navigate('/student/enroll-course');
        }, 2000);
      }
    } catch (err) {
      console.error('Login error:', err);

      // Gestion des erreurs
      let errorMessage = 'An error occurred. Please try again.';
      if (err.response && err.response.data.message) {
        errorMessage = err.response.data.message;
      }

      // ✅ Afficher l'alerte d'échec
      Swal.fire({
        title: 'Login Failed!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
      });

      // ✅ Afficher l'erreur sous les champs
      setError({ email: errorMessage });
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
                    {error.email && <p className="error-message">{error.email}</p>}
                  </div>

                  <div className="single-input-wrapper">
                    <label htmlFor="password">Your Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {error.password && <p className="error-message">{error.password}</p>}
                  </div>

                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="remember-me" />
                      <label htmlFor="remember-me">Remember Me</label>
                    </div>
                  </div>

                  <button type="submit" className="rts-btn btn-primary">
                    Login
                  </button>

                  <div className="google-apple-wrapper">
                    <div className="google">
                      <img src="assets/images/contact/06.png" alt="contact" />
                    </div>
                    <div className="google">
                      <img src="assets/images/contact/07.png" alt="contact" />
                    </div>
                    <div className="google">
                      <img src="/assets/images/auth/faceid.png" width={24} alt="faceid" />
                    </div>
                  </div>

                  <p>
                    Don't Have an account? <Link to="/register">Register</Link>
                  </p>
                  <p>
                    Forgot Your Password? <Link to="/ForgetPassword">Change it</Link>
                  </p>
                </form>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-thumbnail-login-p mt--1">
                <img src="assets/images/auth/login2.png" width={600} alt="login-form" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
