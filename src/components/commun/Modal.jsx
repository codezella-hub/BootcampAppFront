import React from 'react';

function Modal() {
    return (
        <div>
            <div className="modal-dialog bg_image">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-bs-dismiss="modal"><i className="fa-light fa-x"/>
                        </button>
                    </div>
                    <div className="modal-body text-center">
                        <div className="inner-content">
                            <div className="title-area">
                                <span className="pre">Get Our Courses Free</span>
                                <h4 className="title">Wonderful for Learning</h4>
                            </div>
                            <form action="#">
                                <input type="text" placeholder="Your Mail.." required/>
                                <button>Download Now</button>
                                <span>Your information will never be shared with any third party</span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;