import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 
export let isLoggedIn = false;
const AUTH_STORAGE_KEYS = {
    USER_ID: 'userId',
    ROLE: 'role',
  };
  
  /**
   * Enregistre l'utilisateur dans le localStorage
   * @param {string} userId
   * @param {string} role
   */
  export const setUser = (userId, role) => {
    localStorage.setItem(AUTH_STORAGE_KEYS.USER_ID, userId);
    localStorage.setItem(AUTH_STORAGE_KEYS.ROLE, role);
  };
  
  /**
   * Récupère l'ID de l'utilisateur depuis le localStorage
   * @returns {string | null}
   */
  export const getUserId = () => {
    return localStorage.getItem(AUTH_STORAGE_KEYS.USER_ID);
  };
  
  /**
   * Récupère le rôle de l'utilisateur depuis le localStorage
   * @returns {string | null}
   */
  export const getUserRole = () => {
    return localStorage.getItem(AUTH_STORAGE_KEYS.ROLE);
  };
  
  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   * @param {string} role
   * @returns {boolean}
   */
  export const isUserRole = (role) => {
    return getUserRole() === role;
  };
  
  /**
   * Déconnecte l'utilisateur (supprime les données du localStorage)
   */
  export const logout1 = () => {
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER_ID);
    localStorage.removeItem(AUTH_STORAGE_KEYS.ROLE);
  };
  

// authService.js
// Remplacez par l'URL de votre API

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/logout`, {}, { withCredentials: true }); // Appel à votre fonction logout dans le backend
        localStorage.clear();
       

        isLoggedIn = false ; // Vide le localStorage
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

export const test = () => {
    return getUserId == null && getUserRole == null;
}
   



// Function to check if user is logged in
export const checkAuth = async () => {
    try {
        const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
        return response.data; // Return the response data, including the user information
    } catch (error) {
        console.error("Error checking authentication:", error);
        return { success: false, message: error.response?.data?.message || 'Error checking authentication' };
    }
};