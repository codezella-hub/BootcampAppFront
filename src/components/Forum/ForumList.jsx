import React, { useState, useEffect } from "react";
import Header from "../student/Header.jsx";
import forumApi from "../../services/forumApi.js"; // Assure-toi que le chemin est correct
import { Link } from "react-router-dom";

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
      <div class="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-main-wrapper">
                        <h1 class="title">Our Forum </h1>
                        
                        <div class="pagination-wrapper">
                            <a href="/forums">Forum</a>
                            <i class="fa-regular fa-chevron-right"></i>
                            <a class="active" href="/forums">Forum list</a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="col-lg-9 mx-auto">
    <div class="rts-latest-blog-area-three rts-section-gap">

   
    <div className="filter-small-top-full">
          <div className="left-filter">
            <span>Category</span>
            <select 
              className="w-52 px-4 py-2 border border-gray-300 rounded-md text-gray-700 cursor-pointer focus:outline-none" 
              id="categorie" 
              name="categorie" 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              style={{
                appearance: "none",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "10px 15px",
                fontSize: "16px",
                color: "#333",
                cursor: "pointer",
                width: "200px",
                textAlign: "center",
                position: "relative"
              }}
            >
              <option value="">Toutes catégories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          
          <div class="right-filter">
                            <span>Showing {filteredForums.length} results</span>
                            
                        </div>
         
        </div>
        </div>
        </div>
        <div className="buttons-area"
      style={{
       
        position: "relative",
        top:"-10px",
        left: "1300px",
      }}>
      <a className="rts-btn btn-primary"><Link to="/addForum">Add forum</Link></a>
      </div>
        <div className="tab-content" id="myTabContent">
       


      <div class="container rts-section-gapBottom">
              <div class="row g-5">
              {filteredForums.map((forum) => (
      <div class="col-lg-6">
      <div class="single-blog-list-wrapper">
                          <a href={`forum/${forum._id}`} class="thumbnail">
                              <img src={`http://localhost:3000${forum.image}`} alt="forum" key={forum._id} style={{ width: "250px", height: "200px", borderRadius: "10px", objectFit: "cover" }} />
                          </a>
                          <div class="information-blog">
                              <div class="tag"><span>{forum.categorie}</span></div>
                              <a href={`forum/${forum._id}`}>
                                  <h5 class="title">{forum.title}</h5>
                              </a>
                              <p class="disc">{forum.description}</p>
                              <div class="author-date">
                                  <div class="author-area">
                                      <i class="fa-solid fa-heart"></i>
                                      <span>{forum.likeCount} Likes</span>
                                  </div>
                                  <div class="calender">
                                      <i class="fa-light fa-comment-dots"></i>
                                      <span>{forum.commentCount} Comments</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      </div>
                      ))}
                      </div>
                      </div>
      
      
        
       
        
       
          
            
          </div>
          
         
        
      
      
    </>
  );
}

export default ForumList;
