import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const ProfileApiService = {
    updateProfilePicture: async (pictureFile) => {
        const formData = new FormData();
        formData.append('picture', pictureFile);

        const response = await axios.put(
            `${API_BASE_URL}/profile-picture`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            }
        );
        return response.data;
    },

    getProfilePicture: async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/profile-picture`,
                {
                    withCredentials: true,
                    responseType: 'blob' // Important pour recevoir l'image directement
                }
            );

            // Créer une URL objet à partir du blob
            return URL.createObjectURL(response.data);

        } catch (error) {
            console.error('Error fetching profile picture:', error);
            return null;
        }
    }
};

export default ProfileApiService;