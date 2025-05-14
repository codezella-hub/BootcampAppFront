import React, { useEffect, useState } from 'react';
import Header from '../../commun/Header.jsx';
import Footer from '../../commun/FooterPrinciple.jsx';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../../store/authStore';

function AddCourse() {
    const { user } = useAuthStore();
    const [ListCategory, setCategory] = useState([]);
    const navigate = useNavigate();
    const [errorlist, setError] = useState({});
    const [courseInput, setRegister] = useState({
        title: '',
        description: '',
        price: '',
        prerequisites: '',
        objectives: '',
        targetAudience: '',
        language: 'English',
        courseDuration: '',
        rating: '4.5',
        subtitles: 'Yes',
        category: '',
        user: user._id,
    });
    const [picture, setPicture] = useState(null);
    const [imageName, setImageName] = useState("");
    const [imagePreview, setImagePreview] = useState("assets/images/dashboard/05.png");
    
    // AI Form Filling State
    const [showAIModal, setShowAIModal] = useState(false);
    const [aiDescription, setAIDescription] = useState('');
    const [isAILoading, setIsAILoading] = useState(false);

    useEffect(() => {
        document.title = "Add New Course";

        axios.get(`/api/categories`)
            .then(res => {
                if (res.status === 200) {
                    setCategory(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...courseInput, [e.target.name]: e.target.value });

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
            setImageName(file.name);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const AddCourseSubmit = (e) => {
        e.preventDefault();

        let errors = {};
        let missingFields = [];

        const requiredFields = ['title', 'description', 'price', 'prerequisites', 'objectives', 
                              'targetAudience', 'language', 'courseDuration', 'rating', 'subtitles', 'category'];
        requiredFields.forEach(field => {
            if (!courseInput[field]) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                missingFields.push(field.charAt(0).toUpperCase() + field.slice(1));
            }
        });
        
        if (!picture) {
            errors.image = "Image is required";
            missingFields.push("Image");
        }

        if (courseInput.price && isNaN(courseInput.price)) {
            errors.price = "Price must be a number";
        }
        if (courseInput.courseDuration && isNaN(courseInput.courseDuration)) {
            errors.courseDuration = "Course duration must be a number";
        }
        if (courseInput.rating && isNaN(courseInput.rating)) {
            errors.rating = "Rating must be a number";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            Swal.fire({
                title: 'Error!',
                text: `Please fill in the following fields: ${missingFields.join(", ")}`,
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        const formData = new FormData();
        Object.keys(courseInput).forEach(key => {
            formData.append(key, courseInput[key]);
        });
        formData.append('courseImage', picture?.image);

        axios.post(`/api/addCourse`, formData, {
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
                    navigate('/dashboard/ListCourse');
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

    // AI Form Filling Functions
    const handleAIDescriptionSubmit = async () => {
        if (!aiDescription.trim()) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a description of your course',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        setIsAILoading(true);
        
        try {
            // Simulate AI API call - replace with actual API call in production
            const generatedData = await simulateAIResponse(aiDescription);
            
            setRegister({
                ...courseInput,
                title: generatedData.title,
                description: generatedData.description || aiDescription,
                price: generatedData.price,
                prerequisites: generatedData.prerequisites,
                objectives: generatedData.objectives,
                targetAudience: generatedData.targetAudience,
                language: generatedData.language || 'English',
                courseDuration: generatedData.courseDuration,
                rating: generatedData.rating || '4.5',
                subtitles: generatedData.subtitles || 'Yes',
            });

            setShowAIModal(false);
            setAIDescription('');
            
            Swal.fire({
                title: 'Success!',
                text: 'Form fields have been filled automatically. Please review and adjust as needed.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error('Error generating course details:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to generate course details. Please try again or fill the form manually.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setIsAILoading(false);
        }
    };

    // Mock AI function for frontend demonstration
// Update the simulateAIResponse mock response
const simulateAIResponse = (description) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        title: extractCourseTitle(description) || "New Course",
        description: generateDescription(description), // Use generated description
        price: extractPrice(description) || "49.99",
        prerequisites: extractPrerequisites(description) || "Basic computer skills",
        objectives: extractObjectives(description) || "Learn the fundamentals",
        targetAudience: extractAudience(description) || "Beginners",
        language: "English",
        courseDuration: extractDuration(description) || 10, // Return number instead of string
        rating: "4.5",
        subtitles: "Yes"
      };
      resolve(mockResponse);
    }, 1500);
  });
};

// Add description generation logic
const generateDescription = (desc) => {
  if (desc.includes('Python')) return "Comprehensive Python programming course covering core concepts...";
  if (desc.includes('JavaScript')) return "Complete guide to modern JavaScript development...";
  return "Professional course offering in-depth knowledge and practical skills...";
};

    // Helper functions for mock AI
    const extractCourseTitle = (desc) => {
        const matches = desc.match(/(?:create|make|build)\s+a(n)?\s+(.*?)\s+(?:course|class)/i);
        return matches ? matches[2] : null;
    };

const extractPrice = (desc) => {
    const matches = desc.match(/\$(\d+(\.\d{1,2})?)/) || desc.match(/(\d+)\s*(dollars|USD)/i);
    return matches ? matches[1] : null;
};

const extractPrerequisites = (desc) => {
    if (desc.includes('beginner') || desc.includes('no experience')) return "None";
    return "Basic knowledge of subject";
};

const extractObjectives = (desc) => {
    if (desc.includes('fundamentals')) return "Learn the fundamentals, build basic projects";
    if (desc.includes('advanced')) return "Master advanced concepts, complete complex projects";
    return "Understand key concepts, apply knowledge in practical scenarios";
};

const extractAudience = (desc) => {
    if (desc.includes('beginner')) return "Absolute beginners";
    if (desc.includes('intermediate')) return "Intermediate learners";
    if (desc.includes('advanced')) return "Advanced professionals";
    return "Anyone interested in learning";
};

// Update duration extraction to get numbers only
const extractDuration = (desc) => {
  const matches = desc.match(/(\d+)\s*(hour|hr|week|day|month)s?/i);
  return matches ? parseInt(matches[1]) : null;
};


    return (
        <div>
            <Header />
            <div>
                {/* Breadcrumb area */}
                <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-main-wrapper">
                                    <h1 className="title">Create Course</h1>
                                    <div className="pagination-wrapper">
                                        <a href="index-2.html">Home</a>
                                        <i className="fa-regular fa-chevron-right" />
                                        <a className="active" href="create-course.html">Create Course</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Modal */}
                {showAIModal && (
                    <div className="modal-backdrop show"></div>
                )}
                <div 
                    className={`modal ${showAIModal ? 'show d-block' : 'd-none'}`} 
                    tabIndex="-1"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Fill Form with AI</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => {
                                        setShowAIModal(false);
                                        setAIDescription('');
                                    }}
                                    disabled={isAILoading}
                                />
                            </div>
<div className="modal-body">
    <div className="mb-3">
        <label className="form-label">Describe your course:</label>
        <textarea
            className="form-control"
            rows="5"
            value={aiDescription}
            onChange={(e) => setAIDescription(e.target.value)}
            placeholder={`You should pick an image and select a category only. 
Example: 'I want to create a Python programming course for beginners that covers basics like variables, loops, and functions. The course should be 10 hours long and priced at $49.99.'`}
            style={{ whiteSpace: 'pre-line' }} // This ensures line breaks are respected
            disabled={isAILoading}
        />
        <small className="text-muted">The AI will try to fill the form based on your description.</small>
    </div>
</div>

                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => {
                                        setShowAIModal(false);
                                        setAIDescription('');
                                    }}
                                    disabled={isAILoading}
                                >
                                    Cancel
                                </button>
<button 
    type="button" 
    className="btn d-flex justify-content-center align-items-center text-white" 
    style={{ backgroundColor: '#7763E6' }}  // Updated purple color
    onClick={handleAIDescriptionSubmit}
    disabled={isAILoading || !aiDescription.trim()}
>
    {isAILoading ? (
        <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Generating...
        </>
    ) : 'Generate Form'}
</button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Create course area */}
                <div className="crea-te-course-area-start ptb--100">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-8">
                                <div className="create-course-area-main-wrapper-inner">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h2>Course Information</h2>
                                        <button 
                                            className="rts-btn btn-primary"
                                            onClick={() => setShowAIModal(true)}
                                        >
                                            <i className="fa-solid fa-robot me-2"></i> Fill Form with AI
                                        </button>
                                    </div>
                                    
                                    <div className="accordion" id="accordionExample">
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
                                                                    placeholder="Course description"
                                                                    style={{ border: errorlist.description ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.description && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.description}</p>}
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="single-input">
                                                                        <label htmlFor="price">Price ($)</label>
                                                                        <input
                                                                            id="price"
                                                                            name="price"
                                                                            onChange={handleInput}
                                                                            value={courseInput.price}
                                                                            type="text"
                                                                            placeholder="49.99"
                                                                            style={{ border: errorlist.price ? "2px solid red" : "" }}
                                                                        />
                                                                        {errorlist.price && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.price}</p>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="single-input">
                                                                        <label htmlFor="courseDuration">Duration</label>
                                                                        <input
                                                                            id="courseDuration"
                                                                            name="courseDuration"
                                                                            onChange={handleInput}
                                                                            value={courseInput.courseDuration}
                                                                            type="text"
                                                                            placeholder="10 hours"
                                                                            style={{ border: errorlist.courseDuration ? "2px solid red" : "" }}
                                                                        />
                                                                        {errorlist.courseDuration && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.courseDuration}</p>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="prerequisites">Prerequisites</label>
                                                                <input
                                                                    id="prerequisites"
                                                                    name="prerequisites"
                                                                    onChange={handleInput}
                                                                    value={courseInput.prerequisites}
                                                                    type="text"
                                                                    placeholder="Basic knowledge required"
                                                                    style={{ border: errorlist.prerequisites ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.prerequisites && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.prerequisites}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="objectives">Learning Objectives</label>
                                                                <input
                                                                    id="objectives"
                                                                    name="objectives"
                                                                    onChange={handleInput}
                                                                    value={courseInput.objectives}
                                                                    type="text"
                                                                    placeholder="What students will learn"
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
                                                                    placeholder="Who should take this course"
                                                                    style={{ border: errorlist.targetAudience ? "2px solid red" : "" }}
                                                                />
                                                                {errorlist.targetAudience && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.targetAudience}</p>}
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="single-input">
                                                                        <label htmlFor="language">Language</label>
                                                                        <select
                                                                            id="language"
                                                                            name="language"
                                                                            onChange={handleInput}
                                                                            value={courseInput.language}
                                                                            style={{ border: errorlist.language ? "2px solid red" : "" }}
                                                                        >
                                                                            <option value="English">English</option>
                                                                            <option value="French">French</option>
                                                                            <option value="Spanish">Spanish</option>
                                                                            <option value="Arabic">Arabic</option>
                                                                            <option value="Other">Other</option>
                                                                        </select>
                                                                        {errorlist.language && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.language}</p>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="single-input">
                                                                        <label htmlFor="rating">Rating</label>
                                                                        <input
                                                                            id="rating"
                                                                            name="rating"
                                                                            onChange={handleInput}
                                                                            value={courseInput.rating}
                                                                            type="text"
                                                                            placeholder="4.5"
                                                                            style={{ border: errorlist.rating ? "2px solid red" : "" }}
                                                                        />
                                                                        {errorlist.rating && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.rating}</p>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="subtitles">Subtitles</label>
                                                                <select
                                                                    id="subtitles"
                                                                    name="subtitles"
                                                                    onChange={handleInput}
                                                                    value={courseInput.subtitles}
                                                                    style={{ border: errorlist.subtitles ? "2px solid red" : "" }}
                                                                >
                                                                    <option value="Yes">Yes</option>
                                                                    <option value="No">No</option>
                                                                </select>
                                                                {errorlist.subtitles && <p style={{ color: "red", fontSize: "14px" }}>{errorlist.subtitles}</p>}
                                                            </div>

                                                            <div className="single-input">
                                                                <label htmlFor="Course">Category</label>
                                                                <select
                                                                    id="category"
                                                                    name="category"
                                                                    onChange={handleInput}
                                                                    value={courseInput.category}
                                                                    style={{ border: errorlist.category ? "2px solid red" : "" }}
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
                                                                <label htmlFor="courseImage">Course Image</label>
                                                                <input
                                                                    type="file"
                                                                    id="courseImage"
                                                                    name="courseImage"
                                                                    onChange={handleImage}
                                                                    style={{ display: "none" }}
                                                                />
                                                                <div className="course-thumbnail-upload-area">
                                                                    <div className="thumbnail-area">
                                                                        <img 
                                                                            src={imagePreview} 
                                                                            alt="Selected" 
                                                                            style={{ 
                                                                                width: "250px", 
                                                                                height: "250px", 
                                                                                objectFit: "cover", 
                                                                                border: errorlist.image ? "2px solid red" : "" 
                                                                            }} 
                                                                        />
                                                                    </div>
                                                                    <div className="information">
                                                                        <div className="input-file-type-btn">
                                                                            <button 
                                                                                type="button" 
                                                                                className="rts-btn btn-primary" 
                                                                                id="custom-button" 
                                                                                onClick={() => document.getElementById("courseImage").click()}
                                                                            >
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
                                                                        <button type="submit" className="rts-btn btn-border">
                                                                            Submit <i className="fa-light fa-arrow-right" />
                                                                        </button>
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
                                        <span>Set the Category Price option or make it free.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Standard size for the Category thumbnail is 700x430.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Video section controls the Category overview video.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Category Builder is where you create & organize a Category.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Add Topics in the Category Builder section to create lessons, quizzes, and assignments.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Prerequisites refers to the fundamental Category to complete before taking this particular Category.</span>
                                    </div>
                                    <div className="single-check-wrapper">
                                        <i className="fa-light fa-circle-check" />
                                        <span>Information from the Additional Data section shows up on the Category single page.</span>
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

export default AddCourse;