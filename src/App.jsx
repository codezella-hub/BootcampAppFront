import {   BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register'; 
import StudentEnrollCourse from './components/student/StudentEnrollCourse';// Ensure this is correctly imported   
import axios from "axios";
import Home from './components/Home';
import AddCategory from './components/admin/AddCategory';
import ListCategory from './components/admin/ListCategory';
import ForgetPassword from './components/auth/ForgetPassword';
import AddForum from './components/Forum/addForum.jsx';
import ForumList from './components/Forum/ForumList.jsx';
import ForumDetails from './components/Forum/ForumDetails.jsx';
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



function App() {
  //axios.defaults.baseURL = "http://localhost:3000/"
  return (
    <Router>
      <Routes>
        {/* Default route to the login page */}
        <Route path="/" element={<Home />} />
        {/* Other routes */}
        <Route path="/student/enroll-course" element={<StudentEnrollCourse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/ListCategory" element={<ListCategory />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
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
