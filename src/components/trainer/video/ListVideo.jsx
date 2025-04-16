import React, { useEffect, useState } from 'react'
import Header from '../../student/Header'
import Footer from '../../student/Footer'
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function ListVideo() {


    const [ListVideo, serVideo] = useState([]);

    useEffect(() => {
        document.title = "List of Videos";

        axios.get(`/api/getAllVideos`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    serVideo(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching videos:", error);
            });
    }, []);

    const handleDeleteVideo = (id) => {
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
                axios.delete(`/api/deleteVideo/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire('Deleted!', 'Video has been deleted.', 'success');
                            serVideo(ListVideo.filter(category => category._id !== id));
                        }
                    })
                    .catch(error => {
                        Swal.fire('Error!', 'Failed to delete vieo.', 'error');
                    });
            }
        });
    };
    return (
        <div>    {/* banner area start */}
            <Header />
            <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main-wrapper">
                                <h1 className="title">List Videos</h1>
                                <div className="pagination-wrapper">
                                    <a href="index-2.html">Home</a>
                                    <i className="fa-regular fa-chevron-right" />
                                    <a className="active" href="add-video.html">List Videos</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="up-coming-events rts-section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* single up coming events */}
                            <div className="upcoming-events-main-wrapper-1">
                                {/* single */}
                                {ListVideo.length > 0 ? (
                                    ListVideo.map(video => (
                                        <div className="single-upcoming-events" key={video._id}>
                                            <Link to={`/UpdateVideo/${video._id}`} className="thumbnail">
                                                <img src={`${video.thumbnail}`} width={300} height={200} alt={video.title}/>
                                            </Link>
                                            <div className="information">
                                                <div className="date-details">
                                                    <div className="date">
                                                        <i className="fa-thin fa-calendar-days" />
                                                        <p> {video.createdAt}</p>
                                                    </div>
                                                    <div className="time">
                                                        <i className="fa-regular fa-clock" />
                                                        <p>{video.duration}</p>
                                                    </div>
                                                </div>
                                                <a href="event-details.html">
                                                    <h5 className="title">{video.title}</h5>
                                                </a>
                                            </div>
                                            <Link to={`/VideoDetail/${video._id}/${video.subCourse._id}`} className="rts-btn btn-primary with-arrow">Watch  <i className="fa-light fa-arrow-right" /></Link>
                                            <button onClick={() => handleDeleteVideo(video._id)} className="rts-btn btn-border">Delete video</button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No video found...</p>
                                )}
              
                            </div>
                            {/* single up coming events end */}
                        </div>
                    </div>
                </div>
            </div>




            <Footer />

        </div>
    )
}

export default ListVideo