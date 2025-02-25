import React from 'react'
import { Link } from 'react-router-dom'
import Profile from './Profile'



function header() {
  return (
<div className="header-transparent">
  <div className="container">
 
    <div className="row">
      <div className="col-lg-12">
        <div className="header-tranaparent-main-wrapper">
          <a href="index-2.html" className="logo-area">
            <img src="assets/images/logo/logo-1.svg" alt="logo" />
          </a>
          <div className="right-area">
            <div className="main-nav-one">
              <nav>
                <ul>
            
                  <li className="has-dropdown" style={{position: 'static'}}>
                    <a className="nav-link" href="#">Home</a>
                    <ul className="megamenu-hub">
                      <li>
                        <ul className>
                          <li>
                            <a href="index-2.html">Main Home</a>
                          </li>
                          <li>
                            <a href="index-two.html">Online course </a>
                            <span className="popular">Popular</span>
                          </li>
                          <li>
                            <a href="index-three.html">Course hub</a>
                            <span>Hot</span>
                          </li>
                          <li><a href="index-four.html">Distance learning</a></li>
                          <li>
                            <a href="index-five.html">Single Instructor</a>
                            <span>Hot</span>
                          </li>
                        </ul>
                        <ul className>
                          <li>
                            <a href="index-six.html">Language Academy</a>
                            <span>Hot</span>
                          </li>
                          <li><a href="index-seven.html">Gym Instructor</a></li>
                          <li>
                            <a href="index-eight.html">Kitchen coach</a>
                            <span className="popular">Popular</span>
                          </li>
                          <li><a href="index-nine.html">Course Portal</a></li>
                          <li><a href="index-ten.html">Business coach</a></li>
                        </ul>
                        <div className="absolute-image-shape shape-image">
                          <img className=" shape one" src="assets/images/nav/02.png" data-speed="0.04" data-revert="true" alt="nav" />
                          <img className=" shape two" src="assets/images/nav/03.png" data-speed="0.04" alt="nav" />
                        </div>
                        <div className="nav-mega-image">
                          <a href="single-course.html">
                            <img src="assets/images/nav/01.jpg" alt="nav" />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="has-dropdown">
                    <a className="nav-link" href="#">Pages</a>
                    <ul className="submenu">
                      <li><a href="about.html">About Us</a></li>
                      <li><a href="about-two.html">About Two</a></li>
                      <li><a href="instructor-profile.html">Profile</a></li>
                      <li><a href="contact.html">Contact</a></li>
                      <li className="sub-dropdown">
                        <a href="javascript:void(0);">Zoom</a>
                        <ul className="submenu third-lvl base">
                          <li><a className="mobile-menu-link" href="zoom-meeting.html">Zoom Meeting</a></li>
                          <li><a className="mobile-menu-link" href="zoom-details.html">Zoom Details</a></li>
                        </ul>
                      </li>
                      <li className="sub-dropdown">
                        <a href="javascript:void(0);">Event</a>
                        <ul className="submenu third-lvl base">
                          <li><a className="mobile-menu-link" href="event.html">Event</a></li>
                          <li><a className="mobile-menu-link" href="event-2.html">Event Two</a></li>
                          <li><a className="mobile-menu-link" href="event-details.html">Event Details</a></li>
                        </ul>
                      </li>
                      <li className="sub-dropdown">
                        <a href="javascript:void(0);">Shop</a>
                        <ul className="submenu third-lvl base">
                          <li><a className="mobile-menu-link" href="shop.html">Shop</a></li>
                          <li><a className="mobile-menu-link" href="product-details.html">Product Details</a></li>
                          <li><a className="mobile-menu-link" href="checkout.html">Checkout</a></li>
                          <li><a className="mobile-menu-link" href="cart.html">Cart</a></li>
                        </ul>
                      </li>
                      <li><a href="404.html">Error 404</a></li>
                    </ul>
                  </li>
                  <li className="has-dropdown" style={{position: 'static'}}>
                    <a className="nav-link" href="#">Courses</a>
                    <ul className="megamenu-hub min-mega shape-move">
                      <li>
                        <ul className>
                          <li className="parent"><a href="#">Courses</a></li>
                          <li><a className="mobile-menu-link" href="course-one.html">Courses</a></li>
                          <li><a className="mobile-menu-link" href="course-two.html">Course List</a></li>
                          <li><a className="mobile-menu-link" href="course-three.html">Course Grid</a></li>
                          <li><a className="mobile-menu-link" href="course-four.html">Course List Two</a></li>
                          <li><a className="mobile-menu-link" href="course-five.html">Course Grid Two</a></li>
                          <li><a className="mobile-menu-link" href="course-six.html">Course Grid Three</a></li>
                        </ul>
                        <ul className>
                          <li className="parent"><a href="#">Courses Details</a></li>
                          <li><a className="mobile-menu-link" href="single-course.html">Course Details</a></li>
                          <li><a className="mobile-menu-link" href="single-course-two.html">Course Details v2</a></li>
                          <li><a className="mobile-menu-link" href="single-course-three.html">Course Details v3</a></li>
                          <li><a className="mobile-menu-link" href="single-course-four.html">Course Details v4</a></li>
                          <li><a className="mobile-menu-link" href="single-course-five.html">Course Details v5</a></li>
                          <li><a className="mobile-menu-link" href="single-course-free.html">Course Details Free</a></li>
                        </ul>
                        <ul className>
                          <li className="parent"><a href="#">Others</a></li>
                          <li><a href="become-instructor.html">Become an Instructor</a></li>
                          <li><a href="instructor-profile.html">Instructor Profile</a></li>
                          <li><a href="instructor.html">Instructor</a></li>
                          <li><a href="pricing.html">Membership Plan</a></li>
                          <li><a href="log-in.html">Log In</a></li>
                          <li><a href="registration.html">Registration</a></li>
                        </ul>
                        <div className="thumbnav-area">
                          {/* single thumbnav */}
                          <a href="create-course.html" className="single-thumbnav">
                            <div className="icon">
                              <img src="assets/images/nav/04.png" alt="nav" />
                            </div>
                            <span>Create Course</span>
                          </a>
                          {/* single thumbnav end */}
                          {/* single thumbnav */}
                          <a href="lesson-details.html" className="single-thumbnav mash">
                            <div className="icon">
                              <img src="assets/images/nav/05.png" alt="nav" />
                            </div>
                            <span>Lesson Details</span>
                          </a>
                          {/* single thumbnav end */}
                          {/* single thumbnav */}
                          <a href="instructor.html" className="single-thumbnav">
                            <div className="icon">
                              <img src="assets/images/nav/06.png" alt="nav" />
                            </div>
                            <span>Instructor</span>
                          </a>
                          {/* single thumbnav end */}
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="has-dropdown">
                    <a className="nav-link" href="#">Dashboard</a>
                    <ul className="submenu">
                      <li className="sub-dropdown">
                        <a className="submenu-link" href="javascript:void(0);">Instructor Dashboard</a>
                        <ul className="submenu third-lvl base">
                          <li><a className="mobile-menu-link" href="dashboard.html">Dashboard</a></li>
                          <li><a className="mobile-menu-link" href="my-profile.html">My Profile</a></li>
                          <li><a className="mobile-menu-link" href="enroll-course.html">Enroll Course</a></li>
                          <li><a className="mobile-menu-link" href="wishlist.html">Wishlist</a></li>
                          <li><a className="mobile-menu-link" href="reviews.html">Reviews</a></li>
                          <li><a className="mobile-menu-link" href="quick-attempts.html">Quick Attempts</a></li>
                          <li><a className="mobile-menu-link" href="order-history.html">Order History</a></li>
                          <li><a className="mobile-menu-link" href="question-answer.html">Question Answer</a></li>
                          <li><a className="mobile-menu-link" href="calender.html">Calender</a></li>
                          <li><a className="mobile-menu-link" href="my-course.html">My Course</a></li>
                          <li><a className="mobile-menu-link" href="announcement.html">Announcement</a></li>
                          <li><a className="mobile-menu-link" href="assignments.html">Assignments</a></li>
                          <li><a className="mobile-menu-link" href="certificate.html">Certificate</a></li>
                        </ul>
                      </li>
                      <li className="sub-dropdown">
                        <a className="submenu-link" href="javascript:void(0);">Students Dashboard</a>
                        <ul className="submenu third-lvl base">
                          <li><a className="mobile-menu-link" href="student-dashboard.html">Dashboard</a></li>
                          <li><a className="mobile-menu-link" href="student-profile.html">My Profile</a></li>
                          <li><a className="mobile-menu-link" href="student-enroll-course.html">Enroll Course</a></li>
                          <li><a className="mobile-menu-link" href="student-wishlist.html">Wishlist</a></li>
                          <li><a className="mobile-menu-link" href="student-reviews.html">Reviews</a></li>
                          <li><a className="mobile-menu-link" href="student-quick-attempts.html">Quick Attempts</a></li>
                          <li><a className="mobile-menu-link" href="student-order-history.html">Order History</a></li>
                          <li><a className="mobile-menu-link" href="student-question-answer.html">Question Answer</a></li>
                          <li><a className="mobile-menu-link" href="student-calender.html">Calender</a></li>
                          <li><a className="mobile-menu-link" href="student-settings.html">Student Settings</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="has-dropdown">
                    <a className="nav-link" href="#">Blog</a>
                    <ul className="submenu">
                      <li><a href="blog.html">Blog</a></li>
                      <li><a href="blog-grid.html">Blog Grid</a></li>
                      <li><a href="blog-list.html">Blog List</a></li>
                      <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
                      <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
                      <li><a href="blog-details.html">Blog Details</a></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <a className="rts-btn btn-primary-white"><Link to="/register">Sign Up</Link></a>  
          
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



  )
}

export default header