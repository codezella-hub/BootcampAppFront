import React from "react";


function Course() {
    return (
        <div>
            <div className="course-area-start rts-section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-between-area">
                                <div className="title-area-left-style">
                                    <div className="pre-title">
                                        <img src="assets/images/banner/bulb.png" alt="icon"/>
                                        <span>Courses</span>
                                    </div>
                                    <h2 className="title">Explore Featured Courses</h2>
                                    <p className="post-title">You'll find something to spark your curiosity and
                                        enhance</p>
                                </div>
                                <div className="button-group filters-button-group">
                                    <button className="button is-checked" data-filter="*">All Catagories</button>
                                    <button className="button" data-filter=".creative">Business</button>
                                    <button className="button" data-filter=".design">Marketing</button>
                                    <button className="button" data-filter=".photo">Music</button>
                                    <button className="button" data-filter=".style">Design</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ms-portfolio-filter-area main-isotop">
                        <div className="portfolio_wrap">
                            <div className="filter row g-5 mt--20 portfolio-feed personal">
                                <div
                                    className="flash grid-item-p element-item transition creative col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    data-category="transition">
                                    {/* rts single course */}
                                    <div className="rts-single-course">
                                        <a href="single-course.html" className="thumbnail">
                                            <img src="assets/images/course/01.jpg" alt="course"/>
                                        </a>
                                        <div className="save-icon" data-bs-toggle="modal"
                                             data-bs-target="#exampleModal-login">
                                            <i className="fa-sharp fa-light fa-bookmark"/>
                                        </div>
                                        <div className="tags-area-wrapper">
                                            <div className="single-tag">
                                                <span>Web Development</span>
                                            </div>
                                        </div>
                                        <div className="lesson-studente">
                                            <div className="lesson">
                                                <i className="fa-light fa-calendar-lines-pen"/>
                                                <span>25 Lessons</span>
                                            </div>
                                            <div className="lesson">
                                                <i className="fa-light fa-user-group"/>
                                                <span>54 Students</span>
                                            </div>
                                        </div>
                                        <a href="single-course.html">
                                            <h5 className="title">The Complete Web Developer in
                                                2023: Zero to Mastery</h5>
                                        </a>
                                        <p className="teacher">Dr. Angela Yu</p>
                                        <div className="rating-and-price">
                                            <div className="rating-area">
                                                <span>4.5</span>
                                                <div className="stars">
                                                    <ul>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-regular fa-star"/></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="price-area">
                                                <div className="not price">
                                                    $79.99
                                                </div>
                                                <div className="price">
                                                    $79.99
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* rts single course end */}
                                </div>
                                <div
                                    className="flash grid-item-p element-item transition design col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    data-category="transition">
                                    {/* rts single course */}
                                    <div className="rts-single-course">
                                        <a href="single-course.html" className="thumbnail">
                                            <img src="assets/images/course/02.jpg" alt="course"/>
                                        </a>
                                        <div className="save-icon" data-bs-toggle="modal"
                                             data-bs-target="#exampleModal-login">
                                            <i className="fa-sharp fa-light fa-bookmark"/>
                                        </div>
                                        <div className="tags-area-wrapper">
                                            <div className="single-tag">
                                                <span>Marketing</span>
                                            </div>
                                            <div className="single-tag">
                                                <span>Finance</span>
                                            </div>
                                        </div>
                                        <div className="lesson-studente">
                                            <div className="lesson">
                                                <i className="fa-light fa-calendar-lines-pen"/>
                                                <span>22 Lessons</span>
                                            </div>
                                            <div className="lesson">
                                                <i className="fa-light fa-user-group"/>
                                                <span>60 Students</span>
                                            </div>
                                        </div>
                                        <a href="single-course.html">
                                            <h5 className="title">How to Write the Ultimate 1 Page
                                                Strategic Business Plan</h5>
                                        </a>
                                        <p className="teacher">William U. Peña, MBA</p>
                                        <div className="rating-and-price">
                                            <div className="rating-area">
                                                <span>4.5</span>
                                                <div className="stars">
                                                    <ul>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-regular fa-star"/></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="price-area">
                                                <div className="price">
                                                    $79.99
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* rts single course end */}
                                </div>
                                <div
                                    className="flash grid-item-p element-item transition photo col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    data-category="transition">
                                    {/* rts single course */}
                                    <div className="rts-single-course">
                                        <a href="single-course.html" className="thumbnail">
                                            <img src="assets/images/course/03.jpg" alt="course"/>
                                        </a>
                                        <div className="save-icon" data-bs-toggle="modal"
                                             data-bs-target="#exampleModal-login">
                                            <i className="fa-sharp fa-light fa-bookmark"/>
                                        </div>
                                        <div className="tags-area-wrapper">
                                            <div className="single-tag">
                                                <span>Web Development</span>
                                            </div>
                                        </div>
                                        <div className="lesson-studente">
                                            <div className="lesson">
                                                <i className="fa-light fa-calendar-lines-pen"/>
                                                <span>23 Lessons</span>
                                            </div>
                                            <div className="lesson">
                                                <i className="fa-light fa-user-group"/>
                                                <span>40 Students</span>
                                            </div>
                                        </div>
                                        <a href="single-course.html">
                                            <h5 className="title">100 Days Of Code - 2023 Web
                                                Development Bootcamp</h5>
                                        </a>
                                        <p className="teacher">Dr. Angela Yu</p>
                                        <div className="rating-and-price">
                                            <div className="rating-area">
                                                <span>4.5</span>
                                                <div className="stars">
                                                    <ul>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-regular fa-star"/></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="price-area">
                                                <div className="not price">
                                                    $79.99
                                                </div>
                                                <div className="price">
                                                    $79.99
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* rts single course end */}
                                </div>
                                <div
                                    className="flash grid-item-p element-item transition style col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    data-category="transition">
                                    {/* rts single course */}
                                    <div className="rts-single-course">
                                        <a href="single-course.html" className="thumbnail">
                                            <img src="assets/images/course/04.jpg" alt="course"/>
                                        </a>
                                        <div className="save-icon" data-bs-toggle="modal"
                                             data-bs-target="#exampleModal-login">
                                            <i className="fa-sharp fa-light fa-bookmark"/>
                                        </div>
                                        <div className="tags-area-wrapper">
                                            <div className="single-tag">
                                                <span>Design</span>
                                            </div>
                                            <div className="single-tag">
                                                <span>UI/UX</span>
                                            </div>
                                        </div>
                                        <div className="lesson-studente">
                                            <div className="lesson">
                                                <i className="fa-light fa-calendar-lines-pen"/>
                                                <span>19 Lessons</span>
                                            </div>
                                            <div className="lesson">
                                                <i className="fa-light fa-user-group"/>
                                                <span>14 Students</span>
                                            </div>
                                        </div>
                                        <a href="single-course.html">
                                            <h5 className="title">User Experience The Ultimate
                                                Guide to Usability and UX</h5>
                                        </a>
                                        <p className="teacher">David Travis</p>
                                        <div className="rating-and-price">
                                            <div className="rating-area">
                                                <span>4.5</span>
                                                <div className="stars">
                                                    <ul>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-regular fa-star"/></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="price-area">
                                                <div className="not price">
                                                    $79.99
                                                </div>
                                                <div className="price">
                                                    $79.99
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* rts single course end */}
                                </div>
                                <div
                                    className="flash grid-item-p element-item transition creative col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    data-category="transition">
                                    {/* rts single course */}
                                    <div className="rts-single-course">
                                        <a href="single-course.html" className="thumbnail">
                                            <img src="assets/images/course/05.jpg" alt="course"/>
                                        </a>
                                        <div className="save-icon" data-bs-toggle="modal"
                                             data-bs-target="#exampleModal-login">
                                            <i className="fa-sharp fa-light fa-bookmark"/>
                                        </div>
                                        <div className="tags-area-wrapper">
                                            <div className="single-tag">
                                                <span>Music</span>
                                            </div>
                                            <div className="single-tag">
                                                <span>Art</span>
                                            </div>
                                        </div>
                                        <div className="lesson-studente">
                                            <div className="lesson">
                                                <i className="fa-light fa-calendar-lines-pen"/>
                                                <span>25 Lessons</span>
                                            </div>
                                            <div className="lesson">
                                                <i className="fa-light fa-user-group"/>
                                                <span>54 Students</span>
                                            </div>
                                        </div>
                                        <a href="single-course.html">
                                            <h5 className="title">Complete Guitar Lessons System
                                                Beginner to Advanced</h5>
                                        </a>
                                        <p className="teacher">Erich Andreas</p>
                                        <div className="rating-and-price">
                                            <div className="rating-area">
                                                <span>4.5</span>
                                                <div className="stars">
                                                    <ul>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-regular fa-star"/></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="price-area">
                                                <div className="not price">
                                                    $79.99
                                                </div>
                                                <div className="price">
                                                    $79.99
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* rts single course end */}
                                </div>
                                <div
                                    className="flash grid-item-p element-item transition design col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    data-category="transition">
                                    {/* rts single course */}
                                    <div className="rts-single-course">
                                        <a href="single-course.html" className="thumbnail">
                                            <img src="assets/images/course/06.jpg" alt="course"/>
                                        </a>
                                        <div className="save-icon" data-bs-toggle="modal"
                                             data-bs-target="#exampleModal-login">
                                            <i className="fa-sharp fa-light fa-bookmark"/>
                                        </div>
                                        <div className="tags-area-wrapper">
                                            <div className="single-tag">
                                                <span>Web Development</span>
                                            </div>
                                        </div>
                                        <div className="lesson-studente">
                                            <div className="lesson">
                                                <i className="fa-light fa-calendar-lines-pen"/>
                                                <span>25 Lessons</span>
                                            </div>
                                            <div className="lesson">
                                                <i className="fa-light fa-user-group"/>
                                                <span>54 Students</span>
                                            </div>
                                        </div>
                                        <a href="single-course.html">
                                            <h5 className="title">How to Market Yourself as Coach or Consultant
                                                Market</h5>
                                        </a>
                                        <p className="teacher">Dr. Angela Yu</p>
                                        <div className="rating-and-price">
                                            <div className="rating-area">
                                                <span>4.5</span>
                                                <div className="stars">
                                                    <ul>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-regular fa-star"/></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="price-area">
                                                <div className="price">
                                                    $79.99
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* rts single course end */}
                                </div>
                                <div
                                    className="flash grid-item-p element-item transition photo col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    data-category="transition">
                                    {/* rts single course */}
                                    <div className="rts-single-course">
                                        <a href="single-course.html" className="thumbnail">
                                            <img src="assets/images/course/07.jpg" alt="course"/>
                                        </a>
                                        <div className="save-icon" data-bs-toggle="modal"
                                             data-bs-target="#exampleModal-login">
                                            <i className="fa-sharp fa-light fa-bookmark"/>
                                        </div>
                                        <div className="tags-area-wrapper">
                                            <div className="single-tag">
                                                <span>Business</span>
                                            </div>
                                        </div>
                                        <div className="lesson-studente">
                                            <div className="lesson">
                                                <i className="fa-light fa-calendar-lines-pen"/>
                                                <span>25 Lessons</span>
                                            </div>
                                            <div className="lesson">
                                                <i className="fa-light fa-user-group"/>
                                                <span>54 Students</span>
                                            </div>
                                        </div>
                                        <a href="single-course.html">
                                            <h5 className="title">How to Run truly Productive in
                                                Meetings – and add value</h5>
                                        </a>
                                        <p className="teacher">Dr. Angela Yu</p>
                                        <div className="rating-and-price">
                                            <div className="rating-area">
                                                <span>4.5</span>
                                                <div className="stars">
                                                    <ul>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-regular fa-star"/></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="price-area">
                                                <div className="not price">
                                                    $79.99
                                                </div>
                                                <div className="price">
                                                    $39.99
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* rts single course end */}
                                </div>
                                <div
                                    className="flash grid-item-p element-item transition style col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    data-category="transition">
                                    {/* rts single course */}
                                    <div className="rts-single-course">
                                        <a href="single-course.html" className="thumbnail">
                                            <img src="assets/images/course/08.jpg" alt="course"/>
                                        </a>
                                        <div className="save-icon" data-bs-toggle="modal"
                                             data-bs-target="#exampleModal-login">
                                            <i className="fa-sharp fa-light fa-bookmark"/>
                                        </div>
                                        <div className="tags-area-wrapper">
                                            <div className="single-tag">
                                                <span>Dance</span>
                                            </div>
                                            <div className="single-tag">
                                                <span>Meditation</span>
                                            </div>
                                        </div>
                                        <div className="lesson-studente">
                                            <div className="lesson">
                                                <i className="fa-light fa-calendar-lines-pen"/>
                                                <span>25 Lessons</span>
                                            </div>
                                            <div className="lesson">
                                                <i className="fa-light fa-user-group"/>
                                                <span>54 Students</span>
                                            </div>
                                        </div>
                                        <a href="single-course.html">
                                            <h5 className="title">Pole Dancing Video Course with
                                                Noelle Wood</h5>
                                        </a>
                                        <p className="teacher">Dr. Angela Yu</p>
                                        <div className="rating-and-price">
                                            <div className="rating-area">
                                                <span>4.5</span>
                                                <div className="stars">
                                                    <ul>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                        <li><i className="fa-sharp fa-regular fa-star"/></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="price-area">
                                                <div className="price">
                                                    $59.99
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* rts single course end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;