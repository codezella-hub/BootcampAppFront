import React from 'react'
import Header from '../student/Header'
import LeftSideBar from './LeftSideBar'

function StudentEnrollCourse() {
  return (

<div>
<Header />
{/* dashboard banner area start */}
<div className="dashboard-banner-area-wrapper">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="dashboard-banner-area-start bg_image  student-dashboard">
          <div className="rating-area-banner-dashboard">
            <a href="become-instructor.html" className="create-btn"><i className="fa-regular fa-circle-plus" /> Become an Instructor</a>
          </div>
          <div className="author-profile-image-and-name">
            <div className="profile-pic">
              <img src="/assets/images/dashboard/04.png" alt="dashboard" />
            </div>
            <div className="name-desig">
              <h1 className="title">Hachem Dhawadi</h1>
              <div className="course-vedio">
                <div className="single">
                  <i className="fa-thin fa-book" />
                  <span>5 Course Enrolled</span>
                </div>
                <div className="single">
                  <i className="fa-thin fa-file-certificate" />
                  <span>4 Certificate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div>
  {/* rts dahboard-area-main-wrapper */}
  <div className="dashboard--area-main pt--100">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-3">
          <LeftSideBar/>
        </div>
        <div className="col-lg-9">
          <div className="exrolled-course-wrapper-dashed">
            <h5 className="title">Enrolleld Courses</h5>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Enrolleld Courses</button>
              </li>
            </ul>
            <div className="tab-content mt--30" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row g-5">
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    {/* single course style two */}
                    <div className="single-course-style-three enroll-course">
                      <a href="single-course.html" className="thumbnail">
                        <img src="/assets/images/course/01.jpg" alt="course" />
                        <div className="tag-thumb">
                          <span>Marketing</span>
                        </div>
                      </a>
                      <div className="body-area">
                        <div className="course-top">
                          <div className="tags">Best Seller</div>
                          <div className="price">$49.50</div>
                        </div>
                        <a href="single-course.html">
                          <h5 className="title">How to Write the Ultimate 1 Page
                            Strategic Business Plan</h5>
                        </a>
                        <div className="teacher-stars">
                          <div className="teacher"><span>Dr. Angela Yu</span></div>
                          <ul className="stars">
                            <li className="span">4.5</li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-regular fa-star" /></li>
                          </ul>
                        </div>
                        <div className="leasson-students">
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>25 Lessons</span>
                          </div>
                          <div className="students">
                            <i className="fa-light fa-users" />
                            <span>25 Lessons</span>
                          </div>
                        </div>
                        <div className="progress-wrapper-lesson-compleate">
                          <div className="compleate">
                            <div className="compl">
                              Complete
                            </div>
                            <div className="end">
                              <span>50%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{width: '50%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                            </div>
                          </div>
                        </div>
                        <button className="rts-btn btn-border">Download Certificate</button>
                      </div>
                    </div>
                    {/* single course style two end */}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    {/* single course style two */}
                    <div className="single-course-style-three enroll-course">
                      <a href="single-course.html" className="thumbnail">
                        <img src="/assets/images/course/02.jpg" alt="course" />
                        <div className="tag-thumb">
                          <span>Marketing</span>
                        </div>
                      </a>
                      <div className="body-area">
                        <div className="course-top">
                          <div className="tags">Best Seller</div>
                          <div className="price">$49.50</div>
                        </div>
                        <a href="single-course.html">
                          <h5 className="title">How to Write the Ultimate 1 Page
                            Strategic Business Plan</h5>
                        </a>
                        <div className="teacher-stars">
                          <div className="teacher"><span>Dr. Angela Yu</span></div>
                          <ul className="stars">
                            <li className="span">4.5</li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-regular fa-star" /></li>
                          </ul>
                        </div>
                        <div className="leasson-students">
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>25 Lessons</span>
                          </div>
                          <div className="students">
                            <i className="fa-light fa-users" />
                            <span>25 Lessons</span>
                          </div>
                        </div>
                        <div className="progress-wrapper-lesson-compleate">
                          <div className="compleate">
                            <div className="compl">
                              Complete
                            </div>
                            <div className="end">
                              <span>70%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{width: '70%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                            </div>
                          </div>
                        </div>
                        <button className="rts-btn btn-border">Download Certificate</button>
                      </div>
                    </div>
                    {/* single course style two end */}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    {/* single course style two */}
                    <div className="single-course-style-three enroll-course">
                      <a href="single-course.html" className="thumbnail">
                        <img src="/assets/images/course/03.jpg" alt="course" />
                        <div className="tag-thumb">
                          <span>Marketing</span>
                        </div>
                      </a>
                      <div className="body-area">
                        <div className="course-top">
                          <div className="tags">Best Seller</div>
                          <div className="price">$49.50</div>
                        </div>
                        <a href="single-course.html">
                          <h5 className="title">How to Write the Ultimate 1 Page
                            Strategic Business Plan</h5>
                        </a>
                        <div className="teacher-stars">
                          <div className="teacher"><span>Dr. Angela Yu</span></div>
                          <ul className="stars">
                            <li className="span">4.5</li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-regular fa-star" /></li>
                          </ul>
                        </div>
                        <div className="leasson-students">
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>25 Lessons</span>
                          </div>
                          <div className="students">
                            <i className="fa-light fa-users" />
                            <span>25 Lessons</span>
                          </div>
                        </div>
                        <div className="progress-wrapper-lesson-compleate">
                          <div className="compleate">
                            <div className="compl">
                              Complete
                            </div>
                            <div className="end">
                              <span>90%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{width: '90%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                            </div>
                          </div>
                        </div>
                        <button className="rts-btn btn-border">Download Certificate</button>
                      </div>
                    </div>
                    {/* single course style two end */}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    {/* single course style two */}
                    <div className="single-course-style-three enroll-course">
                      <a href="single-course.html" className="thumbnail">
                        <img src="/assets/images/course/04.jpg" alt="course" />
                        <div className="tag-thumb">
                          <span>Marketing</span>
                        </div>
                      </a>
                      <div className="body-area">
                        <div className="course-top">
                          <div className="tags">Best Seller</div>
                          <div className="price">$49.50</div>
                        </div>
                        <a href="single-course.html">
                          <h5 className="title">How to Write the Ultimate 1 Page
                            Strategic Business Plan</h5>
                        </a>
                        <div className="teacher-stars">
                          <div className="teacher"><span>Dr. Angela Yu</span></div>
                          <ul className="stars">
                            <li className="span">4.5</li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-regular fa-star" /></li>
                          </ul>
                        </div>
                        <div className="leasson-students">
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>25 Lessons</span>
                          </div>
                          <div className="students">
                            <i className="fa-light fa-users" />
                            <span>25 Lessons</span>
                          </div>
                        </div>
                        <div className="progress-wrapper-lesson-compleate">
                          <div className="compleate">
                            <div className="compl">
                              Complete
                            </div>
                            <div className="end">
                              <span>20%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{width: '20%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                            </div>
                          </div>
                        </div>
                        <button className="rts-btn btn-border">Download Certificate</button>
                      </div>
                    </div>
                    {/* single course style two end */}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    {/* single course style two */}
                    <div className="single-course-style-three enroll-course">
                      <a href="single-course.html" className="thumbnail">
                        <img src="/assets/images/course/05.jpg" alt="course" />
                        <div className="tag-thumb">
                          <span>Marketing</span>
                        </div>
                      </a>
                      <div className="body-area">
                        <div className="course-top">
                          <div className="tags">Best Seller</div>
                          <div className="price">$49.50</div>
                        </div>
                        <a href="single-course.html">
                          <h5 className="title">How to Write the Ultimate 1 Page
                            Strategic Business Plan</h5>
                        </a>
                        <div className="teacher-stars">
                          <div className="teacher"><span>Dr. Angela Yu</span></div>
                          <ul className="stars">
                            <li className="span">4.5</li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-regular fa-star" /></li>
                          </ul>
                        </div>
                        <div className="leasson-students">
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>25 Lessons</span>
                          </div>
                          <div className="students">
                            <i className="fa-light fa-users" />
                            <span>25 Lessons</span>
                          </div>
                        </div>
                        <div className="progress-wrapper-lesson-compleate">
                          <div className="compleate">
                            <div className="compl">
                              Complete
                            </div>
                            <div className="end">
                              <span>50%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{width: '50%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                            </div>
                          </div>
                        </div>
                        <button className="rts-btn btn-border">Download Certificate</button>
                      </div>
                    </div>
                    {/* single course style two end */}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    {/* single course style two */}
                    <div className="single-course-style-three enroll-course">
                      <a href="single-course.html" className="thumbnail">
                        <img src="/assets/images/course/06.jpg" alt="course" />
                        <div className="tag-thumb">
                          <span>Marketing</span>
                        </div>
                      </a>
                      <div className="body-area">
                        <div className="course-top">
                          <div className="tags">Best Seller</div>
                          <div className="price">$49.50</div>
                        </div>
                        <a href="single-course.html">
                          <h5 className="title">How to Write the Ultimate 1 Page
                            Strategic Business Plan</h5>
                        </a>
                        <div className="teacher-stars">
                          <div className="teacher"><span>Dr. Angela Yu</span></div>
                          <ul className="stars">
                            <li className="span">4.5</li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                            <li><i className="fa-sharp fa-regular fa-star" /></li>
                          </ul>
                        </div>
                        <div className="leasson-students">
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>25 Lessons</span>
                          </div>
                          <div className="students">
                            <i className="fa-light fa-users" />
                            <span>25 Lessons</span>
                          </div>
                        </div>
                        <div className="progress-wrapper-lesson-compleate">
                          <div className="compleate">
                            <div className="compl">
                              Complete
                            </div>
                            <div className="end">
                              <span>80%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{width: '80%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                            </div>
                          </div>
                        </div>
                        <button className="rts-btn btn-border">Download Certificate</button>
                      </div>
                    </div>
                    {/* single course style two end */}
                  </div>
                </div>
              </div>
      
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* rts dahboard-area-main-wrapper end */}
</div>









{/* cart area start */}
{/* cart area start */}
<div className="cart-bar">
  <div className="cart-header">
    <h3 className="cart-heading">MY CART (3 ITEMS)</h3>
    <div className="close-cart"><i className="fal fa-times" /></div>
  </div>
  <div className="product-area">
    <div className="product-item">
      <div className="product-detail">
        <div className="product-thumb"><img src="assets/images/course/cart/01.jpg" alt="product-thumb" /></div>
        <div className="item-wrapper">
          <span className="product-name">Construct Map</span>
          <div className="item-wrapper">
            <span className="product-variation"><span className="color">Green /</span>
              <span className="size">XL</span></span>
          </div>
          <div className="item-wrapper">
            <span className="product-qnty">3 ×</span>
            <span className="product-price">$198.00</span>
          </div>
        </div>
      </div>
      <div className="cart-edit">
        <div className="quantity-edit">
          <button className="button"><i className="fal fa-minus minus" /></button>
          <input type="text" className="input" defaultValue={3} />
          <button className="button plus">+<i className="fal fa-plus plus" /></button>
        </div>
        <div className="item-wrapper d-flex mr--5 align-items-center">
          <a href="#" className="product-edit"><i className="fal fa-edit" /></a>
          <a href="#" className="delete-cart"><i className="fal fa-times" /></a>
        </div>
      </div>
    </div>
    <div className="product-item">
      <div className="product-detail">
        <div className="product-thumb"><img src="/assets/images/course/cart/02.jpg" alt="product-thumb" /></div>
        <div className="item-wrapper">
          <span className="product-name"> Bridge product</span>
          <div className="item-wrapper">
            <span className="product-variation"><span className="color">Green /</span>
              <span className="size">XL</span></span>
          </div>
          <div className="item-wrapper">
            <span className="product-qnty">2 ×</span>
            <span className="product-price">$88.00</span>
          </div>
        </div>
      </div>
      <div className="cart-edit">
        <div className="quantity-edit">
          <button className="button"><i className="fal fa-minus minus" /></button>
          <input type="text" className="input" defaultValue={2} />
          <button className="button plus">+<i className="fal fa-plus plus" /></button>
        </div>
        <div className="item-wrapper d-flex mr--5 align-items-center">
          <a href="#" className="product-edit"><i className="fal fa-edit" /></a>
          <a href="#" className="delete-cart"><i className="fal fa-times" /></a>
        </div>
      </div>
    </div>
    <div className="product-item last-child">
      <div className="product-detail">
        <div className="product-thumb"><img src="assets/images/course/cart/03.jpg" alt="product-thumb" /></div>
        <div className="item-wrapper">
          <span className="product-name">Labour helmet</span>
          <div className="item-wrapper">
            <span className="product-variation"><span className="color">Green /</span>
              <span className="size">XL</span></span>
          </div>
          <div className="item-wrapper">
            <span className="product-qnty">1 ×</span>
            <span className="product-price">$289.00</span>
          </div>
        </div>
      </div>
      <div className="cart-edit">
        <div className="quantity-edit">
          <button className="button"><i className="fal fa-minus minus" /></button>
          <input type="text" className="input" defaultValue={2} />
          <button className="button plus">+<i className="fal fa-plus plus" /></button>
        </div>
        <div className="item-wrapper d-flex mr--5 align-items-center">
          <a href="#" className="product-edit"><i className="fal fa-edit" /></a>
          <a href="#" className="delete-cart"><i className="fal fa-times" /></a>
        </div>
      </div>
    </div>
  </div>
  <div className="cart-bottom-area">
    <span className="spend-shipping"><i className="fal fa-truck" /> SPENT <span className="amount">$199.00</span> MORE
      FOR FREE SHIPPING</span>
    <span className="total-price">TOTAL: <span className="price">$556</span></span>
    <a href="checkout.html" className="checkout-btn cart-btn">PROCEED TO CHECKOUT</a>
    <a href="cart.html" className="view-btn cart-btn">VIEW CART</a>
  </div>
</div>
{/* cart area edn */}
{/* cart area edn */}











</div>

  )
}

export default StudentEnrollCourse