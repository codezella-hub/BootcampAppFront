import React, { useEffect, useState } from 'react';
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ListSubCourseAdmin() {
  const navigate = useNavigate();
  const [ListSubCourse, setSubCourse] = useState([]);
  const [filteredSubCourses, setFilteredSubCourses] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = "List of courses";
    axios.get(`/api/SubCourses`)
      .then(res => {
        if (res.status === 200) {
          setSubCourse(res.data);
          setFilteredSubCourses(res.data);
          // Extract unique categories
          const categories = [];
          res.data.forEach(item => {
            if (item.course?.category &&
              !categories.some(cat => cat._id === item.course.category._id)) {
              categories.push(item.course.category);
            }
          });
          setUniqueCategories(categories);
        }
      })
      .catch(console.error);
  }, []);

  // Handle category selection change
  const handleCategoryFilter = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);

    if (categoryId === '') {
      // If "All Category" is selected, show all subcourses
      setFilteredSubCourses(ListSubCourse);
    } else {
      // Filter subcourses by selected category ID
      const filtered = ListSubCourse.filter(item =>
        item.course?.category?._id === categoryId
      );
      setFilteredSubCourses(filtered);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      // If search is empty, show all subcourses (or filtered by category)
      applyFilters(selectedCategoryId, '');
    } else {
      // Filter by search term
      applyFilters(selectedCategoryId, term);
    }
  };


  // Combined filter function for both category and search
  const applyFilters = (categoryId, searchTerm) => {
    let filtered = ListSubCourse;

    // Apply category filter if selected
    if (categoryId) {
      filtered = filtered.filter(item =>
        item.course?.category?._id === categoryId
      );
    }

    // Apply search filter if term exists
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.course?.title.toLowerCase().includes(searchTerm))
    }

    setFilteredSubCourses(filtered);
  };


  const handleDeleteSubCourse = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007C00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/deleteSubCourse/${id}`)
          .then(res => {
            if (res.status === 200) {
              Swal.fire('Deleted!', 'SubCourse has been deleted.', 'success');
              setSubCourse(ListSubCourse.filter(subCourse => subCourse._id !== id));
              setFilteredSubCourses(filteredSubCourses.filter(subCourse => subCourse._id !== id));
            }
          })
          .catch(error => {
            Swal.fire('Error!', 'Failed to delete category.', 'error');
          });
      }
    });
  };
  return (
    <div>
      <Header />
      <div>
        <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-main-wrapper">
                  <h1 className="title">List SubCourse</h1>
                  <div className="pagination-wrapper">
                    <a href="index-2.html">Home</a>
                    <i className="fa-regular fa-chevron-right" />
                    <a className="active" href="create-course.html">List SubCourse</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard--area-main pt--100">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-3">
                {/* course-filter-area start */}
                <div className="rts-course-filter-area">
                  {/* single filter wized */}
                  <div className="single-filter-left-wrapper">
                    <h6 className="title">Search</h6>
                    <div className="search-filter filter-body">
                      <div className="input-wrapper">
                        <input
                          type="text"
                          placeholder="Search by course title..."
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                        <i className="fa-light fa-magnifying-glass" />
                      </div>
                    </div>
                  </div>
                  <div className="single-filter-left-wrapper">
                    <h6 className="title">Category</h6>
                    <div className="checkbox-filter filter-body last">
                      <div className="checkbox-wrapper">
                        {/* single check box */}
                        {/* Update the filter dropdown to use categories */}
                        <div className="single-checkbox-filter">
                          <div className="left-filter">
                            <select
                              className="nice-select"
                              name="category"
                              onChange={handleCategoryFilter}
                              value={selectedCategoryId}
                            >
                              <option value="">All Categories</option>
                              {uniqueCategories.map((category) => (
                                <option key={category._id} value={category._id}>
                                  {category.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  {/* single filter wized end */}
                  <a href="#" className="rts-btn btn-border"><i className="fa-regular fa-x" /> Clear All Filters</a>
                </div>
                {/* course-filter-area end */}
              </div>
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
                      <Link to={`/AddSubCourseAdmin`} type="button" className="rts-btn btn-primary" >Add New SubCourse</Link>
                    </div>
                  </div>

                  <div className="rts-reviewd-area-dashed table-responsive" style={{ whiteSpace: 'nowrap' }}>
                    {/* SubCourses table */}
                    <table className="table-reviews quiz announcement">
                      <thead>
                        <tr>
                          <th style={{ width: '30%' }}>Info</th>
                          <th>SubCourse</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSubCourses.length > 0 ? (
                          filteredSubCourses.map(item => (
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
                                  <button onClick={() => navigate(`/UpdateSubCourseAdmin/${item._id}`)} className="rts-btn btn-primary" > Edit </button>
                                  <button onClick={() => handleDeleteSubCourse(item._id)} className="rts-btn btn-primary">Delete</button>
                                
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2">
                              {ListSubCourse.length === 0 ? 'Loading subcourses...' : 'No subcourses found for the selected category'}
                            </td>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

}

export default ListSubCourseAdmin