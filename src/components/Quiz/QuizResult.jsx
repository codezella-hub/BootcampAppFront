import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import responseApi from "../../services/responseApi.js";
import quizApi from "../../services/quizapi.js";
import { CheckCircle, XCircle } from "lucide-react";

const QuizResult = () => {
    const { responseId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(responseId) ;
                const respRes = await responseApi.getResponseById(responseId);
                setResponse(respRes.data);


                const quizRes = await quizApi.getQuizById(respRes.data.quiz_id);
                setQuiz(quizRes.data);
            } catch (err) {
                console.error("Error loading result:", err);
            }
        };
        fetchData();
    }, [responseId]);

    if (!quiz || !response) return <p>Loading result...</p>;

    const getUserAnswer = (qId) => {
        return response.answers.find((a) => a.question_id === qId);
    };

    return (
        <div className="container" style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
            <h2>📊 Result for: {quiz.title}</h2>
            <p><strong>Score:</strong> {response.score.toFixed(2)}%</p>
            <p><strong>Status:</strong> {response.isPassed ? "✅ Passed" : "❌ Failed"}</p>

            {quiz.questions.map((q, i) => {
                const userAns = getUserAnswer(q.question_id);
                const isCorrect = userAns?.is_correct;
                const selected = userAns?.selected_option || "None";

                return (
                    <div
                        key={q.question_id}
                        style={{
                            border: `2px solid ${isCorrect ? "green" : "red"}`,
                            padding: "20px",
                            borderRadius: "10px",
                            marginBottom: "20px",
                            backgroundColor: isCorrect ? "#e6ffe6" : "#ffe6e6",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {isCorrect ? (
                                <CheckCircle color="green" size={22} />
                            ) : (
                                <XCircle color="red" size={22} />
                            )}
                            <h4 style={{ margin: 0 }}>Q{i + 1}: {q.text}</h4>
                        </div>

                        <p><strong>Your answer:</strong> {selected}</p>
                        <p><strong>Correct answer:</strong> {q.correct}</p>
                        {q.explanation && <p><strong>Explanation:</strong> {q.explanation}</p>}
                    </div>
                );
            })}
        </div>
    );
};

export default QuizResult;
