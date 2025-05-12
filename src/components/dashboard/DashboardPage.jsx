import React from 'react';
import StatsGrid from "./StatsGrid.jsx";
import CoursesByCategoryChart from "./CoursesByCategoryChart.jsx";
import QuizSuccessChart from "./QuizSuccessChart.jsx";
import TopRatedCourses from "./TopRatedCourses.jsx";
import './dashboard.css';

const DashboardPage = () => {
    return (

            <div className="container">
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>

            <div className="dashboard-content">
                {/* Stats cards */}
                <StatsGrid />

                {/* First row of charts */}
                <div className="dashboard-row">
                    <div className="chart-container">
                        <CoursesByCategoryChart />
                    </div>
                    <div className="chart-container">
                        <QuizSuccessChart />
                    </div>
                </div>

                {/* Second row */}
                <div className="dashboard-row">
                    <div className="full-width-container">
                        <TopRatedCourses />
                    </div>
                </div>
            </div>
        </div>
            </div>

    );
};

export default DashboardPage;