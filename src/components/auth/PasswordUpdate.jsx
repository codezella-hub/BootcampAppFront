import  { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore'; // Importez votre store

function PasswordUpdate() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthStore();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation frontend
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.put(
                'http://localhost:3000/api/password',
                {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                },
                {
                    withCredentials: true
                }
            );

            setSuccess(response.data.message);
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="col-lg-9">
            <div className="settings-wrapper-dashed">
                <h5 className="title">Settings</h5>
                <ul className="nav nav-pills mb-3 tab-buttons" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="pills-password-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-password"
                            type="button"
                            role="tab"
                            aria-controls="pills-password"
                            aria-selected="true"
                        >
                            Password
                        </button>
                    </li>
                </ul>

                <div className="tab-content" id="pills-tabContent">
                    <div
                        className="tab-pane fade show active"
                        id="pills-password"
                        role="tabpanel"
                        aria-labelledby="pills-password-tab"
                    >
                        <div className="setting-change-password-area">
                            <form className="form-password-area" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="alert alert-success" role="alert">
                                        {success}
                                    </div>
                                )}
                                <div className="single-input">
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <input
                                        id="currentPassword"
                                        type="password"
                                        placeholder="Current Password"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="single-input">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        id="newPassword"
                                        type="password"
                                        placeholder="New Password"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="single-input">
                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Re-type New Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="rts-btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Updating...
                                        </span>
                                    ) : (
                                        'Update Password'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordUpdate;