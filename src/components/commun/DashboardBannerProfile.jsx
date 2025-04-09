import React, { useRef, useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore.js';
import ProfileApiService from '../../services/ProfileApiService.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faSpinner, faUserCircle } from '@fortawesome/free-solid-svg-icons';

function DashboardBannerProfile() {
    const { user, updateProfilePicture } = useAuthStore();
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation du fichier
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setError('Only JPEG/JPG/PNG images are allowed');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError('File size must be less than 2MB');
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            // Prévisualisation locale
            const previewUrl = URL.createObjectURL(file);
            setProfileImage(previewUrl);
            setImageType('upload');

            // Upload vers le backend
            const response = await ProfileApiService.updateProfilePicture(file);
            updateProfilePicture(response.user);

        } catch (err) {
            console.error('Error uploading image:', err);
            setError(err.response?.data?.message || 'Failed to upload image');

            // Retour à l'image précédente en cas d'erreur
            if (user?.avatar) {
                setProfileImage(user.avatar);
                setImageType('avatar');
            } else {
                setProfileImage(null);
                setImageType('default');
            }
        } finally {
            setIsUploading(false);
        }
    };

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
        <div className="dashboard-banner-area-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="dashboard-banner-area-start bg_image">
                            <div className="rating-area-banner-dashboard">
                                <button
                                    className="create-btn"
                                    onClick={() => fileInputRef.current.click()}
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <>
                                            <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
                                            Update picture
                                        </>
                                    )}
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/jpeg, image/jpg, image/png"
                                    style={{ display: 'none' }}
                                />
                                {error && (
                                    <div className="text-danger small mt-2">{error}</div>
                                )}
                            </div>
                            <div className="author-profile-image-and-name">
                                <div className="profile-pic">
                                    {renderProfileImage()}
                                </div>
                                <div className="name-desig">
                                    <h1 className="title">
                                        {user?.firstname || 'Jon'} {user?.lastname || 'Adam'}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardBannerProfile;