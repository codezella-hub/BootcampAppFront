import React from 'react'

function LeftSideBarAdmin() {
    return (
        <div className="left-sindebar-dashboard">
          <div className="dashboard-left-single-wrapper">
            {/* single item */}
            <a href="student-dashboard.html" className="single-item ">
              <i className="fa-light fa-house" />
              <p>Dashboard</p>
            </a>
            {/* single item end */}
            {/* single item */}
            <a href="student-profile.html" className="single-item ">
              <i className="fa-regular fa-user" />
              <p>My Profile</p>
            </a>
            {/* single item end */}
            {/* single item */}
            <a href="student-enroll-course.html" className="single-item active">
              <i className="fa-light fa-graduation-cap" />
              <p>Enrolled Courses</p>
            </a>
            {/* single item end */}
            {/* single item */}
            <a href="student-wishlist.html" className="single-item ">
              <i className="fa-sharp fa-light fa-bookmark" />
              <p>Wishlist</p>
            </a>
            {/* single item end */}
            {/* single item */}
            <a href="student-reviews.html" className="single-item ">
              <i className="fa-regular fa-star" />
              <p>Reviews</p>
            </a>
            {/* single item end */}
            {/* single item */}
            <a href="student-quiz-attempts.html" className="single-item ">
              <i className="fa-sharp fa-light fa-bullseye-pointer" />
              <p>My Quiz Attempts</p>
            </a>
            {/* single item end */}
            {/* single item */}
            <a href="student-order-history.html" className="single-item ">
              <i className="fa-sharp fa-light fa-bag-shopping" />
              <p>Order History</p>
            </a>
            {/* single item end */}
            {/* single item */}
            <a href="student-question-answer.html" className="single-item ">
              <i className="fa-regular fa-circle-question" />
              <p>Question &amp; Answer</p>
            </a>
            {/* single item end */}
            {/* single item */}
            <a href="student-calender.html" className="single-item ">
              <i className="fa-light fa-calendar-days" />
              <p>Calendar</p>
            </a>
            {/* single item end */}
          </div>
          <div className="dashboard-left-single-wrapper bbnone mt--40">
          
            {/* single item */}
            <a href="student-settings.html" className="single-item ">
              <i className="fa-sharp fa-regular fa-gear" />
              <p>Settings</p>
            </a>
            {/* single item end */}
            {/* single item */}
            <a href="index-2.html" className="single-item">
              <i className="fa-light fa-right-from-bracket" />
              <p>Logout</p>
            </a>
            {/* single item end */}
          </div>
        </div>
        
          )
}

export default LeftSideBarAdmin