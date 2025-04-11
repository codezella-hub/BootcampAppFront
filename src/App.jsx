import {   BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register'; 
import StudentEnrollCourse from './components/student/StudentEnrollCourse';// Ensure this is correctly imported   

import Home from './components/Home';
import AddCategory from './components/admin/AddCategory';
import ListCategory from './components/admin/ListCategory';
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



function App() {
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
    <Router>
      <Routes>
        {/* Default route to the login page */}
        <Route path="/" element={<GlobalInterface />} >
          <Route index element={<Home />} />
        </Route>

        <Route path='/dashboard' element={<DashboardInterface />} >

          <Route index element={

            <MyProfile />

          } />
          
        </Route>
        <Route path='/profile' element={
          <ProtectedRoute>
          <UpdateProfileInterface />
          </ProtectedRoute>
        } >
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

        <Route path="/update" element={<UpdateProfileInterface />} />
        <Route path="/ListCategory" element={<ListCategory />} />
      
        <Route path="/addForum" element={<AddForum/>} />
        <Route path="/updateForum/:id" element={<UpdateForum/>} />
        <Route path="/Forums" element={<ForumList/>} />
        <Route path="/Myforum" element={<MyForum/>} />
        <Route path="/forum/:id" element={<ForumDetails/>} />
        <Route path="/posts" element={<PostList/>} />
        <Route path="/posts/:id" element={<DetailPost/>} />
        <Route path="/postsEntreprise/:id" element={<AffichePostEntreprise/>} />
        <Route path="/addCandidat/:postId" element={<AddCandidat />} />
        <Route path="/MyPosts" element={<MyPosts/>} />
        <Route path="/addPost" element={<AddPost/>} />
        <Route path="/updatePost/:id" element={<UpdatePost/>} />
        <Route path="/CandidatDetailsEntreprise/:id" element={<CandidatDetailsEntreprise />} />
        <Route path="/MyCandidats" element={<MyCandidats />} />
        <Route path="/updateCandidat/:id" element={<UpdateCandidat/>} />


      </Routes>
    </Router>
  );
}

export default App;
