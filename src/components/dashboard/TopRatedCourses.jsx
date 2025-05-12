import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopRatedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/dashboard/by-rating');
                setCourses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching top courses:', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <div>Loading top courses...</div>;

    return (
        <div className="top-courses">
            <h2>Top 50 des cours par évaluation</h2>
            <div className="courses-list">
                {courses.map((course, index) => (
                    <div key={course._id} className="course-item">
                        <span className="rank">{index + 1}</span>
                        <span className="title">{course.title}</span>
                        <span className="rating">
              {Array(5).fill().map((_, i) => (
                  <span key={i} className={i < Math.round(course.rating) ? 'star filled' : 'star'}>
                  {i < Math.round(course.rating) ? '★' : '☆'}
                </span>
              ))}
                            <span className="rating-value">({course.rating.toFixed(1)})</span>
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopRatedCourses;