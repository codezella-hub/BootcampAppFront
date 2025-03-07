import React, { useEffect, useState } from 'react'
import Header from '../../student/Header'
import Footer from '../../student/Footer'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateCourse() {
    const { id } = useParams(); // Get the category ID from the URL
    const [ListCategory, setCategory] = useState([]);
    const navigate = useNavigate();
    const [errorlist, setError] = useState({});
    const [courseInput, setCourse] = useState({
        title: '',
        description: '',
        price: '',
        prerequisites: '',
        objectives: '',
        targetAudience: '',
        language: '',
        courseDuration: '',
        rating: '',
        subtitles: '',
        category: ''
    });
    const [picture, setPicture] = useState(null);
    const [imageName, setImageName] = useState(""); // Store selected image name
    const [imagePreview, setImagePreview] = useState("assets/images/dashboard/05.png"); // Default image
    useEffect(() => {
        document.title = "Update Course";

        axios.get(`/api/categories`)
            .then(res => {
                if (res.status === 200) {
                    setCategory(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });

        axios.get(`/api/course/${id}`)
            .then(res => {
                if (res.status === 200) {
                    const courseData = res.data;
                    setCourse({
                        ...courseData,
                        category: courseData.category._id // Set the category as ObjectId
                    });
                    setImagePreview(`http://localhost:3000${courseData.courseImage}`);
                    setPicture({ image: courseData.courseImage }); // Set the image in the state
                    setImageName(courseData.courseImageName); // Set the image name
                }
            })
            .catch(error => {
                console.error("Error fetching course:", error);
            });
    }, [id]);

    const handleInput = (e) => {
        e.persist();
        const { name, value } = e.target;

        if (name === "category") {
            setCourse({ ...courseInput, category: value });
        } else {
            setCourse({ ...courseInput, [name]: value });
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

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicture({ image: file });
            setImageName(file.name); // Store the selected image name
            setImagePreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    const AddCourseSubmit = (e) => {
        e.preventDefault(); // Prevent form refresh

        let errors = {};
        let missingFields = [];

        // Validate required fields
        const requiredFields = ['title', 'description', 'price', 'prerequisites', 'objectives', 'targetAudience', 'language', 'courseDuration', 'rating', 'subtitles', 'category'];
        requiredFields.forEach(field => {
            if (!courseInput[field]) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                missingFields.push(field.charAt(0).toUpperCase() + field.slice(1));
            }
        });
        if (!picture || !picture.image) {
            errors.image = "Image is required";
            missingFields.push("Image");
        }

        // Validate price, courseDuration, and rating as numbers
        if (courseInput.price && isNaN(courseInput.price)) {
            errors.price = "Price must be a number";
            missingFields.push("Price");
        }
        if (courseInput.courseDuration && isNaN(courseInput.courseDuration)) {
            errors.courseDuration = "Course duration must be a number";
            missingFields.push("Course Duration");
        }
        if (courseInput.rating && isNaN(courseInput.rating)) {
            errors.rating = "Rating must be a number";
            missingFields.push("Rating");
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
        Object.keys(courseInput).forEach(key => {
            formData.append(key, courseInput[key]);
        });
        formData.append('courseImage', picture.image); // Use 'courseImage' as the field name

        axios.put(`/api/UpdateCourse/${id}`, formData, {
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
                    navigate('/ListCourse'); // Navigate after success
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
                                    <h1 className="title">Create Course</h1>
                                    {/* breadcrumb pagination area */}
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="create-course.html">Create Course</a>
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
                                                    Course Info
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <div className="course-information-area">
                                                        <form onSubmit={AddCourseSubmit} className="top-form-create-course">
                                                            <div className="single-input">
                                                                <label htmlFor="name">Course Title</label>
                                                                <input
                                                                    id="name"
                                                                    name="title"
                                                                    onChange={handleInput}
                                                                    value={courseInput.title}
                                                                    type="text"
                                                                    placeholder="New Course"
                                                                    style={{ border: errorlist.title ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.title && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.title}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="message-2">About Course</label>
                                                                <textarea
                                                                    id="message-2"
                                                                    name="description"
                                                                    onChange={handleInput}
                                                                    value={courseInput.description}
                                                                    placeholder="New Course"
                                                                    style={{ border: errorlist.description ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.description && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.description}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="price">Price</label>
                                                                <input
                                                                    id="price"
                                                                    name="price"
                                                                    onChange={handleInput}
                                                                    value={courseInput.price}
                                                                    type="text"
                                                                    placeholder="Price"
                                                                    style={{ border: errorlist.price ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.price && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.price}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="prerequisites">Prerequisites</label>
                                                                <input
                                                                    id="prerequisites"
                                                                    name="prerequisites"
                                                                    onChange={handleInput}
                                                                    value={courseInput.prerequisites}
                                                                    type="text"
                                                                    placeholder="Prerequisites"
                                                                    style={{ border: errorlist.prerequisites ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.prerequisites && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.prerequisites}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="objectives">Objectives</label>
                                                                <input
                                                                    id="objectives"
                                                                    name="objectives"
                                                                    onChange={handleInput}
                                                                    value={courseInput.objectives}
                                                                    type="text"
                                                                    placeholder="Objectives"
                                                                    style={{ border: errorlist.objectives ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.objectives && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.objectives}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="targetAudience">Target Audience</label>
                                                                <input
                                                                    id="targetAudience"
                                                                    name="targetAudience"
                                                                    onChange={handleInput}
                                                                    value={courseInput.targetAudience}
                                                                    type="text"
                                                                    placeholder="Target Audience"
                                                                    style={{ border: errorlist.targetAudience ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.targetAudience && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.targetAudience}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="language">Language</label>
                                                                <input
                                                                    id="language"
                                                                    name="language"
                                                                    onChange={handleInput}
                                                                    value={courseInput.language}
                                                                    type="text"
                                                                    placeholder="Language"
                                                                    style={{ border: errorlist.language ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.language && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.language}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="courseDuration">Course Duration</label>
                                                                <input
                                                                    id="courseDuration"
                                                                    name="courseDuration"
                                                                    onChange={handleInput}
                                                                    value={courseInput.courseDuration}
                                                                    type="text"
                                                                    placeholder="Course Duration"
                                                                    style={{ border: errorlist.courseDuration ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.courseDuration && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.courseDuration}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="rating">Rating</label>
                                                                <input
                                                                    id="rating"
                                                                    name="rating"
                                                                    onChange={handleInput}
                                                                    value={courseInput.rating}
                                                                    type="text"
                                                                    placeholder="Rating"
                                                                    style={{ border: errorlist.rating ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.rating && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.rating}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="subtitles">Subtitles</label>
                                                                <input
                                                                    id="subtitles"
                                                                    name="subtitles"
                                                                    onChange={handleInput}
                                                                    value={courseInput.subtitles}
                                                                    type="text"
                                                                    placeholder="Subtitles"
                                                                    style={{ border: errorlist.subtitles ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.subtitles && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.subtitles}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="Course">Category</label>
                                                                <select
                                                                    id="category"
                                                                    name="category"
                                                                    onChange={handleInput}
                                                                    value={courseInput.category}

                                                                >
                                                                    <option value="">Select a category</option>
                                                                    {ListCategory.map((category) => (
                                                                        <option key={category._id} value={category._id}>
                                                                            {category.title}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                {errorlist.category && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.category}</p>}
                                                            </div>


                                                            <div className="single-input">
                                                                <label htmlFor="image">Category Image</label>
                                                                <input
                                                                    type="file"
                                                                    id="image"
                                                                    name="image"
                                                                    onChange={handleImage}
                                                                    style={{ display: "none" }}
                                                                />
                                                                <div className="course-thumbnail-upload-area">
                                                                    <div className="thumbnail-area">
                                                                        <img src={imagePreview} alt="Selected" style={{ width: "250px", height: "250px", objectFit: "cover", border: errorlist.image ? "2px solid red" : "" }} />
                                                                    </div>
                                                                    <div className="information">
                                                                        <div className="input-file-type-btn">
                                                                            <button type="button" className="rts-btn btn-primary" id="custom-button" onClick={() => document.getElementById("image").click()}>
                                                                                Pick Image
                                                                            </button>
                                                                            {imageName && <p>Selected Image: {imageName}</p>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {errorlist.image && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.image}</p>}
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

                        </div>
                    </div>
                </div>
                {/* create course area end */}

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

export default UpdateCourse