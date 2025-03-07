import React, { useEffect, useState } from 'react';
import Header from '../../student/Header';
import Footer from '../../student/Footer';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ListSubCourse() {
  const [ListSubCourse, setSubCourse] = useState([]);

  useEffect(() => {
    document.title = "List of courses";

    axios.get(`/api/SubCourses`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setSubCourse(res.data);
        }
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-main-wrapper">
                  <h1 className="title">List SubCourse</h1>
                  <div className="pagination-wrapper">
                    <a href="index-2.html">Home</a>
                    <i className="fa-regular fa-chevron-right" />
                    <a className="active" href="create-course.html">List SubCourse</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard--area-main pt--100">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-9">
                <div className="announcements-wrapper-dashed">
                  <div className="top-announcement-wrapper">
                    <div className="left-wrapper">
                      <div className="icon">
                        <img src="assets/images/dashboard/announcement/01.png" alt="announcement" />
                      </div>
                      <div className="information">
                        <span>Create SubCourse</span>
                        <p>Notify all students of your SubCourse</p>
                      </div>
                    </div>
                    <div className="right">
                      <Link to={`/AddSubCourse`} type="button" className="rts-btn btn-primary" >Add New SubCourse</Link>
                    </div>
                  </div>

                  <div className="rts-reviewd-area-dashed table-responsive" style={{ whiteSpace: 'nowrap' }}>
                    <table className="table-reviews quiz announcement">
                      <thead>
                        <tr>
                          <th style={{ width: '30%' }}>Info </th>
                          <th>SubCourse</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* single course style two */}
                        {ListSubCourse.length > 0 ? (
                          ListSubCourse.map(item => (
                            <tr>
                              <td>
                                <div className="information-quiz">
                                  <span>Date : {item.createdAt}</span>
                                  <p className="quiz">Order : {item.order}</p>
                                </div>
                              </td>
                              <td className="announcement-1">
                                <div className="left">
                                  <p>{item.title}</p>
                                  <span>Course: {item.course.title}</span>
                                </div>
                                <div className="right">
                                <Link to={`/UpdateSubCourse/${item._id}`}  className="rts-btn btn-primary">Edit</Link>
                                <button className="rts-btn btn-primary">Delete</button>
                                  <button className="rts-btn btn-primary">Watch</button>
                                  <i className="fa-regular fa-ellipsis-vertical" />
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <p>Loading categories...</p>
                        )}

                        {/* single course style two end */}



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
        </div>
      </div>
      <Footer />
    </div>
  );

}

export default ListSubCourse