import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AIRecommendation from "./pages/AIRecommendation";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import ProductDetail from "./pages/ProductDetail";
import ProductManage from "./pages/ProductManage";
import Checkout from "./pages/Checkout";

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
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/ai" element={isAdmin ? <AIRecommendation /> : <Navigate to="/" replace />} />
      <Route path="/products/manage" element={<ProductManage/>}/>
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
