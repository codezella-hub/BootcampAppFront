import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import forumApi from "../../services/forumApi";
import Header from "./Header";

function ForumDetails() {
  const { id } = useParams();
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userConnect, setUserConnect] = useState(null); 
  const [user, setUser] = useState(null); 
  const [liked, setLiked] = useState(true);
  const [commentUsers, setCommentUsers] = useState({});


  useEffect(() => {
    const fetchCommentUsers = async (comments) => {
      try {
        const usersData = {};
        await Promise.all(
          comments.map(async (comment) => {
            if (!usersData[comment.user]) {
              const response = await forumApi.getuserById(comment.user);
              usersData[comment.user] = response.data;
            }
          })
        );
        setCommentUsers(usersData);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs des commentaires", error);
      }
    };
    const checkUserCreated = async () => {
      try {
        const response = await forumApi.getuserById(forum.user);
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de user", error);
      }
    };
    const checkUser = async () => {
      try {
        const response = await forumApi.getuserById("67b8be03d74ad328bb66ccb6");//hot lena user b token
        setUserConnect(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de user", error);
      }
    };
    // Vérifier si l'utilisateur a liké ce forum
    const checkIfLiked = async () => {
      try {
        const response = await forumApi.getLikesByForum(id);
        const userLiked = response.data.some((like) => like.user === userConnect._id);
        setLiked(userLiked);
      } catch (error) {
        console.error("Erreur lors de la récupération des likes", error);
      }
    };

    const fetchForumDetails = async () => {
      try {
        const forumResponse = await forumApi.getForumById(id);
        setForum(forumResponse.data);
    
        const commentsResponse = await forumApi.getCommentsByForum(id);
        setComments(commentsResponse.data);
    
        // Récupérer les utilisateurs des commentaires
        await fetchCommentUsers(comments);
      } catch (error) {
        console.error("Erreur lors de la récupération du forum", error);
      }
    };
    fetchForumDetails(); 
    checkUser();
    checkUserCreated();
    checkIfLiked(); 
    
    console.log(commentUsers)
   
  }, [id, forum]); 

  const handleLike = async () => {
    try {
      await forumApi.likeForum(id, userConnect._id);
      setLiked(true);
      
    } catch (error) {
      console.error("Erreur lors du like du forum", error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      await forumApi.removeLike(id, userConnect._id);
      setLiked(false);
       
    } catch (error) {
      console.error("Erreur lors du retrait du like", error);
    }
  };

  const handleAddComment = async (e) => {
    
    if (newComment.trim()) {
      try {
        const response = await forumApi.addComment(id, newComment,userConnect._id);
        setComments([...comments, response.data]); 
        setNewComment(""); 
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire", error);
      }
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
                        <h1 class="title">Forum Details</h1>
                       
                        <div class="pagination-wrapper">
                            <a href="/forums">Forum</a>
                            <i class="fa-regular fa-chevron-right"></i>
                            <a class="active" href="#">Forum Details</a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="rts-blog-list-area rts-section-gap">
    <div class="container">
        <div class="row g-5">
            <div class="col-xl-8 col-md-12 col-sm-12 col-12">
                {forum && (
                    <div class="blog-single-post-listing details mb--0">
                        <div class="thumbnail">
                            <img src={`http://localhost:3000${forum.image}`} alt="forum" key={forum._id} style={{ width: "1000px", height: "500px", borderRadius: "10px", objectFit: "cover" }}></img>
                        </div>
                        <div class="blog-listing-content">
                            <div class="user-info">
                            <div class="single">
   
                      {user ? (
                          <span>
                              <img
                                  src={`http://localhost:3000${user.image}`} 
                                  alt={user.fullName}
                                  style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
                              />
                              {user.fullName}
                          </span>
                      ) : (
                          <span>Loading...</span>
                      )}
                        </div>

                                <div class="single">
                                    <i class="far fa-clock"></i>
                                    <span>
                                        {new Date(forum.createdAt).toLocaleString("fr-FR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                        })}
                                    </span>
                                </div>
                                <div class="single">
                                    <i class="far fa-tags"></i>
                                    <span>{forum.categorie}</span>
                                </div>
                                <div class="single">
                                    <i class="fa-solid fa-heart"></i>
                                    <span>{forum.likeCount} Likes</span>
                                </div>
                                <div class="single">
                                    <i class="fa-light fa-comment-dots"></i>
                                    <span>{forum.commentCount} Comments</span>
                                </div>
                            </div>
                            <h3 class="title animated fadeIn">{forum.title}</h3>
                            <p class="disc para-1">{forum.description}</p>
                            <div className="d-flex justify-content-end">
                                {liked ? (
                                    <button className="rts-btn btn-primary mt-3" onClick={handleRemoveLike}> <i className="fas fa-heart"> </i> Unlike </button>
                                ) : (
                                    <button className="rts-btn btn-primary mt-3" onClick={handleLike}> <i className="fas fa-heart"></i> Like </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <div class="col-xl-4 col-md-12 col-sm-12 col-12">
                <div class="rts-single-wized search">
                    <div class="wized-body mt--0">
                    <h3>Comments</h3>
                  {comments.map((comment, index) => (
                    <div key={index} className="comment">
                      {commentUsers[comment.user] ? (
                        <div className="comment-header">
                          <img
                            src={`http://localhost:3000${commentUsers[comment.user].image}`}
                            alt={commentUsers[comment.user].fullName}
                            style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
                          />
                          <strong>{commentUsers[comment.user].fullName}</strong>
                        </div>
                      ) : (
                        <span>Loading user...</span>
                      )}
                      <p>{comment.content}</p>
                    </div>
                  ))}

            <div class="rts-search-wrapper">
            <form onSubmit={handleAddComment}>
              
              <input class="Search" type="text"  
              value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment" />
              <button><i class="fas fa-paper-plane"></i></button>
            </form>
            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

                
      
    </>
  );
}

export default ForumDetails;
