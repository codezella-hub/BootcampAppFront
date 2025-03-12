import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Pour récupérer l'ID du forum depuis l'URL
import Header from "../student/Header.jsx";
import forumApi from "../../services/forumApi.js";

function UpdateForum() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categorie: "",
    user: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchForumDetails = async () => {
      try {
        const forumResponse = await forumApi.getForumById(id);
        const forumData = forumResponse.data;
  
        setFormData((prevFormData) => ({
          ...prevFormData,
          title: forumData.title || "",
          description: forumData.description || "",
          categorie: forumData.categorie || "",
          user: forumData.user || "",
          
        }));
        
        if (forumData.image) {
          setImagePreview(forumData.image); 
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du forum", error);
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

    fetchForumDetails();
    fetchCategories();
    
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); 
      setImageName(file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("categorie", formData.categorie);
    data.append("user", formData.user);
  
   
    if (image) 
      data.append("image", image);
    
  
    try {
      console.log("Données envoyées :", Object.fromEntries(data.entries()));
      await forumApi.updateForum(id, data);
      alert("Forum mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du forum", error);
    }
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
                            <a class="active" href="#">Forum update</a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

      <div style={{ display: "flex", padding: "40px", gap: "30px" }}>
        {/* Formulaire */}
        <div style={{ flex: 1, maxWidth: "600px" }}>
          <h2>Update Forum</h2>
          <form onSubmit={handleSubmit} className="contact-page-form">
            <div className="single-input">
              <label htmlFor="title">Title*</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Forum Title..."
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="single-input">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your forum..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="single-input">
              <label htmlFor="image">Image*</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImage}
                style={{ display: "none" }}
              />
              <div className="course-thumbnail-upload-area">
                <div className="thumbnail-area">
                {imagePreview ? (
                    <img
                      src={image instanceof File ? imagePreview : `http://localhost:3000${imagePreview}`}
                      alt="Selected"
                      width={200}
                    />
                  ) : (
                    <p>Aucune image sélectionnée</p>
                  )}
                </div>
                <div className="information">
                  <button
                    type="button"
                    className="rts-btn btn-primary"
                    onClick={() => document.getElementById("image").click()}
                  >
                    Pick image
                  </button>
                  {imageName && <p>Image selected : {imageName}</p>}
                </div>
              </div>
            </div>

            <div className="dropdown">
              <label htmlFor="categorie">Category*</label>
              <select
                id="categorie"
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                required
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
                    position: "relative",
                  }}
              >
                <option value="">choose a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="rts-btn btn-primary mt-3">
              Update
            </button>
          </form>
        </div>

        {/* Image à droite */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="/assets/images/about/04.jpg"
            alt="Forum Illustration"
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
}

export default UpdateForum;
