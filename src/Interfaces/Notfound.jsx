import React from "react";
import { useNavigate } from "react-router-dom";

function Notfound() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/"); // Redirect to home page
    };

    return (
        <>
            <div className="rts-404-area-start">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-content">
                                <h1 className="title">404</h1>
                                <h2 className="title">PAGE NOT FOUND</h2>
                                <p className="disc">
                                    Sorry, the page you seem to be looking for has been moved,
                                    redirected or removed permanently.
                                </p>
                                <button
                                    onClick={handleRedirect}
                                    className="rts-btn btn-primary"
                                >
                                    GO BACK HOME
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Notfound;
