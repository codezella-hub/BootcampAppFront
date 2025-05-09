import React, { useEffect, useState } from 'react'
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LeftSideBarAdmin from '../LeftSideBarAdmin';
function ListCategory() {

    const [ListCategory, setCategory] = useState([]);

    useEffect(() => {
        document.title = "List of Categories";

        axios.get(`/api/categories`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setCategory(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleDeleteCategory = (id) => {
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
                axios.delete(`/api/deleteCategory/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire('Deleted!', 'Category has been deleted.', 'success');
                            setCategory(ListCategory.filter(category => category._id !== id));
                        }
                    })
                    .catch(error => {
                        Swal.fire('Error!', 'Failed to delete category.', 'error');
                    });
            }
        });
    };

    return (
        <div className="col-lg-9">
            <div className="certificates-wrapper-dashed">

            <div className="d-flex align-items-center justify-content-between mt--30">
    <h5 className="title mb-0">All Categories</h5>
    <div>
        <Link to={`/AddCategory`} type="button" className="rts-btn btn-primary">
            Add New Category
        </Link>
    </div>
</div>
                <div className="all-certificates-main-wrapper-dashed mt--25">
                    {ListCategory.length > 0 ? (
                        ListCategory.map(category => (
                            <div className="single-certificates" key={category._id}>
                                <div className="left">
                                    <img src={`http://localhost:3000${category.image}`} width={150} height={100} alt={category.title} />
                                    <h5 className="title">Title : {category.title}</h5>
                                </div>
                                <div className="right">

                                    <span>{category.createdAt}</span>
                                    <span>{category.updatedAt}</span>

                                    <Link to={`/UpdateCategory/${category._id}`} className="edit-btn">
                                        <i className="fa-regular fa-pen-to-square" />
                                    </Link>

                                    <a onClick={() => handleDeleteCategory(category._id)} className="delete-btn">
                                        <i className="fa-regular fa-trash" />
                                    </a>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading categories...</p>
                    )}


                </div>
            </div>
        </div>
    )
}

export default ListCategory