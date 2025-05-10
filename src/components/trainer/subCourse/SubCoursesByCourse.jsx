import React, { useEffect, useState } from 'react';
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function SubCoursesByCourse() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the course ID from the URL
    const [ListSubCourses, setSubCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "List of SubCourses";
        fetchSubCourses();
    }, [id]);

    const fetchSubCourses = () => {
        setIsLoading(true);
        axios.get(`/api/subcourses/course/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setSubCourses(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching subcourses:", error);
                Swal.fire('Error!', 'Failed to fetch subcourses.', 'error');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleDeleteSubCourse = (subCourseId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007C00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/deleteSubCourse/${subCourseId}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire(
                                'Deleted!',
                                'SubCourse has been deleted.',
                                'success'
                            );
                            // Update the state to remove the deleted subcourse
                            setSubCourses(prev => prev.filter(subCourse => subCourse._id !== subCourseId));
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting subcourse:", error);
                        Swal.fire(
                            'Error!',
                            'Failed to delete subcourse.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="col-lg-9">
        <div className="announcements-wrapper-dashed">
            <div className="top-announcement-wrapper">
                <div className="left-wrapper">
                    <div className="icon">
                        <img src="assets/images/dashboard/announcement/01.png" alt="announcement" />
                    </div>
                    <div className="information">
                        <span>Create SubCourse</span>
                        <p>Notify all students of your SubCourse</p>
                    </div>
                </div>
                <div className="right">
                    <Link to={`/AddSubCourse`} type="button" className="rts-btn btn-primary">
                        Add New SubCourse
                    </Link>
                </div>
            </div>

            <div className="rts-reviewd-area-dashed table-responsive" style={{ whiteSpace: 'nowrap' }}>
                <table className="table-reviews quiz announcement">
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Info</th>
                            <th>SubCourse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="2">Loading subcourses...</td>
                            </tr>
                        ) : ListSubCourses.length > 0 ? (
                            ListSubCourses.map(item => (
                                <tr key={item._id}>
                                    <td>
                                        <div className="information-quiz">
                                            <span>Date : {new Date(item.createdAt).toLocaleDateString()}</span>
                                            <p className="quiz">Order : {item.order}</p>
                                        </div>
                                    </td>
                                    <td className="announcement-1">
                                        <div className="left">
                                            <p>{item.title}</p>
                                            <span>Course: {item.course?.title}</span>
                                            <span>Category: {item.course?.category?.title}</span>
                                        </div>
                                        <div className="right">
                                            <button 
                                                onClick={() => navigate(`/UpdateSubCourse/${item._id}`)} 
                                                className="rts-btn btn-primary"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteSubCourse(item._id)} 
                                                className="rts-btn btn-primary"
                                            >
                                                Delete
                                            </button>
                                            <i className="fa-regular fa-ellipsis-vertical" />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No subcourses found for this course</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="pagination-full-width">
                    <span>Page 1 of 4</span>
                    <div className="pagination">
                        <ul>
                            <li><a href="#0" className="prev"><i className="fa-solid fa-chevron-left" /></a></li>
                            <li><a href="#0">1</a></li>
                            <li><a href="#0">2</a></li>
                            <li><a href="#0">3</a></li>
                            <li><a href="#0">4</a></li>
                            <li><a href="#0" className="next"><i className="fa-solid fa-chevron-right" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}