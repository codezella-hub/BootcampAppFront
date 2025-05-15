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
                    {isAuthenticated && (<>
                        <Link className="single-item" to="/profile">
                            <i className="fa-regular fa-user"/>
                            My Profile
                        </Link>
                        <Link to="/respenses" className="single-item" >
                            <i className="fa-sharp fa-light fa-bullseye-pointer" />
                            <p >My&nbsp;Quiz&nbsp;Attempts</p>
                        </Link>

                        </>


                        )}

                    {/* single item end */}
                    {/* single item */}
                
                    <Link to="/dashboard/student/enroll-course" className="single-item">
                        <i className="fa-light fa-graduation-cap"/>
                        <p>Enrolled Courses</p>
                    </Link>





                    <Link to="/dashboard/historyOrders" className="single-item">
                        <i className="fa-sharp fa-light fa-bag-shopping"/>
                        <p>Order History</p>
                    </Link>




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












                            </div>
                        )}


                    </>
                )}
            </div>
        </div>
    );
}

export default SideBar;