import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/cart/cart";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import StudentEnrollCourse from "./components/student/StudentEnrollCourse";
import AddCategory from "./components/admin/AddCategory";
import ForgetPassword from "./components/auth/ForgetPassword";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const userId = "USER_ID_HERE"; // Replace with actual user ID

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/student/enroll-course" element={<StudentEnrollCourse />} />
        <Route path="/cart" element={<Cart userId={userId} cartItems={cartItems} onClearCart={() => setCartItems([])} />} />
      </Routes>
    </Router>
  );
}

export default App;
