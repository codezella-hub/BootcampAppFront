import React, { useEffect, useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import postApi from "../../services/postApi.js";
import Header from "../commun/Header.jsx";

const CandidatDetailsEntreprise = () => {
  const { id } = useParams();  
  const [candidat, setCandidat] = useState(null); 
  const [post, setPost] = useState(null);
 
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCandidat = async () => {
      try {
        const response = await postApi.getCandidatById(id);
        setCandidat(response.data);

        if (response.data?.posteId) {
          const postResponse = await postApi.getPostById(response.data.posteId);
          setPost(postResponse.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la candidature :", error);
      }
    };
  
    fetchCandidat();
  }, [id]);

  // Fonction pour accepter la candidature
  const handleAccept = async () => {
    try {
      await postApi.acceptCandidat(id); // On suppose que cette API existe
      setCandidat({ ...candidat, status: "accepted" }); // Mise à jour de l'état local
      alert("Candidat accepté !");
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la candidature :", error);
      alert("Une erreur est survenue.");
    }
  };

  // Fonction pour rejeter la candidature
  const handleReject = async () => {
    try {
      await postApi.rejectCandidat(id); // On suppose que cette API existe
      setCandidat({ ...candidat, status: "rejected" }); // Mise à jour de l'état local
      alert("Candidat rejeté !");
    } catch (error) {
      console.error("Erreur lors du rejet de la candidature :", error);
      alert("Une erreur est survenue.");
    }
  };

  if (!candidat) {
    return <p>Chargement...</p>;
  }

  return (
    <>

    <div class="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb-main-wrapper">
                <h1 class="title">Détails de la candidature</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className="candidat-details-container">
      
      <div className="candidat-info">
        <p><strong>Nom:</strong> {candidat.name}</p>
        <p><strong>Email:</strong> {candidat.email}</p>
        <p><strong>Téléphone:</strong> {candidat.phone}</p>
        <p>
  <strong>CV :</strong>{" "}
  <a href={`http://localhost:3000/uploads/candidats/${candidat.cv}`} target="_blank">
  Voir / Télécharger le CV
</a>

</p>

<p>
  <strong>Diplôme :</strong>{" "}
  <a href={`http://localhost:3000/uploads/candidats/${candidat.diplome}`} target="_blank">
    Voir / Télécharger le Diplôme
  </a>
</p>

<p><strong>Poste:</strong> {post ? post.title : "Chargement du poste..."}</p>

        <p><strong>Statut:</strong> <span
              style={{
                color: candidat.status === "accepted" ? "green" :
                       candidat.status === "rejected" ? "red" :
                       "goldenrod",
                fontWeight: "bold"
              }}
            >
              {candidat.status === "accepted" ? "Accepté" :
               candidat.status === "rejected" ? "Rejeté" : "En attente"}
            </span></p>
      </div>
      
      <div className="action-buttons" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
  <button
    onClick={handleAccept}
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      padding: "6px 14px",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.3s"
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
  >
    ✅ Accepter
  </button>

  <button
    onClick={handleReject}
    style={{
      backgroundColor: "#f44336",
      color: "white",
      border: "none",
      padding: "6px 14px",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.3s"
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
  >
    ❌ Rejeter
  </button>
</div>


      <button onClick={() => navigate(-1)} className="rts-btn btn-primary mt-3">
            Retour
            </button>
    </div>
    </>
  );
};

export default CandidatDetailsEntreprise;
