import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import quizApi from "../../services/quizapi.js";
import { CheckCircle, XCircle } from "lucide-react";
const primaryColor = "#553CDF";
const lightGray = "#f4f4f4";

export const QuizUpdate = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await quizApi.getQuizById(id);
                const quizData = response.data;
                setQuiz(quizData);
                setQuestions(quizData.questions || []);
            } catch (error) {
                console.error("Error fetching quiz:", error);
            }
        };
        fetchQuiz();
    }, [id]);

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
        const newQuestion = {
            question_id: Date.now().toString(),
            text: "",
            options: [""],
            correct: "",
            type: "",
            explanation: "",
        };
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const deleteQuestion = (index) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };

    const submitQuiz = async (e) => {
        e.preventDefault();
        const payload = { ...quiz, questions };
        try {
            const response = await quizApi.updateQuiz(id, payload);
            console.log("✅ Quiz updated:", response.data);
            alert("Quiz updated successfully!");
        } catch (error) {
            console.error("❌ Failed to update quiz:", error);
            alert("Failed to update quiz. Check console.");
        }
    };

    if (!quiz) return <p>Loading...</p>;

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

                                        <label style={{ border: `2px solid ${primaryColor}`, padding: "12px", borderRadius: "8px", backgroundColor: lightGray }}>Time Limit (minutes):
                                            <input
                                                type="number"
                                                name="timeLimit"
                                                value={quiz.timeLimit}
                                                onChange={handleQuizChange}
                                                style={{ width: "100%", padding: "10px", marginTop: "5px", border: `1px solid ${primaryColor}`, borderRadius: "6px" }}
                                            />
                                        </label>

                                        {questions.map((question, qIndex) => (
                                            <div key={question.question_id} style={{ border: `2px solid ${primaryColor}`, padding: "20px", borderRadius: "12px", backgroundColor: lightGray }}>
                                                <h3 style={{ color: primaryColor }}>Question {qIndex + 1}</h3>
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
                                                <button type="button" onClick={() => addOptionField(qIndex)} style={{ padding: "10px", backgroundColor: primaryColor, color: "white", border: "none", borderRadius: "6px", fontWeight: "bold" }}>
                                                    + Add Option
                                                </button>
                                                <label style={{ border: `1px solid ${primaryColor}`, padding: "10px", borderRadius: "6px", marginTop: "10px", display: "block" }}>Correct Answer:
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
                                                <button type="button" onClick={() => deleteQuestion(qIndex)} style={{ padding: "10px", marginTop: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold" }}>
                                                    Delete Question
                                                </button>
                                            </div>
                                        ))}

                                        <button type="button" onClick={addQuestion} style={{ marginTop: "15px", padding: "12px", backgroundColor: primaryColor, color: "white", borderRadius: "8px", fontWeight: "bold", border: "none" }}>
                                            + Add Another Question
                                        </button>

                                        <button type="submit" style={{ marginTop: "25px", marginBottom: "10px", padding: "14px", backgroundColor: primaryColor, color: "white", borderRadius: "8px", fontWeight: "bold", border: "none" }}>
                                            Update Quiz
                                        </button>
                                    </div>
                                </form>
                            </div>




        </>
    );
};

export default QuizUpdate;