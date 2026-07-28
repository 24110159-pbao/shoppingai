import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AIRecommendation from "./pages/AIRecommendation";
import Login from "./pages/Login";


export default function App(){


  const token = localStorage.getItem("token");


  let role = null;


  if(token){

    try{

      const payload = jwtDecode(token);

      role = payload.role;

    }
    catch(err){

      console.log(err);

    }

  }



  return (

    <Routes>


      <Route
        path="/login"
        element={<Login />}
      />



      <Route
        path="/"
        element={<Home />}
      />



      <Route
        path="/product/:id"
        element={<Product />}
      />



      <Route
        path="/cart"
        element={<Cart />}
      />



      <Route
        path="/profile"
        element={<Profile />}
      />



      <Route
        path="/ai"
        element={
          role === "ADMIN"
          ?
          <AIRecommendation />
          :
          <Navigate to="/" replace />
        }
      />


    </Routes>

  );

}