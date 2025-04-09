import Header from "../components/commun/Header.jsx";

import {Outlet} from "react-router-dom";
import Cart from "../components/commun/Cart.jsx";
import FooterPrinciple from "../components/commun/FooterPrinciple.jsx";
import Header2 from "../components/commun/Header2.jsx";
import BackTo from "../components/commun/backTo.jsx";
import SearchBox from "../components/commun/SearchBox.jsx";


function GlobalInterface() {
    return (
        <div>
          <Header></Header>


          <Outlet/>




            {/* cart area start */}
            <Cart/>
            {/* cart area edn */}
            {/* footer call to action area start */}
            <FooterPrinciple/>
            {/* footer call to action area end */}
            {/* Modal */}
            <div className="modal login-pupup-modal fade" id="exampleModal-login" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Hi, Welcome back!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form action="#" className="login-form">
                                <input type="text" placeholder="Username of Email Address" required />
                                <input type="password" placeholder="Password" required />
                                <div className="d-flex mb--20 align-items-center">
                                    <input type="checkbox" id="examplecheck-modal" />
                                    <label htmlFor="examplecheck-modal">I agree to the terms of use and privacy policy.</label>
                                </div>
                                <button type="submit" className="rts-btn btn-primary">Sign In</button>
                                <p className="dont-acc mt--20">Dont Have an Account? <a href="registration.html">Sign-up</a> </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* header style two */}
            <Header2/>
            {/* header style two End */}
            {/* modal */}
            <div id="myModal-1" className="modal fade" role="dialog">
                <div className="modal-dialog bg_image">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-bs-dismiss="modal"><i className="fa-light fa-x" /></button>
                        </div>
                        <div className="modal-body text-center">
                            <div className="inner-content">
                                <div className="title-area">
                                    <span className="pre">Get Our Courses Free</span>
                                    <h4 className="title">Wonderful for Learning</h4>
                                </div>
                                <form action="#">
                                    <input type="text" placeholder="Your Mail.." required />
                                    <button>Download Now</button>
                                    <span>Your information will never be shared with any third party</span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* rts backto top start */}
            <BackTo/>
            {/* rts backto top end */}
            {/* offcanvase search */}
            <SearchBox/>
            {/* offcanvase search */}
        </div>
    );
}

export default GlobalInterface;