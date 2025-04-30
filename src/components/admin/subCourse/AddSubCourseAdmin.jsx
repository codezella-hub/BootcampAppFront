import React, { useEffect, useState } from 'react';
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../../store/authStore';

function AddSubCourseAdmin() {
    const navigate = useNavigate();
    const [ListCourse, setCourse] = useState([]);
    const [errorlist, setError] = useState({});
    const { user} = useAuthStore();
    const [subCourseInput, setSubCourse] = useState({
        title: '',
        order: '',
        course: '',
        user: user._id // Static user ID added here
    });

    useEffect(() => {
        document.title = "Add New SubCourse";

        axios.get(`/api/courses`)
            .then(res => {
                if (res.status === 200) {
                    setCourse(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching courses:", error);
            });
    }, []);

    const handleInput = (e) => {
        e.persist();
        const { name, value } = e.target;

        if (name === 'order') {
            setSubCourse({ ...subCourseInput, [name]: parseInt(value) });
        } else {
            setSubCourse({ ...subCourseInput, [name]: value });
        }

        // Remove error border once user starts typing
        if (errorlist[name]) {
            setError((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const AddSubCourseSubmit = (e) => {
        e.preventDefault(); // Prevent form refresh

        let errors = {};
        let missingFields = [];

        if (!subCourseInput.title) {
            errors.title = "Title is required";
            missingFields.push("Title");
        }
        if (!subCourseInput.order) {
            errors.order = "Order is required";
            missingFields.push("Order");
        } else if (isNaN(subCourseInput.order)) {
            errors.order = "Order must be a number";
            missingFields.push("Order");
        }
        if (!subCourseInput.course) {
            errors.course = "Course is required";
            missingFields.push("Course");
        }

        if (Object.keys(errors).length > 0) {
            setError(errors); // Store the errors in state

            Swal.fire({
                title: 'Error!',
                text: `Please fill in the following fields: ${missingFields.join(", ")}`,
                icon: 'error',
                confirmButtonText: 'OK',
            });

            return; // Stop the function if there are errors
        }

        const formData = {
            title: subCourseInput.title,
            order: subCourseInput.order,
            course: subCourseInput.course,
            user: subCourseInput.user // Include the user ID in the form data
        };

        axios.post(`/api/addSubCourse`, formData, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }).then(res => {
            if (res.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'SubCourse created successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/ListSubCourseAdmin'); // Changed to navigate to subcourse list
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        }).catch(err => {
            Swal.fire({
                title: 'Error!',
                text: err.response?.data?.message || 'Network error. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    };

    return (
        <div>
            <Header />
            <div>
                <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main-wrapper">
                                    <h1 className="title">Create SubCourse</h1>
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="create-course.html">Create SubCourse</a>
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
                                                        <form onSubmit={AddSubCourseSubmit} className="top-form-create-course">
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
                                                                >
                                                                    <option value="">Select a course</option>
                                                                    {ListCourse.map((course) => (
                                                                        <option key={course._id} value={course._id}>
                                                                            {course.title}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                {errorlist.course && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.course}</p>}
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
            <Footer />
        </div>
    );
}

export default AddSubCourseAdmin;