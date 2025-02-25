
// Importez la fonction de logout
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate pour rediriger
import {logout ,logout1} from "../../services/authService";
function Profile() {
    const navigate = useNavigate(); // Initialisez useNavigate

    const handleLogout = async () => {
        await logout();
        logout1(); // Appelle la fonction de logout
        navigate('/login'); // Redirige vers la page de connexion
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
                <img
                    src="https://img.freepik.com/vecteurs-premium/icone-profil-avatar-par-defaut-image-utilisateur-medias-sociaux-icone-avatar-gris-silhouette-profil-vide-illustration-vectorielle_561158-3383.jpg"
                    alt="User"
                    className="rounded-circle"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </button>
            <ul className="dropdown-menu" aria-labelledby="userDropdown" style={{ minWidth: '10rem' }}>
                <li>
                    <a className="dropdown-item" href="#/profile">My Profile</a>
                </li>
                <li>
                    <a className="dropdown-item" href="#/settings">Settings</a>
                </li>
                <li>
                    <a className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
                </li>
            </ul>
        </div>
    );
}

export default Profile;
