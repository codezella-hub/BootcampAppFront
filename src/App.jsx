import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useState } from "react";

import StudentEnrollCourse from './components/student/course/StudentEnrollCourse';  
import Home from './components/Home';
import AddCategory from './components/admin/categorie/AddCategory';
import ListCategory from './components/admin/categorie/ListCategory';
import ForgetPassword from './components/auth/ForgetPassword';
import VerifiedEmail from './components/auth/VerifiedEmail';
import ResetPassword from './components/auth/ResetPassword';
import CheckYourEmail from './components/auth/CheckYourEmail';
import ProfileUpdate from "./components/auth/ProfileUpdate.jsx";
import DashboardInterface from "./Interfaces/DashboardInterface.jsx";
import MyProfile from "./components/auth/MyProfile.jsx";
import GlobalInterface from "./Interfaces/GlobalInterface.jsx";
import { useAuthStore } from './store/authStore.js';
import PasswordUpdate from "./components/auth/PasswordUpdate.jsx";
import UpdateProfileInterface from "./Interfaces/UpdateProfileInterface.jsx";
import Active2Fa from "./components/auth/Active2fa.jsx";
import DeleteAccount from "./components/auth/DeleteAccount.jsx";
import TryToBeTeacher from "./components/auth/TryToBeTeacher.jsx";
import MyForum from './components/Forum/MyForum.jsx';
import UpdateForum from './components/Forum/updateForum.jsx';
import PostList from './components/post/PostList.jsx';
import AddCandidat from './components/post/AddCandidat.jsx';
import DetailPost from './components/post/detailPost.jsx';
import MyPosts from './components/post/MyPosts.jsx';
import AddPost from './components/post/addPost.jsx';
import UpdatePost from './components/post/updatePost.jsx';
import AffichePostEntreprise from './components/post/affichePostEntreprise.jsx';
import CandidatDetailsEntreprise from './components/post/CandidatDetailsEntreprise.jsx';
import MyCandidats from './components/post/MyCandidats.jsx';
import UpdateCandidat from './components/post/updateCandidat.jsx';
import AddForum from "./components/Forum/addForum.jsx";
import ForumList from "./components/Forum/ForumList.jsx";
import ForumDetails from "./components/Forum/ForumDetails.jsx";

import TwoFactorAuthVerify from "./components/auth/TwoFactorAuthVerify.jsx";




import UpdateCategory from './components/admin/categorie/UpdateCategory';
import SubCourses from './components/student/course/SubCourses';
import Video from './components/student/course/Video';
import AddCourse from './components/trainer/course/AddCourse';
import ListCourse from './components/trainer/course/ListCourse';
import UpdateCourse from './components/trainer/course/UpdateCourse';
import AddSubCourse from './components/trainer/subCourse/AddSubCourse';
import ListSubCourse from './components/trainer/subCourse/ListSubCourse';
import UpdateSubCourse from './components/trainer/subCourse/UpdateSubCourse';
import AddVideo from './components/trainer/video/AddVideo';
import ListVideo from './components/trainer/video/ListVideo';
import VideoDetail from './components/trainer/video/VideoDetail.jsx';
import UpdateVideo from './components/trainer/video/UpdateVideo';
import ListCourseStudent from './components/student/enroll/ListCourseStudent';
import DetailCourse from './components/student/enroll/DetailCourse';
import Quiz from './components/student/quiz/Quiz';
import AllCourses from './components/allUsers/AllCourses';
import SubCoursesByCourse from './components/trainer/subCourse/SubCoursesByCourse';
import ListCourseAdmin from './components/admin/course/ListCourseAdmin';
import AddCourseAdmin from './components/admin/course/AddCourseAdmin';
import UpdateCourseAdmin from './components/admin/course/UpdateCourseAdmin';
import ListSubCourseAdmin from './components/admin/subCourse/ListSubCourseAdmin';
import AddSubCourseAdmin from './components/admin/subCourse/AddSubCourseAdmin';
import UpdateSubCourseAdmin from './components/admin/subCourse/UpdateSubCourseAdmin';
import SubCoursesByCourseAdmin from './components/admin/subCourse/SubCoursesByCourseAdmin';
import DetailCourseTrainer from './components/trainer/course/DetailCourseTrainer';
import VideoPopUp from './components/trainer/video/VideoPopUp';
import Code from './components/student/code/Code';
import Notfound  from "./Interfaces/Notfound.jsx";
import QuizCreate from "./components/Quiz/QuizCreate.jsx";
import QuizUpdate from "./components/Quiz/QuizUpdate.jsx";
import QuizList from "./components/Quiz/QuizList.jsx";
import QuizResult from "./components/Quiz/QuizResult.jsx";
import TakeQuiz from "./components/Quiz/TakeQuiz.jsx";

