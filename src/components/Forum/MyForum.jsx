import React, { useState, useEffect } from "react";
import Header from "../commun/Header.jsx";
import forumApi from "../../services/forumApi.js"; // Assure-toi que le chemin est correct
import { Link } from "react-router-dom";
import { useAuthStore } from '../../store/authStore.js';

function MyForum() {
  const [forums, setForums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user} = useAuthStore();
    const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    // Appel à la fonction pour récupérer les forums
    const fetchForums = async () => {
      try {
        const response = await forumApi.getForumByIduser(user._id);
        setForums(response.data);
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
   // Filtrer les forums en fonction de la catégorie et de la recherche
   const filteredForums = forums.filter((forum) => {
    return (
      (selectedCategory === "" || forum.categorie === selectedCategory) &&
      (searchTerm === "" || forum.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

 

  // Fonction pour supprimer un forum
  const deleteForum = async (forumId) => {
    try {
      // Appel à votre API pour supprimer le forum
      await forumApi.deleteForum(forumId);
      // Mettre à jour la liste des forums après suppression
      setForums(forums.filter(forum => forum._id !== forumId));
    } catch (error) {
      console.error("Erreur lors de la suppression du forum", error);
    }
  };

  return (
    <>
     <Header/>
      <div class="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb-main-wrapper">
                <h1 class="title">Our Forum</h1>
                <div class="pagination-wrapper">
                  <a href="/forums">Forum</a>
                  <i class="fa-regular fa-chevron-right"></i>
                  <a class="active" href="/src/components/Forum/MyForum">My Forum list</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <div className="col-lg-9 mx-auto">
              <div className="rts-latest-blog-area-three rts-section-gap">
                <div className="filter-small-top-full" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <div className="right-filter">
                    <span>Showing {filteredForums.length} results</span>
                  </div>
                  
                  <div className="left-filter">
                    <span>Category</span>
                    <select 
                      className="w-52 px-4 py-2 border border-gray-300 rounded-md text-gray-700 cursor-pointer focus:outline-none"
                      id="categorie"
                      name="categorie"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
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
                        textAlign: "center"
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
      
                  
                  <div className="search-filter">
                    <input
                      type="text"
                      placeholder="Rechercher un forum..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "16px",
                        width: "250px"
                      }}
                    />
                  </div>
      
                  
                  <a className="rts-btn btn-primary">
                <Link to="/addForum">Add forum</Link>
              </a>
                </div>
             
            
              </div>
            </div>

      
      <div className="tab-content" id="myTabContent">
        <div class="container rts-section-gapBottom">
          <div class="row g-5">
            {filteredForums.map((forum) => (
              <div class="col-lg-6" key={forum._id}>
              <div class="single-blog-list-wrapper">
                <a href={`forum/${forum._id}`} class="thumbnail">
                  <img
                    src={`http://localhost:3000${forum.image}`}
                    alt="forum"
                    style={{
                      width: "250px",
                      height: "200px",
                      borderRadius: "10px",
                      objectFit: "cover"
                    }}
                  />
                </a>
                <div class="information-blog" style={{ position: "relative" }}>
                  <div class="tag">
                    <span>{forum.categorie}</span>
                  </div>
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
                    <div className="d-flex justify-content-end w-100">
                                      <Link
                                          to={`/updateForum/${forum._id}`}
                                          className="btn btn-sm btn-outline-primary"
                                          style={{ width: "100px" }}
                                      >
                                          ✏️ Modifier
                                      </Link>
                                      <button
                                          onClick={() => deleteForum(forum._id)}
                                          className="btn btn-sm btn-outline-danger"
                                          style={{ width: "100px" }}
                                      >
                                          🗑️ Supprimer
                                      </button>
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

export default MyForum;
