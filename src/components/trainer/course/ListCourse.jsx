import React, { useEffect, useState } from 'react';
import Header from '../../commun/Header.jsx';
import Footer from '../../commun/FooterPrinciple.jsx';
import LeftSideBar from '../../student/LeftSideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../../../store/authStore';

function ListCourse() {
  const navigate = useNavigate();
  const [ListCourses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const { user } = useAuthStore();
  const userId = user._id;

  useEffect(() => {
    document.title = "List of courses";
    fetchCourses();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchTerm, selectedCategoryId, ListCourses]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/courses/user/${userId}`);

      if (response.status === 200) {
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      if (response.status === 200) {
        setCategories(response.data.categories || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filterCourses = () => {
    let filtered = [...ListCourses];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategoryId) {
      filtered = filtered.filter(course =>
        course.category && course.category._id === selectedCategoryId
      );
    }

    setFilteredCourses(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategoryId('');
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
    <div className="col-lg-9">
              <div className="exrolled-course-wrapper-dashed">
              
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                      List Courses
                    </button>
                  </li>
                </ul>

                <div className="tab-content mt--30" id="myTabContent">
                {(user.role === 'admin' || user.role === 'professor') ? (
  <div className="mt--30">
    <div className="d-flex align-items-center justify-content-between mb-3">
      <h5 className="title mb-0">All Courses</h5>
      <div>
        <Link to={`/AddCourse`} type="button" className="rts-btn btn-primary">
        Add New Course
        </Link>
      </div>
    </div>

  </div>
) : null}

                  <br /><br />
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    {isLoading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading courses...</p>
                      </div>
                    ) : filteredCourses.length > 0 ? (
                      <div className="row g-5">
                        {filteredCourses.map(item => (
                          <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={item._id}>
                            <div className="single-course-style-three enroll-course">
                              <Link to={`/DetailCourse/${item._id}`} className="thumbnail">
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
                                {(user.role === 'admin' || user.role === 'professor') ? (
                                  <div className="course-actions mt-3">
                                    <button
                                      onClick={() => navigate(`/dashboard/SubCoursesByCourse/${item._id}`)}
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
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <p>No courses found matching your criteria.</p>

                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
  );
}

export default ListCourse;