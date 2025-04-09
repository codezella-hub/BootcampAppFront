import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function DeleteAccount() {
    const [isConfirming, setIsConfirming] = useState(false);

    const handleDeleteClick = () => {
        if (!isConfirming) {
            setIsConfirming(true);
            return;
        }
        // Ajoutez ici la logique de suppression du compte
        alert("Account deletion confirmed - this action is irreversible");
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
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteClick}
                                    className="rts-btn btn-danger"
                                >
                                    <FontAwesomeIcon icon={faTrashCan} /> Confirm Deletion
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={handleDeleteClick}
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