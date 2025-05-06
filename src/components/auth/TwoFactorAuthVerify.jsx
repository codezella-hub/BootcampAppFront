import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { ToastContainer, toast } from 'react-toastify';
import './EmailVerification.css';

const TwoFactorAuthVerify = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { error, isLoading, verifyOTP, resendOTP, requires2FA, tempUserId } = useAuthStore();
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);

    // Rediriger si 2FA n'est pas requis
    useEffect(() => {
        if (!requires2FA) {
            navigate('/login');
        }
    }, [requires2FA, navigate]);

    const handleChange = (index, value) => {
        const newCode = [...code];
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResendCode = async () => {
        try {
            setResendDisabled(true);
            setCountdown(30);

            const toastId = toast.loading('Envoi du nouveau code OTP...', {
                position: "top-center",
                autoClose: false,
                closeButton: false,
            });

            await resendOTP(tempUserId);

            toast.update(toastId, {
                render: 'Nouveau code OTP envoyé avec succès !',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Échec de l'envoi du code OTP");
            setResendDisabled(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = code.join("");
        try {
            const toastId = toast.loading('Vérification OTP en cours...', {
                position: "top-center",
                autoClose: false,
                closeButton: false,
            });
            await verifyOTP(otpCode);
            toast.update(toastId, {
                render: 'Vérification OTP réussie !',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
                hideProgressBar: false,
            });
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Code OTP incorrect', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
            });
        }
    };

    // Compte à rebours pour le renvoi de code
    useEffect(() => {
        let timer;
        if (resendDisabled && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [countdown, resendDisabled]);

    // Auto-soumission quand tous les champs sont remplis
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return (
        <div className="email-verification-container">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="email-verification-card"
            >
                <h2 className="title">Vérification à deux facteurs</h2>
                <p className="instruction">
                    Entrez le code à 6 chiffres envoyé à votre email
                </p>

                <form onSubmit={handleSubmit} className="verification-form">
                    <div className="code-inputs">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="code-input"
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    <p className="resend-message">
                        Vous n'avez pas reçu de code ?{' '}
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={resendDisabled}
                            className="resend-link"
                        >
                            {resendDisabled ? `Renvoyer (${countdown}s)` : 'Renvoyer le code'}
                        </button>
                    </p>

                    {error && <p className="error-message">{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isLoading || code.some((digit) => !digit)}
                        className="verify-button"
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Vérification...
                            </>
                        ) : (
                            "Vérifier le code"
                        )}
                    </motion.button>
                </form>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default TwoFactorAuthVerify;