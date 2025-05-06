import React from 'react';
import MobileMenu from "./MobileMenu.jsx";

function Header2() {
    return (
        <div>
            {/* header style two */}
            <div id="side-bar" className="side-bar header-two">
                <button className="close-icon-menu"><i className="far fa-times" /></button>
                {/* inner menu area desktop start */}
                <div className="inner-main-wrapper-desk">
                    <div className="thumbnail">
                        <img src="assets/images/banner/04.jpg" alt="elevate" />
                    </div>
                    <div className="inner-content">
                        <h4 className="title">We Build Building and Great Constructive Homes.</h4>
                        <p className="disc">
                            We successfully cope with tasks of varying complexity, provide long-term guarantees and regularly master new technologies.
                        </p>
                        <div className="footer">
                            <h4 className="title">Got a project in mind?</h4>
                            <a href="contact.html" className="rts-btn btn-primary">Let's talk</a>
                        </div>
                    </div>
                </div>
             <MobileMenu></MobileMenu>
            </div>
            {/* header style two End */}
        </div>
    );
}

export default Header2;