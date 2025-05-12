import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatsCard = ({ title, value, icon }) => (
    <div className="stats-card">
        <div className="stats-icon">{icon}</div>
        <div className="stats-content">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    </div>
);

const StatsGrid = () => {
    const [stats, setStats] = useState({
        courses: 0,
        users: 0,
        enrollments: 0,
        categories: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [coursesRes, usersRes, enrollRes, catRes] = await Promise.all([
                    axios.get('http://localhost:3000/api/dashboard/count'),
                    axios.get('http://localhost:3000/api/dashboard/countUser'),
                    axios.get('http://localhost:3000/api/dashboard/countEnrolledCourses'),
                    axios.get('http://localhost:3000/api/dashboard/countCatgories')
                ]);

                setStats({
                    courses: coursesRes.data.count,
                    users: usersRes.data.count,
                    enrollments: enrollRes.data.count,
                    categories: catRes.data.count
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div>Loading statistics...</div>;

    return (
        <div className="stats-grid">
            <StatsCard
                title="Total Cours"
                value={stats.courses}
                icon="📚"
            />
            <StatsCard
                title="Utilisateurs"
                value={stats.users}
                icon="👥"
            />
            <StatsCard
                title="Inscriptions"
                value={stats.enrollments}
                icon="🎓"
            />
            <StatsCard
                title="Catégories"
                value={stats.categories}
                icon="🏷️"
            />
        </div>
    );
};

export default StatsGrid;