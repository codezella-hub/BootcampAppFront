
import { Link } from 'react-router-dom'
import {checkAuth} from "../../services/authService"
import  { useEffect, useState } from 'react';
import Profile from '../auth/Profile';
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await checkAuth();
        setIsLoggedIn(result.success); // Directement utiliser le booléen
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
        setIsLoggedIn(false); // Si une erreur survient, on considère l'utilisateur comme non connecté
      }
    };
  

    verifyUser();
   
    // Call the function to check authentication status
}, []);
  return (
<header className="header-one v-2 header--sticky">
  <div className="header-top-one-wrapper">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="header-top-one">
            <div className="left-information">
              <a href="mailto:someone@example.com" className="email"><i className="fa-light fa-envelope" />info@studyhub.com</a>
              <a href="tel:+4733378901" className="email"><i className="fa-light fa-phone" />+61 012 012 445</a>
            </div>
            <div className="right-information">
              <div className="right-information">
                <ul className="rts-dropdown-menu switcher-language">
                  <li className="has-child-menu">
                    <a href="#">
                      <img className="left-image" src="/assets/images/flag-01.svg" alt="Language Images" />
                      <span className="menu-item">English</span>
                      <i className="fa-regular fa-chevron-down" />
                    </a>
                    <ul className="sub-menu">
                      <li>
                        <a href="#">
                          <img className="left-image" src="/assets/images/flag-03.svg" alt="Language Images" />
                          <span className="menu-item">Deutsch</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img className="left-image" src="/assets/images/flag-02.svg" alt="Language Images" />
                          <span className="menu-item">Portuguese</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img className="left-image" src="/assets/images/flag-04.svg" alt="Language Images" />
                          <span className="menu-item">Russian</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="rts-dropdown-menu switcher-currency">
                  <li className="has-child-menu">
                    <a href="#">
                      <span className="menu-item">USD</span>
                      <i className="fa-regular fa-chevron-down" />
                    </a>
                    <ul className="sub-menu">
                      <li>
                        <a href="#">
                          <span className="menu-item">Euro</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="menu-item">Real</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="menu-item">Ruble</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="header-one-wrapper">
          <div className="left-side-header">
            <a href="index-2.html" className="logo-area">
              <img src="/assets/images/logo/logo-1.svg" alt="logo" />
            </a>
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
                  <li className="has-dropdown">
                    <a className="nav-link" href="#">Forum</a>
                    <ul className="submenu">
                    <li><a href="/Forums">Forums</a></li>
                    <li><a href="/Myforum">My Forum</a></li>
                    </ul>
                  </li>
                  <li className="has-dropdown">
                  <a className="nav-link" href="/posts">Jobs</a>
                  <ul className="submenu">
                    <li><a href="/MyPosts">my offers</a></li>
                    <li><a href="/MyCandidats">my applications</a></li>
                    </ul>
                    </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="header-right-area-one">
            <div className="actions-area">
              <div className="search-btn" id="search">
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                  <path d="M19.9375 18.9652L14.7454 13.7732C15.993 12.2753 16.6152 10.3542 16.4824 8.40936C16.3497 6.46453 15.4722 4.64575 14.0326 3.33139C12.593 2.01702 10.7021 1.30826 8.75326 1.35254C6.8044 1.39683 4.94764 2.19075 3.56924 3.56916C2.19083 4.94756 1.39691 6.80432 1.35263 8.75317C1.30834 10.702 2.0171 12.5929 3.33147 14.0325C4.64584 15.4721 6.46461 16.3496 8.40944 16.4823C10.3543 16.6151 12.2754 15.993 13.7732 14.7453L18.9653 19.9374L19.9375 18.9652ZM2.75 8.93742C2.75 7.71365 3.11289 6.51736 3.79278 5.49983C4.47267 4.4823 5.43903 3.68923 6.56965 3.22091C7.70026 2.7526 8.94436 2.63006 10.1446 2.86881C11.3449 3.10756 12.4474 3.69686 13.3127 4.56219C14.1781 5.42753 14.7674 6.53004 15.0061 7.7303C15.2449 8.93055 15.1223 10.1747 14.654 11.3053C14.1857 12.4359 13.3926 13.4022 12.3751 14.0821C11.3576 14.762 10.1613 15.1249 8.9375 15.1249C7.29703 15.1231 5.72427 14.4706 4.56429 13.3106C3.4043 12.1506 2.75182 10.5779 2.75 8.93742Z" fill="#553CDF" />
                </svg>
              </div>
              <div className="cart cart-icon">
                <i className="fa-regular fa-cart-shopping" />
              </div>
            </div>
            <div className="buttons-area">
            {isLoggedIn ? (
                       <Profile></Profile>
                      
               
            ) : (
              <>
                      <a href="registration.html" className="rts-btn btn-primary"><Link to="/login">Sign In</Link></a>
                      <a href="registration.html" className="rts-btn btn-primary"><Link to="/register">Sign Up</Link></a>
                      </>
            )}
              
            </div>
            <div className="menu-btn" id="menu-btn">
              <svg width={20} height={16} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y={14} width={20} height={2} fill="#1F1F25" />
                <rect y={7} width={20} height={2} fill="#1F1F25" />
                <rect width={20} height={2} fill="#1F1F25" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>


  )
}

export default Header;