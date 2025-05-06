import React from 'react';

function Cart() {
    return (
        <div>
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
                            <div className="product-thumb"><img src="assets/images/course/cart/02.jpg" alt="product-thumb" /></div>
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
    );
}

export default Cart;