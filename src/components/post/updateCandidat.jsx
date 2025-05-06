import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postApi from "../../services/postApi.js";
import Header from "../commun/Header.jsx";
import { useAuthStore } from '../../store/authStore.js';

const UpdateCandidat = () => {
  const { id } = useParams(); // id du candidat
  const navigate = useNavigate();
  const { user} = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    idUser: user._id,
    cv: null,
    diplome: null,
  });

  const [cvName, setCvName] = useState("");
  const [diplomeName, setDiplomeName] = useState("");

  useEffect(() => {
    const fetchCandidat = async () => {
      try {
        const res = await postApi.getCandidatById(id);
        const data = res.data;
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          idUser: data.idUser || user._id,
          cv: null,
          diplome: null,
        });
        setCvName(data.cv);
        setDiplomeName(data.diplome);
      } catch (err) {
        console.error("Erreur lors de la récupération du candidat :", err);
      }
    };

    fetchCandidat();
  }, [id]);

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
    form.append("idUser", formData.idUser);
    if (formData.cv) form.append("cv", formData.cv);
    if (formData.diplome) form.append("diplome", formData.diplome);

    try {
      await postApi.updateCandidat(id, form);
      alert("Candidature mise à jour avec succès !");
      navigate("/Mycandidats");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <>

      <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-main-wrapper">
                <h1 className="title">Modifier Candidature</h1>
                <div className="pagination-wrapper">
                  <a href="/Mycandidats">Mes Candidatures</a>
                  <i className="fa-regular fa-chevron-right"></i>
                  <a className="active" href="#">Modifier</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "30px",
          padding: "40px",
        }}
      >
        <div style={{ flex: 1, maxWidth: "600px" }}>
          <h2>Modifier la candidature</h2>
          <form onSubmit={handleSubmit} className="contact-page-form" encType="multipart/form-data">
            <div className="single-input">
              <label htmlFor="name">Nom*</label>
              <input name="name" type="text" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="single-input">
              <label htmlFor="email">Email*</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="single-input">
              <label htmlFor="phone">Téléphone*</label>
              <input name="phone" type="text" value={formData.phone} onChange={handleChange} required />
            </div>

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
                  {cvName && <p>Fichier actuel : {cvName}</p>}
                </div>
              </div>
            </div>

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
                  {diplomeName && <p>Fichier actuel : {diplomeName}</p>}
                </div>
              </div>
            </div>

            <button type="submit" className="rts-btn btn-primary mt-3">
              Mettre à jour la candidature
            </button>
          </form>
        </div>

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

export default UpdateCandidat;
