import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function TryToBeTeacher() {
    const [isTeacherModeActive, setIsTeacherModeActive] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleTeacherMode = () => {
        if (!isTeacherModeActive) {
            setShowModal(true);
        } else {
            setIsTeacherModeActive(false);
        }
    };

    const confirmTeacherMode = () => {
        setIsTeacherModeActive(true);
        setShowModal(false);
        // Add your backend API call here
    };

    return (
        <div className="col-lg-9 rts-sticky-column-item">
            <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
                <h5 className="title">Teacher Mode</h5>

                {/* Status Indicator */}
                <div className="my-single-portfolio-dashed text-center mb-4">
                    <div className="name">Current Status:</div>
                    <div className="value">
                        {isTeacherModeActive ? (
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
                            : "Join our teaching community and share your knowledge with students worldwide."}
                    </p>

                    <button
                        onClick={toggleTeacherMode}
                        className={`rts-btn ${isTeacherModeActive ? "btn-danger" : "btn-primary"}`}
                    >
                        {isTeacherModeActive ? "Disable Teacher Mode" : "Be a Teacher"}
                    </button>
                </div>

                {/* Confirmation Modal */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>Teacher Application</h5>
                                <button onClick={() => setShowModal(false)} className="close-btn">
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>By becoming a teacher, you agree to our teaching guidelines and quality standards.</p>
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
                                    className="rts-btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmTeacherMode}
                                    className="rts-btn btn-primary"
                                >
                                    Confirm & Apply
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