import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizApi from "../../services/quizapi";
import responseApi from "../../services/responseApi";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs";
import { useAuthStore } from "../../store/authStore.js";

const TakeQuiz = () => {
    const { user } = useAuthStore();
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState("");          // ← added
    const [answers, setAnswers] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const user_id = user._id;

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await quizApi.getQuizBySubCourse(id);

                if (!res?.data || !res.data.questions?.length) {
                    throw new Error("QuizNotFound");
                }

                setQuiz(res.data);
                setAnswers(
                    res.data.questions.map((q) => ({
                        question_id: q._id,
                        selected_options: [],
                        is_correct: false,
                    }))
                );
                setStartTime(Date.now());
            } catch (err) {
                console.error("Error fetching quiz:", err);
                setError("Quiz non trouvé. Veuillez vérifier votre cours.");
            }
        };
        fetchQuiz();
    }, [id]);

    const handleToggleSelect = (qId, value) => {
        setAnswers((prev) =>
            prev.map((a) => {
                if (a.question_id !== qId) return a;
                const updatedOptions = a.selected_options.includes(value)
                    ? a.selected_options.filter((opt) => opt !== value)
                    : [...a.selected_options, value];
                return { ...a, selected_options: updatedOptions };
            })
        );
    };

    const handleSubmit = async () => {
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        const evaluatedAnswers = answers.map((a) => {
            const q = quiz.questions.find((q) => q._id === a.question_id);
            const correctSet = new Set([q.correct]);
            const selectedSet = new Set(a.selected_options);
            const isCorrect =
                selectedSet.size === correctSet.size &&
                [...correctSet].every((x) => selectedSet.has(x));
            return { ...a, is_correct: isCorrect };
        });

        const correctCount = evaluatedAnswers.filter((a) => a.is_correct).length;
        const score = (correctCount / quiz.questions.length) * 100;
        const isPassed = score >= 50;

        const payload = {
            user_id,
            quiz_id: quiz._id,
            course_id: quiz.courseId,
            subCourse_id: quiz.subCourseId,
            answers: evaluatedAnswers.map((a) => ({
                question_id: a.question_id,
                selected_option: a.selected_options.join(", ") || "No Answer",
                is_correct: a.is_correct,
            })),
            score,
            isPassed,
            timeTaken,
        };

        try {
            console.log("Payload being sent to the backend:", payload);
            const res = await responseApi.submitResponse(payload);
            setSubmitted(true);
            console.log("Response from backend:", res.data);
            alert("Your answers have been submitted successfully!");
            navigate(`/quizResult/${res.data._id}`);
        } catch (err) {
            console.error("Submit error:", err);
            alert("Failed to submit your answers.");
        }
    };

    const autoSubmitZeroScore = async (reason = "Auto‑submit") => {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const normalizedAnswers = quiz.questions.map((q) => {
            const existing = answers.find((a) => a.question_id === q._id);
            return {
                question_id: q._id,
                selected_option:
                    existing?.selected_options?.length
                        ? existing.selected_options.join(", ")
                        : "No Answer",
                is_correct: false,
            };
        });

        const payload = {
            user_id,
            quiz_id: quiz._id,
            course_id: quiz.courseId,
            subCourse_id: quiz.subCourseId,
            answers: normalizedAnswers,
            score: 0,
            isPassed: false,
            attemptNumber: 1,
            timeTaken,
        };

        try {
            console.log("Auto‑submit payload ➜", payload);
            const { data } = await responseApi.submitResponse(payload);
            setSubmitted(true);
            alert(`Quiz failed!\nReason: ${reason}`);
            navigate(`/quizResult/${data._id}`);
        } catch (err) {
            console.error("Auto‑submit error:", err);
            alert("Failed to auto‑submit your quiz. Please check your connection.");
        }
    };

    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (document.visibilityState === "hidden" && !submitted && quiz) {
                await autoSubmitZeroScore("Tab changed");
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () =>
            document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [quiz, answers, startTime, submitted]);

    useEffect(() => {
        let model;
        let video = document.createElement("video");
        let noFaceCount = 0;

        const initFaceTracking = async () => {
            try {
                model = await blazeface.load();
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;
                video.play();
                document.body.appendChild(video);
                video.style.position = "fixed";
                video.style.bottom = "10px";
                video.style.right = "10px";
                video.style.width = "200px";
                video.style.border = "2px solid #ccc";
                video.style.zIndex = "9999";

                const checkFace = async () => {
                    if (submitted || !quiz) return;
                    const predictions = await model.estimateFaces(video, false);
                    console.log("Face predictions:", predictions);

                    if (predictions.length === 0) {
                        noFaceCount++;
                        if (noFaceCount > 30) {
                            await autoSubmitZeroScore("Face not detected");
                        } else {
                            requestAnimationFrame(checkFace);
                        }
                    } else {
                        noFaceCount = 0;
                        requestAnimationFrame(checkFace);
                    }
                };

                video.onloadeddata = () => checkFace();
            } catch (err) {
                console.warn("Webcam or model failed:", err);
            }
        };

        initFaceTracking();

        return () => {
            video.pause();
            video.srcObject?.getTracks().forEach((track) => track.stop());
            video.remove();
        };
    }, [quiz, answers, startTime, submitted]);

    const currentQuestion = quiz?.questions[currentIndex];
    const selectedOptions =
        answers.find((a) => a.question_id === currentQuestion?._id)
            ?.selected_options || [];
    const progress = ((currentIndex + 1) / (quiz?.questions.length || 1)) * 100;

    if (error) return <p style={{ textAlign: "center", marginTop: "2rem" }}>{error}</p>; // ← added
    if (!quiz) return <p>Loading quiz...</p>;
    if (submitted) return <p>✅ Quiz submitted! Score will be reviewed.</p>;

    return (
        <div
            className="container"
            style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}
        >
            <h2>{quiz.title}</h2>
            <div
                style={{
                    height: "10px",
                    background: "#e0e0e0",
                    borderRadius: "5px",
                    overflow: "hidden",
                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        backgroundColor: "#553CDF",
                        height: "100%",
                    }}
                ></div>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <h4>
                    {currentIndex + 1}. {currentQuestion.text}
                </h4>
                {currentQuestion.options.map((opt, idx) => (
                    <div key={idx} style={{ marginBottom: "8px" }}>
                        <label
                            style={{
                                display: "block",
                                padding: "10px",
                                background: selectedOptions.includes(opt)
                                    ? "#d3c8ff"
                                    : "#f0f0f0",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                value={opt}
                                checked={selectedOptions.includes(opt)}
                                onChange={() => handleToggleSelect(currentQuestion._id, opt)}
                                style={{ marginRight: "10px" }}
                            />
                            {opt}
                        </label>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentIndex === 0}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#ccc",
                        borderRadius: "6px",
                        border: "none",
                    }}
                >
                    Previous
                </button>
                {currentIndex < quiz.questions.length - 1 ? (
                    <button
                        onClick={() =>
                            setCurrentIndex((prev) =>
                                Math.min(prev + 1, quiz.questions.length - 1)
                            )
                        }
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#553CDF",
                            color: "white",
                            borderRadius: "6px",
                            border: "none",
                        }}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "green",
                            color: "white",
                            borderRadius: "6px",
                            border: "none",
                        }}
                    >
                        Submit Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default TakeQuiz;
