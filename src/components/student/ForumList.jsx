import React, { useState, useEffect } from "react";
import Header from "./Header";
import forumApi from "../../services/forumApi"; // Assure-toi que le chemin est correct

function ForumList() {
  const [forums, setForums] = useState([]); // État pour stocker la liste des forums
  const [categories, setCategories] = useState([]); // État pour les catégories
  const [selectedCategory, setSelectedCategory] = useState(""); // État pour la catégorie sélectionnée
  const [activeTab, setActiveTab] = useState("list"); // Nouvel état pour gérer l'onglet actif
  
  useEffect(() => {
    // Appel à la fonction pour récupérer les forums
    const fetchForums = async () => {
      try {
        const response = await forumApi.getAllForums(); // Récupérer les forums
        setForums(response.data); // Mettre à jour l'état avec les forums récupérés
      } catch (error) {
        console.error("Erreur lors de la récupération des forums", error);
      }
    };
    const fetchCategories = async () => {
        try {
          const response = await forumApi.getCategories(); 
          setCategories(response.data); // Mettre à jour les catégories
        } catch (error) {
          console.error("Erreur lors de la récupération des catégories", error);
        }
      };
  
    fetchCategories();
    fetchForums(); // Appeler la fonction lors du premier rendu du composant
  }, []);
  
  // Filtrer les forums en fonction de la catégorie sélectionnée
  const filteredForums = selectedCategory 
    ? forums.filter(forum => forum.categorie === selectedCategory) 
    : forums;

  // Fonction pour changer d'onglet (Grid/List)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Fonction pour gérer la sélection de catégorie
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="col-lg-9 mx-auto">
        {/* filter top-area */}
        <div className="filter-small-top-full">
          <div className="left-filter">
            <span>Catégorie</span>
            <select 
              className="nice-select" 
              id="categorie" 
              name="categorie" 
              value={selectedCategory} 
              onChange={handleCategoryChange}
            >
              <option value="">Toutes catégories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          <div className="right-filter">
            <span>Showing {filteredForums.length} results</span>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "grid" ? "active" : ""}`}
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected={activeTab === "grid"}
                  onClick={() => handleTabChange("grid")}
                >
                  <i className="fa-light fa-grid-2"></i>
                  <span>Grid</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "list" ? "active" : ""}`}
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected={activeTab === "list"}
                  onClick={() => handleTabChange("list")}
                >
                  <i className="fa-light fa-list"></i>
                  <span>List</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* filter top-area end */}
        
        <div className="tab-content" id="myTabContent">
          <div
            className={`tab-pane fade ${activeTab === "grid" ? "show active" : ""}`}
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="row g-5 mt--30 justify-content-center">
              {filteredForums.map((forum) => (
                <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={forum.id}>
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href={`forum/${forum._id}`} className="thumbnail">
                      <img src={forum.image} alt="forum" />
                    </a>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>{forum.categorie}</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen"></i>
                        <span>{forum.likeCount} Likes</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-comment-dots"></i>
                        <span>{forum.commentCount} Comments</span>
                      </div>
                    </div>
                    <a href={`forum/${forum._id}`}>
                      <h5 className="title">{forum.title}</h5>
                    </a>
                    <p className="teacher">{forum.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div
            className={`tab-pane fade ${activeTab === "list" ? "show active" : ""}`}
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="row g-5 mt--30">
              {filteredForums.map((forum) => (
                <div className="col-12" key={forum.id}>
                  {/* rts single course */}
                  <div className="rts-single-course">
                    <a href={`forum/${forum._id}`} className="thumbnail">
                      <img src={forum.image} alt="forum" />
                    </a>
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>{forum.categorie}</span>
                      </div>
                    </div>
                    <div className="lesson-studente">
                      <div className="lesson">
                        <i className="fa-light fa-calendar-lines-pen"></i>
                        <span>{forum.likeCount} Likes</span>
                      </div>
                      <div className="lesson">
                        <i className="fa-light fa-comment-dots"></i>
                        <span>{forum.commentCount} Comments</span>
                      </div>
                    </div>
                    <a href={`forum/${forum._id}`}>
                      <h5 className="title">{forum.title}</h5>
                    </a>
                    <p className="teacher">{forum.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForumList;
