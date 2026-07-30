import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8080/shoppingai/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác."
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:8080/shoppingai/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      alert("Xóa tài khoản thành công");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Xóa tài khoản thất bại"
      );
    }
};
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
             style={{ marginBottom: "20px" }}
          >
            Đăng xuất
          </button>

          <button
            className="delete-btn"
            onClick={handleDeleteAccount}
          >
            Xóa tài khoản
          </button>

        </div>

      </div>

    </div>
  );
}