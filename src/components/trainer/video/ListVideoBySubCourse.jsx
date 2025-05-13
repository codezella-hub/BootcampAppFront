import React, { useEffect, useState } from 'react'
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'
import Swal from 'sweetalert2';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ListVideoBySubCourse() {
    const { id } = useParams();


    const [ListVideo, serVideo] = useState([]);

    useEffect(() => {
        document.title = "List of Videos";

        axios.get(`/api/getVideosBySubCourse/${id}`)
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
        <div className="col-lg-9">    {/* banner area start */}


            <div className="up-coming-events rts-section-gap">
                <div className="container">
                    <div className="row">

                        {/* single up coming events */}
                        <div
                            className="upcoming-events-main-wrapper-1"
                            style={{
                                position: 'relative',
                                paddingTop: '60px', // Make space for the top-right button
                            }}
                        >
                            {/* Fixed Top-right Add Video button */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    zIndex: 1000,
                                }}
                            >
                                <Link to="/AddVideo" className="rts-btn btn-primary">
                                    Add New Video
                                </Link>
                            </div>

                            {/* Video list or fallback message */}
                            {ListVideo.length > 0 ? (
                                ListVideo.map((video) => (
                                    <div className="single-upcoming-events" key={video._id}>
                                        <Link to={`/UpdateVideo/${video._id}`} className="thumbnail">
                                            <img
                                                src={video.thumbnail}
                                                width={300}
                                                height={200}
                                                alt={video.title}
                                            />
                                        </Link>
                                 <div className="information" style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
    <div className="date-details" style={{
      display: 'flex',
      gap: '16px',
      fontSize: '14px',
      color: '#666'
    }}>
      <div className="date" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <i className="fa-thin fa-calendar-days" />
        <p style={{ margin: '0' }}>{new Date(video.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="time" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <i className="fa-regular fa-clock" />
        <p style={{ margin: '0' }}>{video.duration}</p>
      </div>
    </div>
    
    <h5 className="title" style={{
      margin: '0',
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }}>{video.title}</h5>
  </div>
  
  <div style={{
    display: 'flex',
    gap: '12px',
    marginTop: 'auto'
  }}>
    <Link
      to={`/VideoDetail/${video._id}/${video.subCourse._id}`}
      className="rts-btn btn-primary with-arrow"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 16px',
        backgroundColor: '#2563eb',
        color: 'white',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'background-color 0.2s ease',
        flex: '1',
        ':hover': {
          backgroundColor: '#1d4ed8'
        }
      }}
    >
      Watch <i className="fa-light fa-arrow-right" style={{ marginLeft: '8px' }} />
    </Link>
    
    <button
      onClick={() => handleDeleteVideo(video._id)}
      className="rts-btn btn-border"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 16px',
        backgroundColor: 'transparent',
        color: '#dc2626',
        border: '1px solid #dc2626',
        borderRadius: '6px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        flex: '1',
        ':hover': {
          backgroundColor: '#fee2e2'
        }
      }}
    >
      Delete video
    </button>
  </div>
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







    )
}

export default ListVideoBySubCourse