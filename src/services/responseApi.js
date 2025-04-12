import axios from "axios";

const API_URL = "http://localhost:3000/api";

const responseApi = {

    submitResponse: (responseData) => axios.post(`${API_URL}/response`, responseData, {
        headers: { "Content-Type": "application/json" },
    }),

    getAllResponses: () => axios.get(`${API_URL}/response`),

    getResponseById: (id) => axios.get(`${API_URL}/response/${id}`),

    deleteResponse: (id) => axios.delete(`${API_URL}/response/${id}`),
};

export default responseApi;
