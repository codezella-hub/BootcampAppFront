import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShieldHalved,
    faCircleCheck,
    faCircleXmark,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore.js";
import ProfileApiService from "../../services/ProfileApiService.js";

function Active2Fa() {
    const { user } = useAuthStore();
    const [is2FAEnabled, setIs2FAEnabled] = useState(user?.is2FAEnabled || false);
    const [isLoading, setIsLoading] = useState({
        status: false,
        action: false
    });

    // Synchroniser avec les changements du store
    useEffect(() => {
        if (user?.is2FAEnabled !== undefined) {
            setIs2FAEnabled(user.is2FAEnabled);
            setIsLoading(prev => ({ ...prev, status: false }));
        }
    }, [user?.is2FAEnabled]);

    const handleToggle2FA = async () => {
        setIsLoading(prev => ({ ...prev, action: true }));

        try {
            const result = await ProfileApiService.toggle2FA();
            setIs2FAEnabled(result.is2FAEnabled);
            toast.success(result.message);
        } catch (error) {
            console.error("2FA toggle error:", error);
            toast.error(error.message || "Failed to toggle 2FA");
        } finally {
            setIsLoading(prev => ({ ...prev, action: false }));
        }
    };

    return (
        <div className="col-lg-9 rts-sticky-column-item">
            <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
                <h5 className="title">Two-Factor Authentication (2FA)</h5>

                {/* Status Indicator */}
                <div className="my-single-portfolio-dashed text-center mb-4">
                    <div className="name">Current Status:</div>
                    <div className="value">
                        {isLoading.status ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : is2FAEnabled ? (
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
                        className={is2FAEnabled ? "text-success mb-3" : "text-secondary mb-3"}
                    />
                    <h4 className="mb-3">
                        {is2FAEnabled ? "2FA is Enabled" : "Add Extra Security to Your Account"}
                    </h4>
                    <p className="mb-4">
                        {is2FAEnabled
                            ? "Your account is protected with two-factor authentication."
                            : "Protect your account with an extra layer of security."}
                    </p>

                    <button
                        onClick={handleToggle2FA}
                        disabled={isLoading.action || isLoading.status}
                        className={`rts-btn ${is2FAEnabled ? "btn-danger" : "btn-primary"}`}
                    >
                        {isLoading.action ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin /> Processing...
                            </>
                        ) : is2FAEnabled ? (
                            "Disable 2FA"
                        ) : (
                            "Activate 2FA"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Active2Fa;