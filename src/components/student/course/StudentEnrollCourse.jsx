import React, { useEffect, useState } from 'react'
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'
import LeftSideBar from '../LeftSideBar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

function StudentEnrollCourse() {
  const { user } = useAuthStore();
  const [ListCourses, setCourses] = useState([]);
  const userId = user._id;

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
    <div className="col-lg-9">
      <div className="exrolled-course-wrapper-dashed">
        <h5 className="title">Enrolled Courses</h5>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Enrolled Courses</button>
          </li>
        </ul>
        <div className="tab-content mt--30" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className="row g-5">
              {ListCourses.length > 0 ? (
                ListCourses.map((course) => (
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={course._id}>
                    <div className="single-course-style-three enroll-course">
                      <Link to={`/DetailCourse/${course._id}`} className="thumbnail">
                        <img
                          src={`http://localhost:3000${course.courseImage}`}
                          alt={course.title}
                          style={{ width: "200px", height: "150px", objectFit: "cover" }}
                        />
                        <div className="tag-thumb">
                          <span>{course.title}</span>
                        </div>
                      </Link>
                      <div className="body-area">
                        <div className="course-top">
                          <div className="tags">Best Seller</div>
                          <div className="price">${course.price}</div>
                        </div>
                        <a href="single-course.html">
                          <h5 className="title">{course.prerequisites}</h5>
                        </a>
                        <div className="teacher-stars">
                          <div className="teacher"><span>{course.subtitles}</span></div>
                          <ul className="stars">
                            <li className="span">{course.rating}</li>
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
                            <span>{course.courseDuration} Lessons</span>
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
                <p>No Course Enrolled...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentEnrollCourse