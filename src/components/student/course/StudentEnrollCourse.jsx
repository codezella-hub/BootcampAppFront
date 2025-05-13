import React, { useEffect, useState } from 'react'
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'
import LeftSideBar from '../LeftSideBar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

function StudentEnrollCourse() {
  const { user } = useAuthStore();
  const [ListCourses, setCourses] = useState([]);
  const userId = user._id;
  const [subCourseCounts, setSubCourseCounts] = useState({});


  useEffect(() => {
    document.title = "List of Enrolled Courses";

    axios
      .get(`/api/paypal/purchased-courses/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.data);
           res.data.forEach(course => {
      fetchSubCourseCount(course); 
    });
        }
      })
      .catch((error) => {
        console.error("Error fetching purchased courses:", error);
      });
  }, [userId]);
  //////check certif ////
const handleGetCertificate = async (course) => {
  try {
    // Vérifie si certificate = true dans la commande pour ce cours et cet utilisateur
    const checkDbRes = await axios.get(`http://localhost:3000/api/certificate/check-certificate/${user._id}/${course._id}`);
    const { certificate } = checkDbRes.data;

    if (certificate === true) {
      // Générer directement le certificat sans vérification supplémentaire
      const url = `http://localhost:3000/api/certificate/${user._id}/${course._id}`;
      window.open(url, "_blank");
    } else {
      // Sinon faire la vérification complète via certificasApi
      const res = await certificasApi.checkCertificas(user._id, course._id);
      if (res.status === 200) {
        const url = `http://localhost:3000/api/certificate/${user._id}/${course._id}`;
        window.open(url, "_blank");
      }
    }
  } catch (error) {
    // Affiche les erreurs, qu'elles viennent du check API ou d'un problème serveur
    alert(error.response?.data?.message || "Checking certificate failed.");
  }
};
const fetchSubCourseCount = async (course) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/subcourses/course/${course._id}/user/${course.user}`);
    console.log(`Sub-cours pour le cours ${course.user}:`, response.data);
    setSubCourseCounts(prev => ({
      ...prev,
      [course._id]: response.data.length
    }));
  } catch (err) {
    console.error(`Erreur lors du chargement des sub-cours pour le cours ${course._id}:`, err);
    setSubCourseCounts(prev => ({
      ...prev,
      [course._id]: 0
    }));
  }
};

  return (
    <div className="col-lg-9">
      <div className="exrolled-course-wrapper-dashed">
        <h5 className="title">Enrolled Courses</h5>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Enrolled Courses</button>
          </li>
        </ul>
        <div className="tab-content mt--30" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className="row g-5">
              {ListCourses.length > 0 ? (
                ListCourses.map((course) => (
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={course._id}>
                    <div className="single-course-style-three enroll-course">
                      <Link to={`/DetailCourse/${course._id}`} className="thumbnail">
                        <img
                          src={`http://localhost:3000${course.courseImage}`}
                          alt={course.title}
                          style={{ width: "200px", height: "150px", objectFit: "cover" }}
                        />
                        <div className="tag-thumb">
                          <span>{course.title}</span>
                        </div>
                      </Link>
                      <div className="body-area">
                        <div className="course-top">
                          <div className="tags">Best Seller</div>
                          <div className="price">{course.price}DT</div>
                        </div>
                        <a href="single-course.html">
                          <h5 className="title">{course.prerequisites}</h5>
                        </a>
                        <div className="teacher-stars">
                          <div className="teacher"><span>{course.subtitles}</span></div>
                          <div className="stars" style={{ marginBottom: "8px" }}>
        <ul style={{ 
            listStyle: "none", 
            padding: 0, 
            margin: 0,
            display: "flex",
            gap: "3px"
        }}>
            {[...Array(5)].map((_, i) => {
                const fullStar = i < Math.floor(course.rating);
                const partialStar = course.rating % 1 > 0 && i === Math.floor(course.rating);
                const fillPercentage = partialStar ? Math.round((course.rating % 1) * 100) : 0;
                
                return (
                    <li key={i} style={{ position: "relative" }}>
                        {partialStar ? (
                            <>
                                <i 
                                    className="fa-regular fa-star"
                                    style={{ 
                                        color: "#bdc3c7",
                                        fontSize: "14px",
                                        position: "relative"
                                    }}
                                ></i>
                                <div style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    width: `${fillPercentage}%`,
                                    overflow: "hidden"
                                }}>
                                    <i 
                                        className="fa-solid fa-star"
                                        style={{ 
                                            color: "#f39c12",
                                            fontSize: "14px"
                                        }}
                                    ></i>
                                </div>
                            </>
                        ) : (
                            <i 
                                className={fullStar ? "fa-solid fa-star" : "fa-regular fa-star"} 
                                style={{ 
                                    color: fullStar ? "#f39c12" : "#bdc3c7",
                                    fontSize: "14px"
                                }}
                            ></i>
                        )}
                    </li>
                );
            })}
        </ul>
    </div>
                        </div>
                        <div className="leasson-students">
                          
                          <div className="lesson">
                            <i className="fa-light fa-calendar-lines-pen" />
                            <span>{subCourseCounts[course._id] || 0} Lessons</span>
                          </div>
                          {/*<div className="students">
                            <i className="fa-light fa-users" />
                            <span>25 Lessons</span>
                          </div>*/}
                        </div>
                        <div className="progress-wrapper-lesson-compleate">
                          {/*<div className="compleate">
                            <div className="compl">
                              Complete
                            </div>
                            <div className="end">
                              <span>50%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{ width: '50%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                            </div>
                          </div>*/}
                        </div>
                          <button onClick={() => handleGetCertificate(course)} className="rts-btn btn-border">Download Certificate</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Course Enrolled...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentEnrollCourse