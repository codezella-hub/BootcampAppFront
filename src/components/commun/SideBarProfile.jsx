
import {Link} from "react-router-dom";
import React from "react";


function SideBarProfile() {
    return (
        <div>
            <div className="left-sindebar-dashboard  theiaStickySidebar">
                <div className="dashboard-left-single-wrapper">

                    {/* single item end */}
                    {/* single item */}
                    <Link className="single-item active" to="/profile">
                        <i className="fa-regular fa-user"/>
                        My Profile
                    </Link>
                    <Link className="single-item active" to="/profile/password-update">
                        <i className="fa-regular fa-lock"/>
                        Update Password
                    </Link>
                    <Link className="single-item active" to="/profile/two-factor">
                        <i className="fa-regular fa-shield-keyhole"/>
                        Active 2fa
                    </Link>
                    <Link className="single-item active" to="/profile/be-teacher">
                        <i className="fa-regular fa-person-chalkboard"/>
                        Try to be a teacher
                    </Link>
                    <Link className="single-item active" to="/profile/delete-account">
                        <i className="fa-regular fa-trash-can"/>
                        Delete Account
                    </Link>


                    {/* single item end */}



                    <div className="dashboard-left-single-wrapper bbnone mt--40">
                        <h4 className="title mb--5">User</h4>

                        {/* single item */}
                        <a href="index-2.html" className="single-item">
                            <i className="fa-light fa-right-from-bracket"/>
                            <p>Logout</p>
                        </a>
                        {/* single item end */}
                    </div>
                    {/* single item end */}
                </div>

            </div>
        </div>
    );
}

export default SideBarProfile;