import React, { useState, useEffect } from 'react';
import Header from '../../student/Header';
import Footer from '../../student/Footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddVideo() {
    const [ListSubCourse, setSubCourse] = useState([]);
    const navigate = useNavigate();
    const [errorlist, setError] = useState({});
    const [videoInput, setVideoInput] = useState({
        order: '',
        subCourse: '',
    });
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoName, setVideoName] = useState(""); // Store selected video name
    const [thumbnailName, setThumbnailName] = useState(""); // Store selected thumbnail name
    const [videoPreview, setVideoPreview] = useState(null); // Store video preview URL
    const [thumbnailPreview, setThumbnailPreview] = useState(null); // Store thumbnail preview URL

    useEffect(() => {
        document.title = "List of SubCourses";

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

    const handleVideo = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
            setVideoName(file.name); // Store the selected video name
            setVideoPreview(URL.createObjectURL(file)); // Create a preview URL for the video
        }
    };

    const handleThumbnail = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file);
            setThumbnailName(file.name); // Store the selected thumbnail name
            setThumbnailPreview(URL.createObjectURL(file)); // Create a preview URL for the thumbnail
        }
    };

    const AddVideoSubmit = (e) => {
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
        if (!videoFile) {
            errors.video = "Video is required";
            missingFields.push("Video");
        } else if (videoFile.type !== 'video/mp4') {
            errors.video = "Only MP4 videos are allowed";
            missingFields.push("Video");
        }
        if (!thumbnailFile) {
            errors.thumbnail = "Thumbnail is required";
            missingFields.push("Thumbnail");
        } else {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(thumbnailFile.type)) {
                errors.thumbnail = "Only JPG, PNG, and GIF images are allowed";
                missingFields.push("Thumbnail");
            }
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
        formData.append('order', videoInput.order);
        formData.append('subCourse', videoInput.subCourse);
        formData.append('video', videoFile); // Use 'video' as the field name
        formData.append('thumbnail', thumbnailFile); // Use 'thumbnail' as the field name
        formData.append('user', '67acb60b2bdf783f2a130f4b'); // Add static user ID

        axios.post(`/api/addVideo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
        }).then(res => {
            if (res.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Video added successfully!',
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
                                    <h1 className="title">Add Video</h1>
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="add-video.html">Add Video</a>
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
                                                        <form onSubmit={AddVideoSubmit} className="top-form-create-course">
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

                                                            <div className="single-input">
                                                                <label htmlFor="video">Video File</label>
                                                                <input
                                                                    type="file"
                                                                    id="video"
                                                                    name="video"
                                                                    onChange={handleVideo}
                                                                    style={{ display: "none" }}
                                                                />
                                                                <div className="course-thumbnail-upload-area">
                                                                    <div className="thumbnail-area">
                                                                        {videoPreview ? (
                                                                            <video width="250" height="250" controls>
                                                                                <source src={videoPreview} type="video/mp4" />
                                                                                Your browser does not support the video tag.
                                                                            </video>
                                                                        ) : (
                                                                            <img src="assets/images/dashboard/05.png" alt="Default" style={{ width: "250px", height: "250px", objectFit: "cover" }} />
                                                                        )}
                                                                    </div>
                                                                    <div className="information">
                                                                        <div className="input-file-type-btn">
                                                                            <button type="button" className="rts-btn btn-primary" id="custom-button" onClick={() => document.getElementById("video").click()}>
                                                                                Pick Video
                                                                            </button>
                                                                            {videoName && <p>Selected Video: {videoName}</p>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {errorlist.video && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.video}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="thumbnail">Thumbnail Image</label>
                                                                <input
                                                                    type="file"
                                                                    id="thumbnail"
                                                                    name="thumbnail"
                                                                    onChange={handleThumbnail}
                                                                    style={{ display: "none" }}
                                                                />
                                                                <div className="course-thumbnail-upload-area">
                                                                    <div className="thumbnail-area">
                                                                        {thumbnailPreview ? (
                                                                            <img src={thumbnailPreview} alt="Selected" style={{ width: "250px", height: "250px", objectFit: "cover" }} />
                                                                        ) : (
                                                                            <img src="assets/images/dashboard/05.png" alt="Default" style={{ width: "250px", height: "250px", objectFit: "cover" }} />
                                                                        )}
                                                                    </div>
                                                                    <div className="information">
                                                                        <div className="input-file-type-btn">
                                                                            <button type="button" className="rts-btn btn-primary" id="custom-button" onClick={() => document.getElementById("thumbnail").click()}>
                                                                                Pick Thumbnail
                                                                            </button>
                                                                            {thumbnailName && <p>Selected Thumbnail: {thumbnailName}</p>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {errorlist.thumbnail && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.thumbnail}</p>}
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

export default AddVideo;