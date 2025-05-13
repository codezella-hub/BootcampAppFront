import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import {useAuthStore} from "../../store/authStore.js";

function SideBar() {
    const { user, checkAuth,isAuthenticated } = useAuthStore();
    useEffect(() => {



        checkAuth();

        // Call the function to check authentication status
    }, []);
    return (
        <div>
            <div className="left-sindebar-dashboard  theiaStickySidebar">
                <div className="dashboard-left-single-wrapper">
                    {isAuthenticated && (

                        <Link to="/respenses" className="single-item" >
                            <i className="fa-sharp fa-light fa-bullseye-pointer" />
                            <p >My&nbsp;Quiz&nbsp;Attempts</p>
                        </Link>




                        )}
                    <a href="dashboard.html" className="single-item ">
                        <i className="fa-light fa-house"/>
                        <p>Dashboard</p>
                    </a>

                    <a href="my-profile.html" className="single-item ">
                        <i className="fa-regular fa-user"/>
                        <p>My Profile</p>
                    </a>
                    {/* single item end */}
                    {/* single item */}
                
                    <Link to="student/enroll-course" className="single-item">
                        <i className="fa-light fa-graduation-cap"/>
                        <p>Enrolled Courses</p>
                    </Link>

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

                    <Link to="/respenses" className="single-item" >
                        <i className="fa-sharp fa-light fa-bullseye-pointer" />
                        <p >My&nbsp;Quiz&nbsp;Attempts</p>
                    </Link>

                    <a href="historyOrders" className="single-item">
                        <i className="fa-sharp fa-light fa-bag-shopping"/>
                        <p>Order History</p>
                    </a>

                    <a href="question-answer.html" className="single-item">
                        <i className="fa-regular fa-circle-question"/>
                        <p>Question &amp; Answer</p>
                    </a>

                    <a href="calender.html" className="single-item">
                        <i className="fa-light fa-calendar-days"/>
                        <p>Calendar</p>
                    </a>

                </div>

                {isAuthenticated && (
                    <>


                        {user.role === "professor" && (
                            <div className="dashboard-left-single-wrapper mt--40">
                                <h4 className="title mb--5">Instructor</h4>

                     

                                <Link to="ListCourse" className="single-item">
                                    <i className="fa-light fa-book"/>
                                    <p>My Course</p>
                                </Link>

                                <a href="my-bundles.html" className="single-item">
                                    <i className="fa-sharp fa-regular fa-layer-group"/>
                                    <p>My Bundles</p>
                                </a>

                                <a href="announcement.html" className="single-item">
                                    <i className="fa-solid fa-megaphone"/>
                                    <p>Announcements</p>
                                </a>

                                <a href="withdrowals.html" className="single-item">
                                    <i className="fa-regular fa-box"/>
                                    <p>Withdrawals</p>
                                </a>

                                <a href="assignments.html" className="single-item">
                                    <i className="fa-regular fa-page"/>
                                    <p>Assignments</p>
                                </a>

                                <a href="certificate.html" className="single-item">
                                    <i className="fa-sharp fa-light fa-file-certificate"/>
                                    <p>Certificate</p>
                                </a>

                            </div>
                        )}


                    </>
                )}

                {isAuthenticated && (
                    <>


                        {user.role === "admin" && (
                            <div className="dashboard-left-single-wrapper mt--40">
                                <h4 className="title mb--5">Admin</h4>

                                <Link to="ListCategory" className="single-item">
                                    <i className="fa-light fa-book"/>
                                    <p>List Category</p>
                                </Link>

                                <a href="my-course.html" className="single-item">
                                    <i className="fa-light fa-book"/>
                                    <p>My Courses</p>
                                </a>

                                <a href="my-bundles.html" className="single-item">
                                    <i className="fa-sharp fa-regular fa-layer-group"/>
                                    <p>My Bundles</p>
                                </a>

                                <a href="announcement.html" className="single-item">
                                    <i className="fa-solid fa-megaphone"/>
                                    <p>Announcements</p>
                                </a>

                                <a href="withdrowals.html" className="single-item">
                                    <i className="fa-regular fa-box"/>
                                    <p>Withdrawals</p>
                                </a>

                                <a href="assignments.html" className="single-item">
                                    <i className="fa-regular fa-page"/>
                                    <p>Assignments</p>
                                </a>

                                <a href="certificate.html" className="single-item">
                                    <i className="fa-sharp fa-light fa-file-certificate"/>
                                    <p>Certificate</p>
                                </a>

                            </div>
                        )}


                    </>
                )}
            </div>
        </div>
    );
}

export default SideBar;