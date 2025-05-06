import axios from "axios";

const API_URL = "http://localhost:3000/api/response/";

const responseApi = {
    // ➜ POST /api/response/
    submitResponse: (data) =>
        axios.post(API_URL, data, {
            headers: { "Content-Type": "application/json" },
        }),

    // ➜ GET /api/response/
    getAllResponses: () => axios.get(API_URL),

    // ➜ GET /api/response/:id
    getResponseById: (id) => axios.get(`${API_URL}${id}`),

    // ➜ DELETE /api/response/:id
    deleteResponse: (id) => axios.delete(`${API_URL}${id}`),

    // ➜ GET /api/response/user/:userId
    getResponsesByUser: (userId) => axios.get(`${API_URL}user/${userId}`),

    // ➜ GET /api/response/quiz/:quizId
    getResponsesByQuiz: (quizId) => axios.get(`${API_URL}quiz/${quizId}`),

    // ➜ GET /api/response/subCourse/:subCourseId
    getResponsesBySubCourse: (subCourseId) =>
        axios.get(`${API_URL}subCourse/${subCourseId}`),

    // ➜ GET /api/response/course/:courseId
    getResponsesByCourse: (courseId) => axios.get(`${API_URL}course/${courseId}`),
};

export default responseApi;
