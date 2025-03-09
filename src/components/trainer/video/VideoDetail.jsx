import React, { useEffect, useState } from 'react';
import Header from '../../student/Header';
import Footer from '../../student/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VideoDetail() {
    const [video, setVideo] = useState(null);
    const { id } = useParams(); // Get the video ID from the URL

    useEffect(() => {
        axios.get(`/api/getVideo/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setVideo(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching video:", error);
            });
    }, [id]);

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            {/* bread crumb area */}
            <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main-wrapper">
                                <h1 className="title">{video.title}</h1>
                                {/* breadcrumb pagination area */}
                                <div className="pagination-wrapper">
                                    <a href="/">Home</a>
                                    <i className="fa-regular fa-chevron-right" />
                                    <a className="active" href={`/video/${id}`}>Video Details</a>
                                </div>
                                {/* breadcrumb pagination area end */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* bread crumb area end */}
            {/* rts-events area start */}
            <div className="rts-events-area rts-section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="thumbnail-large-image">
                                <video width="100%" height="auto" controls>
                                    <source src={video.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="single-upcoming-events" key={video._id} style={{ margin: '40px 40px 60px 40px' }} >
                <div className="information">
                    <a>
                        <h5 className="title">Get a certification</h5>
                    </a>
                </div>
                <a className="rts-btn btn-primary with-arrow">Start quiz</a>
            </div>
            </div>
     
            {/* rts-events area end */}
            <Footer />
        </div>
    );
}

export default VideoDetail;