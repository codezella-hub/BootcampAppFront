import React, { useEffect, useState } from "react";
import postApi from "../../services/postApi.js";
import { Link } from "react-router-dom";
import Header from "../student/Header.jsx";

const MyCandidats = () => {
  const [candidats, setCandidats] = useState([]);
  const userId = "67b8be03d74ad328bb66ccb6"; // ID user connecté (statique)

  useEffect(() => {
    const fetchCandidats = async () => {
      try {
        const res = await postApi.getAllCandidats();
        const userCandidats = res.data.filter((candidat) => candidat.idUser === userId);
        setCandidats(userCandidats);
      } catch (err) {
        console.error("Erreur lors de la récupération des candidatures :", err);
      }
    };

    fetchCandidats();
  }, []);

  const deleteCandidat = async (id) => {
    try {
      await postApi.deleteCandidat(id);
      setCandidats(candidats.filter((cand) => cand._id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de la candidature :", err);
    }
  };

  const getStatusBadge = (status) => {
    let color = "";
    let text = "";

    switch (status) {
      case "accepted":
        color = "success";
        text = "Accepté";
        break;
      case "rejected":
        color = "danger";
        text = "Rejeté";
        break;
      default:
        color = "warning";
        text = "En attente";
    }

    return <span className={`badge bg-${color} text-capitalize`}>{text}</span>;
  };

  return (
    <>
      <Header />
  
        <div class="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb-main-wrapper">
                <h1 class="title">Mes Candidatures</h1>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container rts-section-gap">
        <div className="row g-4">
          {candidats.map((candidat) => (
            <div className="col-md-6 col-lg-4" key={candidat._id}>
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title mb-2">{candidat.name}</h5>
                  <div className="mb-3">{getStatusBadge(candidat.status)}</div>

                  <ul className="list-unstyled mb-3">
                    <li><strong>Email :</strong> {candidat.email}</li>
                    <li><strong>Téléphone :</strong> {candidat.phone}</li>
                  </ul>

                  <div className="mb-2">
                    <strong>CV :</strong>{" "}
                    <a
                      href={`http://localhost:3000/uploads/candidats/${candidat.cv}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-underline"
                    >
                      Voir CV
                    </a>
                  </div>
                  <div className="mb-3">
                    <strong>Diplôme :</strong>{" "}
                    <a
                      href={`http://localhost:3000/uploads/candidats/${candidat.diplome}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-underline"
                    >
                      Voir Diplôme
                    </a>
                  </div>

                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/updateCandidat/${candidat._id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      ✏️ Modifier
                    </Link>
                    <button
                      onClick={() => deleteCandidat(candidat._id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {candidats.length === 0 && (
          <div className="text-center mt-5">
            <p className="text-muted">Aucune candidature trouvée.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCandidats;
