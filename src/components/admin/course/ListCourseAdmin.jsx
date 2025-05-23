import React, { useEffect, useState } from 'react'
import Header from '../../student/Header'
import LeftSideBar from '../../student/LeftSideBar'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function ListCourseAdmin() {
    const navigate = useNavigate();
    const [ListCourses, setCourses] = useState([]);

    useEffect(() => {
        document.title = "List of courses";

        axios.get(`/api/courses`)
    .then(res => {
            if (res.status === 200) {
                console.log(res.data);
                setCourses(res.data);
            }
        })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);
    const handleDeleteCourse = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007C00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/deleteCourse/${id}`)
            .then(res => {
                    if (res.status === 200) {
                        Swal.fire('Deleted!', 'Course has been deleted.', 'success');
                        setCourses(ListCourses.filter(course => course._id !== id));
                    }
                })
                    .catch(error => {
                        Swal.fire('Error!', 'Failed to delete category.', 'error');
                    });
            }
        });
    };
    return (

        <div>
            <Header />
            {/* dashboard banner area start */}
            <div className="dashboard-banner-area-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="dashboard-banner-area-start bg_image  student-dashboard">
                                <div className="rating-area-banner-dashboard">
                                    <a href="become-instructor.html" className="create-btn"><i className="fa-regular fa-circle-plus" /> Become an Instructor</a>
                                </div>
                                <div className="author-profile-image-and-name">
                                    <div className="profile-pic">
                                        <img src="/assets/images/dashboard/04.png" alt="dashboard" />
                                    </div>
                                    <div className="name-desig">
                                        <h1 className="title">Hachem Dhawadi</h1>
                                        <div className="course-vedio">
                                            <div className="single">
                                                <i className="fa-thin fa-book" />
                                                <span>5 Course Enrolled</span>
                                            </div>
                                            <div className="single">
                                                <i className="fa-thin fa-file-certificate" />
                                                <span>4 Certificate</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* rts dahboard-area-main-wrapper */}
                <div className="dashboard--area-main pt--100">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-3">
                                <LeftSideBar />
                            </div>
                            <div className="col-lg-9">
                                <div className="exrolled-course-wrapper-dashed">
                                    <h5 className="title">Enrolleld Courses</h5>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Enrolleld Courses</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content mt--30" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="row g-5">
                                                {/* single course style two */}
                                                {ListCourses.length > 0 ? (
                                                    ListCourses.map(item => (
                                                        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                                            <div className="single-course-style-three enroll-course">
                                                                <Link to={`/DetailCourse/${item._id}`} className="thumbnail">
                                                                    <img
                                                                        src={`http://localhost:3000${item.courseImage}`}
                                                                        alt={item.courseImage}
                                                                        style={{ width: "200px", height: "150px", objectFit: "cover" }}
                                                                    />


                                                                    <div className="tag-thumb">
                                                                        <span>{item.title}</span>
                                                                    </div>
                                                                </Link>
                                                                <div className="body-area">
                                                                    <div className="course-top">
                                                                        <div className="tags">Best Seller</div>
                                                                        <div className="price">${item.price}</div>
                                                                    </div>
                                                                    <a href="single-course.html">
                                                                        <h5 className="title">{item.prerequisites}</h5>
                                                                    </a>
                                                                    <div className="teacher-stars">
                                                                        <div className="teacher">
                                                                            <span>{item.subtitles}</span></div>
                                                                        <ul className="stars">
                                                                            <li className="span">{item.rating}</li>
                                                                            <li><i
                                                                                className="fa-sharp fa-solid fa-star"/>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa-sharp fa-solid fa-star"/>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa-sharp fa-solid fa-star"/>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa-sharp fa-solid fa-star"/>
                                                                            </li>
                                                                            <li><i
                                                                                className="fa-sharp fa-regular fa-star"/>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="leasson-students">
                                                                        <div className="lesson">
                                                                            <i className="fa-light fa-calendar-lines-pen"/>
                                                                            <span>{item.category.title} </span>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => navigate(`/SubCoursesByCourseAdmin/${item._id}`)}
                                                                        className="rts-btn btn-border"
                                                                    >
                                                                        SubCourses
                                                                    </button>

                                                                    <button
                                                                        onClick={() => navigate(`/UpdateCourseAdmin/${item._id}`)}
                                                                        className="rts-btn btn-border"
                                                                    >
                                                                        Update Course
                                                                    </button>
                                                                    <button onClick={() => handleDeleteCourse(item._id)}
                                                                            className="rts-btn btn-border">Delete Course
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Loading categories...</p>
                                                )}

                                                {/* single course style two end */}



                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* rts dahboard-area-main-wrapper end */}
            </div>









            {/* cart area start */}
            {/* cart area start */}
            <div className="cart-bar">
                <div className="cart-header">
                    <h3 className="cart-heading">MY CART (3 ITEMS)</h3>
                    <div className="close-cart"><i className="fal fa-times" /></div>
                </div>
                <div className="product-area">
                    <div className="product-item">
                        <div className="product-detail">
                            <div className="product-thumb"><img src="assets/images/course/cart/01.jpg" alt="product-thumb" /></div>
                            <div className="item-wrapper">
                                <span className="product-name">Construct Map</span>
                                <div className="item-wrapper">
                  <span className="product-variation"><span className="color">Green /</span>
                    <span className="size">XL</span></span>
                                </div>
                                <div className="item-wrapper">
                                    <span className="product-qnty">3 ×</span>
                                    <span className="product-price">$198.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="cart-edit">
                            <div className="quantity-edit">
                                <button className="button"><i className="fal fa-minus minus" /></button>
                                <input type="text" className="input" defaultValue={3} />
                                <button className="button plus">+<i className="fal fa-plus plus" /></button>
                            </div>
                            <div className="item-wrapper d-flex mr--5 align-items-center">
                                <a href="#" className="product-edit"><i className="fal fa-edit" /></a>
                                <a href="#" className="delete-cart"><i className="fal fa-times" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-detail">
                            <div className="product-thumb"><img src="/assets/images/course/cart/02.jpg" alt="product-thumb" /></div>
                            <div className="item-wrapper">
                                <span className="product-name"> Bridge product</span>
                                <div className="item-wrapper">
                  <span className="product-variation"><span className="color">Green /</span>
                    <span className="size">XL</span></span>
                                </div>
                                <div className="item-wrapper">
                                    <span className="product-qnty">2 ×</span>
                                    <span className="product-price">$88.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="cart-edit">
                            <div className="quantity-edit">
                                <button className="button"><i className="fal fa-minus minus" /></button>
                                <input type="text" className="input" defaultValue={2} />
                                <button className="button plus">+<i className="fal fa-plus plus" /></button>
                            </div>
                            <div className="item-wrapper d-flex mr--5 align-items-center">
                                <a href="#" className="product-edit"><i className="fal fa-edit" /></a>
                                <a href="#" className="delete-cart"><i className="fal fa-times" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="product-item last-child">
                        <div className="product-detail">
                            <div className="product-thumb"><img src="assets/images/course/cart/03.jpg" alt="product-thumb" /></div>
                            <div className="item-wrapper">
                                <span className="product-name">Labour helmet</span>
                                <div className="item-wrapper">
                  <span className="product-variation"><span className="color">Green /</span>
                    <span className="size">XL</span></span>
                                </div>
                                <div className="item-wrapper">
                                    <span className="product-qnty">1 ×</span>
                                    <span className="product-price">$289.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="cart-edit">
                            <div className="quantity-edit">
                                <button className="button"><i className="fal fa-minus minus" /></button>
                                <input type="text" className="input" defaultValue={2} />
                                <button className="button plus">+<i className="fal fa-plus plus" /></button>
                            </div>
                            <div className="item-wrapper d-flex mr--5 align-items-center">
                                <a href="#" className="product-edit"><i className="fal fa-edit" /></a>
                                <a href="#" className="delete-cart"><i className="fal fa-times" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-bottom-area">
          <span className="spend-shipping"><i className="fal fa-truck" /> SPENT <span className="amount">$199.00</span> MORE
            FOR FREE SHIPPING</span>
                    <span className="total-price">TOTAL: <span className="price">$556</span></span>
                    <a href="checkout.html" className="checkout-btn cart-btn">PROCEED TO CHECKOUT</a>
                    <a href="cart.html" className="view-btn cart-btn">VIEW CART</a>
                </div>
            </div>
            {/* cart area edn */}
            {/* cart area edn */}











        </div>

    )
}

export default ListCourseAdmin
