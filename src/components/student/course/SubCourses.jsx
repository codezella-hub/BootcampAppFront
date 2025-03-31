import React, { useEffect, useState } from 'react'
import Header from '../Header'
import LeftSideBar from '../LeftSideBar'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function SubCourses() {
    const { id } = useParams(); // Get the category ID from the URL
    const [ListSubCourses, setSubCourses] = useState([]);
    console.log(id);

    useEffect(() => {
        document.title = "List of SubCourses";
    
        axios.get(`/api/subcourses/course/${id}`)
          .then(res => {
            if (res.status === 200) {
              //console.log(res.data);
              setSubCourses(res.data);
              //setSubCourses(res.data);

            }
          })
          .catch(error => {
            console.error("Error fetching courses:", error);
          });
      }, []);
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
                                <div className="rts-reviewd-area-dashed table-responsive" style={{ whiteSpace: 'nowrap' }}>
                                    <h5 className="title">SubCourses &amp; Answer</h5>
                                    <div className="short-by--category-sash">
                                        <span>Sort By:</span>
                                        <select className="nice-select" name="price">
                                            <option>Read (12)</option>
                                            <option value="asc">Stars (30)</option>
                                            <option value="desc">Comments(42)</option>
                                            <option value="pop">Popularity (20)</option>
                                            <option value="low">Questions &amp; Ans (10)</option>
                                            <option value="high">Stars (52)</option>
                                        </select>
                                    </div>
                                    <table className="table-reviews quiz">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '35%' }}>Time</th>
                                                <th style={{ width: '15%' }}>Name</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="questions-answer">
                                        {ListSubCourses.length > 0 ? (
                                            ListSubCourses.map(subCourse => (
                                                <tr>
                                                <td>
                                                    <div className="students-questions">
                                                        <div className="information-q">
                                                            <p>10 seconds</p>
                                                       
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="questions" style={{ display: 'block' }}>{subCourse.title}</span>
                                                    <span>{subCourse.course.title}</span>
                                                </td>
                                                <td>
                                                    <span className="marks">0</span>
                                                </td>
                                                <td>
                                                    <div className="status-btn-wrapper">
                                                        <i className="fa-light fa-circle-check" />
                                                        <div className="button-area">
                                                            <button onClick={() => navigate(`/SubCourses/Video`)}className="rts-btn btn-primary">Watch</button>
                                                            <i className="fa-regular fa-ellipsis-vertical" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            ))
                                        ) : (
                                            <p>Loading categories...</p>
                                        )}

                                       
                                
                                        </tbody>
                                    </table>
                                    <div className="pagination-full-width">
                                        <span>Page 1 of 4</span>
                                        <div className="pagination">
                                            <ul>
                                                <li><a href="#0" className="prev"><i className="fa-solid fa-chevron-left" /></a></li>
                                                <li><a href="#0">1</a></li>
                                                <li><a href="#0">2</a></li>
                                                <li><a href="#0">3</a></li>
                                                <li><a href="#0">4</a></li>
                                                <li><a href="#0" className="next"><i className="fa-solid fa-chevron-right" /></a></li>
                                            </ul>
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
