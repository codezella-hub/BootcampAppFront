import React, { useEffect, useState } from "react";
import postApi from "../../services/postApi.js";
import { useParams, useNavigate  } from "react-router-dom";
import Header from "../commun/Header.jsx";
import { useAuthStore } from '../../store/authStore.js';

const UpdatePost = () => {
  const { id } = useParams();
  const { user} = useAuthStore(); 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    company: "",
    salary: "",
    idUser: user._id, 
  });
  const navigate = useNavigate(); 

  // Récupérer les données du post existant
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await postApi.getPostById(id); 
        const postData = response.data;
        setFormData({
          title: postData.title,
          description: postData.description,
          requirements: postData.requirements.join(", "), 
          location: postData.location,
          company: postData.company,
          salary: postData.salary,
          idUser: postData.idUser,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du post :", error);
        alert("Impossible de récupérer le post.");
      }
    };

    fetchPostData();
  }, [id]); 

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer l'envoi du formulaire pour mettre à jour le post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      ...formData,
      salary: Number(formData.salary),
      requirements: formData.requirements
        .split(",")
        .map((req) => req.trim())
        .filter((req) => req),
    };

    try {
      await postApi.updatePost(id, updatedPost); 
      alert("Offre mise à jour avec succès !");
      navigate("/Myposts");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du post :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <>


      {/* BREADCRUMB */}
      <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-main-wrapper">
                <h1 className="title">Mise à jour de l'offre</h1>
                <div className="pagination-wrapper">
                  <a href="/posts">Jobs</a>
                  <i className="fa-regular fa-chevron-right"></i>
                  <a className="active" href="#">Modifier l'offre</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FORMULAIRE + ILLUSTRATION */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "30px",
          padding: "40px",
        }}
      >
        {/* Formulaire */}
        <div style={{ flex: 1, maxWidth: "600px" }}>
          <h2>Modifier l'offre</h2>
          <form onSubmit={handleSubmit} className="contact-page-form">
            <div className="single-input">
              <label htmlFor="title">Titre*</label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="single-input">
              <label htmlFor="description">Description*</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="single-input">
              <label htmlFor="requirements">
                Compétences (séparées par des virgules)
              </label>
              <input
                name="requirements"
                type="text"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="ex: React, Node.js, MongoDB"
              />
            </div>

            <div className="single-input">
              <label htmlFor="location">Lieu</label>
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="single-input">
              <label htmlFor="company">Entreprise</label>
              <input
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="single-input">
              <label htmlFor="salary">Salaire (TND)</label>
              <input
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="rts-btn btn-primary mt-3">
              Mettre à jour l'offre
            </button>
          </form>
        </div>

        {/* Illustration à droite */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="/assets/images/about/05.jpg"
            alt="Ajouter une offre illustration"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
