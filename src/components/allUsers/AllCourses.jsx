import React, { useEffect, useState } from 'react';
import Header from '../student/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useCartStore } from '../cartStore/cartStore';

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart } = useCartStore();
    const [orderedCourseIds, setOrderedCourseIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 500]); // [min, max]
    const [maxPrice, setMaxPrice] = useState(500); // Track maximum price in courses

    useEffect(() => {
        document.title = "List of courses";
        fetchOrders();
        fetchCourses();
        fetchCategories();
    }, []);

    useEffect(() => {
        // Update max price when courses are loaded
        if (courses.length > 0) {
            const max = Math.max(...courses.map(course => course.price || 0));
            setMaxPrice(Math.ceil(max / 50) * 50); // Round up to nearest 50
            setPriceRange([0, Math.ceil(max / 50) * 50]);
        }
    }, [courses]);

    const fetchOrders = async () => {
        const userString = localStorage.getItem("auth-storage");
        const userObj = userString ? JSON.parse(userString) : null;
        const userId = userObj?.state?.user?._id;
        if (userId) {
            try {
                const res = await axios.get(`http://localhost:3000/api/orders/user-id/${userId}`);
                const pendingOrders = res.data.filter(order => order.status === "pending");
                const courseIds = pendingOrders.flatMap(order =>
                    order.items.map(item => item.courseId._id)
                );
                setOrderedCourseIds(courseIds);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`/api/courses`);
            if (res.status === 200) {
                setCourses(res.data);
                setFilteredCourses(res.data);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`/api/categories`);
            if (res.status === 200) {
                setCategories(res.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterCourses(e.target.value, selectedCategories, priceRange);
    };

    const handleCategoryChange = (categoryId) => {
        const newSelectedCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(id => id !== categoryId)
            : [...selectedCategories, categoryId];

        setSelectedCategories(newSelectedCategories);
        filterCourses(searchTerm, newSelectedCategories, priceRange);
    };

    const handlePriceChange = (e, index) => {
        const newPriceRange = [...priceRange];
        newPriceRange[index] = Number(e.target.value);
        setPriceRange(newPriceRange);
        filterCourses(searchTerm, selectedCategories, newPriceRange);
    };

    const filterCourses = (searchTerm, selectedCategories, priceRange) => {
        let filtered = [...courses];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter if any categories are selected
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(course =>
                selectedCategories.includes(course.category?._id)
            );
        }

        // Apply price range filter
        filtered = filtered.filter(course => {
            const coursePrice = course.discountedPrice || course.price || 0;
            return coursePrice >= priceRange[0] && coursePrice <= priceRange[1];
        });

        setFilteredCourses(filtered);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategories([]);
        setPriceRange([0, maxPrice]);
        setFilteredCourses(courses);
    };

    const countCoursesInCategory = (categoryId) => {
        return courses.filter(course => course.category?._id === categoryId).length;
    };

    const countCoursesInPriceRange = (min, max) => {
        return courses.filter(course => {
            const coursePrice = course.discountedPrice || course.price || 0;
            return coursePrice >= min && coursePrice <= max;
        }).length;
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
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main-wrapper">
                                <h1 className="title">All Course</h1>
                                <div className="pagination-wrapper">
                                    <a href="index-2.html">Home</a>
                                    <i className="fa-regular fa-chevron-right" />
                                    <a className="active" href="create-course.html">All Course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rts-course-default-area rts-section-gap">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-3">
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

                                <div className="single-filter-left-wrapper">
                                    <h6 className="title">Category</h6>
                                    <div className="checkbox-filter filter-body">
                                        <div className="checkbox-wrapper">
                                            {categories.map((category) => (
                                                <div className="single-checkbox-filter" key={category._id}>
                                                    <div className="check-box">
                                                        <input
                                                            type="checkbox"
                                                            id={`category-${category._id}`}
                                                            checked={selectedCategories.includes(category._id)}
                                                            onChange={() => handleCategoryChange(category._id)}
                                                        />
                                                        <label htmlFor={`category-${category._id}`}>
                                                            {category.title}
                                                        </label>
                                                        <br />
                                                    </div>
                                                    <span className="number">
                                                        ({countCoursesInCategory(category._id)})
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="single-filter-left-wrapper">
                                    <h6 className="title">Price Range</h6>
                                    <div className="price-filter filter-body" style={{
                                        marginTop: '20px',
                                        padding: '15px',
                                        backgroundColor: '#f9f9f9',
                                        borderRadius: '8px'
                                    }}>
                                        <div className="price-inputs" style={{
                                            display: 'flex',
                                            gap: '10px',
                                            marginBottom: '15px'
                                        }}>
                                            <div className="price-input" style={{ flex: 1 }}>
                                                <label htmlFor="min-price" style={{
                                                    display: 'block',
                                                    marginBottom: '5px',
                                                    fontSize: '14px',
                                                    color: '#666'
                                                }}>Min ($)</label>
                                                <input
                                                    type="number"
                                                    id="min-price"
                                                    min="0"
                                                    max={maxPrice}
                                                    value={priceRange[0]}
                                                    onChange={(e) => handlePriceChange(e, 0)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                            </div>
                                            <div className="price-input" style={{ flex: 1 }}>
                                                <label htmlFor="max-price" style={{
                                                    display: 'block',
                                                    marginBottom: '5px',
                                                    fontSize: '14px',
                                                    color: '#666'
                                                }}>Max ($)</label>
                                                <input
                                                    type="number"
                                                    id="max-price"
                                                    min="0"
                                                    max={maxPrice}
                                                    value={priceRange[1]}
                                                    onChange={(e) => handlePriceChange(e, 1)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="price-slider" style={{ margin: '20px 0' }}>
                                            <input
                                                type="range"
                                                min="0"
                                                max={maxPrice}
                                                value={priceRange[0]}
                                                onChange={(e) => handlePriceChange(e, 0)}
                                                style={{
                                                    width: '100%',
                                                    margin: '5px 0',
                                                    height: '6px',
                                                    borderRadius: '3px',
                                                    background: '#ddd',
                                                    outline: 'none'
                                                }}
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max={maxPrice}
                                                value={priceRange[1]}
                                                onChange={(e) => handlePriceChange(e, 1)}
                                                style={{
                                                    width: '100%',
                                                    margin: '5px 0',
                                                    height: '6px',
                                                    borderRadius: '3px',
                                                    background: '#ddd',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>
                                        <div className="price-count" style={{
                                            textAlign: 'center',
                                            fontSize: '14px',
                                            color: '#666',
                                            marginTop: '10px'
                                        }}>
                                            <span>{countCoursesInPriceRange(priceRange[0], priceRange[1])} courses in this range</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={clearFilters}
                                    className="rts-btn btn-border"
                                >
                                    <i className="fa-regular fa-x" /> Clear All Filters
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            {/* Rest of your course listing code */}
                            <div className="filter-small-top-full">
                                <div className="left-filter">
                                    <span></span>
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

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row g-5 mt--30">
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
                                                                    <span>{course.category?.title || 'Uncategorized'}</span>
                                                                </div>
                                                            </div>
                                                            <div className="lesson-studente">
                                                                <div className="lesson">
                                                                    <i className="fa-light fa-calendar-lines-pen" />
                                                                    <span>{course.lessonsCount || 0} Lessons</span>
                                                                </div>
                                                            </div>
                                                            <Link to={`/DetailCourse/${course._id}`}>
                                                                <h5 className="title">{course.title}</h5>
                                                            </Link>
                                                            <p className="disc">{course.description || 'No description available'}</p>
                                                            <p className="teacher">{course.user?.email || 'Unknown Instructor'}</p>
                                                            <div className="rating-and-price">
                                                                <div className="rating-area">
                                                                    <span>{course.rating?.toFixed(1) || '0.0'}</span>
                                                                    <div className="stars">
                                                                        <ul>
                                                                            {[...Array(5)].map((_, i) => (
                                                                                <li key={i}>
                                                                                    <i className={`fa-sharp ${i < Math.floor(course.rating || 0)
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
                                                                                ${course.price?.toFixed(2) || '0.00'}
                                                                            </div>
                                                                            <div className="price">
                                                                                ${course.discountedPrice.toFixed(2)}
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <div className="price">
                                                                            ${course.price?.toFixed(2) || '0.00'}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {orderedCourseIds.includes(course._id) ? (
                                                                <Link to="/cart" className="rts-btn btn-warning mt-3">
                                                                    Go to Cart
                                                                </Link>
                                                            ) : (
                                                                <button onClick={() => handleAddToCart(course)} className="rts-btn btn-primary mt-3">
                                                                    Add to Cart
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllCourses;