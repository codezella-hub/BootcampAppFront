import React, { useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import postApi from "../../services/postApi.js";
import Header from "../commun/Header.jsx";
import { useAuthStore } from '../../store/authStore.js';

const AddCandidat = () => {
  const { postId } = useParams();
  const { user} = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    idUser: user._id,
    cv: null,
    diplome: null,
  });
  const navigate = useNavigate(); 
  const [cvName, setCvName] = useState("");
  const [diplomeName, setDiplomeName] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === "cv") setCvName(files[0].name);
      if (name === "diplome") setDiplomeName(files[0].name);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("posteId", postId);
    form.append("cv", formData.cv);
    form.append("diplome", formData.diplome);
    form.append("idUser", formData.idUser);

    try {
      await postApi.addCandidat(form);
      alert("Candidature envoyée avec succès !");
      setFormData({
        name: "",
        email: "",
        phone: "",
        cv: null,
        diplome: null,
      });
      setCvName("");
      setDiplomeName("");
      navigate(-1);
    } catch (error) {
      console.error("Erreur lors de l'ajout du candidat :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <>
      <Header />
      {/* BREADCRUMB */}
      <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-main-wrapper">
                <h1 className="title">Candidature</h1>
                <div className="pagination-wrapper">
                  <a href="/posts">Jobs</a>
                  <i className="fa-regular fa-chevron-right"></i>
                  <a className="active" href="#">Postuler</a>
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
          <h2>Postuler à cette offre</h2>
          <form onSubmit={handleSubmit} className="contact-page-form" encType="multipart/form-data">
            <div className="single-input">
              <label htmlFor="name">Nom*</label>
              <input name="name" type="text" onChange={handleChange} required />
            </div>
            <div className="single-input">
              <label htmlFor="email">Email*</label>
              <input name="email" type="email" onChange={handleChange} required />
            </div>
            <div className="single-input">
              <label htmlFor="phone">Téléphone*</label>
              <input name="phone" type="text" onChange={handleChange} required />
            </div>

            {/* CV */}
            <div className="single-input">
              <label htmlFor="cv">CV (PDF)</label>
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                style={{ display: "none" }}
                id="cv"
              />
              <div className="course-thumbnail-upload-area">
                <div className="information">
                  <button
                    type="button"
                    className="rts-btn btn-primary"
                    onClick={() => document.getElementById("cv").click()}
                  >
                    Upload CV
                  </button>
                  {cvName && <p>Fichier sélectionné : {cvName}</p>}
                </div>
              </div>
            </div>

            {/* Diplôme */}
            <div className="single-input">
              <label htmlFor="diplome">Diplôme (PDF)</label>
              <input
                type="file"
                name="diplome"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                style={{ display: "none" }}
                id="diplome"
              />
              <div className="course-thumbnail-upload-area">
                <div className="information">
                  <button
                    type="button"
                    className="rts-btn btn-primary"
                    onClick={() => document.getElementById("diplome").click()}
                  >
                    Upload Diplôme
                  </button>
                  {diplomeName && <p>Fichier sélectionné : {diplomeName}</p>}
                </div>
              </div>
            </div>

            <button type="submit" className="rts-btn btn-primary mt-3">Envoyer la candidature</button>
          </form>
        </div>

        {/* Illustration à droite */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="/assets/images/about/05.jpg"
            alt="Candidature Illustration"
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

export default AddCandidat;
