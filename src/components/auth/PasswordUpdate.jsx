function PasswordUpdate() {
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
                            <form className="form-password-area">
                                <div className="single-input">
                                    <label htmlFor="current">Current Password</label>
                                    <input
                                        id="current"
                                        type="password"
                                        placeholder="Current Password"
                                        required
                                    />
                                </div>
                                <div className="single-input">
                                    <label htmlFor="new">New Password</label>
                                    <input
                                        id="new"
                                        type="password"
                                        placeholder="New Password"
                                        required
                                    />
                                </div>
                                <div className="single-input">
                                    <label htmlFor="confirm">Confirm New Password</label>
                                    <input
                                        id="confirm"
                                        type="password"
                                        placeholder="Re-type New Password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="rts-btn btn-primary">
                                    Update Password
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