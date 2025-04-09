import React, {useEffect, useState} from 'react';
import ProfileApiService from "../../services/ProfileApiService.js";
import {useAuthStore} from "../../store/authStore.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

function DashboardBanner() {
    const { user } = useAuthStore();
    const [profileImage, setProfileImage] = useState(null);
    const [imageType, setImageType] = useState('default'); // 'upload' | 'avatar' | 'default'
    // Charger l'image de profil
    useEffect(() => {
        const loadProfileImage = async () => {
            try {
                // Cas 1: Si user.picture existe, c'est une image uploadée
                if (user?.picture) {
                    const imageUrl = await ProfileApiService.getProfilePicture();
                    if (imageUrl) {
                        setProfileImage(imageUrl);
                        setImageType('upload');
                        return;
                    }
                }

                // Cas 2: Si user.avatar existe, c'est une URL Google
                if (user?.avatar) {
                    setProfileImage(user.avatar);
                    setImageType('avatar');
                    return;
                }

                // Cas 3: Par défaut, on utilise l'icône
                setImageType('default');

            } catch (error) {
                console.error("Error loading profile image:", error);
                setImageType('default');
            }
        };

        loadProfileImage();

        // Nettoyage des URLs blob
        return () => {
            if (imageType === 'upload' && profileImage) {
                URL.revokeObjectURL(profileImage);
            }
        };
    }, [user?.picture, user?.avatar]);
    const renderProfileImage = () => {
        switch(imageType) {
            case 'upload':
                return (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                        style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'cover'
                        }}
                        onError={() => {
                            // Fallback sur l'avatar ou l'icône
                            if (user?.avatar) {
                                setProfileImage(user.avatar);
                                setImageType('avatar');
                            } else {
                                setProfileImage(null);
                                setImageType('default');
                            }
                        }}
                    />
                );

            case 'avatar':
                return (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                        style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'cover'
                        }}
                        onError={() => {
                            // Fallback sur l'icône
                            setProfileImage(null);
                            setImageType('default');
                        }}
                    />
                );

            default:
                return (
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        className="text-secondary"
                        style={{
                            fontSize: '150px',
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%'
                        }}
                    />
                );
        }
    };
    return (
        <div>
            {/* dashboard banner area start */}
            <div className="dashboard-banner-area-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="dashboard-banner-area-start bg_image">
                                <div className="rating-area-banner-dashboard">
                                    <div className="stars">
                                        <span>4.5</span>
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-solid fa-star" />
                                        <i className="fa-regular fa-star" />
                                    </div>
                                    <p>Digital Marketing Instructor</p>
                                    <a href="create-course.html" className="create-btn"><i className="fa-regular fa-circle-plus" /> Create a New Course</a>
                                </div>
                                <div className="author-profile-image-and-name">
                                    <div className="profile-pic">
                                        {renderProfileImage()}
                                    </div>
                                    <div className="name-desig">
                                        <h1 className="title"> {user?.firstname || 'Jon'} {user?.lastname || 'Adam'}</h1>
                                        <div className="course-vedio">
                                            <div className="single">
                                                <i className="fa-light fa-users" />
                                                <span>1350 Students</span>
                                            </div>
                                            <div className="single">
                                                <i className="fa-regular fa-video" />
                                                <span>26 Course</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* dashboard banner area end */}
        </div>
    );
}

export default DashboardBanner;