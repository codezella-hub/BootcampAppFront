import Header from "../components/commun/Header.jsx";


import {Outlet} from "react-router-dom";
import FooterSecond from "../components/commun/FooterSecond.jsx";
import Cart from "../components/commun/Cart.jsx";
import Header2 from "../components/commun/Header2.jsx";
import Modal from "../components/commun/Modal.jsx";
import BackTo from "../components/commun/backTo.jsx";
import SearchBox from "../components/commun/SearchBox.jsx";
import SideBarProfile from "../components/commun/SideBarProfile.jsx";
import DashboardBannerProfile from "../components/commun/DashboardBannerProfile.jsx";


function UpdateProfileInterface() {
    return (
        <div>
            <Header/>
            <DashboardBannerProfile/>

            <div className="dashboard--area-main pt--100">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-3 rts-sticky-column-item">
                            <SideBarProfile/>
                        </div>
                        <Outlet/>
                    </div>
                </div>
            </div>

            {/* rts dahboard-area-main-wrapper end */}
            <div className="rts-section-gapTop">
            </div>

            <FooterSecond/>
            <Cart/>
            <Header2/>
            <div id="myModal-1" className="modal fade" role="dialog">
                <Modal></Modal>
            </div>
            <BackTo/>
            <SearchBox/>
        </div>
    );
}

export default UpdateProfileInterface;