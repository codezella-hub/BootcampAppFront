import React, { use, useEffect, useState } from 'react';
import Header from '../../commun/Header.jsx'
import Footer from '../../commun/FooterPrinciple.jsx'
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../../store/authStore';
import certificasApi from "../../../services/certificas.js";
import { useCartStore } from '../../cartStore/cartStore';   


function DetailCourse() {
    const { user } = useAuthStore();
    const { id } = useParams(); // Get the category ID from the URL
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const [courseOrder, setCourseOrder] = useState({});
    const [ListSubCourse, setSubCourse] = useState([]);
    const [ListVideos, setListVideos] = useState([]);
    const [subCourseId, setSubCourseId] = useState(null);
    //const [user, setUser] = useState({});
    const [loadingVideos, setLoadingVideos] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);
    const [loadingPurchaseCheck, setLoadingPurchaseCheck] = useState(true);

    const staticUserId = user._id; // Hardcoded static user ID
    const staticReceiverId = "67eaf437c7bb7a0c6758b159"; // Add this line
    const isCreator = user && course.user && user._id === course.user._id;
    const { addToCart } = useCartStore();

    useEffect(() => {
        document.title = "Detail Course";

        // Updated API call with both user ID and course ID
        axios.get(`/api/paypal/purchased-course/${staticUserId}/${id}`)
            .then((res) => {
                // If request succeeds, user has purchased the course
                setCourseOrder(res.data);
                setIsPurchased(true);
            })
            .catch((err) => {
                // Handle 404 as not purchased, log other errors
                if (err.response?.status === 404) {
                    setIsPurchased(false);
                } else {
                    console.error("Error checking purchase:", err);
                    setIsPurchased(false);
                }
            })
            .finally(() => {
                setLoadingPurchaseCheck(false);
            });

        // Fetch course details
        axios.get(`/api/course/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setCourse(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching course:", error);
            });

        // Fetch subcourses
        axios.get(`/api/subcourses/course/${id}`)
            .then(res => {
                if (res.status === 200 && res.data.length > 0) {
                    setSubCourse(res.data);
                    setSubCourseId(res.data[0]._id); // Set first subcourse ID by default
                    fetchVideos(res.data[0]._id); // Fetch videos for the first subcourse
                }
            })
            .catch(error => {
                console.error("Error fetching subcourses:", error);
            });
                 /////check course payed////
      
  axios.get(`http://localhost:3000/api/orders/user-id/${staticUserId}`)
  .then((response) => {
    const orders = response.data;
    console.log("orders:", orders);

    // Extraire les IDs des cours achetés
    const purchasedCourseIds = orders
  .filter(order => order.payment === true) 
  .flatMap(order =>
    order.items?.map(item => item.courseId?._id) || []
  );

console.log("Liste des courseId achetés (commandes payées):", purchasedCourseIds);

if (purchasedCourseIds.includes(id)) {
  setIsPurchased(true);
}
  })
  .catch((error) => {
    console.error("Erreur lors de la vérification des cours achetés :", error);
  });



    }, [id]); // Runs when `id` changes

    // Fetch videos when `subCourseId` is set
    useEffect(() => {
        if (subCourseId) { // Ensure `subCourseId` is not null
            axios.get(`/api/getVideosBySubCourse/${subCourseId}`)
                .then(res => {
                    if (res.status === 200) {
                        setListVideos(res.data);
                        //setUser(res.data[0].user);
                        console.log(res.data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching videos:", error);
                });
        }
    }, [subCourseId]); // Runs when `subCourseId` updates

    // Function to fetch videos when a subcourse is clicked
    const fetchVideos = (selectedSubCourseId) => {
        setLoadingVideos(true); // Show loading state

        axios.get(`/api/getVideosBySubCourse/${selectedSubCourseId}`)
            .then(res => {
                if (res.status === 200) {
                    setListVideos(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching videos:", error);
                setListVideos([]); // Clear videos if error occurs
            })
            .finally(() => {
                setLoadingVideos(false); // Hide loading state
            });
    };

    const AddCourseSubmit = (e) => {
        e.preventDefault(); // Prevent form refresh

        let errors = {};
        let missingFields = [];

        // Validate required fields
        const requiredFields = ['title', 'description', 'price', 'prerequisites', 'objectives', 'targetAudience', 'language', 'courseDuration', 'rating', 'subtitles', 'category'];
        requiredFields.forEach(field => {
            if (!courseInput[field]) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                missingFields.push(field.charAt(0).toUpperCase() + field.slice(1));
            }
        });
        if (!picture || !picture.image) {
            errors.image = "Image is required";
            missingFields.push("Image");
        }

        // Validate price, courseDuration, and rating as numbers
        if (courseInput.price && isNaN(courseInput.price)) {
            errors.price = "Price must be a number";
            missingFields.push("Price");
        }
        if (courseInput.courseDuration && isNaN(courseInput.courseDuration)) {
            errors.courseDuration = "Course duration must be a number";
            missingFields.push("Course Duration");
        }
        if (courseInput.rating && isNaN(courseInput.rating)) {
            errors.rating = "Rating must be a number";
            missingFields.push("Rating");
        }

        if (Object.keys(errors).length > 0) {
            setError(errors); // Store the errors in state

            Swal.fire({
                title: 'Error!',
                text: `Please fill in the following fields: ${missingFields.join(", ")}`,
                icon: 'error',
                confirmButtonText: 'OK',
            });

            return; // Stop the function if there are errors
        }

        const formData = new FormData();
        Object.keys(courseInput).forEach(key => {
            formData.append(key, courseInput[key]);
        });
        formData.append('courseImage', picture.image); // Use 'courseImage' as the field name

        axios.put(`/api/UpdateCourse/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
            },
        }).then(res => {
            if (res.data.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/ListCourse'); // Navigate after success
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        }).catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'Network error. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    };
//////check certif ////
const handleGetCertificate = async () => {
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
    alert(error.response?.data?.message || "Erreur lors de la vérification.");
  }
};
const handleAddToCart = async (course) => {
            const userString = localStorage.getItem("auth-storage");
            const userObj = userString ? JSON.parse(userString) : null;
            const userId = userObj?.state?.user?._id;
    
            if (!userId) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Required',
                    text: 'Please log in to add courses to your cart.',
                });
                return;
            }
    
            try {
                await axios.post('/api/orders', {
                    items: [{ courseId: course._id, quantity: 1 }],
                    userid: userId
                });
    
                addToCart({ ...course, quantity: 1 });
    
                Swal.fire({
                    icon: 'success',
                    title: 'Added to cart!',
                    text: `${course.title} has been added to your cart.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error("Error adding to cart:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add the course to your cart. Please try again.',
                });
            }
        };

  ////////////
  
    // Update the renderPurchaseButtons function
    const renderPurchaseButtons = () => {
        if (loadingPurchaseCheck) {
            return (
                <button className="rts-btn btn-primary" disabled>
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </button>
            );
        }

        // Check if the user is the creator of the course
        //const isCreator = user && course.user && user._id === course.user;

        if (isCreator || isPurchased) {
            return (
                <>
                    <button onClick={handleGetCertificate} className="rts-btn btn-primary">
        Get Certificate
      </button>
                </>
            );

        }

        return (
            <button
                                                                onClick={() => handleAddToCart(course)}
                                                                className="rts-btn btn-primary mt-3"
                                                            >
                                                                Add to Cart
                                                            </button>

            
        );
    };


    const handlePurchase = () => {
        Swal.fire({
          title: '<strong style="font-size: 1.5rem; color: #2a3042">Confirm Your Purchase</strong>',
          html: `
            <div style="text-align: left; color: #5a6169">
              <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                ${course.courseImage ? `
                  <img src="http://localhost:3000${course.courseImage}" 
                       style="width: 100px; height: 60px; object-fit: cover; border-radius: 8px;">` : ''
                }
                <div>
                  <h4 style="margin: 0; color: #2a3042; font-weight: 600">${course.title}</h4>
                  ${course.category ? `
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                      <i class="fa-solid fa-tag" style="color: #6c757d; font-size: 0.9rem"></i>
                      <span style="font-size: 0.9rem">${course.category}</span>
                    </div>` : ''
                  }
                </div>
              </div>
      
              <div style="border-top: 1px solid #e9ecef; padding-top: 1rem; margin-top: 1rem;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-wallet" style="color: #4a90e2"></i>
                    <span>Price:</span>
                  </div>
                  <div style="font-weight: 600; color: #2a3042">
                    $${course.price}
                  </div>
      
                  ${course.courseDuration ? `
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <i class="fa-solid fa-clock" style="color: #4a90e2"></i>
                      <span>Duration:</span>
                    </div>
                    <div style="font-weight: 600; color: #2a3042">
                      ${course.courseDuration} hours
                    </div>` : ''
                  }
      
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-shield-alt" style="color: #4a90e2"></i>
                    <span>Guarantee:</span>
                  </div>
                  <div style="font-weight: 600; color: #2a3042">
                    30-day Refund
                  </div>
                </div>
              </div>
      
              <div style="margin-top: 1.5rem; background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                  <i class="fa-solid fa-circle-info" style="color: #6c757d"></i>
                  <span style="font-size: 0.9rem">You'll be redirected to PayPal to complete your payment</span>
                </div>
              </div>
            </div>
          `,
          icon: 'info',
          iconColor: '#4a90e2',
          showCancelButton: true,
          confirmButtonText: 'Continue to PayPal',
          cancelButtonText: 'Cancel',
          showLoaderOnConfirm: true,
          allowOutsideClick: () => !Swal.isLoading(),
          customClass: {
            popup: 'custom-swal-popup',
            confirmButton: 'custom-confirm-btn',
            cancelButton: 'custom-cancel-btn'
          },
          preConfirm: () => {
            return axios.post('/api/paypal/pay', {
              amount: course.price,
              userId: staticUserId,
              courseId: id,
              receiverId: staticReceiverId
            }).then(response => {
              if (!response.data.approvalUrl) throw new Error('No approval URL received');
              return response.data.approvalUrl;
            });
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const popup = window.open(
              result.value, 
              'PayPal', 
              'width=600,height=700,top=100,left=100'
            );
      
            if (!popup || popup.closed) {
              Swal.fire('Error', 'Please allow popups to complete the payment', 'error');
              return;
            }
      
            const popupCheckInterval = setInterval(() => {
              if (popup.closed) {
                clearInterval(popupCheckInterval);
                checkPaymentStatus();
              }
            }, 500);
          }
        });
      };
      
      const checkPaymentStatus = () => {
        Swal.fire({
          title: 'Verifying Payment',
          text: 'Please wait while we confirm your payment...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });
      
        const paymentCheckInterval = setInterval(() => {
          axios.get(`/api/paypal/purchased-course/${staticUserId}/${id}`)
            .then(() => {
              clearInterval(paymentCheckInterval);
              Swal.close();
              setIsPurchased(true);
              Swal.fire('Success!', 'Payment completed successfully!', 'success');
            })
            .catch(() => { /* Ignore errors until timeout */ });
        }, 3000);

   

      
        // Timeout after 2 minutes
        setTimeout(() => {
          clearInterval(paymentCheckInterval);
          Swal.fire('Timeout', 'Payment verification timed out', 'warning');
        }, 120000);
      };

        
    return (
        <div>

            {/* course details breadcrumb */}
            <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main-wrapper">
                                <h1 className="title">{course.title}</h1>
                                <div className="pagination-wrapper">
                                    <a href="index-2.html">Last update : {course.updatedAt}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="course-details-wrapper-2 rts-section-gap">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-8 order-cl-1 order-lg-1 order-md-2 order-sm-2 order-2">
                            <div className="thumbnail mb--30" style={{ position: 'relative' }}>
                                <img src={`http://localhost:3000${course.courseImage}`} style={{ width: "900px", height: "500px", objectFit: "cover" }} />
                                <div className="vedio-icone">
                                    <a className="video-play-button play-video popup-video" href="https://www.youtube.com/watch?v=ezbJwaLmOeM">
                                        <span />
                                    </a>
                                    <div className="video-overlay">
                                        <a className="video-overlay-close">×</a>
                                    </div>
                                </div>
                            </div>
                            <div className="course-content-wrapper">
                                <h5 className="title">About Course</h5>
                                <p className="disc">
                                    {course.prerequisites}
                                </p>
                                <h5 className="title">Description</h5>
                                <p className="disc">
                                    {course.description}
                                </p>

                                <div className="module-wrapper">
                                    <h6 className="title">What Will You Learn?</h6>
                                    <div className="inner-content">

                                        <div className="single-wrapper">
                                            <div className="single-codule">
                                                <p>{course.objectives}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="course-content-wrapper-main mt--40">
                                <h5 className="title">Course Content</h5>
                                {/* single */}

                                {ListSubCourse.length > 0 ? (
                                    ListSubCourse.map(subCourse => (
                                        <div key={subCourse._id} className="accordion mt--30" id={`accordion-${subCourse._id}`}>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id={`heading-${subCourse._id}`}>
                                                    <button
                                                        className={`accordion-button ${subCourseId === subCourse._id ? "" : "collapsed"}`}
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#collapse-${subCourse._id}`}
                                                        aria-expanded={subCourseId === subCourse._id ? "true" : "false"}
                                                        aria-controls={`collapse-${subCourse._id}`}
                                                        onClick={() => {
                                                            setSubCourseId(subCourse._id);
                                                            fetchVideos(subCourse._id);
                                                        }}
                                                    >
                                                        <span>{subCourse.title}</span>
                                                        <span>3 Lectures . 9 min</span>
                                                    </button>
                                                </h2>
                                                <div
                                                    id={`collapse-${subCourse._id}`}
                                                    className={`accordion-collapse collapse ${subCourseId === subCourse._id ? "show" : ""}`}
                                                    aria-labelledby={`heading-${subCourse._id}`}
                                                    data-bs-parent={`#accordion-${subCourse._id}`}
                                                >
                                                    <div className="accordion-body">
                                                        {loadingVideos ? (
                                                            <p>Loading videos...</p>
                                                        ) : (
                                                            ListVideos.length > 0 ? (
                                                                ListVideos.map(video => {
                                                                    const canAccess = isCreator ||isPurchased;
                                                                    return canAccess ? (
                                                                        <Link
                                                                            key={video._id}
                                                                            to={`/VideoDetail/${video._id}/${subCourse._id}`}
                                                                            className="play-vedio-wrapper"
                                                                        >
                                                                            <div className="left">
                                                                                <i className="fa-light fa-circle-play" />
                                                                                <span>{video.title}</span>
                                                                            </div>
                                                                            <div className="right">
                                                                                <span className="play">Preview</span>
                                                                                <span>{video.duration} sec</span>
                                                                            </div>
                                                                        </Link>
                                                                    ) : (
                                                                        <div
                                                                            key={video._id}
                                                                            className="play-vedio-wrapper disabled"
                                                                            onClick={() => {
                                                                                Swal.fire('Access Restricted', 'Purchase the course to watch this video.', 'info');
                                                                            }}
                                                                        >
                                                                            <div className="left">
                                                                                <i className="fa-light fa-circle-play" />
                                                                                <span>{video.title}</span>
                                                                            </div>
                                                                            <div className="right">
                                                                                <span className="play">Locked</span>
                                                                                <span>{video.duration} sec</span>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })
                                                            ) : (
                                                                <div className="text-center py-5">
                                                                    <p>No videos found for this subcourse...</p>
                                                                    {(user.role === 'admin' || user.role === 'professor') && (
                                                                        <div className="d-flex justify-content-center mt-3">
                                                                            <button
                                                                                onClick={() => navigate('/AddVideo')}
                                                                                className="rts-btn btn-primary"
                                                                            >
                                                                                Add New Video
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <p>No subcourses available...</p>

                                        <Link
                                            to="/AddSubCourse"
                                            className="rts-btn btn-primary"
                                        >
                                            Add SubCourse
                                        </Link>
                                        <br></br>
                                    </>
                                )}
                            </div>

                            <div className="rating-main-wrapper">
                                {/* single-top-rating */}
                                <div className="rating-top-main-wrapper">
                                    {/* rating area start */}
                                    <div className="rating-area-main-wrapper">
                                        <h2 className="title">{course.rating}</h2>
                                        <div className="stars-wrapper">
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-regular fa-star" />
                                        </div>
                                        <span>Total 2 Ratings</span>
                                    </div>
                                    {/* rating area end */}
                                    <div className="progress-wrapper-main">
                                        <div className="single-progress-area-h" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
                                            <div className="progress-top">
                                                <i className="fa-regular fa-star" />
                                                <span className="parcent">
                                                    5
                                                </span>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{ width: '100%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                                </div>
                                            </div>
                                            <div className="end">
                                                <span>25 Rating</span>
                                            </div>
                                        </div>
                                        <div className="single-progress-area-h" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
                                            <div className="progress-top">
                                                <i className="fa-regular fa-star" />
                                                <span className="parcent">
                                                    4
                                                </span>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{ width: '80%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                                </div>
                                            </div>
                                            <div className="end">
                                                <span>20 Rating</span>
                                            </div>
                                        </div>
                                        <div className="single-progress-area-h" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
                                            <div className="progress-top">
                                                <i className="fa-regular fa-star" />
                                                <span className="parcent">
                                                    3
                                                </span>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{ width: '60%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                                </div>
                                            </div>
                                            <div className="end">
                                                <span>5 Rating</span>
                                            </div>
                                        </div>
                                        <div className="single-progress-area-h" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
                                            <div className="progress-top">
                                                <i className="fa-regular fa-star" />
                                                <span className="parcent">
                                                    2
                                                </span>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{ width: '40%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                                </div>
                                            </div>
                                            <div className="end">
                                                <span>2 Rating</span>
                                            </div>
                                        </div>
                                        <div className="single-progress-area-h" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
                                            <div className="progress-top">
                                                <i className="fa-regular fa-star" />
                                                <span className="parcent">
                                                    1
                                                </span>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{ width: '20%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                                </div>
                                            </div>
                                            <div className="end">
                                                <span>1 Rating</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single-top-rating end*/}
                            </div>
                        </div>
                        <div className="col-lg-4 order-cl-2 order-lg-2 order-md-1 order-sm-1 order-1 rts-sticky-column-item">
                            {/* right- sticky bar area */}
                            <div className="right-course-details mt--0">
                                {/* single course-sidebar */}
                                <div className="course-side-bar">
                                    <div className="price-area">
                                        <h3 className="title">${course.price}</h3>
                                        <h4 className="none">$79.99</h4>
                                        <span className="discount">-50%</span>
                                    </div>
                                    <div className="clock-area">
                                        <i className="fa-light fa-clock" />
                                        <span>2 Day left at this price!</span>
                                    </div>
                                    {renderPurchaseButtons()}
                                    <div className="what-includes">
                                        <span className="m">30-Day Money-Back Guarantee</span>
                                        <h5 className="title">This course includes: </h5>
                                        <div className="single-include">
                                            <div className="left">
                                                <i className="fa-light fa-chart-bar" />
                                                <span>Levels</span>
                                            </div>
                                            <div className="right">
                                                <span>{course.targetAudience}</span>
                                            </div>
                                        </div>
                                        <div className="single-include">
                                            <div className="left">
                                                <i className="fa-light fa-timer" />
                                                <span>Duration</span>
                                            </div>
                                            <div className="right">
                                                <span>{course.courseDuration} min</span>
                                            </div>
                                        </div>

                                        <div className="single-include">
                                            <div className="left">
                                                <i className="fa-regular fa-pen-to-square" />
                                                <span>Update</span>
                                            </div>
                                            <div className="right">
                                                <span>{course.updatedAt}</span>
                                            </div>
                                        </div>
                                        <div className="single-include">
                                            <div className="left">
                                                <i className="fa-sharp fa-light fa-file-certificate" />
                                                <span>Certificate</span>
                                            </div>
                                            <div className="right">
                                                <span>Certificate of completion </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* single course-sidebar end */}
                            </div>
                            {/* right- sticky bar area end */}
                            {/* right- sticky bar area */}
                            <div className="right-course-details mt--30">
                                {/* single course-sidebar */}
                                <div className="course-side-bar">
                                    {/* course single sidebar */}
                                    {/*<div className="course-single-information">
                                        <h5 className="title">A course by</h5>
                                        <div className="body">
                                            <div className="author">
                                                <img
                                                    src={`http://localhost:3000${user.image}`}
                                                    alt={user.name || "User Profile"}
                                                    style={{
                                                        width: "80px",
                                                        height: "80px",
                                                        objectFit: "cover",
                                                        borderRadius: "80%" // Makes it fully rounded
                                                    }}
                                                />

                                                <span>{user.email}</span>
                                            </div>
                                        </div>
                                    </div>*/}
                                    {/* course single sidebar end*/}
                                    {/* course single sidebar */}
                                    <div className="course-single-information">
                                        <h5 className="title">Material Includes</h5>
                                        <div className="body">
                                            {/* ingle check */}
                                            <div className="single-check">
                                                <i className="fa-light fa-circle-check" />
                                                Flexible Deadlines
                                            </div>
                                            {/* ingle check end */}
                                            {/* ingle check */}
                                            <div className="single-check">
                                                <i className="fa-light fa-circle-check" />
                                                Hours of live- demo
                                            </div>
                                            {/* ingle check end */}
                                            {/* ingle check */}
                                            <div className="single-check">
                                                <i className="fa-light fa-circle-check" />
                                                Hours of live- demo
                                            </div>
                                            {/* ingle check end */}
                                            {/* ingle check */}
                                            <div className="single-check">
                                                <i className="fa-light fa-circle-check" />
                                                200+ downloadable resoursces
                                            </div>
                                            {/* ingle check end */}
                                        </div>
                                    </div>
                                    {/* course single sidebar end*/}
                                    {/* course single sidebar */}
                                    <div className="course-single-information">
                                        <h5 className="title">Requirements</h5>
                                        <div className="body">
                                            {/* ingle check */}
                                            <div className="single-check">
                                                <i className="fa-light fa-circle-check" />
                                                Access to Adobe Premiere Pro
                                            </div>
                                            {/* ingle check end */}
                                            {/* ingle check */}
                                            <div className="single-check">
                                                <i className="fa-light fa-circle-check" />
                                                Familiarity with computers and other devices
                                            </div>
                                            {/* ingle check end */}
                                        </div>
                                    </div>
                                    {/* course single sidebar end*/}
                                    {/* course single sidebar */}
                                    <div className="course-single-information">
                                        <h5 className="title">Tags</h5>
                                        <div className="body">
                                            <div className="tags-wrapper">
                                                {/* single tags */}
                                                <span>Course</span>
                                                <span>Design</span>
                                                <span>Web development</span>
                                                <span>Business</span>
                                                <span>UI/UX</span>
                                                <span>Financial</span>
                                                {/* single tags end */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* course single sidebar end*/}
                                    {/* course single sidebar */}
                                    <div className="course-single-information">
                                        <h5 className="title">Share</h5>
                                        <div className="body">
                                            {/* social-share-course-sidebar */}
                                            <div className="social-share-course-side-bar">
                                                <ul>
                                                    <li><a href="#"><i className="fa-brands fa-facebook-f" /></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-instagram" /></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-linkedin" /></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-pinterest" /></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-youtube" /></a></li>
                                                </ul>
                                            </div>
                                            {/* social-share-course-sidebar end */}
                                        </div>
                                    </div>
                                    {/* course single sidebar end*/}
                                    {/* course single sidebar */}
                                    <div className="course-single-information last">
                                        <h5 className="title">Audience</h5>
                                        <div className="body">
                                            {/* ingle check */}
                                            <div className="single-check">
                                                <i className="fa-light fa-circle-check" />
                                                Suitable for beginners and intermediates
                                            </div>
                                            {/* ingle check end */}
                                        </div>
                                    </div>
                                    {/* course single sidebar end*/}
                                </div>
                                {/* single course-sidebar end */}
                            </div>
                            {/* right- sticky bar area end */}
                        </div>
                    </div>
                </div>
            </div>
            {/* course details-area end */}


        </div>

    )
}

export default DetailCourse