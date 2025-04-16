import React, { useState, useEffect } from "react";
import Header from "../commun/Header.jsx";
import forumApi from "../../services/forumApi.js"; 
import { Link } from "react-router-dom";
import { useAuthStore } from '../../store/authStore.js';

function ForumList() {
  const [forums, setForums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
   
  
  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await forumApi.getAllForums();
        setForums(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des forums", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await forumApi.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    fetchCategories();
    fetchForums();
  }, []);

  // Filtrer les forums en fonction de la catégorie et de la recherche
  const filteredForums = forums.filter((forum) => {
    return (
      (selectedCategory === "" || forum.categorie === selectedCategory) &&
      (searchTerm === "" || forum.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <>
      <Header />
      <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-main-wrapper">
                <h1 className="title">Our Forum</h1>
                <div className="pagination-wrapper">
                  <a href="/forums">Forum</a>
                  <i className="fa-regular fa-chevron-right"></i>
                  <a className="active" href="/forums">Forum list</a>
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

      
      

     
      <div className="container rts-section-gapBottom">
        <div className="row g-5">
          {filteredForums.map((forum) => (
            <div className="col-lg-6" key={forum._id}>
              <div className="single-blog-list-wrapper">
                <a href={`forum/${forum._id}`} className="thumbnail">
                  <img 
                    src={`http://localhost:3000${forum.image}`} 
                    alt="forum" 
                    style={{ width: "250px", height: "200px", borderRadius: "10px", objectFit: "cover" }} 
                  />
                </a>
                <div className="information-blog">
                  <div className="tag"><span>{forum.categorie}</span></div>
                  <a href={`forum/${forum._id}`}>
                    <h5 className="title">{forum.title}</h5>
                  </a>
                  <p className="disc">{forum.description}</p>
                  <div className="author-date">
                    <div className="author-area">
                      <i className="fa-solid fa-heart"></i>
                      <span>{forum.likeCount} Likes</span>
                    </div>
                    <div className="calender">
                      <i className="fa-light fa-comment-dots"></i>
                      <span>{forum.commentCount} Comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ForumList;
