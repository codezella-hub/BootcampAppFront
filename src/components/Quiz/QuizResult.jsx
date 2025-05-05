import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import responseApi from "../../services/responseApi.js";
import quizApi from "../../services/quizapi.js";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./quizResult.css";

/**
 * QuizResult – Creative UI (Bootstrap + custom CSS)
 * - Glassmorphism cards, animated radial gradient background
 * - Circular score indicator
 */
const QuizResult = () => {
    const { responseId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respRes = await responseApi.getResponseById(responseId);
                setResponse(respRes.data);
                const quizRes = await quizApi.getQuizById(respRes.data.quiz_id);
                setQuiz(quizRes.data);
            } catch (err) {
                console.error("Error loading result:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [responseId]);

    const getUserAnswer = (qId) => {
        const ans = response?.answers.find((a) => a.question_id === qId);
        return ans || { question_id: qId, selected_option: "None", is_correct: false };
    };

    if (loading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center bg-gradient">
                <div className="spinner-border text-light" role="status" />
            </div>
        );
    }

    if (!quiz || !response) return <p className="text-center mt-5">No result available.</p>;

    const circleDegree = Math.min(100, response.score) * 3.6; // convert % to deg
    const circleColor = response.isPassed ? "#28a745" : "#dc3545";

    return (
        <div className="quiz-bg py-5 px-3 px-md-4">
            <div className="container-lg">
                {/* Hero card */}
                <div className="glass-card text-light mb-5 p-4 p-md-5 shadow-lg position-relative overflow-hidden">
                    <h1 className="display-5 fw-bold mb-4 text-center text-md-start">
                        {quiz.title}
                    </h1>

                    {/* Circular score */}
                    <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                        <div className="circle-wrap">
                            <svg width="160" height="160" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" stroke="#ffffff22" strokeWidth="12" fill="none" />
                                <circle
                                    cx="60" cy="60" r="54" stroke={circleColor}
                                    strokeWidth="12" fill="none"
                                    strokeDasharray={`${circleDegree} 999`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 60 60)"
                                />
                                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fs-3 fw-semibold" fill="#f8f9fa">
                                    {response.score.toFixed(0)}%
                                </text>
                            </svg>
                        </div>

                        <div className="flex-grow-1">
                            <p className="lead mb-3">
                                You <span className="fw-semibold">{response.isPassed ? "passed" : "did not pass"}</span> this quiz.
                            </p>
                            <span className={`badge px-3 py-2 fs-6 ${response.isPassed ? "bg-success" : "bg-danger"}`}>{
                                response.isPassed ? "Passed" : "Failed"
                            }</span>
                        </div>
                    </div>
                </div>

                {/* Questions */}
                <div className="row g-4">
                    {quiz.questions.map((q, i) => {
                        const userAns = getUserAnswer(q._id);
                        const isCorrect = userAns.is_correct;
                        const selected = userAns.selected_option || "None";

                        return (
                            <div key={q._id} className="col-12 col-md-6">
                                <div className={`glass-card-sm h-100 border-3 ${isCorrect ? "border-success" : "border-danger"}`}>
                                    <div className="d-flex align-items-start gap-2 mb-3">
                                        {isCorrect ? (
                                            <BsCheckCircleFill className="text-success flex-shrink-0" size={24} />
                                        ) : (
                                            <BsXCircleFill className="text-danger flex-shrink-0" size={24} />
                                        )}
                                        <h5 className="fw-semibold mb-0 text-white">Q{i + 1}. {q.text}</h5>
                                    </div>

                                    <p className="mb-1 text-white-50"><strong>Your answer:</strong> {selected}</p>
                                    <p className="mb-1 text-white-50"><strong>Correct answer:</strong> {q.correct}</p>
                                    {q.explanation && (
                                        <p className="text-white-50 small mt-auto"><strong>Explanation:</strong> {q.explanation}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuizResult;
