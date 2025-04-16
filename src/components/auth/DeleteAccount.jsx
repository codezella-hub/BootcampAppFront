import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faTrashCan, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";

function DeleteAccount() {
    const { logout } = useAuthStore();
    const [isConfirming, setIsConfirming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(
                'http://localhost:3000/api/delete-account',
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            toast.success(response.data.message);
            await logout();
            window.location.href = '/'; // Redirect to home page after logout

        } catch (error) {
            console.error('Account deletion failed:', error);
            toast.error(error.response?.data?.message || 'Failed to delete account');
        } finally {
            setIsDeleting(false);
            setIsConfirming(false);
        }
    };

    return (
        <div className="col-lg-9 rts-sticky-column-item">
            <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
                <h5 className="title text-danger">Account Deletion</h5>

                <div className="card border-0 shadow-sm p-4 mb-4 text-center">
                    <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        size="3x"
                        className="text-danger mb-3"
                    />
                    <h4 className="mb-3">Danger Zone</h4>

                    <div className="alert alert-danger mb-4">
                        <strong>Warning:</strong> This action is irreversible. All your data will be permanently deleted.
                    </div>

                    {isConfirming ? (
                        <>
                            <p className="mb-4 text-danger">
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                Are you absolutely sure? This cannot be undone.
                            </p>
                            <div className="d-flex justify-content-center gap-3">
                                <button
                                    onClick={() => setIsConfirming(false)}
                                    className="rts-btn btn-secondary"
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="rts-btn btn-danger"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? (
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faTrashCan} /> Confirm Deletion
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsConfirming(true)}
                            className="rts-btn btn-danger"
                        >
                            <FontAwesomeIcon icon={faTrashCan} /> Delete My Account
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;