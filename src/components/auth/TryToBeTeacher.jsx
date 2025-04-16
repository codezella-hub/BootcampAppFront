import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChalkboardUser,
    faCircleCheck,
    faCircleXmark,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../store/authStore';

function TryToBeTeacher() {
    const { user } = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    // Check if teacher mode is active
    const isTeacherModeActive = user?.role === "professor";

    const toggleTeacherMode = () => {
        if (!isTeacherModeActive) {
            setShowModal(true);
        } else {
            handleRoleToggle();
        }
    };

    const handleRoleToggle = async () => {
        setIsLoading(true);
        try {
            const response = await axios.put(
                'http://localhost:3000/api/toggle-role',
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            toast.success(response.data.message);
            setShowModal(false);

            // Refresh page to sync with backend
            window.location.reload();

        } catch (error) {
            console.error('Error changing role:', error);
            toast.error(error.response?.data?.message || 'Failed to update role');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="col-lg-9 rts-sticky-column-item">
            <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
                <h5 className="title">Teacher Mode</h5>

                {/* Status Indicator */}
                <div className="my-single-portfolio-dashed text-center mb-4">
                    <div className="name">Current Status:</div>
                    <div className="value">
                        {isLoading ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : isTeacherModeActive ? (
                            <span className="text-success">
                <FontAwesomeIcon icon={faCircleCheck} /> Active
              </span>
                        ) : (
                            <span className="text-danger">
                <FontAwesomeIcon icon={faCircleXmark} /> Inactive
              </span>
                        )}
                    </div>
                </div>

                {/* Teacher Mode Card */}
                <div className="card border-0 shadow-sm p-4 mb-4 text-center">
                    <FontAwesomeIcon
                        icon={faChalkboardUser}
                        size="3x"
                        className={isTeacherModeActive ? "text-success mb-3" : "text-secondary mb-3"}
                    />
                    <h4 className="mb-3">
                        {isTeacherModeActive ? "Teacher Mode Enabled" : "Become a Teacher"}
                    </h4>
                    <p className="mb-4">
                        {isTeacherModeActive
                            ? "You can now create courses and manage students."
                            : "Join our teaching community and share your knowledge."}
                    </p>

                    <button
                        onClick={toggleTeacherMode}
                        disabled={isLoading}
                        className={`rts-btn ${isTeacherModeActive ? "btn-danger" : "btn-primary"}`}
                    >
                        {isLoading ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : isTeacherModeActive ? (
                            "Disable Teacher Mode"
                        ) : (
                            "Become a Teacher"
                        )}
                    </button>
                </div>

                {/* Confirmation Modal */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>Teacher Application</h5>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="close-btn"
                                    disabled={isLoading}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>By becoming a teacher, you agree to our teaching guidelines.</p>
                                <p><strong>Requirements:</strong></p>
                                <ul className="requirements-list">
                                    <li>Professional experience in your field</li>
                                    <li>Ability to create educational content</li>
                                    <li>Commitment to student success</li>
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={() => setShowModal(false)}
                                    disabled={isLoading}
                                    className="rts-btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRoleToggle}
                                    disabled={isLoading}
                                    className="rts-btn btn-primary"
                                >
                                    {isLoading ? (
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                    ) : (
                                        "Confirm Application"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TryToBeTeacher;