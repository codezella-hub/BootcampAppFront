import React, { useEffect, useState } from 'react';
import Header from '../../student/Header';
import LeftSideBar from '../../student/LeftSideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";

function ListCourse() {
  const navigate = useNavigate();
  const [ListCourses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "List of courses";
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/courses/user/67acb60b2bdf783f2a130f4b`);
      
      if (response.status === 200) {
        // Make sure the response data matches our expected structure
        const coursesData = response.data.courses || response.data;
        setCourses(Array.isArray(coursesData) ? coursesData : []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      Swal.fire('Error!', 'Failed to load courses', 'error');
    } finally {
      setIsLoading(false);
    }
  };

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
              setCourses(prev => prev.filter(course => course._id !== id));
            }
          })
          .catch(error => {
            Swal.fire('Error!', 'Failed to delete course.', 'error');
          });
      }
    });
  };

  return (
    <div>
      <Header />
      {/* dashboard banner area start */}
      <div className="dashboard-banner-area-wrapper">
      <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main-wrapper">
                                    <h1 className="title">List Course</h1>
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="create-course.html">List Course</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

      <div className="dashboard--area-main pt--100">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-3">
              <LeftSideBar />
            </div>

            <div className="col-lg-9">
              <div className="exrolled-course-wrapper-dashed">
                <h5 className="title">My Courses</h5>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                      My Courses
                    </button>
                  </li>
                </ul>

                <div className="tab-content mt--30" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    {isLoading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading courses...</p>
                      </div>
                    ) : ListCourses.length > 0 ? (
                      <div className="row g-5">
                        {ListCourses.map(item => (
                          <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={item._id}>
                            <div className="single-course-style-three enroll-course">
                              <Link to={`/DetailCourseTrainer/${item._id}`} className="thumbnail">
                                <img
                                  src={`http://localhost:3000${item.courseImage}`}
                                  alt={item.title}
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
                                <div className="course-info">
                                  <h5 className="title">{item.title}</h5>
                                  <p className="description">{item.description.substring(0, 50)}...</p>
                                </div>
                                <div className="teacher-stars">
                                  <div className="teacher">
                                    <span>{item.subtitles}</span>
                                  </div>
                                  <ul className="stars">
                                    {[...Array(5)].map((_, i) => (
                                      <li key={i}>
                                        <i className={`fa-sharp fa-solid fa-star ${i < Math.floor(item.rating) ? 'text-warning' : 'text-secondary'}`} />
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="course-meta">
                                  <div className="lesson">
                                    <i className="fa-light fa-calendar-lines-pen" />
                                    <span>{item.category?.title || 'No Category'}</span>
                                  </div>
                                  <div className="duration">
                                    <i className="fa-light fa-clock" />
                                    <span>{item.courseDuration} hours</span>
                                  </div>
                                </div>
                                <div className="course-actions mt-3">
                                  <button 
                                    onClick={() => navigate(`/SubCoursesByCourse/${item._id}`)} 
                                    className="rts-btn btn-border"
                                  >
                                    SubCourses
                                  </button>
                                  <button 
                                    onClick={() => navigate(`/UpdateCourse/${item._id}`)} 
                                    className="rts-btn btn-border"
                                  >
                                    Update
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteCourse(item._id)} 
                                    className="rts-btn btn-border"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <p>No courses found. Create your first course!</p>
                        <Link to="/AddCourse" className="rts-btn btn-primary">
                          Add New Course
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCourse;