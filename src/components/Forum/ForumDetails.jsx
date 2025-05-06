import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import forumApi from "../../services/forumApi.js";
import Header from "../commun/Header.jsx";
import { useAuthStore } from '../../store/authStore.js';

function ForumDetails() {
  const { id } = useParams();
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userCreated, setUsercreated] = useState(null); 
  const [liked, setLiked] = useState(true);
  const [commentUsers, setCommentUsers] = useState({});
  const [forums, setForums] = useState([]); 
  const [courses, setCourses] = useState([]); 
  const {user} = useAuthStore();


  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await forumApi.getAllForums();
        const filteredForums = response.data.filter(f => f.categorie === forum.categorie && f._id !== forum._id);
        setForums(filteredForums); 
      } catch (error) {
        console.error("Erreur lors de la récupération des forums", error);
      }
    };
    const fetchCourses = async () => {
      try {
        const response = await forumApi.getcoursesByCategory(forum.categorie);
        setCourses(response.data); 
        
      } catch (error) {
        console.error("Erreur lors de la récupération des courses", error);
      }
    };
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
  
   
    // Vérifier si l'utilisateur a liké ce forum
    const checkIfLiked = async () => {
      try {
        const response = await forumApi.getLikesByForum(id);
        const userLiked = response.data.some((like) => like.user === user._id);
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
    const checkUserCreated = async () => {
      try {
        const response = await forumApi.getuserById(forum.user);
        setUsercreated(response.data.user);
        console.log(response.data.user)
        
        
      } catch (error) {
        console.error("Erreur lors de la récupération de user", error);
      }
    };
    fetchForumDetails(); 
   
    checkUserCreated();
    checkIfLiked(); 
    fetchForums();
    fetchCourses();
  
    
  
   
  }, [id, forum]); 

  const handleLike = async () => {
    try {
      await forumApi.likeForum(id, user._id);
      setLiked(true);
      
    } catch (error) {
      console.error("Erreur lors du like du forum", error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      await forumApi.removeLike(id, user._id);
      setLiked(false);
       
    } catch (error) {
      console.error("Erreur lors du retrait du like", error);
    }
  };

  const handleAddComment = async (e) => {
    
    if (newComment.trim()) {
      try {
        const response = await forumApi.addComment(id, newComment,user._id);
        setComments([...comments, response.data]); 
        setNewComment(""); 
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire", error);
      }
    }
  };

  return (
    <>
     
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
   
                      {userCreated ? (
                          <span>
                              <img
                                  src={
                                    userCreated.picture
                                      ? `http://localhost:3000/uploads/user/${userCreated.picture}`
                                      : userCreated.avatar
                                  }
                                  
                                  style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
                              />
                              {userCreated.fullName}
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
                                    <button className="rts-btn btn-primary mt-3" onClick={handleLike}> <i className="far fa-heart"></i> Like </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
             
                              <div class="col-xl-4 col-md-12 col-sm-12 col-12">
                      <div class="rts-single-wized search">
                          <div class="wized-body mt--0">
                              <h3>suggestion Forums</h3>
                              {forums.map((forum) => (
                              <div class="recent-post-single" style={{ display: "flex", gap: "15px", marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                                  <div class="thumbnail" style={{ flexShrink: 0 }}>
                                      <a href={`/forum/${forum._id}`}>
                                          <img 
                                              src={`http://localhost:3000${forum.image}`} 
                                              alt="forum" 
                                              key={forum._id}
                                              style={{ 
                                                  width: "100px", 
                                                  height: "100px", 
                                                  objectFit: "cover",
                                                  borderRadius: "6px",
                                                  border: "1px solid #e0e0e0"
                                              }}
                                          />
                                      </a>
                                  </div>
                                  <div class="content-area text-start" style={{ flexGrow: 1 }}>
                                      <div class="single">
                                          <i class="far fa-tags"></i>
                                          <span>{forum.categorie}</span>
                                      </div>
                                      <div class="user" style={{ margin: "8px 0", display: "flex", gap: "15px", color: "#6c757d", fontSize: "14px" }}>
                                          <span><i class="fa-solid fa-heart"></i> {forum.likeCount} Likes</span>
                                          <span><i class="fa-light fa-comment-dots"></i> {forum.commentCount} Comments</span>
                                      </div>
                                      <a class="post-title" href={`/forum/${forum._id}`}>
                                          <h6 class="title" style={{ margin: "5px 0", fontSize: "16px", fontWeight: "600", color: "#343a40" }}>{forum.title}</h6>
                                      </a>
                                      <p class="disc" style={{ 
                                          margin: "8px 0 0", 
                                          fontSize: "14px", 
                                          color: "#495057",
                                          display: "-webkit-box",
                                          WebkitLineClamp: "2",
                                          WebkitBoxOrient: "vertical",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis"
                                      }}>
                                          {forum.description}
                                      </p>
                                  </div>
                              </div>
                              ))}
                          </div>
                      </div>
                  </div>
             
            <div class="col-xl-7 col-md-12 col-sm-12 col-12">
                <div class="rts-single-wized search">
                    <div class="wized-body mt--0">
                    <h3>Comments</h3>
                  {comments.map((comment, index) => (
                    <div key={index} className="comment">
                      {commentUsers[comment.user] ? (
                        <div className={`comment-header ${comment.user === user._id ? "sentUser" : "receivedUser"}`}>
                          <img
                            src={
                              commentUsers[comment.user].user.picture
                                ? `http://localhost:3000/uploads/user/${commentUsers[comment.user].user.picture}`
                                : commentUsers[comment.user].user.avatar
                            }
                            alt={commentUsers[comment.user].fullName}
                            style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
                          />
                          
                          <strong>{commentUsers[comment.user].fullName}</strong>
                        </div>
                      ) : (
                        <span>Loading user...</span>
                      )}
                      <div className={`comment-box ${comment.user === user._id ? "sent" : "received"}`}>
                        <p>{comment.content}</p>
                      </div>


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

<div class="col-xl-4 col-md-12 col-sm-12 col-12">
    <div class="rts-single-wized search">
        <div class="wized-body mt--0">
            <h3 style={{ marginBottom: "20px", color: "#2c3e50", fontSize: "20px", fontWeight: "600" }}>Suggested Courses</h3>
            {courses.map((course) => (
            <div class="recent-post-single" style={{
                display: "flex",
                gap: "15px",
                marginBottom: "25px",
                padding: "15px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                ":hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }
            }}>
                <div class="thumbnail" style={{ flexShrink: 0 }}>
                    <a href={`/DetailCourse/${course._id}`}>
               
                        <img 
                            src={`http://localhost:3000${course.courseImage}`} 
                            alt={course.title} 
                            style={{ 
                                width: "150px", 
                                height: "100px", 
                                objectFit: "cover",
                                borderRadius: "6px",
                                border: "1px solid #e0e0e0"
                            }}
                        />
                    </a>
                </div>
                <div class="content-area text-start" style={{ flexGrow: 1 }}>
    <div class="single" style={{ marginBottom: "8px" }}>
        <i class="far fa-tags" style={{ color: "#7f8c8d", marginRight: "5px" }}></i>
        <span style={{ color: "#7f8c8d", fontSize: "13px" }}>{forum.categorie}</span>
    </div>
    
    <div className="stars" style={{ marginBottom: "8px" }}>
        <ul style={{ 
            listStyle: "none", 
            padding: 0, 
            margin: 0,
            display: "flex",
            gap: "3px"
        }}>
            {[...Array(5)].map((_, i) => {
                const fullStar = i < Math.floor(course.rating);
                const partialStar = course.rating % 1 > 0 && i === Math.floor(course.rating);
                const fillPercentage = partialStar ? Math.round((course.rating % 1) * 100) : 0;
                
                return (
                    <li key={i} style={{ position: "relative" }}>
                        {partialStar ? (
                            <>
                                <i 
                                    className="fa-regular fa-star"
                                    style={{ 
                                        color: "#bdc3c7",
                                        fontSize: "14px",
                                        position: "relative"
                                    }}
                                ></i>
                                <div style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    width: `${fillPercentage}%`,
                                    overflow: "hidden"
                                }}>
                                    <i 
                                        className="fa-solid fa-star"
                                        style={{ 
                                            color: "#f39c12",
                                            fontSize: "14px"
                                        }}
                                    ></i>
                                </div>
                            </>
                        ) : (
                            <i 
                                className={fullStar ? "fa-solid fa-star" : "fa-regular fa-star"} 
                                style={{ 
                                    color: fullStar ? "#f39c12" : "#bdc3c7",
                                    fontSize: "14px"
                                }}
                            ></i>
                        )}
                    </li>
                );
            })}
        </ul>
    </div>

                    
                    <a class="post-title" href={`/DetailCourse/${course._id}`} style={{ textDecoration: "none" }}>
                        <h6 class="title" style={{ 
                            margin: "5px 0", 
                            fontSize: "16px", 
                            fontWeight: "600", 
                            color: "#2c3e50",
                            lineHeight: "1.3"
                        }}>
                            {course.title}
                        </h6>
                    </a>
                    <p class="disc" style={{ 
                        margin: "8px 0 0", 
                        fontSize: "14px", 
                        color: "#7f8c8d",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.4"
                    }}>
                        {course.description}
                    </p>
                </div>
            </div>
            ))}
        </div>
    </div>
</div>
                              
                                
      
    </>
  );
}

export default ForumDetails;
