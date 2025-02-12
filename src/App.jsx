import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import StudentEnrollCourse from './components/student/StudentEnrollCourse';  // Ensure this is correctly imported
import axios from "axios";
function App() {
  //axios.defaults.baseURL = "http://localhost:3000/"
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route to the login page */}
        <Route path="/" element={<Login />} />
        {/* Other routes */}
        <Route path="/student/enroll-course" element={<StudentEnrollCourse />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
