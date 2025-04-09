import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore'; // Importez votre store
import { format } from 'date-fns'; // Pour formater les dates

function MyProfile() {
    const navigate = useNavigate();
    const { user } = useAuthStore(); // Récupérez l'utilisateur connecté

    const toProfile = () => {
        navigate('/profile/update-profile');
    };

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        if (!dateString) return 'Non spécifié';
        try {
            return format(new Date(dateString), 'MMMM d, yyyy h:mm a');
        } catch {
            return dateString; // Retourne la valeur originale si le formatage échoue
        }
    };

    return (
        <div className="col-lg-9 rts-sticky-column-item">
            <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
                <h5 className="title">My Profile</h5>

                {/* Registration Date */}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Registration Date</div>
                    <div className="value">
                        {user?.createdAt ? formatDate(user.createdAt) : 'Non spécifié'}
                    </div>
                </div>

                {/* First Name */}
                <div className="my-single-portfolio-dashed">
                    <div className="name">First Name:</div>
                    <div className="value">{user?.firstname || 'Non spécifié'}</div>
                </div>

                {/* Last Name */}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Last Name:</div>
                    <div className="value">{user?.lastname || 'Non spécifié'}</div>
                </div>

                {/* Username */}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Username:</div>
                    <div className="value">{user?.firstname   || 'Non spécifié'} {user?.lastname  || 'Non spécifié'}</div>
                </div>

                {/* Email */}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Email:</div>
                    <div className="value">{user?.email || 'Non spécifié'}</div>
                </div>

                {/* Phone Number */}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Phone Number:</div>
                    <div className="value">{user?.phoneNumber || 'Non spécifié'}</div>
                </div>

                {/* Skill/Occupation */}
                <div className="my-single-portfolio-dashed">
                    <div className="name">Birthday Date</div>
                    <div className="value"> {user?.birthdayDate ? formatDate(user.birthdayDate) : 'Non spécifié'}</div>
                </div>



                <button
                    type="button"
                    className="rts-btn btn-primary"
                    onClick={toProfile}
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
}

export default MyProfile;