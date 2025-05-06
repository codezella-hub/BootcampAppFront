import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import postApi from "../../services/postApi.js"; 
import Header from "../commun/Header.jsx";
import forumApi from "../../services/forumApi.js";

function DetailPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
 const [user, setUser] = useState(null);

 useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postApi.getPostById(id);
        const postData = response.data;
        setPost(postData);
  
        // Une fois le post récupéré, on récupère aussi l'utilisateur
        if (postData.idUser) {
          try {
            const userResponse = await forumApi.getuserById(postData.idUser);
            setUser(userResponse.data.user);
          } catch (error) {
            console.error("Erreur lors de la récupération de user", error);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du post :", error);
      }
    };
  
    fetchPost();
    
  }, [id]);
  

  if (!post) {
    return <p>Chargement...</p>;
  }
  return (
    <>
  
    <div class="course-details-breadcrumb-1 bg_image rts-section-gap">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="single-course-left-align-wrapper">
                        <div class="meta-area">
                            <a href="/posts">Jobs</a>
                            <i class="fa-solid fa-chevron-right"></i>
                            <a class="active" href="#">Job Details</a>
                        </div>
                        <h1 class="title">
                        {post.title}
                        </h1>
                        <div class="rating-area">
                            <div class="calender-area-stars">
                                <i class="fa-light fa-calendar-lines-pen"></i>
                                <span>Publié le : {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div class="author-area">
                            <div class="author">
                            {user && (
                                    <img
                                        src={
                                          user.picture
                                            ? `http://localhost:3000/uploads/user/${user.picture}`
                                            : user.avatar
                                        }
                                        alt={user.fullName}
                                        style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
                                    />
                                    )}

                                <h6 class="name"><span>By </span>  {post.company}</h6>
                            </div>
                            <p> <span>Lieu: </span> {post.location}</p>
                        </div>
                        <div class="author-area">
                        <p><span>Salaire :</span> {post.salary} TND</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     <div class="tab-content mt--50" id="myTabContent">
     <div class="tab-pane fade  show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        
         <div class="course-content-wrapper">
        
             <div class="module-wrapper">
             <h5 class="title">Description</h5>
             <p class="disc">
             {post.description}
             </p>
                 <h6 class="title">Exigences</h6>
                 <div class="inner-content">
                     <div class="single-wrapper">
                     {post.requirements.map((req, index) => (
              
                         <div class="single-codule">
                         <i class="fa-regular fa-check"></i>
                             <p>{req}</p>
                         </div>
                         ))}
                     </div>
                     
                 </div>

             </div>
            
                <button><Link to={`/addCandidat/${post._id}`} className="rts-btn btn-primary mt-2">
                    Postuler
                </Link></button>
                
         </div>
     </div>
     </div>
     
     </>
  );
};

export default DetailPost;