import axios from "axios";

const API_URL = "http://localhost:3000/api/response/";

const responseApi = {

    submitResponse: (responseData) => axios.post(`${API_URL}`, responseData, {
        headers: { "Content-Type": "application/json" },
    }),

    getAllResponses: () => axios.get(`${API_URL}`),

    getResponseById: (id) => axios.get(`${API_URL}${id}`),

    deleteResponse: (id) => axios.delete(`${API_URL}${id}`),
};

export default responseApi;
