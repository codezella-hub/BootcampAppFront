import { useState } from "react";

import quizApi from "../../services/quizapi.js";
import { useParams } from "react-router-dom";

import { useAuthStore } from '../../store/authStore.js';
const primaryColor = "#553CDF"; // purple
const lightGray = "#f4f4f4";


const QuizCreate = () => {
    const { courseId, subCourseId } = useParams();
    const { user } = useAuthStore();
    const [quiz, setQuiz] = useState({
        title: "",
        subCourseId: subCourseId,
        courseId: courseId,
        difficulty: "",
        totalQuestions: 0,
        maxAttempts: 0,
        timeLimit: 0,
        createdBy: user._id,
        questions: [],
    });

    const [questions, setQuestions] = useState([
        {
            question_id: Date.now().toString(),
            text: "",
            options: [""],
            correct: "",
            type: "",
            explanation: "",
        },
    ]);

    const handleQuizChange = (e) => {
        const { name, value } = e.target;
        setQuiz({ ...quiz, [name]: value });
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...questions];
        updated[index][name] = value;
        setQuestions(updated);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const updated = [...questions];
        updated[qIndex].options[oIndex] = value;
        setQuestions(updated);
    };

    const addOptionField = (index) => {
        const updated = [...questions];
        updated[index].options.push("");
        setQuestions(updated);
    };

    const addQuestion = () => {
        setQuestions([...questions, {
            question_id: Date.now().toString(),
            text: "",
            options: [""],
            correct: "",
            type: "",
            explanation: "",
        }]);
    };

    const deleteQuestion = (index) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };

    const submitQuiz = async (e) => {
        e.preventDefault();

        if (!quiz.title.trim() || !quiz.difficulty || !quiz.timeLimit) {
            return alert("Veuillez remplir tous les champs du quiz.");
        }

        // Vérification des questions
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];

            if (!q.text.trim()) {
                return alert(`Veuillez saisir l'énoncé de la question ${i + 1}`);
            }

            const nonEmptyOptions = q.options.filter(opt => opt.trim() !== "");
            if (nonEmptyOptions.length < 2) {
                return alert(`La question ${i + 1} doit contenir au moins 2 options valides.`);
            }

            if (!q.correct || !nonEmptyOptions.includes(q.correct)) {
                return alert(`Veuillez choisir une réponse correcte valide pour la question ${i + 1}.`);
            }
        }

        // Validate quiz data
        const payload = { ...quiz, questions };

        try {
            const response = await quizApi.createQuiz(payload);
            console.log("✅ Quiz saved:", response.data);
            alert("Quiz saved to database!");

            // Optionally reset form
            // setQuiz({ title: "", subCourseId: "", courseId: "", difficulty: "", totalQuestions: 0, maxAttempts: 0, timeLimit: 0, createdBy: "", questions: [] });
            // setQuestions([{ question_id: Date.now().toString(), text: "", options: [""], correct: "", type: "", explanation: "" }]);

        } catch (error) {
            console.error("❌ Failed to save quiz:", error);
            alert("Failed to save quiz. Check console.");
        }
    };



    return (
        <>




                            <div className="col-lg-9">
                                <form onSubmit={submitQuiz}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                        <label style={{ border: `2px solid ${primaryColor}`, padding: "12px", borderRadius: "8px", backgroundColor: lightGray }}>Quiz Title:
                                            <input
                                                type="text"
                                                name="title"
                                                value={quiz.title}
                                                onChange={handleQuizChange}
                                                style={{ width: "100%", padding: "10px", marginTop: "5px", border: `1px solid ${primaryColor}`, borderRadius: "6px" }}
                                            />
                                        </label>

                                        <label style={{ border: `2px solid ${primaryColor}`, padding: "12px", borderRadius: "8px", backgroundColor: lightGray }}>Difficulty:
                                            <select
                                                name="difficulty"
                                                value={quiz.difficulty}
                                                onChange={handleQuizChange}
                                                style={{ width: "100%", padding: "10px", marginTop: "5px", border: `1px solid ${primaryColor}`, borderRadius: "6px" }}
                                            >
                                                <option value="">Select</option>
                                                <option value="easy">Easy</option>
                                                <option value="medium">Medium</option>
                                                <option value="hard">Hard</option>
                                            </select>
                                        </label>

                                        <label style={{ border: `2px solid ${primaryColor}`, padding: "12px", borderRadius: "8px", backgroundColor: lightGray }}> timeLimit:
                                            <input
                                                type="number"
                                                name="timeLimit"
                                                value={quiz.timeLimit}
                                                onChange={handleQuizChange}
                                                style={{ width: "100%", padding: "10px", marginTop: "5px", border: `1px solid ${primaryColor}`, borderRadius: "6px" }}
                                            />
                                        </label>

                                        {questions.map((question, qIndex) => (
                                            <div key={question.question_id} style={{ border: `2px solid ${primaryColor}`, padding: "20px", position: "relative", borderRadius: "12px", backgroundColor: lightGray }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <h3 style={{ color: primaryColor, margin: 0 }}>Question {qIndex + 1}</h3>
                                                </div>

                                                <input
                                                    type="text"
                                                    name="text"
                                                    placeholder="Question Text"
                                                    value={question.text}
                                                    onChange={(e) => handleQuestionChange(qIndex, e)}
                                                    style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: `1px solid ${primaryColor}` }}
                                                />

                                                {question.options.map((opt, oIndex) => (
                                                    <input
                                                        key={oIndex}
                                                        type="text"
                                                        value={opt}
                                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                                        placeholder={`Option ${oIndex + 1}`}
                                                        style={{ width: "100%", padding: "10px", marginBottom: "6px", borderRadius: "6px", border: `1px solid ${primaryColor}` }}
                                                    />
                                                ))}

                                                <button
                                                    type="button"
                                                    onClick={() => addOptionField(qIndex)}
                                                    style={{ padding: "10px", backgroundColor: primaryColor, color: "white", border: "none", borderRadius: "6px", fontWeight: "bold" }}
                                                >
                                                    + Add Option
                                                </button>

                                                <label style={{ border: `1px solid ${primaryColor}`, padding: "10px", borderRadius: "6px", marginTop: "10px", display: "block" }}>
                                                    Correct Answer:
                                                    <select
                                                        value={question.correct}
                                                        onChange={(e) => handleQuestionChange(qIndex, { target: { name: "correct", value: e.target.value } })}
                                                        style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "6px", border: `1px solid ${primaryColor}` }}
                                                    >
                                                        <option value="">Select Correct Answer</option>
                                                        {question.options.map((opt, idx) => (
                                                            <option key={idx} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                </label>

                                                <input
                                                    type="text"
                                                    name="explanation"
                                                    placeholder="Explanation"
                                                    value={question.explanation}
                                                    onChange={(e) => handleQuestionChange(qIndex, e)}
                                                    style={{ width: "100%", padding: "10px", marginTop: "10px", borderRadius: "6px", border: `1px solid ${primaryColor}` }}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => deleteQuestion(qIndex)}
                                                    style={{ padding: "10px", marginTop: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold" }}
                                                >
                                                    Delete Question
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={addQuestion}
                                            style={{ marginTop: "15px", padding: "12px", backgroundColor: primaryColor, color: "white", borderRadius: "8px", fontWeight: "bold", border: "none" }}
                                        >
                                            + Add Another Question
                                        </button>

                                        <button
                                            type="submit"
                                            style={{ marginTop: "25px", marginBottom: "10px", padding: "14px", backgroundColor: primaryColor, color: "white", borderRadius: "8px", fontWeight: "bold", border: "none" }}
                                        >
                                            Submit Quiz
                                        </button>
                                    </div>
                                </form>
                            </div>
                       



        </>
    );
};

export default QuizCreate;

