import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../commun/Header";
import Footer from "../cart/Footer";
import axios from "axios";
import "./Success.css";

axios.defaults.baseURL = 'http://localhost:3000';

const Success = () => {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const location = useLocation();

  // Ensure we get course IDs (fallback to empty array)
  const purchasedCourseIds = location.state?.purchasedCourseIds || [];

  useEffect(() => {
    fetchRecommendedCourses();
  }, []);

  const fetchRecommendedCourses = async () => {
    try {
      const { data: allCourses } = await axios.get("/api/courses");
      if (!Array.isArray(allCourses) || allCourses.length === 0) return;

      // Fetch course details for all courses
      const coursesWithDetails = await Promise.all(
        allCourses.map(async (course) => {
          try {
            const { data: details } = await axios.get(`/api/course-details/${course._id}`);
            return { ...course, ...details };
          } catch (err) {
            console.warn("Failed to fetch course details for:", course._id);
            return course; // fallback to base course info
          }
        })
      );

      // Get purchased courses' titles for smart keyword matching
      const purchasedCourses = await Promise.all(
        purchasedCourseIds.map(async (courseId) => {
          try {
            const { data } = await axios.get(`/api/courses/course/${courseId}`);
            return data;
          } catch (err) {
            console.warn("Failed to fetch purchased course:", courseId);
            return null;
          }
        })
      );

      const purchasedTitles = purchasedCourses
        .filter(Boolean)
        .map(course => course.title?.toLowerCase() || "");

      // Extract keywords from titles (can expand as needed)
      const keywords = [];
      purchasedTitles.forEach(title => {
        if (title.includes("web")) keywords.push("web");
        if (title.includes("devops")) keywords.push("devops");
        if (title.includes("data")) keywords.push("data");
        if (title.includes("python")) keywords.push("python");
        if (title.includes("react")) keywords.push("react");
        if (title.includes("security") || title.includes("cybersecurity")) keywords.push("security");
      });

      // Score each course based on matching keywords
      const scoredCourses = coursesWithDetails
        .filter(course => !purchasedCourseIds.includes(course._id))
        .map(course => {
          const title = course.title?.toLowerCase() || "";
          const description = course.description?.toLowerCase() || "";
          let score = 0;

          keywords.forEach(keyword => {
            if (title.startsWith(keyword)) score += 3;
            else if (title.includes(keyword)) score += 2;
            if (description.includes(keyword)) score += 1;
          });

          return { ...course, score };
        });

      // Filter and sort by relevance score
      let filteredCourses = scoredCourses.filter(course => course.score > 0);
      filteredCourses.sort((a, b) => b.score - a.score);

      // If no good match, fallback to best-rated courses
      if (filteredCourses.length === 0) {
        console.log("No strong matches found. Fallback to best-rated courses.");
        filteredCourses = coursesWithDetails
          .filter(course => !purchasedCourseIds.includes(course._id))
          .sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      const topRecommended = filteredCourses.slice(0, 3);
      setRecommendedCourses(topRecommended);

    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendedCourses([]);
    }
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="success-container">
        <div className="success-box">
          <h1>✅ Payment Successful!</h1>
          <p>Thank you for your purchase. You now have full access to your course(s) 🎉</p>

          <div className="success-actions">
            <Link to="/" className="rts-btn btn-primary mt-3">🏠 Return to Home</Link>
            <Link to="/dashboard/student/enroll-course" className="rts-btn btn-primary mt-3">📚 Go to My Courses</Link>
          </div>
        </div>

        {recommendedCourses.length > 0 && (
          <div className="recommendations">
            <h2>📚 Recommended for You</h2>
            <div className="recommendation-list">
              {recommendedCourses.map((course) => (
                <Link
                  key={course._id}
                  to={`/course/${course._id}`}
                  className="recommendation-card"
                >
                  <div className="course-card-inner">
                    <img
                                                                src={`http://localhost:3000${course.courseImage}`}
                                                                alt={course.title}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "assets/images/course/11.jpg";
                                                                }}
                                                                style={{
                                                                    width: '300px',
                                                                    height: '200px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '8px'
                                                                }}
                                                            />
                    <h4 className="course-title">{course.title}</h4>
                    <p className="course-objectives">
                      🎯 {course.objectives || course.description || "No objectives provided."}
                    </p>
                    <p className="course-language">🌐 Language: {course.language || "Unknown"}</p>
                    <p className="course-rating">
                      ⭐ Rating: {course.rating ? course.rating.toFixed(1) : "N/A"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Success;
