import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";
const API_URL = "http://localhost:3000/api";


axios.defaults.withCredentials = true;



export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
            isCheckingAuth: true,
            message: null,

            signup: async (data) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/register`, data);
                    set({ user: response.data.user, isAuthenticated: true, isLoading: false });
                } catch (error) {
                    set({ error: error.response.data.message || "Error signing up", isLoading: false });
                    throw error;
                }
            },

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/login`, { email, password });
                    set({
                        isAuthenticated: true,
                        user: response.data.user,
                        error: null,
                        isLoading: false,
                    });
                } catch (error) {
                    set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
                    throw error;
                }
            },

            logout: async () => {
                set({ isLoading: true, error: null });
                try {
                    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
                    set({ user: null, isAuthenticated: false, error: null, isLoading: false });
                } catch (error) {
                    set({ error: "Error logging out", isLoading: false });
                    throw error;
                }
            },

            verifyEmail: async (code) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/verify-email`, { code });
                    set({ user: response.data.user, isAuthenticated: true, isLoading: false });
                    return response.data;
                } catch (error) {
                    set({ error: error.response.data.message || "Error verifying email", isLoading: false });
                    throw error;
                }
            },

            checkAuth: async () => {
                set({ isCheckingAuth: true, error: null });
                try {
                    const response = await axios.get(`${API_URL}/check-auth`);
                    set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
                } catch (error) {
                    set({ error: null, isCheckingAuth: false, isAuthenticated: false });
                }
            },

            forgotPassword: async (email) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/forget-password`, { email });
                    set({ message: response.data.message, isLoading: false });
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error.response.data.message || "Error sending reset password email",
                    });
                    throw error;
                }
            },

            resetPassword: async (token, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
                    set({ message: response.data.message, isLoading: false });
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error.response.data.message || "Error resetting password",
                    });
                    throw error;
                }
            },
            resendVerificationCode: async (email) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/resend-email`, { email });
                    set({ message: response.data.message, isLoading: false });
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error.response.data.message || "Error resend code verification",
                    });
                    throw error;
                }
            },
            updateProfilePicture: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/profile-picture`);
                    set({user: response.data.user, message: response.data.message, isLoading: false });
                } catch (error) {
                    set({
                        isLoading: false,
                        error: error.response.data.message || "Error resend code verification",
                    });
                    throw error;
                }
            },
        }),
        {
            name: "auth-storage", // Nom unique pour le stockage local
            // Optionnel: choisir quels champs persister
             partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);