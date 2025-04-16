import axios from "axios";

const API_URL = "http://localhost:3000/api/quiz";

const QuizApi = {
    createQuiz: (quizData) => axios.post(API_URL, quizData, {
        headers: { "Content-Type": "application/json" },
    }),
    getAllQuizzes: () => axios.get(API_URL),

    getQuizBySubCourse: (subCourseId) => axios.get(`${API_URL}/subCourse/${subCourseId}`),
    getQuizByCourse: (subCourseId) => axios.get(`${API_URL}/course/${subCourseId}`),
    getQuizByUser: (userId) => axios.get(`${API_URL}/user/${userId}`),

    getQuizById: (id) => axios.get(`${API_URL}/${id}`),

    updateQuiz: (id, quizData) => axios.put(`${API_URL}/${id}`, quizData, {
        headers: { "Content-Type": "application/json" },
    }),

    deleteQuiz: (id) => axios.delete(`${API_URL}/${id}`),
};

export default QuizApi;
