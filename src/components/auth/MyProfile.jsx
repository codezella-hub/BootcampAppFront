import React from 'react';
import {  useNavigate } from 'react-router-dom';
function MyProfile() {
    const navigate = useNavigate();

    const toProfile =()=>{
        navigate('/profile/update-profile')
    }
    return (
        <div className="col-lg-9  rts-sticky-column-item">
            <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
                <h5 className="title">My Profile</h5>
                {/* single My portfolio start*/}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Registration Date</div>
                    <div className="value">February 25, 2022 6:01 am</div>
                </div>
                {/* single My portfolio end*/}
                {/* single My portfolio start*/}
                <div className="my-single-portfolio-dashed">
                    <div className="name">First Name:</div>
                    <div className="value">Jon Adam</div>
                </div>
                {/* single My portfolio end*/}
                {/* single My portfolio start*/}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Last Name:</div>
                    <div className="value">Caster</div>
                </div>
                {/* single My portfolio end*/}
                {/* single My portfolio start*/}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Username:</div>
                    <div className="value">jonadam</div>
                </div>
                {/* single My portfolio end*/}
                {/* single My portfolio start*/}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Email:</div>
                    <div className="value">studyhub@ino.com</div>
                </div>
                {/* single My portfolio end*/}
                {/* single My portfolio start*/}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Phone Number:</div>
                    <div className="value">February 25, 2022 6:01 am</div>
                </div>
                {/* single My portfolio end*/}
                {/* single My portfolio start*/}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Skill/Occupation</div>
                    <div className="value">Full Stack Developer</div>
                </div>
                {/* single My portfolio end*/}
                {/* single My portfolio start*/}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Biography</div>
                    <div className="value">I have a degree in Journalism with over 15 years of work experience in the
                        field.
                        Throughout the years, I have worked in several well-known institutions and in published several
                        books on Journalism that are available on Amazon.
                    </div>
                </div>
                <button type="button" className="rts-btn btn-primary" onClick={toProfile}>
                    Update Profile
                </button>
                {/* single My portfolio end*/}
            </div>
        </div>
    );
}

export default MyProfile;