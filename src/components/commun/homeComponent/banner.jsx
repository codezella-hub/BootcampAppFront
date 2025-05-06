import React from "react";


function Banner() {
    return (
        <div>
            <div className="banner-area-one shape-move">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 order-xl-1 order-lg-1 order-sm-2 order-2">
                            <div className="banner-content-one">
                                <div className="inner">
                                    <div className="pre-title-banner">
                                        <img src="assets/images/banner/bulb.png" width={22} alt="icon"/>
                                        <span>Gateway to Lifelong Learning</span>
                                    </div>
                                    <h1 className="title-banner">
                                        Unlock Your Potential <br/>
                                        with <span>Online Learning</span>
                                        <img src="assets/images/banner/02.png" alt="banner"/>
                                    </h1>
                                    <p className="disc">Discover a world of knowledge and opportunities with our online
                                        education platform pursue a new career.</p>
                                    <div className="banner-btn-author-wrapper">
                                        <a href="course-five.html" className="rts-btn btn-primary with-arrow">View All
                                            Course <i className="fa-regular fa-arrow-right"/></a>
                                        <div className="sm-image-wrapper">
                                            <div className="images-wrap">
                                                <img src="assets/images/banner/shape/06.png" alt="banner"/>
                                                <img className="two" src="assets/images/banner/shape/07.png"
                                                     alt="banner"/>
                                                <img className="three" src="assets/images/banner/shape/08.png"
                                                     alt="banner"/>
                                            </div>
                                            <div className="info">
                                                <h6 className="title">2k students</h6>
                                                <span>Joint our online Class</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 order--xl-2 order-lg-2 order-sm-1 order-1">
                            <div className="banner-right-img">
                                <img src="assets/images/banner/01.png" alt="banner"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="review-thumb">
                    {/* single review */}
                    <div className="review-single">
                        <img src="assets/images/banner/03.png" alt="banner"/>
                        <div className="info-right">
                            <h6 className="title">4.5</h6>
                            <span>(2.4k Review)</span>
                        </div>
                    </div>
                    {/* single review end */}
                    {/* single review */}
                    <div className="review-single two">
                        <img src="assets/images/banner/04.png" alt="banner"/>
                        <div className="info-right">
                            <h6 className="title">100+
                            </h6>
                            <span>Online Course</span>
                        </div>
                    </div>
                    {/* single review end */}
                </div>
                <div className="shape-image">
                    <div className="shape one" data-speed="0.04" data-revert="true"><img
                        src="assets/images/banner/shape/banner-shape01.svg" alt="shape_image"/></div>
                    <div className="shape two" data-speed="0.04"><img
                        src="assets/images/banner/shape/banner-shape02.svg" alt="shape_image"/></div>
                    <div className="shape three" data-speed="0.04"><img
                        src="assets/images/banner/shape/banner-shape03.svg" alt="shape_image"/></div>
                </div>
            </div>
        </div>
    );
}

export default Banner;