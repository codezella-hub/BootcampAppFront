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

      </Routes>
    </Router>
  );
}

export default App;
