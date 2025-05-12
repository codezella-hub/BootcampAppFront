import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../auth/Profile.jsx';
import { useAuthStore } from '../../store/authStore.js';
import { useCartStore } from '../cartStore/cartStore'; // ✅ Import cart store
import SideCart from '../cart/SideCart'; // ✅ Import SideCart
function Header() {
    const { user, checkAuth, isAuthenticated } = useAuthStore();
    const { cartItems, removeFromCart } = useCartStore();

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const handleOpenCart = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    const handleUpdateQuantity = (courseId, newQty) => {
        console.log('Quantity update not implemented yet:', courseId, newQty);
        // 🔧 You can implement this later in your store.
    };
    return (
        <div>

            {/* header style one */}
            <header className="header-one v-2 header--sticky">
                <div className="header-top-one-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="header-top-one">
                                    <div className="left-information">
                                        <a href="mailto:someone@example.com" className="email"><i className="fa-light fa-envelope" />info@studyhub.com</a>
                                        <a href="tel:+4733378901" className="email"><i className="fa-light fa-phone" />+61 012 012 445</a>
                                    </div>
                                    <div className="right-information">
                                        <div className="right-information">
                                            <ul className="rts-dropdown-menu switcher-language">
                                                <li className="has-child-menu">
                                                    <a href="#">
                                                        <img className="left-image" src="assets/images/flag-01.svg" alt="Language Images" />
                                                        <span className="menu-item">English</span>
                                                        <i className="fa-regular fa-chevron-down" />
                                                    </a>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <a href="#">
                                                                <img className="left-image" src="assets/images/flag-03.svg" alt="Language Images" />
                                                                <span className="menu-item">Deutsch</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <img className="left-image" src="assets/images/flag-02.svg" alt="Language Images" />
                                                                <span className="menu-item">Portuguese</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <img className="left-image" src="assets/images/flag-04.svg" alt="Language Images" />
                                                                <span className="menu-item">Russian</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul className="rts-dropdown-menu switcher-currency">
                                                <li className="has-child-menu">
                                                    <a href="#">
                                                        <span className="menu-item">USD</span>
                                                        <i className="fa-regular fa-chevron-down" />
                                                    </a>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <a href="#">
                                                                <span className="menu-item">Euro</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <span className="menu-item">Real</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <span className="menu-item">Ruble</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header-one-wrapper">
                                <div className="left-side-header">
                                    <a href="/" className="logo-area">
                                        <img src="assets/images/logo/logo-1.svg" alt="logo" />
                                    </a>
                                    <div className="main-nav-one">
                                        <nav>
                                            <ul>
                                                <li className="has-dropdown" style={{position: 'static'}}>
                                                    <a className="nav-link" href="#">Home</a>

                                                </li>
                                                {isAuthenticated && (
                                                    <>
                                                        {/* route forum */}
                                                        <li className="has-dropdown">
                                                            <Link className="nav-link">Courses</Link>
                                                            <ul className="submenu">
                                                                <li><Link to="/allcourses">List Course</Link></li>

                                                            </ul>
                                                        </li>
                                                        <li className="has-dropdown">
                                                            <Link className="nav-link">Dashboard ad</Link>
                                                            <ul className="submenu">
                                                                <li><Link to="/dash">Dashboard</Link></li>

                                                            </ul>
                                                        </li>
                                                        <li className="has-dropdown">
                                                            <Link className="nav-link">Videos</Link>
                                                            <ul className="submenu">
                                                                <li><Link to="/ListVideo">Videos</Link></li>

                                                            </ul>
                                                        </li>
                                                        <li className="has-dropdown">
                                                            <Link to="/dashboard" className="nav-link">Dashboard</Link>

                                                        </li>
                                                        {user.role === "admin" && (
                                                            <>
                                                                <li className="has-dropdown">
                                                                    <Link className="nav-link" to="/posts">page</Link>
                                                                </li>
                                                                <li className="has-dropdown">
                                                                    <Link className="nav-link" to="/posts">page</Link>
                                                                </li>
                                                            </>


                                                        )}


                                                        {user.role === "user" && (
                                                            <>
                                                                <li className="has-dropdown">
                                                                    <Link className="nav-link"
                                                                          to="/dashboard/student/enroll-course">Enrolled
                                                                        Courses</Link>
                                                                </li>
                                                                <li className="has-dropdown">
                                                                    <Link className="nav-link" to="/cart">My Cart</Link>
                                                                </li>
                                                            </>
                                                        )}

                                                        {user.role === "professor" && (
                                                            <>


                                                                <li className="has-dropdown">
                                                                    <Link className="nav-link"
                                                                          to="/Code">Code</Link>
                                                                </li>


                                                            </>


                                                        )}
                                                        <li className="has-dropdown">
                                                            <Link className="nav-link" to="/Forums">Chat</Link>
                                                            <ul className="submenu">
                                                                <li className="has-dropdown">
                                                                    <Link className="nav-link"
                                                                          to="/homeRooms">Meeting</Link>
                                                                </li>
                                                                <li className="has-dropdown">
                                                                    <Link className="nav-link" to="/chat">Chat</Link>
                                                                </li>

                                                            </ul>
                                                        </li>
                                                    </>
                                                )}


                                                {/* route forum */}
                                                <li className="has-dropdown">
                                                    <Link className="nav-link" to="/Forums">Forums</Link>
                                                    <ul className="submenu">
                                                        <li><Link to="/Forums">Forums</Link></li>
                                                        <li><Link to="/Myforum">My Forum</Link></li>
                                                    </ul>
                                                </li>
                                                 {/* route post */}
                                                 <li className="has-dropdown">
                                                        <Link className="nav-link" to="/posts">Jobs</Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/posts">Find Job</Link></li>
                                                            <li><Link to="/MyPosts">My Offers</Link></li>
                                                            <li><Link to="/MyCandidats">My Applications</Link></li>
                                                        </ul>
                                                        </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="header-right-area-one">
                                <div className="actions-area">
                                        <div className="search-btn" id="search">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                <path d="M19.9375 18.9652L14.7454 13.7732..." fill="#553CDF" />
                                            </svg>
                                        </div>

                                        {/* ✅ Cart Icon with badge and click */}
                                        <div
                                            className="cart cart-icon"
                                            onClick={handleOpenCart}
                                            style={{ cursor: 'pointer', position: 'relative' }}
                                        >
                                            <i className="fa-regular fa-cart-shopping" />
                                            {cartItems.length > 0 && (
                                                <span
                                                    style={{
                                                        position: 'absolute',
                                                        top: '-5px',
                                                        right: '-10px',
                                                        background: '#553CDF',
                                                        color: '#fff',
                                                        borderRadius: '50%',
                                                        padding: '2px 6px',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    {cartItems.length}
                                                </span>
                                            )}
                                        </div>
                                    </div>
    
                                    <div className="buttons-area">
                                    {isAuthenticated ? (
                       <Profile ></Profile>
                      
               
            ) : (
              <>
                     <Link className="rts-btn btn-primary" to="/login">Sign In</Link>
                      <Link className="rts-btn btn-primary" to="/register">Sign Up</Link>
                      </>
            )}
                                    </div>
                                    <div className="menu-btn" id="menu-btn">
                                        <svg width={20} height={16} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect y={14} width={20} height={2} fill="#1F1F25" />
                                            <rect y={7} width={20} height={2} fill="#1F1F25" />
                                            <rect width={20} height={2} fill="#1F1F25" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
                 {/* ✅ Mount the SideCart globally */}
                 <SideCart
                isOpen={isCartOpen}
                onClose={handleCloseCart}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={removeFromCart}
            />
        </div>
    );
}

export default Header;