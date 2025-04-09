import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function Active2Fa() {
    const [is2FaActive, setIs2FaActive] = useState(false);

    const toggle2Fa = () => {
        // Ici vous ajouterez la logique backend pour activer/désactiver la 2FA
        setIs2FaActive(!is2FaActive);
    };

    return (
        <div className="col-lg-9 rts-sticky-column-item">
            <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
                <h5 className="title">Two-Factor Authentication (2FA)</h5>

                {/* Status Indicator */}
                <div className="my-single-portfolio-dashed text-center mb-4">
                    <div className="name">Current Status:</div>
                    <div className="value">
                        {is2FaActive ? (
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

                {/* 2FA Activation Card */}
                <div className="card border-0 shadow-sm p-4 mb-4 text-center">
                    <FontAwesomeIcon
                        icon={faShieldHalved}
                        size="3x"
                        className={is2FaActive ? "text-success mb-3" : "text-secondary mb-3"}
                    />
                    <h4 className="mb-3">
                        {is2FaActive ? "2FA is Enabled" : "Add Extra Security to Your Account"}
                    </h4>
                    <p className="mb-4">
                        {is2FaActive
                            ? "Your account is protected with two-factor authentication."
                            : "Protect your account with an extra layer of security."}
                    </p>

                    <button
                        onClick={toggle2Fa}
                        className={`rts-btn ${is2FaActive ? "btn-danger" : "btn-primary"}`}
                    >
                        {is2FaActive ? "Disable 2FA" : "Activate 2FA"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Active2Fa;