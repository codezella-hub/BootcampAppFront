import axios from "axios";

const API_BASE = "http://localhost:3000/api";

const postApi = {
  // ================== POSTS ==================

  addPost: (formData) => {
    return axios.post(`${API_BASE}/post/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getAllPosts: () => axios.get(`${API_BASE}/post/all`),

  getPostById: (id) => axios.get(`${API_BASE}/post/${id}`),

  getPostsByUser: (userId) => axios.get(`${API_BASE}/post/user/${userId}`),

  updatePost: (id, formData) =>
    axios.put(`${API_BASE}/post/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  deletePost: (id) => axios.delete(`${API_BASE}/post/delete/${id}`),

  // ================== CANDIDATS ==================

  addCandidat: (formData) =>
    axios.post(`${API_BASE}/candidat/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getAllCandidats: () => axios.get(`${API_BASE}/candidat/all`),

  getCandidatById: (id) => axios.get(`${API_BASE}/candidat/${id}`),

  getCandidatsByPost: (postId) =>
    axios.get(`${API_BASE}/candidat/post/${postId}`),

  updateCandidat: (id, formData) =>
    axios.put(`${API_BASE}/candidat/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  deleteCandidat: (id) =>
    axios.delete(`${API_BASE}/candidat/delete/${id}`),

  // ================== Accept / Reject ==================

  acceptCandidat: (id) =>
    axios.post(`${API_BASE}/candidat/accept/${id}`),

  rejectCandidat: (id) =>
    axios.post(`${API_BASE}/candidat/reject/${id}`),
};

export default postApi;
