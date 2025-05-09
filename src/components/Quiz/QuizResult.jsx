import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import responseApi from "../../services/responseApi.js";
import quizApi from "../../services/quizapi.js";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const QuizResult = () => {
    const { responseId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const r = await responseApi.getResponseById(responseId);
                setResponse(r.data);
                const q = await quizApi.getQuizById(r.data.quiz_id);
                setQuiz(q.data);
            } catch (e) {
                console.error("Erreur :", e);
            } finally {
                setLoading(false);
            }
        })();
    }, [responseId]);

    const getUserAnswer = (id) =>
        response?.answers.find((a) => a.question_id === id) ?? {
            question_id: id,
            selected_option: "None",
            is_correct: false,
        };

    if (loading)
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
                <div className="spinner-border text-primary" role="status" />
            </div>
        );

    if (!quiz || !response)
        return (
            <p className="text-center mt-5 text-muted">No result available.</p>
        );

    const pct = Math.min(100, response.score);
    const pass = response.isPassed;

    return (
        <div className="bg-light min-vh-100 py-5 d-flex flex-column align-items-center justify-content-center">
            <div
                className="card shadow-lg rounded-4 p-4 p-md-5 w-100 d-flex align-items-center"
                style={{ maxWidth: "1500px" , minHeight: "600px"}}
            >
                {/* Header */}
                <div className="d-flex flex-column align-items-center mb-4 gap-3 w-100">
                    <h1 className="display-5 fw-bold text-center">{quiz.title}</h1>
                    <p className={`lead fw-semibold text-center text-${pass ? "success" : "danger"}`}>
                        You {pass ? "passed" : "did not pass"} this quiz.
                    </p>
                    <span className={`badge fs-5 rounded-pill bg-${pass ? "success" : "danger"}`}>
                        {pass ? "Passed" : "Failed"}
                    </span>

                    {/* Linear progress bar with Bootstrap, 90% card width */}
                    <div style={{ width: "90%" }} className="mt-3">
                        <label className="form-label fw-semibold mb-1 text-center w-100">
                            Score: {pct.toFixed(0)}%
                        </label>
                        <div className="progress" style={{ height: "2rem" }}>
                            <div
                                className={`progress-bar progress-bar-striped ${pass ? "bg-success" : "bg-danger"}`}
                                role="progressbar"
                                style={{ width: `${pct}%`, fontSize: "1.2rem" }}
                                aria-valuenow={pct}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {pct.toFixed(0)}%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions */}
                <div className="row g-4 w-100"
                     style={{ marginTop: '20px' }}

                >
                    {quiz.questions.map((q, i) => {
                        const a = getUserAnswer(q._id);
                        const ok = a.is_correct;

                        return (
                            <div key={q._id} className="col-12 col-md-6">
                                <div className={`card h-100 shadow-sm border-0 rounded-4`}>
                                    <div className="card-body d-flex flex-column">
                                        <header className="d-flex align-items-center gap-3 mb-3">
                                            {ok ? (
                                                <BsCheckCircleFill size={24} className="text-success" />
                                            ) : (
                                                <BsXCircleFill size={24} className="text-danger" />
                                            )}
                                            <h5 className="mb-0 fw-semibold">
                                                Q{i + 1}. {q.text}
                                            </h5>
                                        </header>
                                        <p className="mb-1">
                                            <strong>Your answer:</strong>{" "}
                                            <span className={ok ? "text-success" : "text-danger"}>
                                                {a.selected_option}
                                            </span>
                                        </p>
                                        <p className="mb-1">
                                            <strong>Correct answer:</strong> {q.correct}
                                        </p>
                                        {q.explanation && (
                                            <p className="small mt-auto text-muted fst-italic">
                                                <strong>Why?</strong> {q.explanation}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-5 w-100"
                     style={{ marginTop: '10px' }}>
                    <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5">
                        Back to dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuizResult;
