import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AIRecommendation from "./pages/AIRecommendation";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Đã thêm import thiếu của bạn
import ProductDetail from "./pages/ProductDetail";
import ProductManage from "./pages/ProductManage";

export default function App() {
  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    try {
      isAdmin = jwtDecode(token)?.role === "ADMIN";
      
      
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/ai" element={isAdmin ? <AIRecommendation /> : <Navigate to="/" replace />} />
      <Route path="/products/manage" element={<ProductManage/>}/>
    </Routes>
  );
}
