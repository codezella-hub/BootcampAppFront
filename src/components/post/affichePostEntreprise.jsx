import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import postApi from "../../services/postApi.js"; // Assurez-vous que postApi contient toutes les méthodes nécessaires
import Header from "../student/Header.jsx";
import forumApi from "../../services/forumApi.js"; // Assurez-vous d'avoir un service forumApi pour récupérer l'utilisateur


const AffichePostEntreprise = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [candidates, setCandidates] = useState([]);
 

  // Récupérer les détails du poste
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postApi.getPostById(id);
        const postData = response.data;
        setPost(postData);

        // Récupérer les candidats associés à ce poste
        if (postData._id) {
          const candidatesResponse = await postApi.getCandidatsByPost(postData._id);
          setCandidates(candidatesResponse.data);
        }

        // Récupérer les informations de l'utilisateur qui a publié le poste
        if (postData.idUser) {
          try {
            const userResponse = await forumApi.getuserById(postData.idUser);
            setUser(userResponse.data);
          } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du post :", error);
      }
    };

    fetchPost();
  }, [id]);

  // Fonction pour accepter un candidat
  const handleAcceptCandidate = async (candidateId) => {
    try {
      await postApi.acceptCandidat(candidateId);
      alert("Candidat accepté !");
      setCandidates(candidates.map(candidate =>
        candidate._id === candidateId ? { ...candidate, status: "accepted" } : candidate
      ));
    } catch (error) {
      console.error("Erreur lors de l'acceptation du candidat :", error);
      alert("Une erreur est survenue lors de l'acceptation.");
    }
  };

  // Fonction pour rejeter un candidat
  const handleRejectCandidate = async (candidateId) => {
    try {
      await postApi.rejectCandidat(candidateId);
      alert("Candidat rejeté !");
      setCandidates(candidates.map(candidate =>
        candidate._id === candidateId ? { ...candidate, status: "rejected" } : candidate
      ));
    } catch (error) {
      console.error("Erreur lors du rejet du candidat :", error);
      alert("Une erreur est survenue lors du rejet.");
    }
  };

  if (!post) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <Header />
      <div className="course-details-breadcrumb-1 bg_image rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="single-course-left-align-wrapper">
                <div className="meta-area">
                  <a href="/posts">Jobs</a>
                  <i className="fa-solid fa-chevron-right"></i>
                  <a className="active" href="#">Job Details</a>
                </div>
                <h1 className="title">{post.title}</h1>
                <div className="rating-area">
                  <div className="calender-area-stars">
                    <i className="fa-light fa-calendar-lines-pen"></i>
                    <span>Publié le : {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="author-area">
                  <div className="author">
                    {user && (
                      <img
                        src={`http://localhost:3000${user.image}`}
                        alt={user.fullName}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "10px"
                        }}
                      />
                    )}
                    <h6 className="name"><span>By </span> {post.company}</h6>
                  </div>
                  <p><span>Lieu: </span> {post.location}</p>
                </div>
                <div className="author-area">
                  <p><span>Salaire :</span> {post.salary} TND</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tab-content mt--50" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <div className="course-content-wrapper">
            <div className="module-wrapper">
              <h5 className="title">Description</h5>
              <p className="disc">{post.description}</p>
              <h6 className="title">Exigences</h6>
              <div className="inner-content">
                <div className="single-wrapper">
                  {post.requirements.map((req, index) => (
                    <div className="single-codule" key={index}>
                      <i className="fa-regular fa-check"></i>
                      <p>{req}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button>
              <Link to={`/addCandidat/${post._id}`} className="rts-btn btn-primary mt-2">
                Postuler
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Candidats */}
<div style={{ marginTop: "40px" }}>
  <h5>Candidats pour cette offre</h5>
  
  {candidates.length === 0 ? (
    <p>Aucun candidat pour cette offre.</p>
  ) : (
    <ul>
      {candidates.map((candidate) => (
        <li key={candidate._id} style={{ marginBottom: "10px" }}>
          <div>
            <strong>{candidate.name}</strong>
            <p>{candidate.email}</p>
            <span
              style={{
                color: candidate.status === "accepted" ? "green" :
                       candidate.status === "rejected" ? "red" :
                       "goldenrod",
                fontWeight: "bold"
              }}
            >
              {candidate.status === "accepted" ? "Accepté" :
               candidate.status === "rejected" ? "Rejeté" : "En attente"}
            </span>
          </div>
          <Link to={`/CandidatDetailsEntreprise/${candidate._id}`} className="rts-btn btn-primary mt-2">
            Afficher
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>

    </>
  );
};

export default AffichePostEntreprise;
