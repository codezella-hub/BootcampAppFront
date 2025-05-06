import  { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import axios from 'axios';
import "./ProfileUpdate.css"

function ProfileUpdate() {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    age: '',
    birthdayDate: '',
    phoneNumber: '',
    gender: 'male'
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pré-remplir le formulaire avec les données utilisateur
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        age: user.age?.toString() || '',
        birthdayDate: user.birthdayDate ? new Date(user.birthdayDate).toISOString().split('T')[0] : '',
        phoneNumber: user.phoneNumber || '',
        gender: user.gender || 'male'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = 'Le prénom est requis';
    if (!formData.lastname.trim()) newErrors.lastname = 'Le nom est requis';

    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum <= 0 || !Number.isInteger(ageNum)) {
      newErrors.age = 'L\'âge doit être un entier positif';
    }

    if (!formData.birthdayDate) newErrors.birthdayDate = 'La date de naissance est requise';

    if (!/^\+?[0-9]{7,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Format de téléphone invalide';
    }

    if (!['male', 'female'].includes(formData.gender)) {
      newErrors.gender = 'Genre non valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.put(
          'http://localhost:3000/api/profile',
          {
            ...formData,
            age: parseInt(formData.age, 10)
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
      );

      setSuccess('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({
        server: error.response?.data?.message || 'Erreur lors de la mise à jour du profil'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <>

        <div className="col-lg-9">
          <div className="settings-wrapper-dashed">
            <h5 className="title">Update Profile</h5>
            <ul className="nav nav-pills mb-3 tab-buttons" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                    className="nav-link active"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="true"
                >
                  Profile
                </button>
              </li>
            </ul>

            <div className="tab-content" id="pills-tabContent">
              <div
                  className="tab-pane fade show active"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
              >
                <div className="setting-change-password-area">
                  <form className="form-password-area" onSubmit={handleSubmit}>
                    {errors.server && (
                        <div className="alert alert-danger" role="alert">
                          {errors.server}
                        </div>
                    )}
                    {success && (
                        <div className="alert alert-success" role="alert">
                          {success}
                        </div>
                    )}

                    <div className="single-input">
                      <label htmlFor="firstname">Prénom</label>
                      <input
                          id="firstname"
                          type="text"
                          value={formData.firstname}
                          onChange={handleChange}
                          className={errors.firstname ? 'is-invalid' : ''}
                      />
                      {errors.firstname && (
                          <div className="invalid-feedback">{errors.firstname}</div>
                      )}
                    </div>

                    <div className="single-input">
                      <label htmlFor="lastname">Nom</label>
                      <input
                          id="lastname"
                          type="text"
                          value={formData.lastname}
                          onChange={handleChange}
                          className={errors.lastname ? 'is-invalid' : ''}
                      />
                      {errors.lastname && (
                          <div className="invalid-feedback">{errors.lastname}</div>
                      )}
                    </div>

                    <div className="single-input">
                      <label htmlFor="age">Âge</label>
                      <input
                          id="age"
                          type="number"
                          min="1"
                          value={formData.age}
                          onChange={handleChange}
                          className={errors.age ? 'is-invalid' : ''}
                      />
                      {errors.age && (
                          <div className="invalid-feedback">{errors.age}</div>
                      )}
                    </div>

                    <div className="single-input">
                      <label htmlFor="birthdayDate">Date de naissance</label>
                      <input
                          id="birthdayDate"
                          type="date"
                          value={formData.birthdayDate}
                          onChange={handleChange}
                          className={errors.birthdayDate ? 'is-invalid' : ''}
                      />
                      {errors.birthdayDate && (
                          <div className="invalid-feedback">{errors.birthdayDate}</div>
                      )}
                    </div>

                    <div className="single-input">
                      <label htmlFor="phoneNumber">Téléphone</label>
                      <input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className={errors.phoneNumber ? 'is-invalid' : ''}
                          placeholder="+1234567890"
                      />
                      {errors.phoneNumber && (
                          <div className="invalid-feedback">{errors.phoneNumber}</div>
                      )}
                    </div>

                    <div className="single-input">
                      <label htmlFor="gender">Genre</label>
                      <select
                          id="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={errors.gender ? 'is-invalid' : ''}
                      >
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                      </select>
                      {errors.gender && (
                          <div className="invalid-feedback">{errors.gender}</div>
                      )}
                    </div>

                    <button
                        type="submit"
                        className="rts-btn btn-primary"
                        disabled={isLoading}
                    >
                      {isLoading ? (
                          <span>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                En cours...
                                            </span>
                      ) : (
                          'Mettre à jour'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default ProfileUpdate;