import {   BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register'; 
import StudentEnrollCourse from './components/student/StudentEnrollCourse';// Ensure this is correctly imported   

import Home from './components/Home';
import AddCategory from './components/admin/AddCategory';
import ForgetPassword from './components/auth/ForgetPassword';
import AddForum from './components/student/addForum';
import ForumList from './components/student/ForumList';
import ForumDetails from './components/student/ForumDetails';
import VerifiedEmail from './components/auth/VerifiedEmail';
import ResetPassword from './components/auth/ResetPassword';
import CheckYourEmail from './components/auth/CheckYourEmail';
function App() {
  //axios.defaults.baseURL = "http://localhost:3000/"
  return (
    <Router>
      <Routes>
        {/* Default route to the login page */}
        <Route path="/" element={<Home />} />
        {/* Other routes */}
        <Route path="/student/enroll-course" element={<StudentEnrollCourse />} />
        <Route path="/verify-email" element={<VerifiedEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/check-your-email" element={<CheckYourEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/addForum" element={<AddForum/>} />
        <Route path="/Forums" element={<ForumList/>} />
        <Route path="/forum/:id" element={<ForumDetails/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
