import React, { useEffect, useState } from 'react'
import Header from '../student/Header'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useCartStore } from '../cartStore/cartStore';
function AllCourses() {
    const [ListCourses, setCoursesApi] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
     const { addToCart } = useCartStore();

    useEffect(() => {
        document.title = "List of courses";
        fetchCourses();
    }, []);

    useEffect(() => {
        // Filter courses whenever searchTerm changes
        const filtered = courses.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(filtered);
    }, [searchTerm, courses]);

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`/api/courses`);
            if (res.status === 200) {
                setCourses(res.data);
                setFilteredCourses(res.data); // Initialize filtered courses with all courses
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
        const handleAddToCart = async (course) => {
            const userString = localStorage.getItem("auth-storage");
            const userObj = userString ? JSON.parse(userString) : null;
            const userId = userObj?.state?.user?._id;
    
            if (!userId) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Required',
                    text: 'Please log in to add courses to your cart.',
                });
                return;
            }
    
            try {
                await axios.post('/api/orders', {
                    items: [{ courseId: course._id, quantity: 1 }],
                    userid: userId
                });
    
                addToCart({ ...course, quantity: 1 });
    
                Swal.fire({
                    icon: 'success',
                    title: 'Added to cart!',
                    text: `${course.title} has been added to your cart.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error("Error adding to cart:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add the course to your cart. Please try again.',
                });
            }
        };

    return (
        <div>
         
            <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                <div className="container">
                    <div className="row">cate
                        <div className="col-lg-12">
                            <div className="breadcrumb-main-wrapper">
                                <h1 className="title">All Course</h1>
                                {/* breadcrumb pagination area */}
                                <div className="pagination-wrapper">
                                    <a href="index-2.html">Home</a>
                                    <i className="fa-regular fa-chevron-right" />
                                    <a className="active" href="create-course.html">All Course</a>
                                </div>
                                {/* breadcrumb pagination area end */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* course area start */}
            <div className="rts-course-default-area rts-section-gap">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-3">
                            {/* course-filter-area start */}
                            <div className="rts-course-filter-area">
                                {/* single filter wized */}
                                <div className="single-filter-left-wrapper">
                                    <h6 className="title">Search</h6>
                                    <div className="search-filter filter-body">
                                        <div className="input-wrapper">
                                            <input
                                                type="text"
                                                placeholder="Search Course..."
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                            <i className="fa-light fa-magnifying-glass" />
                                        </div>
                                    </div>
                                </div>

                                <div className="single-filter-left-wrapper">
                                    <h6 className="title">Category</h6>
                                    <div className="checkbox-filter filter-body">
                                        <div className="checkbox-wrapper">
                                            {/* single check box */}
                                            <div className="single-checkbox-filter">
                                                <div className="check-box">
                                                    <input type="checkbox" id="category-1" />
                                                    <label htmlFor="category-1">Web Development</label><br />
                                                </div>
                                                <span className="number">(130)</span>
                                            </div>
                                            {/* single check box end */}
                                            {/* single check box */}
                                            <div className="single-checkbox-filter">
                                                <div className="check-box">
                                                    <input type="checkbox" id="category-2" />
                                                    <label htmlFor="category-2">Film &amp; Video</label><br />
                                                </div>
                                                <span className="number">(85)</span>
                                            </div>
                                            {/* single check box end */}
                                            {/* single check box */}
                                            <div className="single-checkbox-filter">
                                                <div className="check-box">
                                                    <input type="checkbox" id="category-3" />
                                                    <label htmlFor="category-3">Illustration</label><br />
                                                </div>
                                                <span className="number">(210)</span>
                                            </div>
                                            {/* single check box end */}
                                            {/* single check box */}
                                            <div className="single-checkbox-filter">
                                                <div className="check-box">
                                                    <input type="checkbox" id="category-4" />
                                                    <label htmlFor="category-4">Music &amp; Art</label><br />
                                                </div>
                                                <span className="number">(45)</span>
                                            </div>
                                            {/* single check box end */}
                                            {/* single check box */}
                                            <div className="single-checkbox-filter">
                                                <div className="check-box">
                                                    <input type="checkbox" id="category-5" />
                                                    <label htmlFor="category-5">Photography</label><br />
                                                </div>
                                                <span className="number">(35)</span>
                                            </div>
                                            {/* single check box end */}
                                            {/* single check box */}
                                            <div className="single-checkbox-filter">
                                                <div className="check-box">
                                                    <input type="checkbox" id="category-6" />
                                                    <label htmlFor="category-6">Business &amp; Marketing</label><br />
                                                </div>
                                                <span className="number">(66)</span>
                                            </div>
                                            {/* single check box end */}
                                            {/* single check box */}
                                            <div className="single-checkbox-filter">
                                                <div className="check-box">
                                                    <input type="checkbox" id="category-7" />
                                                    <label htmlFor="category-7">Design &amp; UI/UX</label><br />
                                                </div>
                                                <span className="number">(95)</span>
                                            </div>
                                            {/* single check box end */}
                                            {/* single check box */}
                                            <div className="single-checkbox-filter">
                                                <div className="check-box">
                                                    <input type="checkbox" id="category-8" />
                                                    <label htmlFor="category-8">Web Design</label><br />
                                                </div>
                                                <span className="number">(150)</span>
                                            </div>
                                            {/* single check box end */}
                                        </div>
                                    </div>
                                </div>


                                <a href="#" className="rts-btn btn-border"><i className="fa-regular fa-x" /> Clear All Filters</a>
                            </div>
                            {/* course-filter-area end */}
                        </div>
                        <div className="col-lg-9">
                            {/* filter top-area  */}
                            <div className="filter-small-top-full">
                                <div className="left-filter">
                                    <span>Short By</span>
                                    <select className="nice-select" name="price">
                                        <option>All Category</option>
                                        <option value="asc">Design</option>
                                        <option value="desc">Development</option>
                                        <option value="pop">Popularity</option>
                                        <option value="low">Price</option>
                                        <option value="high">Stars</option>
                                    </select>
                                </div>
                                <div className="right-filter">
                                  
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">
                                                <i className="fa-light fa-list" />
                                                <span> List</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* filter top-area end */}
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row mt--50 g-5">
                                        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                            {/* single course style two */}
                                            <div className="single-course-style-three">
                                                <a href="#" className="thumbnail">
                                                    <img src="assets/images/course/01.jpg" alt="course" />
                                                    <div className="tag-thumb">
                                                        <span>Marketing</span>
                                                    </div>
                                                </a>
                                                <div className="body-area">
                                                    <div className="course-top">
                                                        <div className="tags">Best Seller</div>
                                                        <div className="price">$49.50</div>
                                                    </div>
                                                    <a href="#">
                                                        <h5 className="title">How to Write the Ultimate 1 Page
                                                            Strategic Business Plan</h5>
                                                    </a>
                                                    <div className="teacher-stars">
                                                        <div className="teacher"><span>Dr. Angela Yu</span></div>
                                                        <ul className="stars">
                                                            <li className="span">4.5</li>
                                                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                                                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                                                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                                                            <li><i className="fa-sharp fa-solid fa-star" /></li>
                                                            <li><i className="fa-sharp fa-regular fa-star" /></li>
                                                        </ul>
                                                    </div>
                                                    <div className="leasson-students">
                                                        <div className="lesson">
                                                            <i className="fa-light fa-calendar-lines-pen" />
                                                            <span>25 Lessons</span>
                                                        </div>
                                                        <div className="students">
                                                            <i className="fa-light fa-users" />
                                                            <span>25 Lessons</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* single course style two end */}
                                        </div>


                                    </div>
                                    <div className="row mt--30">
                                        <div className="col-lg-12">
                                            {/* rts-pagination-area */}
                                            <div className="rts-pagination-area-2">
                                                <ul>
                                                    <li><i className="fa-solid fa-chevron-left" /></li>
                                                    <li className="active">1</li>
                                                    <li>2</li>
                                                    <li>3</li>
                                                    <li>4</li>
                                                    <li><i className="fa-solid fa-chevron-right" /></li>
                                                </ul>
                                            </div>
                                            {/* rts-pagination-area end */}
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row g-5 mt--30">
                                        <div className="col-lg-12">
                                            {/* rts single course */}
                                            <div className="course-list-container">
                                                {filteredCourses.map((course) => (
                                                    <div className="rts-single-course course-list" key={course._id}>
                                                        <Link to={`/DetailCourse/${course._id}`} className="thumbnail">
                                                            <img
                                                                src={`http://localhost:3000${course.courseImage}`}
                                                                alt={course.title}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "assets/images/course/11.jpg";
                                                                }}
                                                                style={{
                                                                    width: '300px',
                                                                    height: '200px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '8px'
                                                                }}
                                                            />
                                                        </Link>
                                                        <div className="information-inner">
                                                            {/* Rest of your course card content */}
                                                            <div className="tags-area-wrapper">
                                                                <div className="single-tag">
                                                                    <span>{course.category?.name || 'Web Development'}</span>
                                                                </div>
                                                            </div>
                                                            <div className="lesson-studente">
                                                                <div className="lesson">
                                                                    <i className="fa-light fa-calendar-lines-pen" />
                                                                    <span>{course.lessonsCount || 25} Lessons</span>
                                                                </div>
                                                                <div className="lesson">
                                                                    <i className="fa-light fa-user-group" />
                                                                    <span>{course.studentsCount || 54} Students</span>
                                                                </div>
                                                            </div>
                                                            <Link to={`/DetailCourse/${course._id}`}>
                                                                <h5 className="title">{course.title || 'The Complete Web Developer in 2023: Zero to Mastery'}</h5>
                                                            </Link>
                                                            <p className="disc">{course.description || 'Discover a world of knowledge and learning opportunities'}</p>
                                                            <p className="teacher">{course.user?.email || 'Unknown Instructor'}</p>
                                                            <div className="rating-and-price">
                                                                <div className="rating-area">
                                                                    <span>{course.rating?.toFixed(1) || '4.5'}</span>
                                                                    <div className="stars">
                                                                        <ul>
                                                                            {[...Array(5)].map((_, i) => (
                                                                                <li key={i}>
                                                                                    <i className={`fa-sharp ${i < Math.floor(course.rating || 4.5)
                                                                                        ? 'fa-solid fa-star'
                                                                                        : 'fa-regular fa-star'
                                                                                        }`} />
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="price-area">
                                                                    {course.discountedPrice ? (
                                                                        <>
                                                                            <div className="not price">
                                                                                ${course.price?.toFixed(2) || '79.99'}
                                                                            </div>
                                                                            <div className="price">
                                                                                ${course.discountedPrice.toFixed(2)}
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <div className="price">
                                                                            ${course.price?.toFixed(2) || '79.99'}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleAddToCart(course)}
                                                                className="rts-btn btn-primary mt-3"
                                                            >
                                                                Add to Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt--0">
                                        <div className="col-lg-12">
                                            {/* rts-pagination-area */}
                                            <div className="rts-pagination-area-2">
                                                <ul>
                                                    <li><i className="fa-solid fa-chevron-left" /></li>
                                                    <li className="active">1</li>
                                                    <li>2</li>
                                                    <li>3</li>
                                                    <li>4</li>
                                                    <li><i className="fa-solid fa-chevron-right" /></li>
                                                </ul>
                                            </div>
                                            {/* rts-pagination-area end */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* course area end */}




        </div>
    )
}

export default AllCourses