import React, { useEffect, useState } from 'react';
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../../store/authStore';

function UpdateSubCourse() {
    const { user} = useAuthStore();
    const { id } = useParams(); // Get the subcourse ID from the URL
    const navigate = useNavigate();
    const [ListCourse, setCourse] = useState([]);
    const [errorlist, setError] = useState({});
    const [subCourseInput, setSubCourse] = useState({
        title: '',
        order: '',
        course: '',
        user: user._id // Static user ID
    });

    useEffect(() => {
        document.title = "Update SubCourse";

        // Fetch available courses
        axios.get(`/api/courses`)
            .then(res => {
                if (res.status === 200) {
                    setCourse(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching courses:", error);
            });

        // Fetch existing subcourse data
        axios.get(`/api/SubCourse/${id}`)
            .then(res => {
                if (res.status === 200) {
                    const subCourseData = res.data;
                    setSubCourse({
                        title: subCourseData.title,
                        order: subCourseData.order,
                        course: subCourseData.course?._id || '', // Handle potential undefined course
                        user: subCourseData.user?._id || '660a1b2c3d4e5f6a7b8c9d0e2'
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching subcourse:", error);
            });
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;

        setSubCourse(prev => ({
            ...prev,
            [name]: name === 'order' ? parseInt(value) || 0 : value
        }));

        // Clear error for this field if it exists
        if (errorlist[name]) {
            setError(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const UpdateSubCourseSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        const errors = {};
        if (!subCourseInput.title) errors.title = "Title is required";
        if (!subCourseInput.order) errors.order = "Order is required";
        else if (isNaN(subCourseInput.order)) errors.order = "Order must be a number";
        if (!subCourseInput.course) errors.course = "Course is required";

        if (Object.keys(errors).length > 0) {
            setError(errors);
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all required fields correctly',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        const formData = {
            title: subCourseInput.title,
            order: subCourseInput.order,
            course: subCourseInput.course,
            user: subCourseInput.user
        };

        axios.put(`/api/updateSubCourse/${id}`, formData)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'SubCourse updated successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        // Navigate to the course's subcourses page using the course ID
                        navigate(`/dashboard/SubCoursesByCourse/${subCourseInput.course}`);
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.response?.data?.message || 'Update failed. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };
    return (
        <div>
           
            <div>
   
                <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main-wrapper">
                                    <h1 className="title">Update SubCourse</h1>
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="create-course.html">Update SubCourse</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="crea-te-course-area-start ptb--100">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-8">
                                <div className="create-course-area-main-wrapper-inner">
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    SubCourse Info
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <div className="course-information-area">
                                                        <form onSubmit={UpdateSubCourseSubmit} className="top-form-create-course">
                                                            <div className="single-input">
                                                                <label htmlFor="name">SubCourse Title</label>
                                                                <input
                                                                    id="name"
                                                                    name="title"
                                                                    onChange={handleInput}
                                                                    value={subCourseInput.title}
                                                                    type="text"
                                                                    placeholder="New SubCourse"
                                                                    style={{ border: errorlist.title ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.title && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.title}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="order">Order</label>
                                                                <input
                                                                    id="order"
                                                                    name="order"
                                                                    onChange={handleInput}
                                                                    value={subCourseInput.order}
                                                                    type="number"
                                                                    placeholder="Order"
                                                                    style={{ border: errorlist.order ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.order && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.order}</p>}
                                                            </div>

                                                            <div className="single-input">
                <label htmlFor="course">Course</label>
                <select
                    id="course"
                    name="course"
                    onChange={handleInput}
                    value={subCourseInput.course}
                    className={errorlist.course ? 'error-border' : ''}
                >
                    <option value="">Select a course</option>
                    {ListCourse.map((course) => (
                        <option key={course._id} value={course._id}>
                            {course.title}
                        </option>
                    ))}
                </select>
                {errorlist.course && <p className="error-text">{errorlist.course}</p>}
            </div>

                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="preview-course-button-area">
                                                                        <button type="submit" className="rts-btn btn-border">Submit <i className="fa-light fa-arrow-right" /></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 rts-sticky-column-item">
                                <div className="course-upload-tips-wrapper theiaStickySidebar">
                                    <h5 className="title">Course Upload Tips</h5>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Set the SubCourse Price option or make it free.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Standard size for the SubCourse thumbnail is 700x430.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Video section controls the SubCourse overview video.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>SubCourse Builder is where you create &amp; organize a SubCourse.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Add Topics in the SubCourse Builder section to create lessons, quizzes, and assignments.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Prerequisites refers to the fundamental SubCourse to complete before taking this particular SubCourse.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Information from the Additional Data section shows up on the SubCourse single page.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="progress-wrap">
                    <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '307.919' }} />
                    </svg>
                </div>
            </div>
            
        </div>
    );
}

export default UpdateSubCourse;