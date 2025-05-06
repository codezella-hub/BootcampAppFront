import React from "react";


function Category() {
    return (
        <div>
            <div className="category-area-style-one shape-move rts-section-gap bg_image">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-area-center-style">
                                <div className="pre-title">
                                    <img src="assets/images/banner/bulb.png" alt="icon"/>
                                    <span>Top Category</span>
                                </div>
                                <h2 className="title">Explore 2000+ Free Online Courses</h2>
                                <p className="post-title">You'll find something to spark your curiosity and enhance</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt--50">
                        <div className="col-lg-12">
                            <div className="category-swiper-wrapper">
                                <div className="swiper mySwiper-category-1">
                                    <div className="swiper-wrapper">
                                        {/* single swiper style */}
                                        <div className="swiper-slide">
                                            <a href="#" className="category-style-one">
                                                <div className="icon">
                                                    <img src="assets/images/category/01.svg" alt="brand"/>
                                                </div>
                                                <h5 className="title">Development</h5>
                                                <span>130+ Courses</span>
                                            </a>
                                        </div>
                                        {/* single swiper style */}
                                        {/* single swiper style */}
                                        <div className="swiper-slide">
                                            <a href="#" className="category-style-one">
                                                <div className="icon">
                                                    <img src="assets/images/category/02.svg" alt="brand"/>
                                                </div>
                                                <h5 className="title">Business</h5>
                                                <span>230+ Courses</span>
                                            </a>
                                        </div>
                                        {/* single swiper style */}
                                        {/* single swiper style */}
                                        <div className="swiper-slide">
                                            <a href="#" className="category-style-one">
                                                <div className="icon">
                                                    <img src="assets/images/category/03.svg" alt="brand"/>
                                                </div>
                                                <h5 className="title">Design &amp; Art</h5>
                                                <span>230+ Courses</span>
                                            </a>
                                        </div>
                                        {/* single swiper style */}
                                        {/* single swiper style */}
                                        <div className="swiper-slide">
                                            <a href="#" className="category-style-one">
                                                <div className="icon">
                                                    <img src="assets/images/category/04.svg" alt="brand"/>
                                                </div>
                                                <h5 className="title">Marketing</h5>
                                                <span>144+ Courses</span>
                                            </a>
                                        </div>
                                        {/* single swiper style */}
                                        {/* single swiper style */}
                                        <div className="swiper-slide">
                                            <a href="#" className="category-style-one">
                                                <div className="icon">
                                                    <img src="assets/images/category/05.svg" alt="brand"/>
                                                </div>
                                                <h5 className="title">Music</h5>
                                                <span>130+ Courses</span>
                                            </a>
                                        </div>
                                        {/* single swiper style */}
                                        {/* single swiper style */}
                                        <div className="swiper-slide">
                                            <a href="#" className="category-style-one">
                                                <div className="icon">
                                                    <img src="assets/images/category/06.svg" alt="brand"/>
                                                </div>
                                                <h5 className="title">Accounting</h5>
                                                <span>110+ Courses</span>
                                            </a>
                                        </div>
                                        {/* single swiper style */}
                                    </div>
                                    <div className="swiper-button-next"><i className="fa-solid fa-chevron-right"/></div>
                                    <div className="swiper-button-prev"><i className="fa-solid fa-chevron-left"/></div>
                                    <div className="swiper-pagination"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shape-image">
                    <div className="shape one" data-speed="0.04" data-revert="true"><img
                        src="assets/images/banner/15.png" alt/></div>
                    <div className="shape two" data-speed="0.04"><img
                        src="assets/images/banner/shape/banner-shape02.svg" alt/></div>
                    <div className="shape three" data-speed="0.04"><img
                        src="assets/images/banner/shape/banner-shape03.svg" alt/></div>
                </div>
            </div>
        </div>
    );
}

export default Category;