import Cart from "./components/cart/Cart";
import HomeRooms from "./components/rooms/HomeRooms.jsx";
import Room from "./components/rooms/Room.jsx";
import ChatBot from "./components/chatBot/ChatBot.jsx";
import ResponsesUserListe from "./components/Quiz/ResponsesUserListe.jsx";
import Payment from "./components/payment/Payment";
import Success from "./components/payment/success"; // corrected casing if needed
import Cancel from "./components/payment/Cancel";
import CouponList from "./components/coupon/CouponList";
import EyeTracker from './components/EyeTracker.jsx';
import HistoryOrderList from './components/historyOrders/HistoryOrderList.jsx';
import { CartProvider } from './components/context/CartContext.jsx';
import CoursesByCategoryChart from "./components/dashboard/CoursesByCategoryChart.jsx";
import QuizSuccessChart from "./components/dashboard/QuizSuccessChart.jsx";
import StatsGrid from "./components/dashboard/StatsGrid.jsx";
import TopRatedCourses from "./components/dashboard/TopRatedCourses.jsx";
import DashboardPage from "./components/dashboard/DashboardPage.jsx";
import ListVideoBySubCourse from './components/trainer/video/ListVideoBySubCourse.jsx';
import OrderList from './components/historyOrders/OrderList.jsx';
function App() {
  const userId ='88888888'
  const [cartItems, setCartItems] = useState([]);

  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
      return <Navigate to='/login' replace />;
    }

    return children;
  };

  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user.isVerified) {
      return <Navigate to='/' replace />;
    }

    return children;
  };

  //axios.defaults.baseURL = "http://localhost:3000/"
  return (
    <CartProvider>
    <Router>
      <Routes>
        {/* Global Interface Routes */}
        <Route path="/" element={<GlobalInterface />} >
          <Route index element={<Home />} />
          <Route path="dash" element={<DashboardPage />} />

          <Route path="AllCourses" element={<AllCourses />} />
          <Route path="/ListVideo" element={<ListVideo />} />
          <Route path="/VideoDetail/:id/:subCourseId" element={<VideoDetail />} />
          <Route path="/UpdateSubCourse/:id" element={<UpdateSubCourse />} />


          <Route path="/UpdateCategory/:id" element={<UpdateCategory />} />
          <Route path="/DetailCourse/:id" element={<DetailCourse />} />
  
          <Route path="homeRooms" element={<HomeRooms />} />
          <Route path="chat" element={<ChatBot />} />
          <Route path="AddCategory" element={<AddCategory />} />
          {/* Forum Routes */}
        <Route path="addForum" element={<AddForum />} />
        <Route path="updateForum/:id" element={<UpdateForum />} />
        <Route path="Forums" element={<ForumList />} />
        <Route path="Myforum" element={<MyForum />} />
        <Route path="forum/:id" element={<ForumDetails />} />

        {/* Post Routes */}
        <Route path="posts" element={<PostList />} />
        <Route path="posts/:id" element={<DetailPost />} />
        <Route path="postsEntreprise/:id" element={<AffichePostEntreprise />} />
        <Route path="addCandidat/:postId" element={<AddCandidat />} />
        <Route path="MyPosts" element={<MyPosts />} />
        <Route path="addPost" element={<AddPost />} />
        <Route path="updatePost/:id" element={<UpdatePost />} />
        <Route path="CandidatDetailsEntreprise/:id" element={<CandidatDetailsEntreprise />} />
        <Route path="MyCandidats" element={<MyCandidats />} />
        <Route path="updateCandidat/:id" element={<UpdateCandidat />} />

        {/* eyeTracker */}
        <Route path="/eye-tracker" element={<EyeTracker />} />


        </Route>
        <Route path="room/:roomID" element={<Room />} />
        {/* Auth Routes */}
        <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/check-your-email" element={<CheckYourEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifiedEmail />} />

        {/* Dashboard Routes */}
        <Route path='/dashboard' element={<DashboardInterface />} >

          <Route index element={<MyProfile />} />
          <Route path="SubCoursesByCourse/:id" element={<SubCoursesByCourse />} />
          <Route path="ListVideoBySubCourse/:id" element={<ListVideoBySubCourse />} />
          
          <Route path="ListCourse" element={<ListCourse />} />
          <Route path="student/enroll-course" element={<StudentEnrollCourse />} />
          <Route path="ListCategory" element={<ListCategory />} />
        <Route path="ListCourseAdmin" element={<ListCourseAdmin />} />
        <Route path="historyOrders" element={<OrderList/>} />
        </Route>

        {/* Profile Routes */}
        <Route path='/profile' element={<ProtectedRoute><UpdateProfileInterface /></ProtectedRoute>} >
          <Route index element={<MyProfile />} />
          <Route path="password-update" element={<PasswordUpdate />} />
          <Route path="update-profile" element={<ProfileUpdate />} />
          <Route path="two-factor" element={<Active2Fa />} />
          <Route path="delete-account" element={<DeleteAccount />} />
          <Route path="be-teacher" element={<TryToBeTeacher />} />
        </Route>

        {/* Other routes */}
        <Route path="/student/enroll-course" element={<StudentEnrollCourse />} />
        <Route path="/verify-email" element={<VerifiedEmail />} />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
          <Login />
          </RedirectAuthenticatedUser>
          } />
        <Route path="/register" element={<Register />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/check-your-email" element={<CheckYourEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-two-factor" element={<TwoFactorAuthVerify />} />


        {/* Admin Routes */}
        <Route path="/ListCategory" element={<ListCategory />} />
        <Route path="/AddCategory" element={<AddCategory />} />

        <Route path="/ListCourseAdmin" element={<ListCourseAdmin />} />
        <Route path="/AddCourseAdmin" element={<AddCourseAdmin />} />
        <Route path="/UpdateCourseAdmin/:id" element={<UpdateCourseAdmin />} />
        <Route path="/ListSubCourseAdmin" element={<ListSubCourseAdmin />} />
        <Route path="/AddSubCourseAdmin" element={<AddSubCourseAdmin />} />
        <Route path="/UpdateSubCourseAdmin/:id" element={<UpdateSubCourseAdmin />} />
        <Route path="/SubCoursesByCourseAdmin/:id" element={<SubCoursesByCourseAdmin />} />

        {/* Trainer Routes */}
                
       
        <Route path="/AddCourse" element={<AddCourse />} />
        <Route path="/UpdateCourse/:id" element={<UpdateCourse />} />
        <Route path="/DetailCourseTrainer/:id" element={<DetailCourseTrainer />} />
        <Route path="/ListSubCourse" element={<ListSubCourse />} />
        <Route path="/AddSubCourse" element={<AddSubCourse />} />
     
 
        <Route path="/AddVideo" element={<AddVideo />} />
        <Route path="/ListVideo" element={<ListVideo />} />
    
        <Route path="/VideoPopUp/:id" element={<VideoPopUp />} />
        <Route path="/UpdateVideo/:id" element={<UpdateVideo />} />

        {/* Student Routes */}
        <Route path="/student/enroll-course" element={<StudentEnrollCourse />} />
        <Route path="/DetailCourse/:id" element={<DetailCourse />} />
        <Route path="/ListCourseStudent" element={<ListCourseStudent />} />
        <Route path="/SubCourses/:id" element={<SubCourses />} />
        <Route path="/SubCourses/Video" element={<Video />} />
        <Route path="/Code" element={<Code />} />
        <Route path="/Quiz" element={<Quiz />} />

        
        {/* Quiz Routes */}
        <Route path='/quiz-create/:courseId/:subCourseId' element={<DashboardInterface />} >
          <Route index element={<QuizCreate />} />

        </Route>
        <Route path='/quizUpdate/:id' element={<DashboardInterface />} >
          <Route index element={<QuizUpdate />} />
        </Route>
        <Route path='/quizList' element={<DashboardInterface />} >
          <Route index element={<QuizList />} />
        </Route>

        <Route path={"/quizResult/:responseId"} element={<QuizResult/>} />
        <Route path={"/quiz/:id"} element={<TakeQuiz/>} />

        <Route path='/respenses' element={<DashboardInterface />} >
          <Route index element={<ResponsesUserListe />} />
        </Route>


        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/admin/coupons" element={<CouponList />} />


        

        {/* Not found  Route */}
        <Route path={"/*"} element={<Notfound/>} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;