import React, { useEffect, useState } from 'react'
import Header from '../Header'
import LeftSideBar from '../LeftSideBar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

function StudentEnrollCourse() {
      const { user} = useAuthStore();
  const [ListCourses, setCourses] = useState([]);
  //const userId = localStorage.getItem("userId");
   const userId = user._id; // Replace with the actual user ID you want to use
   console.log(userId);

  useEffect(() => {
    document.title = "List of Enrolled Courses";

    axios
      .get(`/api/paypal/purchased-courses/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching purchased courses:", error);
      });
  }, [userId]);
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
                <LeftSideBar />
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
                        {/* single course style two */}
                        {ListCourses.length > 0 ? (
                          ListCourses.map(item => (
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                              <div className="single-course-style-three enroll-course">
                                <Link to={`/DetailCourse/${item._id}`} className="thumbnail">
                                  <img
                                    src={`http://localhost:3000${item.courseImage}`}
                                    alt={item.courseImage}
                                    style={{ width: "200px", height: "150px", objectFit: "cover" }}
                                  />


                                  <div className="tag-thumb">
                                    <span>{item.title}</span>
                                  </div>
                                  </Link>
                                <div className="body-area">
                                  <div className="course-top">
                                    <div className="tags">Best Seller</div>
                                    <div className="price">${item.price}</div>
                                  </div>
                                  <a href="single-course.html">
                                    <h5 className="title">{item.prerequisites}</h5>
                                  </a>
                                  <div className="teacher-stars">
                                    <div className="teacher"><span>{item.subtitles}</span></div>
                                    <ul className="stars">
                                      <li className="span">{item.rating}</li>
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
                                      <span>{item.courseDuration} Lessons</span>
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
                                      <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{ width: '50%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                      </div>
                                    </div>
                                  </div>
                                  <button className="rts-btn btn-border">Download Certificate</button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>Loading categories...</p>
                        )}

                        {/* single course style two end */}



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




















    </div>

  )
}

export default StudentEnrollCourse