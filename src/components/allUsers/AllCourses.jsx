import React, { useEffect, useState } from 'react'
import Header from '../commun/Header'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { useCartStore } from '../cartStore/cartStore';
import Swal from 'sweetalert2';

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // ✅ Get the addToCart function from your store
    const { addToCart } = useCartStore();

    useEffect(() => {
        document.title = "List of courses";
        fetchCourses();
    }, []);

    useEffect(() => {
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
                setFilteredCourses(res.data); // Initialize filtered courses
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // ✅ Add to cart handler
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
                items: [
                    {
                        courseId: course._id,
                        quantity: 1
                    }
                ],
                userid: userId
            });
    
            // Optional: still keep local store in sync (if needed for sidebar count)
            addToCart(course);
    
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
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main-wrapper">
                                <h1 className="title">All Courses</h1>
                                <div className="pagination-wrapper">
                                    <a href="/">Home</a>
                                    <i className="fa-regular fa-chevron-right" />
                                    <span className="active">Courses</span>
                                </div>
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
                                {/* You can keep your other filters here if needed */}
                            </div>
                            {/* course-filter-area end */}
                        </div>
                        <div className="col-lg-9">
                            <div className="filter-small-top-full">
                                <div className="left-filter">
                                    <span>Sort By</span>
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
                                    <span>Showing {filteredCourses.length} results</span>
                                </div>
                            </div>

                            <div className="tab-content mt-4">
                                <div className="tab-pane fade show active" id="profile" role="tabpanel">
                                    <div className="row g-5">
                                        <div className="col-lg-12">
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
                                                                <h5 className="title">{course.title || 'Course Title'}</h5>
                                                            </Link>
                                                            <p className="disc">{course.description || 'Course description here...'}</p>
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

                                                            {/* ✅ Add to Cart Button */}
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

                                    {/* You can add pagination here if needed */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* course area end */}

            <Footer />
        </div>
    )
}

export default AllCourses
