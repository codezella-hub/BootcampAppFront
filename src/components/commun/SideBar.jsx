import React from 'react';

function SideBar() {
    return (
        <div>
            <div className="left-sindebar-dashboard  theiaStickySidebar">
                <div className="dashboard-left-single-wrapper">
                    {/* single item */}
                    <a href="dashboard.html" className="single-item ">
                        <i className="fa-light fa-house"/>
                        <p>Dashboard</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="my-profile.html" className="single-item active">
                        <i className="fa-regular fa-user"/>
                        <p>My Profile</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="enroll-course.html" className="single-item">
                        <i className="fa-light fa-graduation-cap"/>
                        <p>Enrolled Courses</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="wishlist.html" className="single-item">
                        <i className="fa-sharp fa-light fa-bookmark"/>
                        <p>Wishlist</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="reviews.html" className="single-item">
                        <i className="fa-regular fa-star"/>
                        <p>Reviews</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="quiz-attempts.html" className="single-item">
                        <i className="fa-sharp fa-light fa-bullseye-pointer"/>
                        <p>My Quiz Attempts</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="order-history.html" className="single-item">
                        <i className="fa-sharp fa-light fa-bag-shopping"/>
                        <p>Order History</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="question-answer.html" className="single-item">
                        <i className="fa-regular fa-circle-question"/>
                        <p>Question &amp; Answer</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="calender.html" className="single-item">
                        <i className="fa-light fa-calendar-days"/>
                        <p>Calendar</p>
                    </a>
                    {/* single item end */}
                </div>
                <div className="dashboard-left-single-wrapper mt--40">
                    <h4 className="title mb--5">Instructor</h4>
                    {/* single item */}
                    <a href="my-course.html" className="single-item">
                        <i className="fa-light fa-book"/>
                        <p>My Courses</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="my-bundles.html" className="single-item">
                        <i className="fa-sharp fa-regular fa-layer-group"/>
                        <p>My Bundles</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="announcement.html" className="single-item">
                        <i className="fa-solid fa-megaphone"/>
                        <p>Announcements</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="withdrowals.html" className="single-item">
                        <i className="fa-regular fa-box"/>
                        <p>Withdrawals</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="assignments.html" className="single-item">
                        <i className="fa-regular fa-page"/>
                        <p>Assignments</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="certificate.html" className="single-item">
                        <i className="fa-sharp fa-light fa-file-certificate"/>
                        <p>Certificate</p>
                    </a>
                    {/* single item end */}
                </div>
                <div className="dashboard-left-single-wrapper bbnone mt--40">
                    <h4 className="title mb--5">User</h4>
                    {/* single item */}
                    <a href="settings.html" className="single-item">
                        <i className="fa-sharp fa-regular fa-gear"/>
                        <p>Settings</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                    <a href="index-2.html" className="single-item">
                        <i className="fa-light fa-right-from-bracket"/>
                        <p>Logout</p>
                    </a>
                    {/* single item end */}
                </div>
            </div>
        </div>
    );
}

export default SideBar;