import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../cartStore/cartStore';
import SideCart from '../cart/SideCart'; // ✅ Import your SideCart

function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItems, removeFromCart } = useCartStore();

    const handleOpenCart = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    const handleUpdateQuantity = (courseId, newQty) => {
        console.log('Update quantity not yet implemented:', courseId, newQty);
        // OPTIONAL: implement quantity updates in your zustand store later
    };

    return (
        <>
            <header className="header-one v-2 header--sticky">
                <div className="header-top-one-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="header-top-one">
                                    <div className="left-information">
                                        <a href="mailto:someone@example.com" className="email">
                                            <i className="fa-light fa-envelope" /> info@studyhub.com
                                        </a>
                                        <a href="tel:+4733378901" className="email">
                                            <i className="fa-light fa-phone" /> +61 012 012 445
                                        </a>
                                    </div>
                                    <div className="right-information">
                                        <ul className="rts-dropdown-menu switcher-language">
                                            <li className="has-child-menu">
                                                <a href="#">
                                                    <img className="left-image" src="/assets/images/flag-01.svg" alt="Language" />
                                                    <span className="menu-item">English</span>
                                                    <i className="fa-regular fa-chevron-down" />
                                                </a>
                                                {/* Add submenus here */}
                                            </li>
                                        </ul>
                                        <ul className="rts-dropdown-menu switcher-currency">
                                            <li className="has-child-menu">
                                                <a href="#">
                                                    <span className="menu-item">USD</span>
                                                    <i className="fa-regular fa-chevron-down" />
                                                </a>
                                                {/* Add submenus here */}
                                            </li>
                                        </ul>
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
                                    <Link to="/" className="logo-area">
                                        <img src="/assets/images/logo/logo-1.svg" alt="logo" />
                                    </Link>
                                    <div className="main-nav-one">
                                        {/* 🔗 Your menu here (keep it as is) */}
                                    </div>
                                </div>
                                <div className="header-right-area-one">
                                    <div className="actions-area">
                                        <div className="search-btn" id="search">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                <path d="M19.9375 18.9652L14.7454 13.7732..." fill="#553CDF" />
                                            </svg>
                                        </div>

                                        {/* ✅ Cart icon updated */}
                                        <div className="cart cart-icon" onClick={handleOpenCart} style={{ cursor: 'pointer', position: 'relative' }}>
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
                                        <Link to="/login" className="rts-btn btn-primary">Sign In</Link>
                                        <Link to="/register" className="rts-btn btn-primary">Sign Up</Link>
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

            {/* ✅ Mount the SideCart here */}
            <SideCart
                isOpen={isCartOpen}
                onClose={handleCloseCart}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={removeFromCart}
            />
        </>
    );
}

export default Header;
