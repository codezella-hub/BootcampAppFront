import React, { useEffect, useState } from 'react'
import Header from '../student/Header'
import Footer from '../student/Footer'
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LeftSideBarAdmin from './LeftSideBarAdmin';
function ListCategory() {

    const [ListCategory, setCategory] = useState([]);

    useEffect(() => {
        document.title = "List of Categories";

        axios.get(`/api/categories`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setCategory(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    return (
        <div>    {/* banner area start */}
            <Header />
            <div>
                {/* bread crumb area */}
                <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main-wrapper">
                                    <h1 className="title">List Category</h1>
                                    {/* breadcrumb pagination area */}
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="create-course.html">List Category</a>
                                    </div>
                                    {/* breadcrumb pagination area end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* bread crumb area end */}
                {/* course area start */}


                {/* rts dahboard-area-main-wrapper */}
                <div className="dashboard--area-main pt--100">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-3">
                                <LeftSideBarAdmin />
                            </div>
                            <div className="col-lg-9">
                                <div className="certificates-wrapper-dashed">

                                    <h5 className="title mt--30">All Categories</h5>
                                    <div className="all-certificates-main-wrapper-dashed mt--25">
                                        {ListCategory.length > 0 ? (
                                            ListCategory.map(category => (
                                                <div className="single-certificates" key={category._id}>
                                                    <div className="left">
                                                        <img  src={`http://localhost:3000${category.image}`} width={150} height={100} alt={category.title} />
                                                        <h5 className="title">Title : {category.title}</h5>
                                                    </div>
                                                    <div className="right">
                        
                                        <span>{category.createdAt}</span>
                                        <span>{category.updatedAt}</span>
                        
                                                        <a href="#" className="edit-btn">
                                                            <i className="fa-regular fa-pen-to-square" />
                                                        </a>
                                                        <a href="#" className="delete-btn">
                                                            <i className="fa-regular fa-trash" />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Loading categories...</p>
                                        )}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* rts dahboard-area-main-wrapper end */}

                {/* Modal */}
                <div className="modal announcement fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add New Topic</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form action="#" className="modal-form">
                                    <select className="nice-select" name="price">
                                        <option>Select New Topic</option>
                                        <option value="asc">Recently Update Web Design </option>
                                        <option value="desc">Web Design Course</option>
                                        <option value="pop">Update Web Design</option>
                                        <option value="low">Recently Update Web</option>
                                        <option value="high">Course: New Courses</option>
                                    </select>
                                    <div className="single-input mt--20">
                                        <label htmlFor="course">Topic Title</label>
                                        <input id="course" type="text" placeholder="Topic title" />
                                    </div>
                                    <div className="single-input">
                                        <label htmlFor="message">Summary</label>
                                        <textarea id="message" placeholder="Summary..." defaultValue={""} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="rts-btn btn-primary">Publish</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* rts backto top start */}
                <div className="progress-wrap">
                    <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '307.919' }} />
                    </svg>
                </div>
                {/* rts backto top end */}
            </div>


            <Footer />

        </div>
    )
}

export default ListCategory