import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const res = await axiosClient.get(
            "/users/me"
        );

        setUser(res.data.result);
      } catch (err) {
        console.error(err);
        alert("Không lấy được thông tin người dùng");
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    alert("Đăng xuất thành công");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-loading">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="profile-page">

      <nav className="navbar">
        <div className="logo">MyShop</div>

        <Link to="/" className="back-btn">
          Home
        </Link>
      </nav>

      <div className="profile-container">

        <div className="profile-card">

          <h2>Thông tin cá nhân</h2>

          <div className="profile-item">
            <span>Username</span>
            <strong>{user.username}</strong>
          </div>

          <div className="profile-item">
            <span>Họ và tên</span>
            <strong>{user.fullName}</strong>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-item">
            <span>Ngày tạo</span>
            <strong>{formatDate(user.createdAt)}</strong>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>

        </div>

      </div>

    </div>
  );
}