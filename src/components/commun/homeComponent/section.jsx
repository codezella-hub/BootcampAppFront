import React from "react";


function Section() {
    return (
        <div>
            <div className="why-choose-us bg-blue bg-choose-us-one bg_image rts-section-gap shape-move">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="why-choose-us-area-image pb--50">
                                <img className="one" src="assets/images/why-choose/02.jpg" alt="why-choose"/>
                                <div className="border-img">
                                    <img className="two ml--20" src="assets/images/why-choose/03.jpg" alt="why-choose"/>
                                </div>
                                <div className="circle-animation">
                                    <a className="uni-circle-text uk-background-white dark:uk-background-gray-80 uk-box-shadow-large uk-visible@m"
                                       href="#view_in_opensea">
                                        <svg className="uni-circle-text-path uk-text-secondary uni-animation-spin"
                                             viewBox="0 0 100 100" width={200} height={200}>
                                            <defs>
                                                <path id="circle"
                                                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0">
                                                </path>
                                            </defs>
                                            <text fontSize="11.2">
                                                <textPath xlinkHref="#circle">About Univercity • About Collage •
                                                </textPath>
                                            </text>
                                        </svg>
                                        <i className="fa-regular fa-arrow-up-right"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pl--90 pl_md--15 mt_md--50 pl_sm--15 pt_sm--50">
                            <div className="title-area-left-style">
                                <div className="pre-title">
                                    <img src="assets/images/banner/bulb-2.png" alt="icon"/>
                                    <span>Why Choose Us</span>
                                </div>
                                <h2 className="title">Studyhub Your Path to
                                    Excellence &amp; Success</h2>
                                <p className="post-title">We are passionate about education and dedicated to providing
                                    high- <br/> quality learning resources for learners of all backgrounds.</p>
                            </div>
                            <div className="why-choose-main-wrapper-1">
                                {/* single choose reason */}
                                <div className="single-choose-reason-1">
                                    <div className="icon">
                                        <img src="assets/images/why-choose/icon/01.png" alt="icon"/>
                                    </div>
                                    <h6 className="title">Expert
                                        Instructors</h6>
                                </div>
                                {/* single choose reason end */}
                                {/* single choose reason */}
                                <div className="single-choose-reason-1">
                                    <div className="icon">
                                        <img src="assets/images/why-choose/icon/02.png" alt="icon"/>
                                    </div>
                                    <h6 className="title">Interactive
                                        Learning</h6>
                                </div>
                                {/* single choose reason end */}
                                {/* single choose reason */}
                                <div className="single-choose-reason-1">
                                    <div className="icon">
                                        <img src="assets/images/why-choose/icon/03.png" alt="icon"/>
                                    </div>
                                    <h6 className="title">Affordable
                                        Learning</h6>
                                </div>
                                {/* single choose reason end */}
                                {/* single choose reason */}
                                <div className="single-choose-reason-1">
                                    <div className="icon">
                                        <img src="assets/images/why-choose/icon/04.png" alt="icon"/>
                                    </div>
                                    <h6 className="title">Career
                                        Advance</h6>
                                </div>
                                {/* single choose reason end */}
                                {/* single choose reason */}
                                <div className="single-choose-reason-1">
                                    <div className="icon">
                                        <img src="assets/images/why-choose/icon/05.png" alt="icon"/>
                                    </div>
                                    <h6 className="title">Course
                                        Selection</h6>
                                </div>
                                {/* single choose reason end */}
                                {/* single choose reason */}
                                <div className="single-choose-reason-1">
                                    <div className="icon">
                                        <img src="assets/images/why-choose/icon/06.png" alt="icon"/>
                                    </div>
                                    <h6 className="title">Support
                                        Community</h6>
                                </div>
                                {/* single choose reason end */}
                            </div>
                            <a href="single-course.html" className="rts-btn btn-primary-white with-arrow">View All
                                Course <i className="fa-regular fa-arrow-right"/></a>
                        </div>
                    </div>
                </div>
                <div className="shape-image">
                    <div className="shape one" data-speed="0.04" data-revert="true"><img
                        src="assets/images/banner/15.png" alt/></div>
                    <div className="shape two" data-speed="0.04"><img
                        src="assets/images/banner/shape/banner-shape02-w.svg" alt/></div>
                    <div className="shape three" data-speed="0.04"><img src="assets/images/banner/16.png" alt/></div>
                </div>
            </div>
        </div>
    );
}

export default Section;