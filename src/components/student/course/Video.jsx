import React from 'react'

function Video() {
  return (
<div>
  {/* rts lession details area start */}
  <div className="rts-lession-details-area-start">
    <div className="rts-lession-content-wrapper">
      <div className="rts-lession-left">
        <div className="content-wrapper">
          <div className="inner-content">
            <input type="text" placeholder="Search Courses" />
            <i className="fa-solid fa-magnifying-glass" />
          </div>
        </div>
        {/* course content accordion area */}
        <div className="course-content-wrapper-main">
          <div className="accordion mt--30" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <span>Introduction</span>
                  <span>29 min</span>
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Introduction To</span>
                    </div>
                    <div className="right">
                      <span className="play">Preview</span>
                      <span>9 min</span>
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Fundation to the course</span>
                    </div>
                    <div className="right">
                      {/* <span class="play">Preview</span> */}
                      <span>9 min</span>
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>main Module</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <span>Learn to Storyboard</span>
                  <span>7 L .120 min</span>
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Become a storyboard artist</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>storyboard artist</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Introduction PHP</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>LEarning Fundamentsl Elementor</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Enter to the course</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Main Part of the course</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Function About PHP</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  <span>Digital application</span>
                  <span>7 L . 83 min</span>
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Become a storyboard artist</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>storyboard artist</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Introduction PHP</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>LEarning Fundamentsl Elementor</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Enter to the course</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Main Part of the course</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Function About PHP</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  <span>Digital drawing</span>
                  <span>7 L . 72 min</span>
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Become a storyboard artist</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>storyboard artist</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Introduction PHP</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>LEarning Fundamentsl Elementor</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Enter to the course</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Main Part of the course</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Function About PHP</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  <span>1-point and perspective</span>
                  <span>7L . 90 min</span>
                </button>
              </h2>
              <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Become a storyboard artist</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>storyboard artist</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Introduction PHP</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>LEarning Fundamentsl Elementor</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Enter to the course</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Main Part of the course</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                  {/* play single area start */}
                  <a href="#" className="play-vedio-wrapper">
                    <div className="left">
                      <i className="fa-light fa-circle-play" />
                      <span>Function About PHP</span>
                    </div>
                    <div className="right">
                      <i className="fa-regular fa-lock" />
                    </div>
                  </a>
                  {/* play single area end */}
                </div>
              </div>
            </div>
          </div>
          {/* course content accordion area end */}
        </div>
      </div>
      <div className="rts-lession-right">
        <div className="lesson-top-bar">
          <div className="left-area">
            <div className="toggle-class" id="toggle-left-back">
              <i className="fa-light fa-chevron-left" />
            </div>
            <span>Course Content </span>
          </div>
          <div className="right">
            <a href="course-two.html"><i className="fa-solid fa-x" /></a>
          </div>
        </div>
        <iframe src="https://res.cloudinary.com/dix7gepbx/video/upload/v1739110399/course_videos/videos/10%20sec%202D%20Test%20animation.mp4" title="YouTube video player" />
        <div className="lesson-bottom-area">
          <h5 className="title mb--10">About Lesson --</h5>
          <p className="disc">
            If filmmaking is your passion but you never went to film school you’ve come to the right place. Here, you will get hands-on
            experience and acquire skills that you never would’ve elsewhere like learning how to make feature films on your own, making do with any equipment, and doing it all faster and better.
          </p>
        </div>
        <div className="next-prev-area">
          <div className="prev">
            <i className="fa-sharp fa-solid fa-play" />
            Prev
          </div>
          <div className="next">
            Prev
            <i className="fa-sharp fa-solid fa-play" />
          </div>
        </div>
      </div>
      
    </div>
  </div>
  {/* rts lession details area end */}
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
    {/* mobile menu area start */}
    <div className="mobile-menu-main">
      <nav className="nav-main mainmenu-nav mt--30">
        <ul className="mainmenu metismenu" id="mobile-menu-active">
          <li className="has-droupdown">
            <a href="#" className="main">Home</a>
            <ul className="submenu mm-collapse">
              <li><a className="mobile-menu-link" href="index-2.html">Main Home</a></li>
              <li><a className="mobile-menu-link" href="index-two.html">Online Course</a></li>
              <li><a className="mobile-menu-link" href="index-three.html">Course Hub</a></li>
              <li><a className="mobile-menu-link" href="index-four.html">Distance Learning</a></li>
              <li><a className="mobile-menu-link" href="index-five.html">Single Instructor</a></li>
              <li><a className="mobile-menu-link" href="index-six.html">Language Academy</a></li>
              <li><a className="mobile-menu-link" href="index-seven.html">Gym Instructor</a></li>
              <li><a className="mobile-menu-link" href="index-eight.html">Kitchen Coach</a></li>
              <li><a className="mobile-menu-link" href="index-nine.html">Course Portal</a></li>
              <li><a className="mobile-menu-link" href="index-ten.html">Business Coach</a></li>
            </ul>
          </li>
          <li className="has-droupdown">
            <a href="#" className="main">Pages</a>
            <ul className="submenu mm-collapse">
              <li><a className="mobile-menu-link" href="about.html">About Us</a></li>
              <li><a className="mobile-menu-link" href="about-two.html">About Us Two</a></li>
              <li><a className="mobile-menu-link" href="instructor-profile.html">Profile</a></li>
              <li><a className="mobile-menu-link" href="contact.html">Contact</a></li>
              <li className="has-droupdown third-lvl">
                <a className="main" href="#">Zoom</a>
                <ul className="submenu-third-lvl mm-collapse">
                  <li><a href="zoom-meeting.html" />Zoom Meeting</li>
                  <li><a href="zoom-details.html" />Zoom Details</li>
                </ul>
              </li>
              <li className="has-droupdown third-lvl">
                <a className="main" href="#">Event</a>
                <ul className="submenu-third-lvl mm-collapse">
                  <li><a href="event.html" />Event</li>
                  <li><a href="event-two.html" />Event Two</li>
                  <li><a href="event-details.html" />Event Details</li>
                </ul>
              </li>
              <li className="has-droupdown third-lvl">
                <a className="main" href="#">Shop</a>
                <ul className="submenu-third-lvl mm-collapse">
                  <li><a href="shop.html" />Shop</li>
                  <li><a href="product-details.html" />Product Details</li>
                  <li><a href="checkout.html" />Checkout</li>
                  <li><a href="cart.html" />Cart</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="has-droupdown">
            <a href="#" className="main">Course</a>
            <ul className="submenu mm-collapse">
              <li><a href="#" className="tag">Courses</a></li>
              <li><a className="mobile-menu-link" href="course-one.html">Courses</a></li>
              <li><a className="mobile-menu-link" href="course-two.html">Course List</a></li>
              <li><a className="mobile-menu-link" href="course-three.html">Course Grid</a></li>
              <li><a className="mobile-menu-link" href="course-four.html">Course List Two</a></li>
              <li><a className="mobile-menu-link" href="course-five.html">Course Grid Two</a></li>
              <li><a className="mobile-menu-link" href="course-six.html">Course Filter</a></li>
            </ul>
            <ul className="submenu mm-collapse">
              <li><a href="#" className="tag">Courses Details</a></li>
              <li><a className="mobile-menu-link" href="single-course.html">Courses Details</a></li>
              <li><a className="mobile-menu-link" href="single-course-two.html">Courses Details V2</a></li>
              <li><a className="mobile-menu-link" href="single-course-three.html">Courses Details V3</a></li>
              <li><a className="mobile-menu-link" href="single-course-four.html">Courses Details V4</a></li>
              <li><a className="mobile-menu-link" href="single-course-five.html">Courses Details V5</a></li>
              <li><a className="mobile-menu-link" href="single-course-free.html">Courses Details Free</a></li>
            </ul>
            <ul className="submenu mm-collapse">
              <li><a href="#" className="tag">Others</a></li>
              <li><a className="mobile-menu-link" href="become-instructor.html">Become an Instructor</a></li>
              <li><a className="mobile-menu-link" href="instructor-profile.html">Instructor Profile</a></li>
              <li><a className="mobile-menu-link" href="instructor.html">Instructor</a></li>
              <li><a className="mobile-menu-link" href="pricing.html">Membership Plan</a></li>
              <li><a className="mobile-menu-link" href="log-in.html">Log In</a></li>
              <li><a className="mobile-menu-link" href="registration.html">Registration</a></li>
            </ul>
          </li>
          <li className="has-droupdown">
            <a href="#" className="main">Dashboard</a>
            <ul className="submenu mm-collapse">
              <li className="has-droupdown third-lvl">
                <a className="main" href="#">Instructor Dashboard</a>
                <ul className="submenu-third-lvl mm-collapse">
                  <li><a href="dashboard.html" />Dashboard</li>
                  <li><a href="my-profile.html" />My Profile</li>
                  <li><a href="enroll-course.html" />Enroll Course</li>
                  <li><a href="wishlist.html" />Wishlist</li>
                  <li><a href="reviews.html" />Reviews</li>
                  <li><a href="quick-attempts.html" />Quick Attempts</li>
                  <li><a href="order-history.html" />Order History</li>
                  <li><a href="question-answer.html" />Question Answer</li>
                  <li><a href="calender.html" />Calender</li>
                  <li><a href="my-course.html" />My Course</li>
                  <li><a href="announcement.html" />Announcement</li>
                  <li><a href="assignments.html" />Assignments</li>
                  <li><a href="certificate.html" />Certificate</li>
                </ul>
              </li>
              <li className="has-droupdown third-lvl">
                <a className="main" href="#">Students Dashboard</a>
                <ul className="submenu-third-lvl mm-collapse">
                  <li><a href="student-dashboard.html" />Dashboard</li>
                  <li><a href="student-profile.html" />My Profile</li>
                  <li><a href="student-enroll-course.html" />Enroll Course</li>
                  <li><a href="student-wishlist.html" />Wishlist</li>
                  <li><a href="student-reviews.html" />Reviews</li>
                  <li><a href="student-quick-attempts.html" />Quick Attempts</li>
                  <li><a href="student-order-history.html" />Order History</li>
                  <li><a href="student-question-answer.html" />Question Answer</li>
                  <li><a href="student-calender.html" />Calender</li>
                  <li><a href="student-settings.html" />Students Settings</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="has-droupdown">
            <a href="#" className="main">Blog</a>
            <ul className="submenu mm-collapse">
              <li><a className="mobile-menu-link" href="blog.html">Blog</a></li>
              <li><a className="mobile-menu-link" href="blog-grid.html">Blog Grid</a></li>
              <li><a className="mobile-menu-link" href="blog-list.html">Blog List</a></li>
              <li><a className="mobile-menu-link" href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
              <li><a className="mobile-menu-link" href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
              <li><a className="mobile-menu-link" href="blog-details.html">Blog Details</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="buttons-area">
        <a href="#" className="rts-btn btn-border">Log In</a>
        <a href="#" className="rts-btn btn-primary">Sign Up</a>
      </div>
      <div className="rts-social-style-one pl--20 mt--50">
        <ul>
          <li>
            <a href="#">
              <i className="fa-brands fa-facebook-f" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-twitter" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-youtube" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-linkedin-in" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    {/* mobile menu area end */}
  </div>
  {/* header style two End */}
  {/* modal */}
  <div id="myModal-1" className="modal fade" role="dialog">
    <div className="modal-dialog bg_image">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-bs-dismiss="modal"><i className="fa-light fa-x" /></button>
        </div>
        <div className="modal-body text-center">
          <div className="inner-content">
            <div className="title-area">
              <span className="pre">Get Our Courses Free</span>
              <h4 className="title">Wonderful for Learning</h4>
            </div>
            <form action="#">
              <input type="text" placeholder="Your Mail.." required />
              <button>Download Now</button>
              <span>Your information will never be shared with any third party</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* rts backto top start */}
  <div className="progress-wrap">
    <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '307.919'}} />
    </svg>
  </div>
  {/* rts backto top end */}
  {/* offcanvase search */}
  <div className="search-input-area">
    <div className="container">
      <div className="search-input-inner">
        <div className="input-div">
          <input className="search-input autocomplete" type="text" placeholder="Search by keyword or #" />
          <button><i className="far fa-search" /></button>
        </div>
      </div>
    </div>
    <div id="close" className="search-close-icon"><i className="far fa-times" /></div>
  </div>
  {/* offcanvase search */}
  <div id="anywhere-home" className>
  </div>
</div>

  )
}

export default Video