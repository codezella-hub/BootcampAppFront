import React, { useState, useEffect } from "react";
import Header from "./Header";
import forumApi from "../../services/forumApi"; 

function AddForum() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categorie: "",
    user:"67b8be03d74ad328bb66ccb6",
    image:"",
  });
 

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState(""); 
  const [categories, setCategories] = useState([]);
  const [user,setUser]=useState("67b8be03d74ad328bb66ccb6")

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
      <Header />
      <div className="container mt-5">
        <h2>Ajouter un Forum</h2>
        <form onSubmit={handleSubmit} className="contact-page-form">
          <div className="single-input">
            <label htmlFor="title">Titre*</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Titre du forum..."
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="single-input">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Décrivez votre forum..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="single-input-wrapper">
                                        <label htmlFor="image">Image</label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={handleImage}
                                            style={{ display: "none" }}
                                        />
                                        <div className="course-thumbnail-upload-area">
                                            <div className="thumbnail-area">
                                                <img src={imagePreview} alt="Selected" width={200}/>
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
            <label htmlFor="categorie">Catégorie</label>
            <select
              id="categorie"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="rts-btn btn-primary mt-3">
            Ajouter Forum
          </button>
        </form>
      </div>
    </>
  );
}

export default AddForum;
