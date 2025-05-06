
// Importez la fonction de logout
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';// Utilisez useNavigate pour rediriger
import { useAuthStore } from '../../store/authStore.js';
import React, {useEffect, useState} from "react";
import ProfileApiService from "../../services/ProfileApiService.js";

function Profile() {
    const navigate = useNavigate(); // Initialisez useNavigate
 const { user,logout} = useAuthStore();

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
                        alt="User"
                        src={profileImage}
                        className="rounded-circle"
                        style={{
                            width: '100%',
                            height: '100%',
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
                        alt="User"
                        src={profileImage}
                        className="rounded-circle"
                        style={{
                            width: '100%',
                            height: '100%',
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
                    <img
                        src={user.picture ? user.picture : "https://img.freepik.com/vecteurs-premium/icone-profil-avatar-par-defaut-image-utilisateur-medias-sociaux-icone-avatar-gris-silhouette-profil-vide-illustration-vectorielle_561158-3383.jpg"}
                        alt="User"
                        className="rounded-circle"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                );
        }
    };
    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    return (
        <div className="dropdown">
            <button
                className="btn btn-light dropdown-toggle rounded-circle"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                    width: '50px',
                    height: '50px',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    outline: 'none'
                }}
            >
                {renderProfileImage()}
            </button>
            <ul className="dropdown-menu" aria-labelledby="userDropdown" style={{minWidth: '10rem'}}>
                <li>

                    <Link className="dropdown-item" to="/profile">My Profile</Link>
                </li>
                <li>

                    <Link className="dropdown-item" to="/update-password">Settings</Link>
                </li>
                <li>
                    <a className="dropdown-item" onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</a>
                </li>
            </ul>
        </div>
    );
}

export default Profile;
