import React from 'react'
import Header from '../components/student/Header'

function Home() {
  return (
   <div>    {/* banner area start */}
   <Header />
  <div className="banner-area-one shape-move">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 order-xl-1 order-lg-1 order-sm-2 order-2">
          <div className="banner-content-one">
            <div className="inner">
              <div className="pre-title-banner">
                <img src="assets/images/banner/bulb.png" width={22} alt="icon" />
                <span>Gateway to Lifelong Learning</span>
              </div>
              <h1 className="title-banner">
                Unlock Your Potential <br />
                with <span>Online Learning</span>
                <img src="assets/images/banner/02.png" alt="banner" />
              </h1>
              <p className="disc">Discover a world of knowledge and opportunities with our online
                education platform pursue a new career.</p>
              <div className="banner-btn-author-wrapper">
                <a href="course-five.html" className="rts-btn btn-primary with-arrow">View All Course <i className="fa-regular fa-arrow-right" /></a>
                <div className="sm-image-wrapper">
                  <div className="images-wrap">
                    <img src="assets/images/banner/shape/06.png" alt="banner" />
                    <img className="two" src="assets/images/banner/shape/07.png" alt="banner" />
                    <img className="three" src="assets/images/banner/shape/08.png" alt="banner" />
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
            <img src="assets/images/banner/01.png" alt="banner" />
          </div>
        </div>
      </div>
    </div>
    <div className="review-thumb">
      {/* single review */}
      <div className="review-single">
        <img src="assets/images/banner/03.png" alt="banner" />
        <div className="info-right">
          <h6 className="title">4.5</h6>
          <span>(2.4k Review)</span>
        </div>
      </div>
      {/* single review end */}
      {/* single review */}
      <div className="review-single two">
        <img src="assets/images/banner/04.png" alt="banner" />
        <div className="info-right">
          <h6 className="title">100+
          </h6>
          <span>Online Course</span>
        </div>
      </div>
      {/* single review end */}
    </div>
    <div className="shape-image">
      <div className="shape one" data-speed="0.04" data-revert="true"><img src="assets/images/banner/shape/banner-shape01.svg" alt="shape_image" /></div>
      <div className="shape two" data-speed="0.04"><img src="assets/images/banner/shape/banner-shape02.svg" alt="shape_image" /></div>
      <div className="shape three" data-speed="0.04"><img src="assets/images/banner/shape/banner-shape03.svg" alt="shape_image" /></div>
    </div>
  </div>
  {/* banner area end */}
  {/* brand area start */}
  <div className="brand-area-one ptb--100">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="brand-style-one ">
            <div className="left-title">
              <h6 className="title">Trusted by:</h6>
            </div>
            <div className="swiper mySwiper-category-1 swiper-data" data-swiper="{
                      &quot;spaceBetween&quot;:30,
                      &quot;slidesPerView&quot;:6,
                      &quot;loop&quot;: true,
                      &quot;speed&quot;: 1500,
                      &quot;autoplay&quot;:{
                          &quot;delay&quot;:&quot;4000&quot;
                      },
                      &quot;breakpoints&quot;:{
                      &quot;0&quot;:{
                          &quot;slidesPerView&quot;:2,
                          &quot;spaceBetween&quot;:30},
                      &quot;320&quot;:{
                          &quot;slidesPerView&quot;:2,
                          &quot;spaceBetween&quot;:30},
                      &quot;480&quot;:{
                          &quot;slidesPerView&quot;:3,
                          &quot;spaceBetween&quot;:30},
                      &quot;640&quot;:{
                          &quot;slidesPerView&quot;:4,
                          &quot;spaceBetween&quot;:30},
                      &quot;840&quot;:{
                          &quot;slidesPerView&quot;:4,
                          &quot;spaceBetween&quot;:30},
                      &quot;1140&quot;:{
                          &quot;slidesPerView&quot;:6,
                          &quot;spaceBetween&quot;:30}
                      }
                  }">
              <div className="swiper-wrapper">
                {/* single swiper style */}
                <div className="swiper-slide">
                  <div className="brand-area">
                    <img src="assets/images/brand/08.svg" alt="brand" />
                  </div>
                </div>
                {/* single swiper style */}
                {/* single swiper style */}
                <div className="swiper-slide">
                  <div className="brand-area">
                    <img src="assets/images/brand/09.svg" alt="brand" />
                  </div>
                </div>
                {/* single swiper style */}
                {/* single swiper style */}
                <div className="swiper-slide">
                  <div className="brand-area">
                    <img src="assets/images/brand/10.svg" alt="brand" />
                  </div>
                </div>
                {/* single swiper style */}
                {/* single swiper style */}
                <div className="swiper-slide">
                  <div className="brand-area">
                    <img src="assets/images/brand/11.svg" alt="brand" />
                  </div>
                </div>
                {/* single swiper style */}
                {/* single swiper style */}
                <div className="swiper-slide">
                  <div className="brand-area">
                    <img src="assets/images/brand/12.svg" alt="brand" />
                  </div>
                </div>
                {/* single swiper style */}
                {/* single swiper style */}
                <div className="swiper-slide">
                  <div className="brand-area">
                    <img src="assets/images/brand/13.svg" alt="brand" />
                  </div>
                </div>
                {/* single swiper style */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* brand area end */}
  {/* about area start */}
  <div className="about-area-start rts-section-gapBottom">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-xl-6 col-lg-12">
          {/* about-one-imagearea */}
          <div className="about-one-left-image">
            <div className="first-order">
              <div className="thumb-one">
                <img src="assets/images/about/03.jpg" alt="about" />
                <div className="information">
                  <div className="left">
                    <h3 className="title"><span className="counter animated fadeInDownBig">2.4</span>k</h3>
                    <span className="review">Positive Review</span>
                  </div>
                  <div className="right">
                    <svg xmlns="http://www.w3.org/2000/svg" width={49} height={45} viewBox="0 0 49 45" fill="none">
                      <path d="M48.8274 16.6142C48.9437 16.2489 48.6895 15.9121 48.347 15.8791L43.9873 15.4516C43.2272 14.0595 42.4698 12.6582 41.709 11.2689C41.5065 11.1576 41.2882 11.0795 41.0652 11.0189C40.7736 10.7695 40.3334 10.8874 40.1849 11.2263L38.2501 15.6537L33.5064 16.5701C33.0455 16.6585 32.8859 17.2398 33.237 17.5515L36.8497 20.7596L36.2555 25.5544C36.2134 25.8934 36.478 26.1914 36.8187 26.1914C37.1004 26.1914 36.9733 26.1592 41.2735 23.6691L45.6495 25.7162C46.0788 25.9151 46.545 25.5367 46.4444 25.0799L45.5377 20.9545C46.6626 19.6901 47.7911 18.4053 49 17.2246C48.9425 17.0212 48.8849 16.8177 48.8274 16.6142ZM41.4841 22.5141C41.3152 22.4357 41.1175 22.4431 40.9564 22.5392L37.5233 24.5523L38.0129 20.603C38.0362 20.4182 37.9663 20.2334 37.8267 20.1093L34.8506 17.4666L38.7582 16.7113C38.9419 16.6758 39.0959 16.5524 39.1706 16.3817L40.7643 12.7346L42.6898 16.2184C42.7799 16.3817 42.9451 16.4903 43.131 16.5081L47.0914 16.8968L44.374 19.8041C44.2465 19.9401 44.1941 20.1307 44.2343 20.3133L45.089 24.2005L41.4841 22.5141Z" fill="white" />
                      <path d="M13.5127 43.6945C13.7226 44.09 13.9886 44.5051 14.2119 44.9073L34.4773 44.996C34.7177 44.6152 34.975 44.1581 35.2263 43.7281C35.6251 43.6329 35.7421 43.2581 35.6236 42.9743C35.2068 41.9737 34.1408 39.9902 33.3038 39.0198C32.0198 37.5315 30.8133 36.6313 29.2695 36.0098C29.0481 35.9208 28.7272 36.0088 28.5856 36.2204C27.7723 37.4376 26.2 38.2875 24.7623 38.2875C23.2957 38.2875 21.8878 37.5366 20.9962 36.2781C20.866 36.0945 20.5556 35.9924 20.3341 36.0748C19.4047 36.4229 18.5926 36.8161 17.9851 37.2115C15.9561 38.5299 14.4023 40.809 13.1497 42.8642C12.9682 43.1629 13.0779 43.5944 13.5127 43.6945ZM18.604 38.1633C19.0606 37.8662 19.6638 37.5677 20.3537 37.2886C21.4618 38.6279 23.0749 39.4226 24.7623 39.4226C26.4002 39.4226 28.1676 38.5368 29.2346 37.2323C31.6115 38.3184 33.0432 40.2861 34.211 42.6233L14.6562 42.5937C15.7392 40.9014 17.0336 39.1839 18.604 38.1633Z" fill="white" />
                      <path d="M19.756 30.1313C19.9121 31.2014 20.2411 32.3617 20.9415 33.3687C23.2636 36.7061 28.2059 36.3779 29.2731 31.0068C29.3286 30.7913 29.3773 30.5797 29.4202 30.3691C30.9482 30.0657 31.047 27.9821 30.196 27.3302C31.2172 23.3953 27.9328 20.0259 24.4208 21.5083C24.5621 21.2392 24.4702 20.9047 24.2043 20.7529C23.9319 20.597 23.5857 20.6916 23.4294 20.9628C23.3404 21.1184 23.2721 21.2828 23.2136 21.4503C22.7494 21.2134 22.2332 21.6644 22.4455 22.1672C20.6248 22.2992 19.0325 24.0625 19.3937 27.0238C18.0892 27.4481 18.1645 29.458 19.756 30.1313ZM21.8734 32.7198C21.2197 31.7807 20.8677 30.5504 20.7771 28.8879C22.6569 28.9417 25.3019 27.7461 26.6844 26.1086C26.9802 27.206 27.4758 28.2307 28.3977 28.8893C28.3216 29.9825 28.2012 31.1223 27.7656 32.1427C27.3004 33.2335 26.4801 34.0427 25.5718 34.3065C24.1566 34.7196 22.6387 33.8202 21.8734 32.7198ZM20.4929 25.7383C20.6798 23.8314 22.1208 22.9441 23.2059 23.3957C23.4298 23.491 23.6892 23.4304 23.8503 23.2486C24.5808 22.4231 26.0156 22.0595 27.0458 22.4386C28.9851 23.1516 29.8257 25.6421 28.8327 27.7838C28.0116 27.0339 27.7037 25.7493 27.5055 24.4443C27.4135 23.8434 26.5697 23.7934 26.3995 24.3689C25.8715 26.1642 22.5556 27.8878 20.6781 27.7578C20.4984 26.9618 20.4358 26.3207 20.4929 25.7383Z" fill="white" />
                      <path d="M32.7133 6.03677L28.0902 5.58264C26.927 3.95966 25.856 2.24302 24.9835 0.449742C24.6327 0.313532 24.2646 0.229653 23.8923 0.175012C23.6066 -0.120622 23.1245 -0.0259308 22.9645 0.340414L20.6004 5.75003L14.8036 6.86964C14.3427 6.95796 14.183 7.53929 14.5342 7.85106L18.9487 11.7715L18.2226 17.6312C18.1647 18.0979 18.6696 18.4285 19.0729 18.1899L24.1658 15.2028L29.5133 17.7044C29.9416 17.9032 30.409 17.5258 30.3082 17.0681L29.1998 12.0238C30.5803 10.5656 31.9653 9.05626 33.345 7.60783C33.2833 7.35989 33.2216 7.11199 33.1599 6.8641C33.348 6.50531 33.111 6.07503 32.7133 6.03677ZM24.3764 14.0477C24.2076 13.9694 24.0099 13.9768 23.8488 14.0729L19.4904 16.6291L20.1119 11.6149C20.1352 11.4301 20.0654 11.2454 19.9257 11.1212L16.1478 7.76607L21.1085 6.8083C21.2921 6.77283 21.4462 6.64941 21.5212 6.47796L23.5439 1.84801L25.9882 6.2703C26.0784 6.43362 26.2436 6.54225 26.4294 6.55999L31.4581 7.05366L28.008 10.7451C27.8805 10.881 27.828 11.0717 27.8683 11.2542L28.9528 16.1887L24.3764 14.0477Z" fill="white" />
                      <path d="M3.20913 25.5542C3.1512 26.021 3.65611 26.3515 4.05937 26.1129L8.22707 23.669L12.6032 25.7161C13.0324 25.915 13.4986 25.5366 13.398 25.0798L12.6382 21.6227C13.7118 20.162 14.8738 18.6499 16.1916 17.426C16.0123 17.1823 15.8814 16.908 15.7777 16.6237C15.9023 16.2557 15.6466 15.9123 15.3006 15.879L11.3639 15.493C10.632 14.1393 9.93623 12.8115 9.19689 11.4525C8.80498 11.2269 8.37884 11.0633 7.93903 10.9583C7.65691 10.7944 7.27552 10.9135 7.13849 11.2262L5.20374 15.6536L0.459984 16.57C-0.000908753 16.6583 -0.160524 17.2397 0.190612 17.5514L3.8033 20.7595L3.20913 25.5542ZM1.80426 17.4664L5.71182 16.7112C5.89546 16.6757 6.04955 16.5523 6.12419 16.3816L7.71788 12.7345L9.6434 16.2182C9.73356 16.3816 9.89873 16.4902 10.0846 16.5079L14.045 16.8966L11.3276 19.8039C11.2001 19.9399 11.1477 20.1306 11.1879 20.3131L12.0426 24.2004L8.43769 22.5139C8.26882 22.4356 8.07113 22.443 7.91003 22.5391L4.47692 24.5521L4.96652 20.6028C4.9898 20.4181 4.91996 20.2333 4.78029 20.1092L1.80426 17.4664Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="thumb-bottom">
                <img src="assets/images/about/02.jpg" alt="about" />
              </div>
            </div>
            <div className="second-order">
              <img src="assets/images/about/01.jpg" alt="about" />
              <div className="vedio-icone">
                <a className="video-play-button play-video popup-video" href="https://www.youtube.com/watch?v=ezbJwaLmOeM">
                  <span />
                </a>
                <div className="video-overlay">
                  <a className="video-overlay-close">×</a>
                </div>
              </div>
            </div>
          </div>
          {/* about-one-imagearea end */}
        </div>
        <div className="col-xl-6 col-lg-12 pl--60 pl_lg--15 pl_md--10 pl_sm--10 pt_lg--50 pt_md--50 pt_sm--50">
          <div className="title-area-left-style">
            <div className="pre-title">
              <img src="assets/images/banner/bulb.png" alt="icon" />
              <span>Gateway to Lifelong Learning</span>
            </div>
            <h2 className="title">Know Studyhub Empowering
              Learners Worldwide</h2>
            <p className="post-title">We are passionate about education and dedicated to providing high- <br /> quality learning resources for learners of all backgrounds.</p>
          </div>
          <div className="about-inner-right-one">
            <div className="what-you-get">
              {/* single-facilities */}
              <div className="single-facilityes">
                <div className="icon">
                  <img src="assets/images/about/icon/01.png" alt="icon-image" />
                </div>
                <div className="information">
                  <h5 className="title">Learn with Expert </h5>
                  <p>We are passionate education.</p>
                </div>
              </div>
              {/* single-facilities end */}
              {/* single-facilities */}
              <div className="single-facilityes">
                <div className="icon">
                  <img src="assets/images/about/icon/02.png" alt="icon-image" />
                </div>
                <div className="information">
                  <h5 className="title">Expert Instructors</h5>
                  <p>We are passionate about education</p>
                </div>
              </div>
              {/* single-facilities end */}
            </div>
            <div className="author-area">
              <div className="single-author-and-info">
                <img src="assets/images/about/01.png" alt="about" />
                <div className="information">
                  <a href="#">
                    <h6 className="title">William James</h6>
                  </a>
                  <p className="desig">CEO, Studyhub Online Education</p>
                </div>
              </div>
              <a href="#" className="rts-btn btn-primary">About Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* about area end */}
  {/* category area start */}
  <div className="category-area-style-one shape-move rts-section-gap bg_image">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-area-center-style">
            <div className="pre-title">
              <img src="assets/images/banner/bulb.png" alt="icon" />
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
                      <img src="assets/images/category/01.svg" alt="brand" />
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
                      <img src="assets/images/category/02.svg" alt="brand" />
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
                      <img src="assets/images/category/03.svg" alt="brand" />
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
                      <img src="assets/images/category/04.svg" alt="brand" />
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
                      <img src="assets/images/category/05.svg" alt="brand" />
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
                      <img src="assets/images/category/06.svg" alt="brand" />
                    </div>
                    <h5 className="title">Accounting</h5>
                    <span>110+ Courses</span>
                  </a>
                </div>
                {/* single swiper style */}
              </div>
              <div className="swiper-button-next"><i className="fa-solid fa-chevron-right" /></div>
              <div className="swiper-button-prev"><i className="fa-solid fa-chevron-left" /></div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="shape-image">
      <div className="shape one" data-speed="0.04" data-revert="true"><img src="assets/images/banner/15.png" alt /></div>
      <div className="shape two" data-speed="0.04"><img src="assets/images/banner/shape/banner-shape02.svg" alt /></div>
      <div className="shape three" data-speed="0.04"><img src="assets/images/banner/shape/banner-shape03.svg" alt /></div>
    </div>
  </div>
  {/* category area end */}
  {/* course area start */}
  <div className="course-area-start rts-section-gap">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-between-area">
            <div className="title-area-left-style">
              <div className="pre-title">
                <img src="assets/images/banner/bulb.png" alt="icon" />
                <span>Courses</span>
              </div>
              <h2 className="title">Explore Featured Courses</h2>
              <p className="post-title">You'll find something to spark your curiosity and enhance</p>
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
            <div className="flash grid-item-p element-item transition creative col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition">
              {/* rts single course */}
              <div className="rts-single-course">
                <a href="single-course.html" className="thumbnail">
                  <img src="assets/images/course/01.jpg" alt="course" />
                </a>
                <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                  <i className="fa-sharp fa-light fa-bookmark" />
                </div>
                <div className="tags-area-wrapper">
                  <div className="single-tag">
                    <span>Web Development</span>
                  </div>
                </div>
                <div className="lesson-studente">
                  <div className="lesson">
                    <i className="fa-light fa-calendar-lines-pen" />
                    <span>25 Lessons</span>
                  </div>
                  <div className="lesson">
                    <i className="fa-light fa-user-group" />
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
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-regular fa-star" /></li>
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
            <div className="flash grid-item-p element-item transition design col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition">
              {/* rts single course */}
              <div className="rts-single-course">
                <a href="single-course.html" className="thumbnail">
                  <img src="assets/images/course/02.jpg" alt="course" />
                </a>
                <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                  <i className="fa-sharp fa-light fa-bookmark" />
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
                    <i className="fa-light fa-calendar-lines-pen" />
                    <span>22 Lessons</span>
                  </div>
                  <div className="lesson">
                    <i className="fa-light fa-user-group" />
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
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-regular fa-star" /></li>
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
            <div className="flash grid-item-p element-item transition photo col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition">
              {/* rts single course */}
              <div className="rts-single-course">
                <a href="single-course.html" className="thumbnail">
                  <img src="assets/images/course/03.jpg" alt="course" />
                </a>
                <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                  <i className="fa-sharp fa-light fa-bookmark" />
                </div>
                <div className="tags-area-wrapper">
                  <div className="single-tag">
                    <span>Web Development</span>
                  </div>
                </div>
                <div className="lesson-studente">
                  <div className="lesson">
                    <i className="fa-light fa-calendar-lines-pen" />
                    <span>23 Lessons</span>
                  </div>
                  <div className="lesson">
                    <i className="fa-light fa-user-group" />
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
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-regular fa-star" /></li>
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
            <div className="flash grid-item-p element-item transition style col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition">
              {/* rts single course */}
              <div className="rts-single-course">
                <a href="single-course.html" className="thumbnail">
                  <img src="assets/images/course/04.jpg" alt="course" />
                </a>
                <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                  <i className="fa-sharp fa-light fa-bookmark" />
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
                    <i className="fa-light fa-calendar-lines-pen" />
                    <span>19 Lessons</span>
                  </div>
                  <div className="lesson">
                    <i className="fa-light fa-user-group" />
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
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-regular fa-star" /></li>
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
            <div className="flash grid-item-p element-item transition creative col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition">
              {/* rts single course */}
              <div className="rts-single-course">
                <a href="single-course.html" className="thumbnail">
                  <img src="assets/images/course/05.jpg" alt="course" />
                </a>
                <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                  <i className="fa-sharp fa-light fa-bookmark" />
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
                    <i className="fa-light fa-calendar-lines-pen" />
                    <span>25 Lessons</span>
                  </div>
                  <div className="lesson">
                    <i className="fa-light fa-user-group" />
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
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-regular fa-star" /></li>
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
            <div className="flash grid-item-p element-item transition design col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition">
              {/* rts single course */}
              <div className="rts-single-course">
                <a href="single-course.html" className="thumbnail">
                  <img src="assets/images/course/06.jpg" alt="course" />
                </a>
                <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                  <i className="fa-sharp fa-light fa-bookmark" />
                </div>
                <div className="tags-area-wrapper">
                  <div className="single-tag">
                    <span>Web Development</span>
                  </div>
                </div>
                <div className="lesson-studente">
                  <div className="lesson">
                    <i className="fa-light fa-calendar-lines-pen" />
                    <span>25 Lessons</span>
                  </div>
                  <div className="lesson">
                    <i className="fa-light fa-user-group" />
                    <span>54 Students</span>
                  </div>
                </div>
                <a href="single-course.html">
                  <h5 className="title">How to Market Yourself as Coach or Consultant Market</h5>
                </a>
                <p className="teacher">Dr. Angela Yu</p>
                <div className="rating-and-price">
                  <div className="rating-area">
                    <span>4.5</span>
                    <div className="stars">
                      <ul>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-regular fa-star" /></li>
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
            <div className="flash grid-item-p element-item transition photo col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition">
              {/* rts single course */}
              <div className="rts-single-course">
                <a href="single-course.html" className="thumbnail">
                  <img src="assets/images/course/07.jpg" alt="course" />
                </a>
                <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                  <i className="fa-sharp fa-light fa-bookmark" />
                </div>
                <div className="tags-area-wrapper">
                  <div className="single-tag">
                    <span>Business</span>
                  </div>
                </div>
                <div className="lesson-studente">
                  <div className="lesson">
                    <i className="fa-light fa-calendar-lines-pen" />
                    <span>25 Lessons</span>
                  </div>
                  <div className="lesson">
                    <i className="fa-light fa-user-group" />
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
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-regular fa-star" /></li>
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
            <div className="flash grid-item-p element-item transition style col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition">
              {/* rts single course */}
              <div className="rts-single-course">
                <a href="single-course.html" className="thumbnail">
                  <img src="assets/images/course/08.jpg" alt="course" />
                </a>
                <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                  <i className="fa-sharp fa-light fa-bookmark" />
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
                    <i className="fa-light fa-calendar-lines-pen" />
                    <span>25 Lessons</span>
                  </div>
                  <div className="lesson">
                    <i className="fa-light fa-user-group" />
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
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-solid fa-star" /></li>
                        <li><i className="fa-sharp fa-regular fa-star" /></li>
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
  {/* course area end */}
  {/* why choose us section area start */}
  <div className="why-choose-us bg-blue bg-choose-us-one bg_image rts-section-gap shape-move">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="why-choose-us-area-image pb--50">
            <img className="one" src="assets/images/why-choose/02.jpg" alt="why-choose" />
            <div className="border-img">
              <img className="two ml--20" src="assets/images/why-choose/03.jpg" alt="why-choose" />
            </div>
            <div className="circle-animation">
              <a className="uni-circle-text uk-background-white dark:uk-background-gray-80 uk-box-shadow-large uk-visible@m" href="#view_in_opensea">
                <svg className="uni-circle-text-path uk-text-secondary uni-animation-spin" viewBox="0 0 100 100" width={200} height={200}>
                  <defs>
                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0">
                    </path>
                  </defs>
                  <text fontSize="11.2">
                    <textPath xlinkHref="#circle">About Univercity • About Collage •</textPath>
                  </text>
                </svg>
                <i className="fa-regular fa-arrow-up-right" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 pl--90 pl_md--15 mt_md--50 pl_sm--15 pt_sm--50">
          <div className="title-area-left-style">
            <div className="pre-title">
              <img src="assets/images/banner/bulb-2.png" alt="icon" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="title">Studyhub Your Path to
              Excellence &amp; Success</h2>
            <p className="post-title">We are passionate about education and dedicated to providing high- <br /> quality learning resources for learners of all backgrounds.</p>
          </div>
          <div className="why-choose-main-wrapper-1">
            {/* single choose reason */}
            <div className="single-choose-reason-1">
              <div className="icon">
                <img src="assets/images/why-choose/icon/01.png" alt="icon" />
              </div>
              <h6 className="title">Expert
                Instructors</h6>
            </div>
            {/* single choose reason end */}
            {/* single choose reason */}
            <div className="single-choose-reason-1">
              <div className="icon">
                <img src="assets/images/why-choose/icon/02.png" alt="icon" />
              </div>
              <h6 className="title">Interactive
                Learning</h6>
            </div>
            {/* single choose reason end */}
            {/* single choose reason */}
            <div className="single-choose-reason-1">
              <div className="icon">
                <img src="assets/images/why-choose/icon/03.png" alt="icon" />
              </div>
              <h6 className="title">Affordable
                Learning</h6>
            </div>
            {/* single choose reason end */}
            {/* single choose reason */}
            <div className="single-choose-reason-1">
              <div className="icon">
                <img src="assets/images/why-choose/icon/04.png" alt="icon" />
              </div>
              <h6 className="title">Career
                Advance</h6>
            </div>
            {/* single choose reason end */}
            {/* single choose reason */}
            <div className="single-choose-reason-1">
              <div className="icon">
                <img src="assets/images/why-choose/icon/05.png" alt="icon" />
              </div>
              <h6 className="title">Course
                Selection</h6>
            </div>
            {/* single choose reason end */}
            {/* single choose reason */}
            <div className="single-choose-reason-1">
              <div className="icon">
                <img src="assets/images/why-choose/icon/06.png" alt="icon" />
              </div>
              <h6 className="title">Support
                Community</h6>
            </div>
            {/* single choose reason end */}
          </div>
          <a href="single-course.html" className="rts-btn btn-primary-white with-arrow">View All Course <i className="fa-regular fa-arrow-right" /></a>
        </div>
      </div>
    </div>
    <div className="shape-image">
      <div className="shape one" data-speed="0.04" data-revert="true"><img src="assets/images/banner/15.png" alt /></div>
      <div className="shape two" data-speed="0.04"><img src="assets/images/banner/shape/banner-shape02-w.svg" alt /></div>
      <div className="shape three" data-speed="0.04"><img src="assets/images/banner/16.png" alt /></div>
    </div>
  </div>
  {/* why choose us section area end */}
  {/* up coming events area start */}
  <div className="up-coming-events rts-section-gap">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-area-center-style">
            <div className="pre-title">
              <img src="assets/images/banner/bulb.png" alt="icon" />
              <span>Our Event</span>
            </div>
            <h2 className="title">Upcoming Events</h2>
            <p className="post-title">You'll find something to spark your curiosity and enhance</p>
          </div>
        </div>
      </div>
      <div className="row mt--50">
        <div className="col-lg-12">
          {/* single up coming events */}
          <div className="upcoming-events-main-wrapper-1">
            {/* single */}
            <div className="single-upcoming-events">
              <div className="img-information">
                <a href="event-details.html" className="thumbnail">
                  <img src="assets/images/events/01.jpg" alt="events" />
                </a>
                <div className="information">
                  <div className="date-details">
                    <div className="date">
                      <i className="fa-thin fa-calendar-days" />
                      <p> December 26, 2023</p>
                    </div>
                    <div className="time">
                      <i className="fa-regular fa-clock" />
                      <p>10:30 am</p>
                    </div>
                    <div className="location">
                      <i className="fa-thin fa-location-dot" />
                      <p>Yarra Park, Melbourne</p>
                    </div>
                  </div>
                  <a href="event-details.html">
                    <h5 className="title">EduFest 2023: Igniting Minds, Transforming Lives </h5>
                  </a>
                </div>
              </div>
              <a href="event-details.html" className="rts-btn btn-primary with-arrow">Get Ticket <i className="fa-light fa-arrow-right" /></a>
            </div>
            {/* single */}
            {/* single */}
            <div className="single-upcoming-events">
              <div className="img-information">
                <a href="event-details.html" className="thumbnail">
                  <img src="assets/images/events/02.jpg" alt="events" />
                </a>
                <div className="information">
                  <div className="date-details">
                    <div className="date">
                      <i className="fa-thin fa-calendar-days" />
                      <p> December 26, 2023</p>
                    </div>
                    <div className="time">
                      <i className="fa-regular fa-clock" />
                      <p>10:30 am</p>
                    </div>
                    <div className="location">
                      <i className="fa-thin fa-location-dot" />
                      <p>Yarra Park, Melbourne</p>
                    </div>
                  </div>
                  <a href="event-details.html">
                    <h5 className="title">EdTech Summit: Revolutionizing Learning</h5>
                  </a>
                </div>
              </div>
              <a href="event-details.html" className="rts-btn btn-primary with-arrow">Get Ticket <i className="fa-light fa-arrow-right" /></a>
            </div>
            {/* single */}
            {/* single */}
            <div className="single-upcoming-events">
              <div className="img-information">
                <a href="event-details.html" className="thumbnail">
                  <img src="assets/images/events/03.jpg" alt="events" />
                </a>
                <div className="information">
                  <div className="date-details">
                    <div className="date">
                      <i className="fa-thin fa-calendar-days" />
                      <p> December 26, 2023</p>
                    </div>
                    <div className="time">
                      <i className="fa-regular fa-clock" />
                      <p>10:30 am</p>
                    </div>
                    <div className="location">
                      <i className="fa-thin fa-location-dot" />
                      <p>Yarra Park, Melbourne</p>
                    </div>
                  </div>
                  <a href="event-details.html">
                    <h5 className="title">Teaching Tomorrow: A Symposium on Modern</h5>
                  </a>
                </div>
              </div>
              <a href="event-details.html" className="rts-btn btn-primary with-arrow">Get Ticket <i className="fa-light fa-arrow-right" /></a>
            </div>
            {/* single */}
          </div>
          {/* single up coming events end */}
        </div>
      </div>
    </div>
  </div>
  {/* up coming events area end */}
  {/* fun facts area start */}
  <div className="fun-facts-area-1 shape-move bg_image ptb--50">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="fun-facts-main-wrapper-1">
            {/* single  */}
            <div className="single-fun-facts">
              <div className="icon">
                <img src="assets/images/fun-facts/01.svg" alt="icon" />
              </div>
              <h5 className="title"><span className="counter">65,972</span></h5>
              <span className="enr">Students Enrolled</span>
            </div>
            {/* single end */}
            {/* single  */}
            <div className="single-fun-facts">
              <div className="icon">
                <img src="assets/images/fun-facts/02.svg" alt="icon" />
              </div>
              <h5 className="title"><span className="counter">5,321</span></h5>
              <span className="enr">Completed Course</span>
            </div>
            {/* single end */}
            {/* single  */}
            <div className="single-fun-facts">
              <div className="icon">
                <img src="assets/images/fun-facts/03.svg" alt="icon" />
              </div>
              <h5 className="title"><span className="counter">44,239</span></h5>
              <span className="enr">Students Learner</span>
            </div>
            {/* single end */}
            {/* single  */}
            <div className="single-fun-facts">
              <div className="icon">
                <img src="assets/images/fun-facts/04.svg" alt="icon" />
              </div>
              <h5 className="title"><span className="counter">75,992</span></h5>
              <span className="enr">Students Enrolled</span>
            </div>
            {/* single end */}
          </div>
        </div>
      </div>
    </div>
    <div className="shape-image">
      <div className="shape one" data-speed="0.04" data-revert="true"><img src="assets/images/banner/15.png" alt /></div>
      <div className="shape three" data-speed="0.04"><img src="assets/images/banner/16.png" alt /></div>
    </div>
  </div>
  {/* fun facts area end */}
  {/* instructor area start */}
  <div className="instrustor-area rts-section-gap">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-between-area align-items-end">
            <div className="title-area-left-style">
              <div className="pre-title">
                <img src="assets/images/banner/bulb.png" alt="icon" />
                <span>Instructor</span>
              </div>
              <h2 className="title">Our Professional Instructor</h2>
              <p className="post-title">You'll find something to spark your curiosity and enhance</p>
            </div>
            <a href="#" className="rts-btn btn-primary with-arrow">View All Teacher <i className="fa-light fa-arrow-right" /></a>
          </div>
        </div>
      </div>
      <div className="row g-5 mt--10">
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          {/* single instrustor */}
          <div className="single-instructor">
            <div className="thumbnail-img">
              <a href="#" className="thumbnail">
                <img src="assets/images/instructor/01.jpg" alt="instructor" />
              </a>
              <div className="social-img-instructor">
                <ul>
                  <li><a href="#"><i className="fa-sharp fa-light fa-share-nodes" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-skype" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-linkedin" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
                </ul>
              </div>
            </div>
            <a href="#">
              <h5 className="title">Emma Elizabeth</h5>
            </a>
            <p>Assistant Teacher</p>
          </div>
          {/* single instrustor end */}
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          {/* single instrustor */}
          <div className="single-instructor">
            <div className="thumbnail-img">
              <a href="#" className="thumbnail">
                <img src="assets/images/instructor/02.jpg" alt="instructor" />
              </a>
              <div className="social-img-instructor">
                <ul>
                  <li><a href="#"><i className="fa-sharp fa-light fa-share-nodes" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-skype" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-linkedin" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
                </ul>
              </div>
            </div>
            <a href="#">
              <h5 className="title">Thomas Fred</h5>
            </a>
            <p>Assistant Teacher</p>
          </div>
          {/* single instrustor end */}
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          {/* single instrustor */}
          <div className="single-instructor">
            <div className="thumbnail-img">
              <a href="#" className="thumbnail">
                <img src="assets/images/instructor/03.jpg" alt="instructor" />
              </a>
              <div className="social-img-instructor">
                <ul>
                  <li><a href="#"><i className="fa-sharp fa-light fa-share-nodes" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-skype" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-linkedin" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
                </ul>
              </div>
            </div>
            <a href="#">
              <h5 className="title">Dana White</h5>
            </a>
            <p>UI/UX Exparet</p>
          </div>
          {/* single instrustor end */}
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-12">
          {/* single instrustor */}
          <div className="single-instructor">
            <div className="thumbnail-img">
              <a href="#" className="thumbnail">
                <img src="assets/images/instructor/04.jpg" alt="instructor" />
              </a>
              <div className="social-img-instructor">
                <ul>
                  <li><a href="#"><i className="fa-sharp fa-light fa-share-nodes" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-skype" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-linkedin" /></a></li>
                  <li className="bottom"><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
                </ul>
              </div>
            </div>
            <a href="#">
              <h5 className="title">Elizabeth Olsen</h5>
            </a>
            <p>Assistant Teacher</p>
          </div>
          {/* single instrustor end */}
        </div>
      </div>
    </div>
  </div>
  {/* instructor area start */}
  {/* feedback area start */}
  <div className="rts-feedback-area rts-section-gap bg-light-1 shape-move">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-area-center-style">
            <div className="pre-title">
              <img src="assets/images/banner/bulb.png" alt="icon" />
              <span>Student Review</span>
            </div>
            <h2 className="title">Our Students Feedback</h2>
            <p className="post-title">You'll find something to spark your curiosity and enhance</p>
          </div>
        </div>
      </div>
      <div className="row mt--50">
        <div className="col-lg-12">
          <div className="students-feedback-wrapper-1 bg_image">
            <div className="swiper mySwiper-testimonials-1">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  {/* single testimonials0area */}
                  <div className="single-students-feedback">
                    <div className="left-image">
                      <img src="assets/images/students-feedback/01.jpg" alt="feedback" />
                    </div>
                    <div className="right-content">
                      <img src="assets/images/students-feedback/01.png" alt="feedback" />
                      <p className="disc">
                        I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary adventure. The combination of exceptional.
                      </p>
                      {/* author area */}
                      <div className="author-area">
                        <ul className="stars">
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-regular fa-star" /></li>
                        </ul>
                        <h5 className="title">Emma Elizabeth</h5>
                        <span>Assistant Teacher</span>
                      </div>
                      {/* author area end */}
                    </div>
                  </div>
                  {/* single testimonials0area end */}
                </div>
                <div className="swiper-slide">
                  {/* single testimonials0area */}
                  <div className="single-students-feedback">
                    <div className="left-image">
                      <img src="assets/images/students-feedback/02.jpg" alt="feedback" />
                    </div>
                    <div className="right-content">
                      <img src="assets/images/students-feedback/01.png" alt="feedback" />
                      <p className="disc">
                        I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary adventure. The combination of exceptional.
                      </p>
                      {/* author area */}
                      <div className="author-area">
                        <ul className="stars">
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-regular fa-star" /></li>
                        </ul>
                        <h5 className="title">Emma Elizabeth</h5>
                        <span>Assistant Teacher</span>
                      </div>
                      {/* author area end */}
                    </div>
                  </div>
                  {/* single testimonials0area end */}
                </div>
                <div className="swiper-slide">
                  {/* single testimonials0area */}
                  <div className="single-students-feedback">
                    <div className="left-image">
                      <img src="assets/images/students-feedback/01.jpg" alt="feedback" />
                    </div>
                    <div className="right-content">
                      <img src="assets/images/students-feedback/01.png" alt="feedback" />
                      <p className="disc">
                        I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary adventure. The combination of exceptional.
                      </p>
                      {/* author area */}
                      <div className="author-area">
                        <ul className="stars">
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-solid fa-star" /></li>
                          <li><i className="fa-sharp fa-regular fa-star" /></li>
                        </ul>
                        <h5 className="title">Emma Elizabeth</h5>
                        <span>Assistant Teacher</span>
                      </div>
                      {/* author area end */}
                    </div>
                  </div>
                  {/* single testimonials0area end */}
                </div>
              </div>
              <div className="swiper-button-next"><i className="fa-solid fa-chevron-right" /></div>
              <div className="swiper-button-prev"><i className="fa-solid fa-chevron-left" /></div>
              <div className="swiper-pagination" />
            </div>
            <div className="shape-image">
              <div className="shape one" data-speed="0.04" data-revert="true"><img src="assets/images/banner/18.png" alt /></div>
              <div className="shape three" data-speed="0.04"><img src="assets/images/banner/17.png" alt /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* feedback area end */}
  {/* rts blog area start */}
  <div className="rts-section-gap rts-blog-area">
    <div className="container pb--130">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-area-center-style">
            <div className="pre-title">
              <img src="assets/images/banner/bulb.png" alt="icon" />
              <span>News &amp; Article</span>
            </div>
            <h2 className="title">Read Our Latest News</h2>
            <p className="post-title"> Our mission is to provide you with valuable insights</p>
          </div>
        </div>
      </div>
      <div className="row g-5 mt--20">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="single-blog-style-one">
            <a href="blog-details.html" className="thumbnail">
              <img src="assets/images/blog/01.jpg" alt="blog" />
              <div className="tags-area">
                <span>Marketing</span>
              </div>
            </a>
            <div className="blog-top-area">
              <div className="single">
                <i className="fa-light fa-calendar-days" />
                <p>October 26, 2023</p>
              </div>
              <div className="single">
                <i className="fa-light fa-user" />
                <p>Jon Adam</p>
              </div>
            </div>
            <a href="blog-details.html">
              <h5 className="title">Announcing the winners the 2023 Education com Story Challenge!</h5>
            </a>
            <div className="button-area">
              <a href="blog-details.html" className="rts-btn btn-primary readmore-btn">Read More <i className="fa-regular fa-arrow-right" /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="single-blog-style-one">
            <a href="blog-details.html" className="thumbnail">
              <img src="assets/images/blog/02.jpg" alt="blog" />
              <div className="tags-area">
                <span>Business</span>
              </div>
            </a>
            <div className="blog-top-area">
              <div className="single">
                <i className="fa-light fa-calendar-days" />
                <p>October 26, 2023</p>
              </div>
              <div className="single">
                <i className="fa-light fa-user" />
                <p>Jon Adam</p>
              </div>
            </div>
            <a href="blog-details.html">
              <h5 className="title">Azure AI Fundamentals: How to Pass the AI-900 Exam</h5>
            </a>
            <div className="button-area">
              <a href="blog-details.html" className="rts-btn btn-primary readmore-btn">Read More <i className="fa-regular fa-arrow-right" /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="single-blog-style-one">
            <a href="blog-details.html" className="thumbnail">
              <img src="assets/images/blog/01.jpg" alt="blog" />
              <div className="tags-area">
                <span>Accounting</span>
              </div>
            </a>
            <div className="blog-top-area">
              <div className="single">
                <i className="fa-light fa-calendar-days" />
                <p>October 26, 2023</p>
              </div>
              <div className="single">
                <i className="fa-light fa-user" />
                <p>Jon Adam</p>
              </div>
            </div>
            <a href="blog-details.html">
              <h5 className="title">How to Become a Business Man to Intelligence Analyst in 6 Simple</h5>
            </a>
            <div className="button-area">
              <a href="blog-details.html" className="rts-btn btn-primary readmore-btn">Read More <i className="fa-regular fa-arrow-right" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* rts blog area end */}
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
          <div className="product-thumb"><img src="assets/images/course/cart/02.jpg" alt="product-thumb" /></div>
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
  {/* footer call to action area start */}
  <div className="footer-callto-action-area bg-light-1">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="call-to-sction bg_image shape-move">
            <h2 className="title">Skills Certificate From <br /> the Studyhub</h2>
            <a href="course-one.html" className="rts-btn btn-primary-white with-arrow">View All Course <i className="fa-regular fa-arrow-right" /></a>
            <div className="cta-image">
              <img src="assets/images/cta/women.png" alt />
            </div>
            <div className="shape-image">
              <div className="shape one" data-speed="0.04"><img src="assets/images/cta/03.svg" alt /></div>
              <div className="shape two" data-speed="0.04"><img src="assets/images/cta/04.svg" alt /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row  ptb--100">
        <div className="col-lg-12">
          {/* footer main wrapper */}
          <div className="footer-one-main-wrapper">
            {/* single sized  footer  */}
            <div className="footer-singl-wized left-logo">
              <div className="head">
                <a href="#">
                  <img src="assets/images/logo/logo-1.svg" alt="logo" loading="lazy" />
                </a>
              </div>
              <div className="body">
                <p className="dsic">
                  We are passionate education dedicated to providing high-quality resources learners
                  all backgrounds.
                </p>
                <ul className="wrapper-list">
                  <li><i className="fa-regular fa-location-dot" />Yarra Park, Melbourne, Australia </li>
                  <li><i className="fa-regular fa-phone" /><a href="tel:+4733378901">+(61) 485-826-710</a></li>
                </ul>
              </div>
            </div>
            {/* single sized  footer end */}
            {/* single sized  footer  */}
            <div className="footer-singl-wized">
              <div className="head">
                <h6 className="title">Quick Links</h6>
              </div>
              <div className="body">
                <ul className="menu">
                  <li><a href="course-two.html">Latest Courses</a></li>
                  <li><a href="about.html">Mission &amp; Vision</a></li>
                  <li><a href="become-instructor.html">Join a Carrer</a></li>
                  <li><a href="zoom-meeting.html">Zoom Meeting</a></li>
                  <li><a href="pricing.html">Pricing Plan</a></li>
                </ul>
              </div>
            </div>
            {/* single sized  footer end */}
            {/* single sized  footer  */}
            <div className="footer-singl-wized">
              <div className="head">
                <h6 className="title">Explore</h6>
              </div>
              <div className="body">
                <ul className="menu">
                  <li><a href="course-one.html">Course One</a></li>
                  <li><a href="course-two.html">Course Two</a></li>
                  <li><a href="create-course.html">Create Course</a></li>
                  <li><a href="lesson-details.html">Lesson Details</a></li>
                  <li><a href="instructor.html">Instructor</a></li>
                </ul>
              </div>
            </div>
            {/* single sized  footer end */}
            {/* single sized  footer  */}
            <div className="footer-singl-wized input-area">
              <div className="head">
                <h6 className="title">Newsletter</h6>
              </div>
              <div className="body">
                <p className="disc">Subscribe Our newsletter get update our new course</p>
                <form action="#">
                  <div className="input-area-fill">
                    <input type="email" placeholder="Enter Your Email" required />
                    <button> Subscribe</button>
                  </div>
                  <div className="d-flex align-items-center">
                    <input type="checkbox" id="exampleCheck1" />
                    <label htmlFor="exampleCheck1">I agree to the terms of use and privacy policy.</label>
                  </div>
                </form>
              </div>
            </div>
            {/* single sized  footer end */}
          </div>
          {/* footer main wrapper end */}
        </div>
      </div>
    </div>
    <div className="copyright-area-one-border">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="copyright-area-one">
              <p>Copyright © 2024 All Rights Reserved by Studyhub</p>
              <div className="social-copyright">
                <ul>
                  <li><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
                  <li><a href="#"><i className="fa-brands fa-instagram" /></a></li>
                  <li><a href="#"><i className="fa-brands fa-linkedin" /></a></li>
                  <li><a href="#"><i className="fa-brands fa-pinterest" /></a></li>
                  <li><a href="#"><i className="fa-brands fa-youtube" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* footer call to action area end */}
  {/* Modal */}
  <div className="modal login-pupup-modal fade" id="exampleModal-login" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Hi, Welcome back!</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <form action="#" className="login-form">
            <input type="text" placeholder="Username of Email Address" required />
            <input type="password" placeholder="Password" required />
            <div className="d-flex mb--20 align-items-center">
              <input type="checkbox" id="examplecheck-modal" />
              <label htmlFor="examplecheck-modal">I agree to the terms of use and privacy policy.</label>
            </div>
            <button type="submit" className="rts-btn btn-primary">Sign In</button>
            <p className="dont-acc mt--20">Dont Have an Account? <a href="registration.html">Sign-up</a> </p>
          </form>
        </div>
      </div>
    </div>
  </div>
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
  </div></div>

  )
}

export default Home