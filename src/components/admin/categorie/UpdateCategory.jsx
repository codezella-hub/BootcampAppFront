import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../student/Header'
import Footer from '../../student/Footer'
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import LeftSideBarAdmin from '../LeftSideBarAdmin';

function UpdateCategory() {
    const { id } = useParams(); // Get the category ID from the URL
    const navigate = useNavigate();
    const [errorlist, setError] = useState({});
    const [categoryInput, setCategory] = useState({
        title: '',
        description: '',
    });
    const [picture, setPicture] = useState(null);
    const [imageName, setImageName] = useState(""); // Store selected image name
    const [imagePreview, setImagePreview] = useState("assets/images/dashboard/05.png"); // Default image
    useEffect(() => {
        axios.get(`/api/category/${id}`)
            .then(res => {
                if (res.status === 201) {
                    setCategory(res.data.category);
                    setImagePreview(`http://localhost:3000${res.data.category.image}`);
                    //setImageName(res.data.category.image); // Store existing image name
                }
            })
            .catch(error => {
                console.error("Error fetching category:", error);
            });
    }, [id]);
    



    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });

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


    const UpdateCategorySubmit = (e) => {
        e.preventDefault(); // Prevent form refresh
    
        let errors = {};
        let missingFields = [];
    
        if (!categoryInput.title) {
            errors.title = "Title is required";
            missingFields.push("Title");
        }
        if (!categoryInput.description) {
            errors.description = "Description is required";
            missingFields.push("Description");
        }
        if (!picture && !categoryInput.image) { 
            errors.image = "Image is required";
            missingFields.push("Image");
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
        formData.append('title', categoryInput.title);
        formData.append('description', categoryInput.description);
        if (picture) { 
            formData.append('image', picture.image); 
        }
    
        axios.put(`/api/updateCategory/${id}`, formData, {
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
                    //navigate('/login'); // Navigate after success
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
                                    <h1 className="title">Create Category</h1>
                                    {/* breadcrumb pagination area */}
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="create-course.html">Create Category</a>
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
                                                    Category Info
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <div className="course-information-area">
                                                        <form onSubmit={UpdateCategorySubmit} className="top-form-create-course">
                                                            <div className="single-input">
                                                                <label htmlFor="name">Category Title</label>
                                                                <input
                                                                    id="name"
                                                                    name="title"
                                                                    onChange={handleInput}
                                                                    value={categoryInput.title}
                                                                    type="text"
                                                                    placeholder="New Category"
                                                                    style={{ border: errorlist.title ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.title && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.title}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="message-2">About Category</label>
                                                                <textarea
                                                                    id="message-2"
                                                                    name="description"
                                                                    onChange={handleInput}
                                                                    value={categoryInput.description}
                                                                    placeholder="New Course"
                                                                    style={{ border: errorlist.description ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.description && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.description}</p>}
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
                            <div className="col-lg-4 rts-sticky-column-item">
                                <div className="course-upload-tips-wrapper theiaStickySidebar">
                                    <h5 className="title">Course Upload Tips</h5>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Set the Category Price option or make it free.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Standard size for the Category thumbnail is
                                            700x430.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Video section controls the Category overview video.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Category Builder is where you create &amp; organize
                                            a Category.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Add Topics in the Category Builder section to create
                                            lessons, quizzes, and assignments.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Prerequisites refers to the fundamental Category
                                            to complete before taking this particular Category.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Information from the Additional Data section
                                            shows up on the Category single page.</span>
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

export default UpdateCategory;
