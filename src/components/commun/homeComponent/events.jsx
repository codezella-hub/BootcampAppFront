import React from "react";


function Events() {
    return (
        <div>
            <div className="up-coming-events rts-section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-area-center-style">
                                <div className="pre-title">
                                    <img src="assets/images/banner/bulb.png" alt="icon"/>
                                    <span>Our Event</span>
                                </div>
                                <h2 className="title">Upcoming Events</h2>
                                <p className="post-title">You'll find something to spark your curiosity and enhance</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt--50">
                        <div className="col-lg-12">
                            {/* single up coming events */}
                            <div className="upcoming-events-main-wrapper-1">
                                {/* single */}
                                <div className="single-upcoming-events">
                                    <div className="img-information">
                                        <a href="event-details.html" className="thumbnail">
                                            <img src="assets/images/events/01.jpg" alt="events"/>
                                        </a>
                                        <div className="information">
                                            <div className="date-details">
                                                <div className="date">
                                                    <i className="fa-thin fa-calendar-days"/>
                                                    <p> December 26, 2023</p>
                                                </div>
                                                <div className="time">
                                                    <i className="fa-regular fa-clock"/>
                                                    <p>10:30 am</p>
                                                </div>
                                                <div className="location">
                                                    <i className="fa-thin fa-location-dot"/>
                                                    <p>Yarra Park, Melbourne</p>
                                                </div>
                                            </div>
                                            <a href="event-details.html">
                                                <h5 className="title">EduFest 2023: Igniting Minds, Transforming
                                                    Lives </h5>
                                            </a>
                                        </div>
                                    </div>
                                    <a href="event-details.html" className="rts-btn btn-primary with-arrow">Get
                                        Ticket <i className="fa-light fa-arrow-right"/></a>
                                </div>
                                {/* single */}
                                {/* single */}
                                <div className="single-upcoming-events">
                                    <div className="img-information">
                                        <a href="event-details.html" className="thumbnail">
                                            <img src="assets/images/events/02.jpg" alt="events"/>
                                        </a>
                                        <div className="information">
                                            <div className="date-details">
                                                <div className="date">
                                                    <i className="fa-thin fa-calendar-days"/>
                                                    <p> December 26, 2023</p>
                                                </div>
                                                <div className="time">
                                                    <i className="fa-regular fa-clock"/>
                                                    <p>10:30 am</p>
                                                </div>
                                                <div className="location">
                                                    <i className="fa-thin fa-location-dot"/>
                                                    <p>Yarra Park, Melbourne</p>
                                                </div>
                                            </div>
                                            <a href="event-details.html">
                                                <h5 className="title">EdTech Summit: Revolutionizing Learning</h5>
                                            </a>
                                        </div>
                                    </div>
                                    <a href="event-details.html" className="rts-btn btn-primary with-arrow">Get
                                        Ticket <i className="fa-light fa-arrow-right"/></a>
                                </div>
                                {/* single */}
                                {/* single */}
                                <div className="single-upcoming-events">
                                    <div className="img-information">
                                        <a href="event-details.html" className="thumbnail">
                                            <img src="assets/images/events/03.jpg" alt="events"/>
                                        </a>
                                        <div className="information">
                                            <div className="date-details">
                                                <div className="date">
                                                    <i className="fa-thin fa-calendar-days"/>
                                                    <p> December 26, 2023</p>
                                                </div>
                                                <div className="time">
                                                    <i className="fa-regular fa-clock"/>
                                                    <p>10:30 am</p>
                                                </div>
                                                <div className="location">
                                                    <i className="fa-thin fa-location-dot"/>
                                                    <p>Yarra Park, Melbourne</p>
                                                </div>
                                            </div>
                                            <a href="event-details.html">
                                                <h5 className="title">Teaching Tomorrow: A Symposium on Modern</h5>
                                            </a>
                                        </div>
                                    </div>
                                    <a href="event-details.html" className="rts-btn btn-primary with-arrow">Get
                                        Ticket <i className="fa-light fa-arrow-right"/></a>
                                </div>
                                {/* single */}
                            </div>
                            {/* single up coming events end */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Events;