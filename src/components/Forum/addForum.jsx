import React, { useState, useEffect } from "react";
import Header from "../commun/Header.jsx";
import forumApi from "../../services/forumApi.js";
import { Navigate } from "react-router-dom";
import { useAuthStore } from '../../store/authStore.js';
 
function AddForum() {
  const { user} = useAuthStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categorie: "",
    user:user._id,
    image:"",
  });
 

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState(""); 
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    // Récupérer les catégories depuis l'API
    const fetchCategories = async () => {
      try {
        const response = await forumApi.getCategories(); 
        setCategories(response.data); // Mettre à jour les catégories
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({image:file});
      setImageName(file.name);
      setImagePreview(URL.createObjectURL(file));
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('categorie', formData.categorie);
    data.append('user', formData.user);
    if (image) data.append('image', image?.image); 

    try {
        console.log("Données envoyées :", Object.fromEntries(data.entries())); 
        await forumApi.addForum(data); 
        alert("Forum ajouté avec succès!");
        setFormData({ title: "", description: "", categorie: "" });
        setImage(null);
        setImagePreview(null);
    } catch (error) {
        console.error("Erreur lors de l'ajout du forum", error);
    }
};



return (
  <>
    
    <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-main-wrapper">
              <h1 className="title">Our Forum</h1>
              <div className="pagination-wrapper">
                <a href="/forums">Forum</a>
                <i className="fa-regular fa-chevron-right"></i>
                <a className="active" href="/forums">Add Forum</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Section Formulaire + Image */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "30px",
        padding: "40px",
      }}
    >
      {/* Formulaire */}
      <div style={{ flex: 1, maxWidth: "600px" }}>
        <h2>Add Forum</h2>
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
                <img src={imagePreview} alt="Selected" width={200} />
              </div>
              <div className="information">
                <div className="input-file-type-btn">
                  <button
                    type="button"
                    className="rts-btn btn-primary"
                    id="custom-button"
                    onClick={() => document.getElementById("image").click()}
                  >
                    Pick Image
                  </button>
                  {imageName && <p>Selected Image: {imageName}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <label htmlFor="categorie">Category*</label>
            <select
              className="w-52 px-4 py-2 border border-gray-300 rounded-md text-gray-700 cursor-pointer focus:outline-none"
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
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="rts-btn btn-primary mt-3">
            Submit Forum
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

export default AddForum;
