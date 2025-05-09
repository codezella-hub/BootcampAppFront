import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizApi from "../../services/quizapi";
import responseApi from "../../services/responseApi";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs";
import { useAuthStore } from "../../store/authStore";
import Modal from "react-modal";

Modal.setAppElement("#root");           // accessibility

const TakeQuiz = () => {
    /* ——————————————————— state ——————————————————— */
    const { user }  = useAuthStore();
    const { id }    = useParams();
    const navigate  = useNavigate();
    const user_id   = user._id;

    const [quiz, setQuiz]               = useState(null);
    const [answers, setAnswers]         = useState([]);
    const [startTime, setStartTime]     = useState(null);
    const [submitted, setSubmitted]     = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError]             = useState("");

    /* new UI flags */
    const [showRules,  setShowRules]  = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [score,      setScore]      = useState(null);

    /* ——————————————————— fetch quiz once ——————————————————— */
    useEffect(() => {
        (async () => {
            try {
                const res = await quizApi.getQuizBySubCourse(id);
                if (!res?.data || !res.data.questions?.length) throw new Error("QuizNotFound");

                setQuiz(res.data);
                setAnswers(
                    res.data.questions.map((q) => ({
                        question_id: q._id,
                        selected_options: [],
                        is_correct: false,
                    }))
                );
                setStartTime(Date.now());               // timer starts now
            } catch (e) {
                console.error(e);
                setError("Quiz not found. Please check the course.");
            }
        })();
    }, [id]);

    /* ——————————————————— helpers ——————————————————— */
    const currentQ = quiz?.questions[currentIndex];
    const selected = answers.find((a) => a.question_id === currentQ?._id)
        ?.selected_options ?? [];
    const progress  = quiz ? ((currentIndex + 1) / quiz.questions.length) * 100 : 0;

    const toggleSelect = (qid, option) =>
        setAnswers((prev) =>
            prev.map((a) =>
                a.question_id !== qid
                    ? a
                    : {
                        ...a,
                        selected_options: a.selected_options.includes(option)
                            ? a.selected_options.filter((o) => o !== option)
                            : [...a.selected_options, option],
                    }
            )
        );

    /* ——————————————————— submit / auto-submit ——————————————————— */
    const buildPayload = (evaluated, scoreVal, passed, timeTaken) => ({
        user_id,
        quiz_id: quiz._id,
        course_id: quiz.courseId,
        subCourse_id: quiz.subCourseId,
        answers: evaluated.map((a) => ({
            question_id: a.question_id,
            selected_option: a.selected_options.join(", ") || "No Answer",
            is_correct: a.is_correct,
        })),
        score: scoreVal,
        isPassed: passed,
        attemptNumber: 1,
        timeTaken,
    });

    const handleSubmit = async () => {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const evaluated = answers.map((a) => {
            const q = quiz.questions.find((q) => q._id === a.question_id);
            const correctSet  = new Set([q.correct]);
            const selectedSet = new Set(a.selected_options);
            const isCorrect   =
                selectedSet.size === correctSet.size &&
                [...correctSet].every((x) => selectedSet.has(x));
            return { ...a, is_correct: isCorrect };
        });

        const correct     = evaluated.filter((a) => a.is_correct).length;
        const scoreVal    = (correct / quiz.questions.length) * 100;
        const passed      = scoreVal >= 50;

        try {
            const { data } = await responseApi.submitResponse(
                buildPayload(evaluated, scoreVal, passed, timeTaken)
            );
            setScore(scoreVal.toFixed(1));
            setSubmitted(true);
            setShowResult(true);
            navigate(`/quizResult/${data._id}`, { replace: true });
        } catch (e) {
            console.error(e);
            alert("Failed to submit your answers.");
        }
    };

    const autoSubmitZero = async (reason = "Auto-submit") => {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const normalized = quiz.questions.map((q) => {
            const prev = answers.find((a) => a.question_id === q._id);
            return {
                question_id: q._id,
                selected_options: prev?.selected_options ?? [],
                is_correct: false,
            };
        });

        try {
            const { data } = await responseApi.submitResponse(
                buildPayload(normalized, 0, false, timeTaken)
            );
            setSubmitted(true);
            alert(`Quiz failed!\nReason: ${reason}`);
            navigate(`/quizResult/${data._id}`, { replace: true });
        } catch (e) {
            console.error(e);
            alert("Auto-submit failed. Check your connection.");
        }
    };

    /* ——————————————————— anti-cheat (tab change) ——————————————————— */
    useEffect(() => {
        const onVis = () => {
            if (document.visibilityState === "hidden" && !submitted && quiz) {
                autoSubmitZero("Tab changed");
            }
        };
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, [quiz, answers, startTime, submitted]);

    /* ——————————————————— face-tracking ——————————————————— */
    useEffect(() => {
        let model, rafId, stream;
        const video = document.createElement("video");
        let noFace = 0;

        const stopAll = () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (stream) stream.getTracks().forEach((t) => t.stop());
            video.pause(); video.srcObject = null; video.remove();
            if (model?.dispose) model.dispose();
        };

        const track = async () => {
            if (submitted || !quiz) return;
            if (document.visibilityState !== "visible") {
                rafId = requestAnimationFrame(track);
                return;
            }
            const preds = await model.estimateFaces(video, false);
            if (!preds.length) {
                if (++noFace > 30) {
                    await autoSubmitZero("Face not detected");
                    stopAll(); return;
                }
            } else noFace = 0;
            rafId = requestAnimationFrame(track);
        };

        (async () => {
            try {
                model  = await blazeface.load();
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream; video.play();
                Object.assign(video.style, {
                    position: "fixed",
                    top:    "10px",
                    left:   "10px",
                    width:  "180px",
                    border: "2px solid #ccc",
                    borderRadius: "8px",
                    zIndex: 9999,
                });
                document.body.appendChild(video);
                video.onloadeddata = () => { rafId = requestAnimationFrame(track); };
            } catch (e) { console.warn("Webcam / model error:", e); }
        })();

        return stopAll;
    }, [quiz, answers, startTime, submitted]);

    /* ✱ 1)  copy-paste / screenshot guard  */
    useEffect(() => {
        if (!quiz || submitted) return;

        /* ——— helper: prevent default & warn ——— */
        const blockEvent = (e, reason) => {
            e.preventDefault();
            e.stopPropagation();
            alert(reason);
        };

        /* ——— copy / cut / paste ——— */
        const onCopy  = (e) => blockEvent(e, "Copying is disabled during the quiz.");
        const onCut   = (e) => blockEvent(e, "Cut is disabled during the quiz.");
        const onPaste = (e) => blockEvent(e, "Pasting is disabled during the quiz.");

        /* ——— right-click context-menu ——— */
        const onContext = (e) =>
            blockEvent(e, "Right-click is disabled during the quiz.");

        /* ——— Print-Screen key (≈ screenshot) ——— */
        const onKey = async (e) => {
            if (e.key === "PrintScreen") {
                await autoSubmitZero("Screenshot attempt");
            }
            /* common shortcuts (Win+Shift+S, macOS Cmd+Shift+4) map to other keys
               that cannot be blocked reliably in browsers. */
        };

        /* attach */
        document.addEventListener("copy",  onCopy,  true);
        document.addEventListener("cut",   onCut,   true);
        document.addEventListener("paste", onPaste, true);
        document.addEventListener("contextmenu", onContext, true);
        document.addEventListener("keydown", onKey, true);

        /* detach */
        return () => {
            document.removeEventListener("copy",  onCopy,  true);
            document.removeEventListener("cut",   onCut,   true);
            document.removeEventListener("paste", onPaste, true);
            document.removeEventListener("contextmenu", onContext, true);
            document.removeEventListener("keydown", onKey, true);
        };
    }, [quiz, submitted, autoSubmitZero]);

    /* ——————————————————— modal styles ——————————————————— */
    const modalStyle = {
        content: {
            top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            maxWidth: 600, width: "90%", padding: 30,
            borderRadius: 10, boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        },
        overlay: { backgroundColor: "rgba(0,0,0,0.75)", zIndex: 1000 },
    };

    /* ——————————————————— guards ——————————————————— */
    if (error)  return <p style={{ textAlign: "center", marginTop: "2rem" }}>{error}</p>;
    if (!quiz)  return <p>Loading quiz…</p>;

    /* ——————————————————— render ——————————————————— */
    return (
        <>
            {/* ——— RULES MODAL ——— */}
            <Modal
                isOpen={showRules}
                style={modalStyle}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
            >
                <h2 style={{ textAlign: "center", color: "#553CDF", marginBottom: 20 }}>Quiz Rules</h2>
                <ul style={{ paddingLeft: 22, marginBottom: 25 }}>
                    <li>❌ Do not switch tabs – auto submit = 0.</li>
                    <li>📹 Keep your camera on – AI checks you are present.</li>
                    <li>🚫 No copy/paste or screenshots.</li>
                    <li>⏱️ The quiz auto-submits when time is up.</li>
                    <li>🔍 Cheating attempts are detected and penalised.</li>
                </ul>
                <p style={{ fontStyle: "italic" }}>By clicking “Start Quiz”, you accept these rules.</p>
                <div style={{ textAlign: "center", marginTop: 25 }}>
                    <button
                        onClick={() => setShowRules(false)}
                        style={{
                            padding: "12px 30px", background: "#553CDF", color: "#fff",
                            border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600,
                        }}
                    >
                        Start Quiz
                    </button>
                </div>
            </Modal>

            {/* ——— QUIZ UI ——— */}
            {!showRules && !submitted && (
                <div
                    style={{
                        minHeight: "100vh", display: "flex",
                        justifyContent: "center", alignItems: "center", padding: "2rem",
                    }}
                >
                    <div
                        className="container"
                        style={{
                            width: "90%", maxWidth: 900, background: "#fff",
                            borderRadius: 8, padding: 32,
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        }}
                    >
                        {/* progress */}
                        <h2 style={{ textAlign: "center" }}>{quiz.title}</h2>
                        <div style={{ height: 10, background: "#e0e0e0", borderRadius: 5, overflow: "hidden", margin: "20px 0" }}>
                            <div style={{ width: `${progress}%`, background: "#553CDF", height: "100%" }} />
                        </div>

                        {/* question */}
                        <h4 style={{ textAlign: "center", marginBottom: 20 }}>
                            {currentIndex + 1}. {currentQ.text}
                        </h4>
                        {currentQ.options.map((opt, i) => (
                            <label
                                key={i}
                                style={{
                                    display: "block", marginBottom: 8, padding: 10, borderRadius: 8,
                                    background: selected.includes(opt) ? "#d3c8ff" : "#f0f0f0", cursor: "pointer",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(opt)}
                                    onChange={() => toggleSelect(currentQ._id, opt)}
                                    style={{ marginRight: 10 }}
                                />
                                {opt}
                            </label>
                        ))}

                        {/* navigation */}
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, marginTop: 30 }}>
                            <button
                                disabled={currentIndex === 0}
                                onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
                                style={{
                                    padding: "10px 20px", background: "#ccc",
                                    border: "none", borderRadius: 6,
                                    cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                                }}
                            >
                                Previous
                            </button>

                            {currentIndex < quiz.questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentIndex((i) => Math.min(i + 1, quiz.questions.length - 1))}
                                    style={{
                                        padding: "10px 20px", background: "#553CDF", color: "#fff",
                                        border: "none", borderRadius: 6, cursor: "pointer",
                                    }}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    style={{
                                        padding: "10px 20px", background: "green", color: "#fff",
                                        border: "none", borderRadius: 6, cursor: "pointer",
                                    }}
                                >
                                    Submit Quiz
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ——— RESULT MODAL ——— */}
            <Modal
                isOpen={showResult}
                onRequestClose={() => setShowResult(false)}
                style={modalStyle}
                contentLabel="Quiz Result"
            >
                <h2 style={{ textAlign: "center", color: "green", marginBottom: 20 }}>Quiz Submitted!</h2>
                {score !== null ? (
                    <p style={{ textAlign: "center", fontSize: 18 }}>
                        Your score: <strong>{score}%</strong>
                    </p>
                ) : (
                    <p style={{ textAlign: "center" }}>
                        Your answers were saved. Results will be reviewed shortly.
                    </p>
                )}
                <div style={{ textAlign: "center", marginTop: 25 }}>
                    <button
                        onClick={() => setShowResult(false)}
                        style={{
                            padding: "10px 25px", background: "#553CDF", color: "#fff",
                            border: "none", borderRadius: 6, cursor: "pointer",
                        }}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default TakeQuiz;
