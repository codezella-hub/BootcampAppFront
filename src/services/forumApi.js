import axios from "axios";

const API_URL = "http://localhost:3000/api/forums";

const forumApi = {
  addForum: (formData) => {
    return axios.post("http://localhost:3000/api/forums", formData, {
        headers: {
            "Content-Type": "multipart/form-data", 
            
        },
    });
},

  getAllForums: () => axios.get(API_URL),

  getForumById: (id) => axios.get(`${API_URL}/${id}`),
  
  getForumByIduser: (id) => axios.get(`${API_URL}/user/${id}`),

  updateForum: (id, formData) => axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),

  deleteForum: (id) => axios.delete(`${API_URL}/${id}`),

  getCategories: () => axios.get("http://localhost:3000/api/categories"),
  
  // Nouvelle méthode pour ajouter un commentaire
  addComment: (forumId, comment,user) => {
    return axios.post("http://localhost:3000/api/comments", { forumId, content: comment,userId:user });
  },

  // Nouvelle méthode pour obtenir les commentaires d'un forum
  getCommentsByForum: (forumId) => {
    return axios.get(`http://localhost:3000/api/comments/${forumId}`);
  },

  // Nouvelle méthode pour liker un forum
  likeForum: (forumId,Iduser) => {
    return axios.post("http://localhost:3000/api/likes", { forumId ,userId:Iduser});
  },

  // Nouvelle méthode pour retirer un like d'un forum
  removeLike: (forum, Iduser) => {
    return axios.delete(`http://localhost:3000/api/likes`, {
      data: { forumId:forum,userId: Iduser }
    });
  },
  

  // Nouvelle méthode pour obtenir les likes d'un forum
  getLikesByForum: (forumId) => {
    return axios.get(`http://localhost:3000/api/likes/${forumId}`);
  },

  // Nouvelle méthode pour obtenir le nombre de likes d'un forum
  getLikeCountByForum: (forumId) => {
    return axios.get(`http://localhost:3000/api/like-count/${forumId}`);
  },
  getuserById: (userId) => {
    return axios.get(`http://localhost:3000/api/user/${userId}`);
  },
};

export default forumApi;
