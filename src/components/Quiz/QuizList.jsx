import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import quizApi from "../../services/quizapi.js";

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const quizzesPerPage = 5;

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = () => {
        quizApi.getAllQuizzes()
            .then((res) => setQuizzes(res.data))
            .catch((err) => console.error("Error fetching quizzes:", err));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            quizApi.deleteQuiz(id)
                .then(() => {
                    alert("Quiz deleted successfully!");
                    fetchQuizzes();
                })
                .catch((err) => console.error("Error deleting quiz:", err));
        }
    };

    // Pagination logic
    const indexOfLastQuiz = currentPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

    const totalPages = Math.ceil(quizzes.length / quizzesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="col-lg-9">
            <div className="create-certificates-top-main-wrapper">
                <div className="left">
                    <h5 className="title">Create Your Quiz in 3 Steps</h5>
                    <p className="disc">
                        Add questions, set answer choices, define correct answers, customize difficulty, and review your
                        quiz.
                    </p>
                    <Link to="/quiz-create" className="rts-btn btn-primary">
                        <i className="fa-sharp fa-regular fa-file-certificate"></i> Create Quiz
                    </Link>
                </div>
                <div className="right">
                    <div className="certificates">
                        <img src="assets/images/dashboard/02.png" alt="quiz-dashboard"/>
                    </div>
                </div>
            </div>

            <br/>
            <div className="rts-reviewd-area-dashed table-responsive" style={{whiteSpace: "nowrap"}}>
                <h5 className="title">My Quizzes</h5>
                <table className="table-reviews quiz">
                    <thead>
                    <tr>
                        <th style={{width: "30%"}}>Title</th>
                        <th style={{width: "15%"}}>Difficulty</th>
                        <th style={{width: "15%"}}>Total Questions</th>
                        <th style={{width: "15%"}}>Max Attempts</th>
                        <th style={{width: "15%"}}>Updated At</th>
                        <th style={{width: "10%"}}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentQuizzes.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{textAlign: "center"}}>No quizzes available.</td>
                        </tr>
                    ) : (
                        currentQuizzes.map((quiz) => (
                            <tr key={quiz._id}>
                                <td>{quiz.title}</td>
                                <td>{quiz.difficulty}</td>
                                <td>{quiz.totalQuestions}</td>
                                <td>{quiz.maxAttempts}</td>
                                <td>{new Date(quiz.updatedAt).toLocaleString()}</td>
                                <td>
                                    {/* Use Link for navigation */}
                                    <Link to={`/quizUpdate/${quiz._id}`} className="modern-btn-icon details-btn">
                                        <i className="fa-solid fa-eye"></i> {/* Eye icon for Details */}
                                    </Link>
                                    <button onClick={() => handleDelete(quiz._id)}
                                            className="modern-btn-icon delete-btn" style={{marginLeft: "10px"}}>
                                        <i className="fa-solid fa-trash"></i> {/* Trash icon for Delete */}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
                <div className="pagination-full-width">
                    <span>Page {currentPage} of {totalPages}</span>
                    <div className="pagination">
                        <ul>
                            <li>
                                <a
                                    href="#0"
                                    className="prev modern-btn-icon pagination-btn"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    style={{
                                        pointerEvents: currentPage === 1 ? "none" : "auto",
                                        opacity: currentPage === 1 ? 0.5 : 1
                                    }}
                                >
                                    <i className="fa-solid fa-chevron-left"></i>
                                </a>
                            </li>
                            {[...Array(totalPages).keys()].map((page) => (
                                <li key={page + 1}>
                                    <a
                                        href="#0"
                                        onClick={() => paginate(page + 1)}
                                        className={`modern-btn-icon pagination-btn ${currentPage === page + 1 ? "active" : ""}`}
                                    >
                                        {page + 1}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="#0"
                                    className="next  "
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    style={{
                                        pointerEvents: currentPage === totalPages ? "none" : "auto",
                                        opacity: currentPage === totalPages ? 0.5 : 1
                                    }}
                                >
                                    <i className="fa-solid fa-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizList;