import React, { useEffect, useState } from 'react'
import Header from '../../student/Header'
import Footer from '../../student/Footer'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddSubCourse() {

    const navigate = useNavigate();
    const [ListCourse, setCourse] = useState([]);
    const [errorlist, setError] = useState({});
    const [subCourseInput, setSubCourse] = useState({
        title: '',
        order: '',
        course:'',
    });
    useEffect(() => {
        document.title = "List of SubCourses";

        axios.get(`/api/courses`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setCourse(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);


    const handleInput = (e) => {
        e.persist();
        setSubCourse({ ...subCourseInput, [e.target.name]: e.target.value });

        // Remove error border once user starts typing
        if (errorlist[e.target.name]) {
            setError((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[e.target.name];
                return newErrors;
            });
        }
    };


    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture({ image: file });
            setImageName(file.name); // Store the selected image name
            setImagePreview(URL.createObjectURL(file)); // Preview the selected image
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
            errors.order = "order is required";
            missingFields.push("order");
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
    
        const formData = new FormData();
        formData.append('title', subCourseInput.title);
        formData.append('order', subCourseInput.order);
        formData.append('course', subCourseInput.course);
    
        axios.post(`/api/AddSubCourse`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
        }).then(res => {
            if (res.data.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/login'); // Navigate after success
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
                text: 'Network error. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    };
    



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
                                    <h1 className="title">Create SubCourse</h1>
                                    {/* breadcrumb pagination area */}
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="create-course.html">Create SubCourse</a>
                                    </div>
                                    {/* breadcrumb pagination area end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* bread crumb area end */}
                {/* create course area start */}
                <div className="crea-te-course-area-start ptb--100">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-8">
                                <div className="create-course-area-main-wrapper-inner">
                                    <div className="accordion" id="accordionExample">
                                        {/* single accordion nitem area start */}
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
                                                                <label htmlFor="message-2">About SubCourse</label>
                                                                <textarea
                                                                    id="message-2"
                                                                    name="order"
                                                                    onChange={handleInput}
                                                                    value={subCourseInput.order}
                                                                    placeholder="New Course"
                                                                    style={{ border: errorlist.order ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.order && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.order}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="Course">SubCourse</label>
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
                                        {/* single accordion nitem area end */}
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
                                        <span>Standard size for the SubCourse thumbnail is
                                            700x430.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Video section controls the SubCourse overview video.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>SubCourse Builder is where you create &amp; organize
                                            a SubCourse.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Add Topics in the SubCourse Builder section to create
                                            lessons, quizzes, and assignments.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Prerequisites refers to the fundamental SubCourse
                                            to complete before taking this particular SubCourse.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Information from the Additional Data section
                                            shows up on the SubCourse single page.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* create course area end */}
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

export default AddSubCourse