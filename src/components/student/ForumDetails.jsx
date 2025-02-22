import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import forumApi from "../../services/forumApi";
import Header from "./Header";

function ForumDetails() {
  const { id } = useParams();
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState("67b7906225fc0c140e69a460"); // Remplacer par l'ID de l'utilisateur connecté
  const [liked, setLiked] = useState(true);


  useEffect(() => {
    // Vérifier si l'utilisateur a liké ce forum
    const checkIfLiked = async () => {
      try {
        const response = await forumApi.getLikesByForum(id);
        const userLiked = response.data.some((like) => like.userId === user);
        setLiked(userLiked);
      } catch (error) {
        console.error("Erreur lors de la récupération des likes", error);
      }
    };

    // Charger les détails du forum, les commentaires et le nombre de likes
    const fetchForumDetails = async () => {
      try {
        const forumResponse = await forumApi.getForumById(id);
        setForum(forumResponse.data);

        const commentsResponse = await forumApi.getCommentsByForum(id);
        setComments(commentsResponse.data);

        

      } catch (error) {
        console.error("Erreur lors de la récupération du forum", error);
      }
    };
     
    checkIfLiked(); // Vérifier l'état du like
    fetchForumDetails(); // Charger les données du forum
  }, [id, forum]); // Recharger si l'id du forum ou l'utilisateur changent

  const handleLike = async () => {
    try {
      await forumApi.likeForum(id, user);
      setLiked(true);
      
    } catch (error) {
      console.error("Erreur lors du like du forum", error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      await forumApi.removeLike(id, user);
      setLiked(false);
       
    } catch (error) {
      console.error("Erreur lors du retrait du like", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await forumApi.addComment(id, newComment,user);
        setComments([...comments, response.data]); // Ajouter le nouveau commentaire
        setNewComment(""); // Réinitialiser le champ de saisie
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="col-lg-9 mx-auto">
        {forum && (
          <>
            <img src={forum.image} alt="forum" width={50} />
            <h4>{forum.title}</h4>
            <p>{forum.description}</p>
            <div>
              {liked ? (
                <button className="rts-btn btn-primary mt-3" onClick={handleRemoveLike}>Unlike {forum.likeCount}</button>
              ) : (
                <button className="rts-btn btn-primary mt-3" onClick={handleLike}>Like {forum.likeCount}</button>
              )}
            </div>

            <h3>Comments</h3>
            {comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
            <form onSubmit={handleAddComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              />
              <button type="submit" className="rts-btn btn-primary mt-3">
                Post Comment
              </button>
            </form>
          </>
        )}
      </div>
      
    </>
  );
}

export default ForumDetails;
