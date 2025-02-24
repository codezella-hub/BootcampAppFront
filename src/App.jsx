import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register'; 
import StudentEnrollCourse from './components/student/StudentEnrollCourse';   
import axios from "axios";
import Home from './components/Home';
import AddCategory from './components/admin/categorie/AddCategory';
import ListCategory from './components/admin/categorie/ListCategory';
import ForgetPassword from './components/auth/ForgetPassword';
import AddForum from './components/student/addForum';
import ForumList from './components/student/ForumList';
import ForumDetails from './components/student/ForumDetails';
import UpdateCategory from './components/admin/categorie/UpdateCategory'; // Import the missing component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/enroll-course" element={<StudentEnrollCourse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/ListCategory" element={<ListCategory />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/addForum" element={<AddForum />} />
        <Route path="/Forums" element={<ForumList />} />
        <Route path="/forum/:id" element={<ForumDetails />} />
        <Route path="/UpdateCategory/:id" element={<UpdateCategory />} /> {/* Fix: Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
