import React from 'react';

function BeforeFooter() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="call-to-sction bg_image shape-move">
                            <h2 className="title">Skills Certificate From <br/> the Studyhub</h2>
                            <a href="course-one.html" className="rts-btn btn-primary-white with-arrow">View All
                                Course <i className="fa-regular fa-arrow-right"/></a>
                            <div className="cta-image">
                                <img src="assets/images/cta/women.png" alt/>
                            </div>
                            <div className="shape-image">
                                <div className="shape one" data-speed="0.04"><img src="assets/images/cta/03.svg" alt/>
                                </div>
                                <div className="shape two" data-speed="0.04"><img src="assets/images/cta/04.svg" alt/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BeforeFooter;