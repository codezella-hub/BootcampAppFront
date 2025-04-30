import React, {useState} from "react";

import { ArrowRight } from 'lucide-react';
import './room.css'
import {useNavigate} from "react-router-dom";
function HomeRooms() {
    const [roomID, setRoomID] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/room/${roomID}`);
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark p-4">
            <div className="w-100" style={{maxWidth: '420px'}}>
                <div className="text-center mb-5">
                    <h1 className="display-6 fw-bold text-white mb-3">Welcome 👋</h1>
                    <p className="text-secondary fs-6">Enter your room ID below to join or start a new one</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group shadow-sm">
                        <input
                            type="text"
                            value={roomID}
                            onChange={(e) => setRoomID(e.target.value)}
                            className="form-control bg-secondary text-white border-0 rounded-start-pill py-3 ps-4"
                            placeholder="Room ID"
                            required
                        />
                        <button
                            type="submit"
                            className="btn btn-primary rounded-end-pill px-4 d-flex align-items-center justify-content-center"
                            style={{zIndex: 1}}
                        >
                            <ArrowRight size={20} color="#fff"/>
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-muted small mb-0">Don’t have a room?
                        <a href="#" className="text-decoration-none ms-1">Create a new one</a>
                    </p>
                </div>
            </div>
        </div>

    );
}

export default HomeRooms;