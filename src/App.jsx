import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register'; 

import StudentEnrollCourse from './components/student/StudentEnrollCourse';  // Ensure this is correctly imported
import axios from "axios";
import Home from './components/Home';
function App() {
  //axios.defaults.baseURL = "http://localhost:3000/"
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route to the login page */}
        <Route path="/" element={<Home />} />
        {/* Other routes */}
        <Route path="/student/enroll-course" element={<StudentEnrollCourse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
