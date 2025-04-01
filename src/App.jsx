import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register'; 
import StudentEnrollCourse from './components/student/course/StudentEnrollCourse';   
import axios from "axios";
import Home from './components/Home';
import AddCategory from './components/admin/categorie/AddCategory';
import ListCategory from './components/admin/categorie/ListCategory';
import ForgetPassword from './components/auth/ForgetPassword';
import AddForum from './components/student/addForum';
import ForumList from './components/student/ForumList';
import ForumDetails from './components/student/ForumDetails';
import UpdateCategory from './components/admin/categorie/UpdateCategory'; // Import the missing component
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
import VideoDetail from './components/trainer/video/VideoDetail';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />

        {/* Admin */}
        <Route path="/ListCategory" element={<ListCategory />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/UpdateCategory/:id" element={<UpdateCategory />} /> {/* Fix: Add this route */}

        <Route path="/ListCourseAdmin" element={<ListCourseAdmin />} />
        <Route path="/AddCourseAdmin" element={<AddCourseAdmin />} />
        <Route path="/UpdateCourseAdmin/:id" element={<UpdateCourseAdmin />} />

        <Route path="/ListSubCourseAdmin" element={<ListSubCourseAdmin />} />
        <Route path="/AddSubCourseAdmin" element={<AddSubCourseAdmin />} />
        <Route path="/UpdateSubCourseAdmin/:id" element={<UpdateSubCourseAdmin />} />
        <Route path="/SubCoursesByCourseAdmin/:id" element={<SubCoursesByCourseAdmin />} /> {/* Fix: Add this route */}
        {/********************************************************************************************************************/}
        {/* Trainer */}
        <Route path="/ListCourse" element={<ListCourse />} />
        <Route path="/AddCourse" element={<AddCourse />} />
        <Route path="/UpdateCourse/:id" element={<UpdateCourse />} />

        <Route path="/ListSubCourse" element={<ListSubCourse />} />
        <Route path="/AddSubCourse" element={<AddSubCourse />} />
        <Route path="/UpdateSubCourse/:id" element={<UpdateSubCourse />} />
        <Route path="/SubCoursesByCourse/:id" element={<SubCoursesByCourse />} /> {/* Fix: Add this route */}

        <Route path="/AddVideo" element={<AddVideo />} />
        <Route path="/DetailCourseTrainer/:id" element={<DetailCourseTrainer />} />

        {/********************************************************************************************************************/}
        {/* Student */}
        <Route path="/student/enroll-course" element={<StudentEnrollCourse />} />{/* page integre m3a mokhles bel payement */}
        <Route path="/DetailCourse/:id" element={<DetailCourse />} />

    





        <Route path="/ListVideo" element={<ListVideo/>} />


        <Route path="/addForum" element={<AddForum />} />
        <Route path="/Forums" element={<ForumList />} />
        <Route path="/forum/:id" element={<ForumDetails />} />


        <Route path="/SubCourses/:id" element={<SubCourses />} /> {/* Fix: Add this route */}

        <Route path="/SubCourses/Video" element={<Video />} /> {/* Fix: Add this route */}

        <Route path="/VideoDetail/:id/:subCourseId" element={<VideoDetail />} /> {/* Fix: Add this route */}
        <Route path="/VideoPopUp/:id" element={<VideoPopUp />} /> {/* Fix: Add this route */}
        <Route path="/UpdateVideo/:id" element={<UpdateVideo />} /> {/* Fix: Add this route */}
        <Route path="/ListCourseStudent" element={<ListCourseStudent />} /> {/* Fix: Add this route */}
        <Route path="/Quiz" element={<Quiz />} /> {/* Fix: Add this route */}
        <Route path="/AllCourses" element={<AllCourses />} /> {/* Fix: Add this route */}

        
        
      </Routes>
    </Router>
  );
}

export default App;
