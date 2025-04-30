import React, { useState, useEffect } from 'react';
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateVideo() {
    const { id } = useParams(); // Get the video ID from the URL
    const [ListSubCourse, setSubCourse] = useState([]);
    const navigate = useNavigate();
    const [errorlist, setError] = useState({});
    const [videoInput, setVideoInput] = useState({
        order: '',
        subCourse: '',
    });

    useEffect(() => {
        document.title = "Update Video";

        axios.get(`/api/subCourses`)
            .then(res => {
                if (res.status === 200) {
                    setSubCourse(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching subcourses:", error);
            });
    }, []);

    useEffect(() => {
        axios.get(`/api/getVideo/${id}`)
            .then(res => {
                if (res.status === 200) {
                    const videoData = res.data;
                    setVideoInput({
                        order: videoData.order,
                        subCourse: videoData.subCourse._id,
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching video:", error);
            });
    }, [id]);

    const handleInput = (e) => {
        e.persist();
        setVideoInput({ ...videoInput, [e.target.name]: e.target.value });

        // Remove error border once user starts typing
        if (errorlist[e.target.name]) {
            setError((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[e.target.name];
                return newErrors;
            });
        }
    };

    const updateVideoSubmit = (e) => {
        e.preventDefault(); // Prevent form refresh

        let errors = {};
        let missingFields = [];

        // Validate required fields
        const requiredFields = ['order', 'subCourse'];
        requiredFields.forEach(field => {
            if (!videoInput[field]) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                missingFields.push(field.charAt(0).toUpperCase() + field.slice(1));
            }
        });

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
            order: videoInput.order,
            subCourse: videoInput.subCourse
        };

        axios.put(`/api/updateVideo/${id}`, formData, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }).then(res => {
            if (res.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Video updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/ListVideo'); // Navigate after success
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
        <div>
            <Header />
            <div>
                <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main-wrapper">
                                    <h1 className="title">Update Video</h1>
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="update-video.html">Update Video</a>
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
                                                    Video Info
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <div className="course-information-area">
                                                        <form onSubmit={updateVideoSubmit} className="top-form-create-course">
                                                            <div className="single-input">
                                                                <label htmlFor="order">Order</label>
                                                                <input
                                                                    id="order"
                                                                    name="order"
                                                                    onChange={handleInput}
                                                                    value={videoInput.order}
                                                                    type="number"
                                                                    placeholder="Order"
                                                                    style={{ border: errorlist.order ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.order && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.order}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="subCourse">SubCourse</label>
                                                                <select
                                                                    id="subCourse"
                                                                    name="subCourse"
                                                                    onChange={handleInput}
                                                                    value={videoInput.subCourse}
                                                                >
                                                                    <option value="">Select a subcourse</option>
                                                                    {ListSubCourse.map((subCourse) => (
                                                                        <option key={subCourse._id} value={subCourse._id}>
                                                                            {subCourse.title}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                {errorlist.subCourse && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.subCourse}</p>}
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
                                    <h5 className="title">Video Upload Tips</h5>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Ensure the video file is in a supported format.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Standard size for the thumbnail is 700x430.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Provide a clear and concise title for the video.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Ensure the video is relevant to the subcourse.</span>
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

export default UpdateVideo;