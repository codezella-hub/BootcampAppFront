import React from 'react';

function DashboardBanner() {
    return (
        <div>
            {/* dashboard banner area start */}
            <div className="dashboard-banner-area-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="dashboard-banner-area-start bg_image">
                                <div className="rating-area-banner-dashboard">
                                    <div className="stars">
                                        <span>4.5</span>
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-regular fa-star" />
                                    </div>
                                    <p>Digital Marketing Instructor</p>
                                    <a href="create-course.html" className="create-btn"><i className="fa-regular fa-circle-plus" /> Create a New Course</a>
                                </div>
                                <div className="author-profile-image-and-name">
                                    <div className="profile-pic">
                                        <img src="assets/images/dashboard/01.png" alt="dashboard" />
                                    </div>
                                    <div className="name-desig">
                                        <h1 className="title">Jon Adam</h1>
                                        <div className="course-vedio">
                                            <div className="single">
                                                <i className="fa-light fa-users" />
                                                <span>1350 Students</span>
                                            </div>
                                            <div className="single">
                                                <i className="fa-regular fa-video" />
                                                <span>26 Course</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* dashboard banner area end */}
        </div>
    );
}

export default DashboardBanner;