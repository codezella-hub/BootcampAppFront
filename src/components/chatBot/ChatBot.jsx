import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css';

function ChatBot() {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!question.trim()) return;

        const newMessages = [...messages, { type: 'user', text: question }];
        setMessages(newMessages);
        setQuestion('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/gemini/ask', {
                question: question,
            });

            setMessages([
                ...newMessages,
                { type: 'bot', text: response.data.answer }
            ]);
        } catch (error) {
            console.error(error);
            setMessages([
                ...newMessages,
                { type: 'bot', text: '❌ Erreur lors de la génération de la réponse.' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAsk();
        }
    };

    return (

        <div className="container chatbot-container mt-5" style={{ marginTop: '40px', marginBottom: '40px' }}>
            <h1 className="text-center mb-4">💬 ChatBot</h1>

            <div className="chat-window mb-3">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-bubble ${msg.type === 'user' ? 'user-msg' : 'bot-msg'}`}
                    >
                        {msg.text}
                    </div>
                ))}

                {loading && (
                    <div className="chat-bubble bot-msg">
                        ⏳ Loading...
                    </div>
                )}
            </div>

            <div className="input-group custom-input-group">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question here..."
                    className="form-control custom-input"
                />
                <button onClick={handleAsk} className="btn custom-btn">
                    Send
                </button>
            </div>
        </div>

    );
}

export default ChatBot;
