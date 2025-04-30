import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'

function ListCourseAdmin() {
  const navigate = useNavigate();
  const [ListCourses, setCourses] = useState([]);

  useEffect(() => {
    document.title = "List of courses";

    axios.get(`/api/courses`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setCourses(res.data);
        }
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  const handleDeleteCourse = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007C00',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/api/deleteCourse/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        Swal.fire('Deleted!', 'Course has been deleted.', 'success');
                        setCourses(ListCourses.filter(course => course._id !== id));
                    }
                })
                .catch(error => {
                    Swal.fire('Error!', 'Failed to delete category.', 'error');
                });
        }
    });
};
  return (




          <div className="col-lg-9 rts-sticky-column-item">
              <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
                  <h5 className="title">Enrolleld Courses</h5>

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
                                                      style={{width: "200px", height: "150px", objectFit: "cover"}}
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
                                                          <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                          <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                          <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                          <li><i className="fa-sharp fa-solid fa-star"/></li>
                                                          <li><i className="fa-sharp fa-regular fa-star"/></li>
                                                      </ul>
                                                  </div>
                                                  <div className="leasson-students">
                                                      <div className="lesson">
                                                          <i className="fa-light fa-calendar-lines-pen"/>
                                                          <span>{item.category.title} </span>
                                                      </div>
                                                  </div>
                                                  <button
                                                      onClick={() => navigate(`/SubCoursesByCourseAdmin/${item._id}`)}
                                                      className="rts-btn btn-border">SubCourses
                                                  </button>
                                                  <button onClick={() => navigate(`/UpdateCourseAdmin/${item._id}`)}
                                                          className="rts-btn btn-border">Update Course
                                                  </button>
                                                  <button onClick={() => handleDeleteCourse(item._id)}
                                                          className="rts-btn btn-border">Delete
                                                      Course
                                                  </button>
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



  )
}

export default ListCourseAdmin